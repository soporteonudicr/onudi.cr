import { randomUUID } from "node:crypto";
import { and, desc, eq, gte, inArray } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import {
  auditLog,
  itemMatches,
  listeningLines,
  publicItems,
  sources,
  workspaceItems,
  workspaces,
} from "@/db/schema";
import { assertWorkspaceAccess, requireMembership } from "@/lib/access";

const sectionSchema = z.enum([
  "findings",
  "narratives",
  "gaps",
  "actions",
  "coverage",
  "evidence",
]);

const createReportSchema = z.object({
  workspaceIds: z.array(z.uuid()).min(1).max(25),
  periodDays: z.union([z.literal(7), z.literal(30)]),
  sections: z.array(sectionSchema).min(1).max(6),
});

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function reportDate(value: Date) {
  return new Intl.DateTimeFormat("es-CR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Costa_Rica",
  }).format(value).replace(/\./g, "");
}

function countValues(values: string[]) {
  const counts = new Map<string, number>();
  for (const value of values.map((item) => item.trim()).filter(Boolean)) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((first, second) => second.count - first.count || first.label.localeCompare(second.label, "es"));
}

function noteValue(notes: string, label: string) {
  const line = notes
    .split("\n")
    .find((item) => item.toLocaleLowerCase("es").startsWith(`${label.toLocaleLowerCase("es")}:`));
  return line?.slice(line.indexOf(":") + 1).trim() ?? "";
}

function relevanceLabel(status: string, notes: string) {
  if (status === "dismissed") return "No es relevante";
  return noteValue(notes, "Relevancia ONUDI") || "Relevancia no registrada";
}

function priorityWeight(priority: string) {
  if (priority === "follow") return 4;
  if (priority === "opportunity") return 3;
  if (priority === "insight") return 2;
  return 1;
}

function evidenceUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : "";
  } catch {
    return "";
  }
}

