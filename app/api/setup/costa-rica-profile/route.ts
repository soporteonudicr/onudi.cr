import { and, count, eq } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { auditLog, listeningLines, sources, workspaces } from "@/db/schema";
import { requireMembership } from "@/lib/access";
import {
  COSTA_RICA_LISTENING_LINES,
  COSTA_RICA_RSS_SOURCES,
} from "@/lib/costa-rica-profile";
import {
  assertPublicHttpUrl,
  canonicalizeUrl,
  MAX_ACTIVE_FEEDS_PER_WORKSPACE,
} from "@/lib/ingestion";

function normalizedName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function sourceKey(value: string) {
  try {
    return canonicalizeUrl(value);
  } catch {
    return value.trim();
  }
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!hasDatabase()) {
    return Response.json(
      { error: "DATABASE_NOT_CONFIGURED" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
  if (!sameOrigin(request)) {
    return Response.json(
      { error: "INVALID_ORIGIN" },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const user = await requireMembership(["regional_admin"]);
    const isRegionalAdministrator = user.memberships.some(
      (membership) =>
        membership.role === "regional_admin" &&
        membership.workspaceSlug === "regional",
    );
    if (!isRegionalAdministrator) {
      return Response.json(
        { error: "FORBIDDEN" },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    const database = getDb();
    const [costaRica] = await database
      .select()
      .from(workspaces)
      .where(and(eq(workspaces.slug, "costa-rica"), eq(workspaces.status, "active")))
      .limit(1);
    if (!costaRica) {
      return Response.json(
        { error: "COSTA_RICA_WORKSPACE_NOT_FOUND" },
        { status: 404, headers: { "Cache-Control": "no-store" } },
      );
    }

    const [existingLines, existingSources, activeSourceCountRows] = await Promise.all([
      database.select().from(listeningLines).where(eq(listeningLines.workspaceId, costaRica.id)),
      database.select().from(sources).where(eq(sources.workspaceId, costaRica.id)),
      database
        .select({ value: count() })
        .from(sources)
        .where(and(eq(sources.workspaceId, costaRica.id), eq(sources.status, "active"))),
    ]);

    const sourcesByUrl = new Map(
      existingSources.map((source) => [sourceKey(source.url), source]),
    );
    const sourcesToActivate = COSTA_RICA_RSS_SOURCES.filter((source) => {
      const existing = sourcesByUrl.get(sourceKey(source.url));
      return !existing || existing.status !== "active";
    }).length;
    const activeSourceCount = activeSourceCountRows[0]?.value ?? 0;
    const projectedSourceCount = activeSourceCount + sourcesToActivate;
    if (projectedSourceCount > MAX_ACTIVE_FEEDS_PER_WORKSPACE) {
      return Response.json(
        {
          error: "SOURCE_LIMIT_REACHED",
          limit: MAX_ACTIVE_FEEDS_PER_WORKSPACE,
          current: activeSourceCount,
          required: sourcesToActivate,
          projected: projectedSourceCount,
        },
        { status: 409, headers: { "Cache-Control": "no-store" } },
      );
    }

    const linesByName = new Map(
      existingLines.map((line) => [normalizedName(line.name), line]),
    );
    let linesCreated = 0;
    let linesUpdated = 0;
    const now = new Date();

    for (const profile of COSTA_RICA_LISTENING_LINES) {
      const existing = linesByName.get(normalizedName(profile.name));
      const values = {
        name: profile.name,
        question: profile.question,
        geography: ["Costa Rica"],
        actors: [...profile.actors],
        topicSlugs: [...profile.topics],
        includeTerms: [...profile.includeTerms],
        excludeTerms: [...profile.excludeTerms],
        languages: ["es"],
        connectorKinds: ["gdelt", "rss"],
        cadenceHours: 24,
        visibility: "country",
        status: "active",
        nextRunAt: now,
        updatedAt: now,
      };

      if (existing) {
        await database
          .update(listeningLines)
          .set(values)
          .where(eq(listeningLines.id, existing.id));
        linesUpdated += 1;
      } else {
        await database.insert(listeningLines).values({
          ...values,
          workspaceId: costaRica.id,
          ownerEmail: user.email,
        });
        linesCreated += 1;
      }
    }

    let sourcesCreated = 0;
    let sourcesUpdated = 0;
    for (const profile of COSTA_RICA_RSS_SOURCES) {
      const endpoint = canonicalizeUrl(
        assertPublicHttpUrl(profile.url).toString(),
      );
      const existing = sourcesByUrl.get(sourceKey(profile.url));
      if (existing) {
        await database
          .update(sources)
          .set({
            name: profile.name,
            kind: profile.kind,
            url: endpoint,
            actor: profile.actor,
            countryCode: "CR",
            status: "active",
            updatedAt: now,
          })
          .where(eq(sources.id, existing.id));
        sourcesUpdated += 1;
      } else {
        await database.insert(sources).values({
          workspaceId: costaRica.id,
          name: profile.name,
          kind: profile.kind,
          url: endpoint,
          countryCode: "CR",
          actor: profile.actor,
          reliability: 4,
          status: "active",
        });
        sourcesCreated += 1;
      }
    }

    await database.insert(auditLog).values({
      actorEmail: user.email,
      workspaceId: costaRica.id,
      action: "workspace.costa_rica_profile_applied",
      entityType: "workspace",
      entityId: costaRica.id,
      metadata: {
        profileVersion: "2026-08-19",
        linesCreated,
        linesUpdated,
        sourcesCreated,
        sourcesUpdated,
      },
    });

    return Response.json(
      {
        profileVersion: "2026-08-19",
        workspace: { id: costaRica.id, name: costaRica.name },
        lines: {
          created: linesCreated,
          updated: linesUpdated,
          total: COSTA_RICA_LISTENING_LINES.length,
        },
        sources: {
          created: sourcesCreated,
          updated: sourcesUpdated,
          total: COSTA_RICA_RSS_SOURCES.length,
        },
        preserved: {
          additionalLines: Math.max(0, existingLines.length - linesUpdated),
          additionalSources: Math.max(0, existingSources.length - sourcesUpdated),
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN";
    const status = message === "UNAUTHENTICATED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return Response.json(
      { error: message },
      { status, headers: { "Cache-Control": "no-store" } },
    );
  }
}
