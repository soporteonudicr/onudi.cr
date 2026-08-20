import { and, desc, gt, inArray } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { auditLog, ingestionRuns, listeningLines } from "@/db/schema";
import { assertWorkspaceAccess, requireMembership } from "@/lib/access";
import { ingestLinesNow } from "@/lib/ingestion";

export const maxDuration = 300;

const requestSchema = z.object({
  listeningLineIds: z.array(z.uuid()).min(1).max(250),
});

export async function POST(request: Request) {
  if (!hasDatabase()) return Response.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  try {
    const user = await requireMembership(["regional_admin", "country_admin", "analyst"]);
    const parsed = requestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return Response.json({ error: "INVALID_PAYLOAD" }, { status: 400 });

    const requestedIds = [...new Set(parsed.data.listeningLineIds)];
    const lines = await getDb().select().from(listeningLines).where(inArray(listeningLines.id, requestedIds));
    if (lines.length !== requestedIds.length) return Response.json({ error: "LISTENING_LINE_NOT_FOUND" }, { status: 404 });
    for (const line of lines) {
      if (!(await assertWorkspaceAccess(user, line.workspaceId, ["regional_admin", "country_admin", "analyst"]))) {
        return Response.json({ error: "FORBIDDEN" }, { status: 403 });
      }
    }

    const activeIds = lines.filter((line) => line.status === "active").map((line) => line.id);
    if (!activeIds.length) return Response.json({ requested: requestedIds.length, processed: 0, skipped: requestedIds.length, remaining: 0, results: [] });

    const cooldown = new Date(Date.now() - 5 * 60_000);
    const recentRuns = await getDb().select({ listeningLineId: ingestionRuns.listeningLineId })
      .from(ingestionRuns)
      .where(and(inArray(ingestionRuns.listeningLineId, activeIds), gt(ingestionRuns.startedAt, cooldown)))
      .orderBy(desc(ingestionRuns.startedAt));
    const recentIds = new Set(recentRuns.map((run) => run.listeningLineId));
    const eligibleIds = activeIds.filter((id) => !recentIds.has(id));
    const result = await ingestLinesNow(eligibleIds);

    const lineById = new Map(lines.map((line) => [line.id, line]));
    if (result.results.length) {
      await getDb().insert(auditLog).values(result.results.map((lineResult) => ({
        actorEmail: user.email,
        workspaceId: lineById.get(lineResult.listeningLineId)?.workspaceId,
        action: "listening_line.run_requested",
        entityType: "listening_line",
        entityId: lineResult.listeningLineId,
        metadata: { result: lineResult, requestMode: "all" },
      })));
    }

    return Response.json({
      ...result,
      requested: requestedIds.length,
      skipped: requestedIds.length - eligibleIds.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN";
    const status = message === "UNAUTHENTICATED" ? 401 : message === "FORBIDDEN" ? 403 : 500;
    return Response.json({ error: message }, { status });
  }
}