function asObject(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

export async function GET() {
  if (!hasDatabase()) {
    return Response.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }

  try {
    const user = await requireMembership();
    const workspaceIds = user.memberships.map((membership) => membership.workspaceId);
    const rows = await getDb()
      .select({
        id: auditLog.id,
        metadata: auditLog.metadata,
        createdAt: auditLog.createdAt,
      })
      .from(auditLog)
      .where(and(
        eq(auditLog.action, "report.generated"),
        inArray(auditLog.workspaceId, workspaceIds),
      ))
      .orderBy(desc(auditLog.createdAt))
      .limit(30);

    const reports = rows.flatMap((row) => {
      const metadata = asObject(row.metadata);
      if (!metadata || metadata.reportVersion !== 1) return [];
      return [{ ...metadata, id: row.id, generatedAt: row.createdAt.toISOString() }];
    });
    return Response.json({ reports }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN";
    const status = message === "UNAUTHENTICATED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
  }
}

export async function POST(request: Request) {
  if (!hasDatabase()) {
    return Response.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
  if (!sameOrigin(request)) {
    return Response.json({ error: "INVALID_ORIGIN" }, { status: 403 });
  }

  try {
    const user = await requireMembership(["regional_admin", "country_admin", "analyst"]);
    const parsed = createReportSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return Response.json({ error: "INVALID_PAYLOAD", details: parsed.error.flatten() }, { status: 400 });
    }
    const requestedWorkspaceIds = [...new Set(parsed.data.workspaceIds)];
    const allowed = await Promise.all(requestedWorkspaceIds.map((workspaceId) =>
      assertWorkspaceAccess(user, workspaceId, ["regional_admin", "country_admin", "analyst"]),
    ));
    if (allowed.some((value) => !value)) {
      return Response.json({ error: "FORBIDDEN" }, { status: 403 });
    }

    const database = getDb();
    const now = new Date();
    const periodStart = new Date(now.getTime() - parsed.data.periodDays * 24 * 60 * 60 * 1000);
    const [reviewRows, workspaceRows, sourceRows, lineRows] = await Promise.all([
      database
        .select({
          publicItemId: publicItems.id,
          workspaceId: workspaceItems.workspaceId,
          workspaceName: workspaces.name,
          countryCode: workspaces.countryCode,
          status: workspaceItems.status,
          priority: workspaceItems.priority,
          interpretation: workspaceItems.interpretation,
          internalNotes: workspaceItems.internalNotes,
          reviewedAt: workspaceItems.reviewedAt,
          title: publicItems.title,
          url: publicItems.canonicalUrl,
          sourceName: publicItems.sourceName,
          detectedAt: publicItems.detectedAt,
        })
        .from(workspaceItems)
        .innerJoin(publicItems, eq(workspaceItems.publicItemId, publicItems.id))
        .innerJoin(workspaces, eq(workspaceItems.workspaceId, workspaces.id))
        .where(and(
          inArray(workspaceItems.workspaceId, requestedWorkspaceIds),
          inArray(workspaceItems.status, ["reviewed", "dismissed"]),
          gte(workspaceItems.reviewedAt, periodStart),
        ))
        .orderBy(desc(workspaceItems.reviewedAt))
        .limit(300),
      database
        .select({ id: workspaces.id, name: workspaces.name, slug: workspaces.slug })
        .from(workspaces)
        .where(inArray(workspaces.id, requestedWorkspaceIds)),
      database
        .select({
          id: sources.id,
          name: sources.name,
          status: sources.status,
          lastError: sources.lastError,
          lastSuccessAt: sources.lastSuccessAt,
        })
        .from(sources)
        .where(and(inArray(sources.workspaceId, requestedWorkspaceIds), eq(sources.status, "active"))),
      database
        .select({ id: listeningLines.id, name: listeningLines.name })
        .from(listeningLines)
        .where(and(inArray(listeningLines.workspaceId, requestedWorkspaceIds), eq(listeningLines.status, "active"))),
    ]);

    if (!reviewRows.length) {
      return Response.json({ error: "NO_REVIEWED_EVIDENCE" }, { status: 409 });
    }

    const publicItemIds = [...new Set(reviewRows.map((row) => row.publicItemId))];
    const matchRows = await database
      .select({
        publicItemId: itemMatches.publicItemId,
        lineId: listeningLines.id,
        lineName: listeningLines.name,
        topics: listeningLines.topicSlugs,
      })
      .from(itemMatches)
      .innerJoin(listeningLines, eq(itemMatches.listeningLineId, listeningLines.id))
      .where(and(
        inArray(itemMatches.publicItemId, publicItemIds),
        inArray(listeningLines.workspaceId, requestedWorkspaceIds),
      ));

    const matchesByItem = new Map<string, typeof matchRows>();
    for (const match of matchRows) {
      matchesByItem.set(match.publicItemId, [...(matchesByItem.get(match.publicItemId) ?? []), match]);
    }

    const reviewed = reviewRows.filter((row) => row.status === "reviewed");
    const dismissed = reviewRows.filter((row) => row.status === "dismissed");
    const topicsByItem = new Map<string, string[]>();
    for (const row of reviewRows) {
      topicsByItem.set(row.publicItemId, [...new Set(
        (matchesByItem.get(row.publicItemId) ?? []).flatMap((match) => match.topics),
      )]);
    }
    const topTopics = countValues(reviewed.flatMap((row) => topicsByItem.get(row.publicItemId) ?? []));
    const topSources = countValues(reviewed.map((row) => row.sourceName));
    const relevance = countValues(reviewRows.map((row) => relevanceLabel(row.status, row.internalNotes)));
    const narratives = countValues(reviewed.map((row) => row.interpretation).filter(Boolean));
    const actions = countValues(reviewed.map((row) => noteValue(row.internalNotes, "Acción recomendada")).filter(Boolean));
    const matchedLineIds = new Set(matchRows.map((match) => match.lineId));
    const linesWithoutEvidence = lineRows.filter((line) => !matchedLineIds.has(line.id)).map((line) => line.name);
    const sourcesWithError = sourceRows.filter((source) => Boolean(source.lastError));
    const sourcesHealthy = sourceRows.filter((source) => source.lastSuccessAt && !source.lastError);
    const sourcesPending = sourceRows.filter((source) => !source.lastSuccessAt && !source.lastError);
    const informationGaps = [
      ...linesWithoutEvidence.slice(0, 4).map((name) => `Sin evidencia revisada en el periodo: ${name}.`),
      ...(sourcesWithError.length ? [`${sourcesWithError.length} fuente${sourcesWithError.length === 1 ? " requiere" : "s requieren"} revisión técnica.`] : []),
      ...(sourcesPending.length ? [`${sourcesPending.length} fuente${sourcesPending.length === 1 ? " todavía no registra" : "s todavía no registran"} una lectura exitosa.`] : []),
      ...(!narratives.length ? ["El equipo todavía no ha escrito narrativas en las revisiones del periodo."] : []),
      ...(!actions.length ? ["El equipo todavía no ha registrado acciones recomendadas en las revisiones del periodo."] : []),
    ].slice(0, 7);

    const directCount = relevance.find((item) => item.label === "Sí, directamente")?.count ?? 0;
    const indirectCount = relevance.find((item) => item.label === "Sí, indirectamente")?.count ?? 0;
    const scopeLabel = workspaceRows.length === 1 ? workspaceRows[0].name : "Centroamérica";
    const periodLabel = `${reportDate(periodStart)} – ${reportDate(now)}`;
    const leadingTopics = topTopics.slice(0, 3).map((item) => item.label);
    const leadingSources = topSources.slice(0, 2).map((item) => item.label);
    const executiveSummary = [
      `Durante ${periodLabel}, el equipo revisó ${reviewRows.length} señal${reviewRows.length === 1 ? "" : "es"} para ${scopeLabel}; ${reviewed.length} se conservaron como evidencia y ${dismissed.length} se descartaron por falta de relevancia.`,
      leadingTopics.length
        ? `La conversación validada se concentra principalmente en ${leadingTopics.join(", ")}.`
        : "La evidencia todavía no permite identificar una concentración temática.",
      directCount || indirectCount
        ? `${directCount} señal${directCount === 1 ? " tiene" : "es tienen"} relación directa con ONUDI y ${indirectCount} relación indirecta.`
        : "Todavía falta completar el criterio de relación directa o indirecta con ONUDI.",
      leadingSources.length
        ? `Las fuentes con mayor presencia en la muestra revisada son ${leadingSources.join(" y ")}.`
        : "La muestra aún no permite comparar la presencia de fuentes.",
      narratives[0]
        ? `La narrativa más repetida por el equipo es: “${narratives[0].label}”.`
        : "Se requiere continuar la revisión humana para consolidar narrativas.",
    ].join(" ");

    const evidence = [...reviewed]
      .sort((first, second) => priorityWeight(second.priority) - priorityWeight(first.priority)
        || (second.reviewedAt?.getTime() ?? 0) - (first.reviewedAt?.getTime() ?? 0))
      .slice(0, 15)
      .map((row) => ({
        title: row.title,
        url: evidenceUrl(row.url),
        source: row.sourceName,
        country: row.workspaceName,
        relevance: relevanceLabel(row.status, row.internalNotes),
        topic: topicsByItem.get(row.publicItemId)?.[0] ?? "Por clasificar",
        interpretation: row.interpretation,
        recommendedAction: noteValue(row.internalNotes, "Acción recomendada"),
        reviewedAt: row.reviewedAt?.toISOString() ?? row.detectedAt.toISOString(),
      }));

    const report = {
      reportVersion: 1,
      title: `Resumen de escucha · ${scopeLabel}`,
      status: "draft",
      scopeLabel,
      workspaceIds: requestedWorkspaceIds,
      periodDays: parsed.data.periodDays,
      periodLabel,
      sections: parsed.data.sections,
      executiveSummary,
      metrics: {
        reviewed: reviewRows.length,
        retained: reviewed.length,
        relevant: directCount + indirectCount,
        dismissed: dismissed.length,
        activeSources: sourceRows.length,
        topics: topTopics.length,
      },
      relevance: relevance.slice(0, 6),
      topTopics: topTopics.slice(0, 8),
      narratives: narratives.slice(0, 8),
      actions: actions.slice(0, 8),
      topSources: topSources.slice(0, 8),
      coverage: {
        activeSources: sourceRows.length,
        healthySources: sourcesHealthy.length,
        warningSources: sourcesWithError.length,
        pendingSources: sourcesPending.length,
        activeLines: lineRows.length,
        linesWithEvidence: lineRows.length - linesWithoutEvidence.length,
      },
      informationGaps,
      evidence,
      methodology: "Resumen construido únicamente con resultados revisados por el equipo. Las cifras reflejan la cobertura configurada del Observatorio y no equivalen a la totalidad de la conversación pública. No se infiere sentimiento automáticamente.",
    };

    const regionalMembership = user.memberships.find((membership) =>
      membership.role === "regional_admin" && membership.workspaceSlug === "regional",
    );
    const reportWorkspaceId = requestedWorkspaceIds.length > 1
      ? regionalMembership?.workspaceId ?? requestedWorkspaceIds[0]
      : requestedWorkspaceIds[0];
    const [created] = await database.insert(auditLog).values({
      actorEmail: user.email,
      workspaceId: reportWorkspaceId,
      action: "report.generated",
      entityType: "report",
      entityId: randomUUID(),
      metadata: report,
    }).returning({ id: auditLog.id, createdAt: auditLog.createdAt });

    return Response.json(
      { report: { ...report, id: created.id, generatedAt: created.createdAt.toISOString() } },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN";
    const status = message === "UNAUTHENTICATED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return Response.json({ error: message }, { status, headers: { "Cache-Control": "no-store" } });
  }
}
