import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { auditLog, sources, workspaces } from "@/db/schema";
import { assertWorkspaceAccess, requireMembership } from "@/lib/access";
import { assertPublicHttpUrl, MAX_ACTIVE_FEEDS_PER_WORKSPACE } from "@/lib/ingestion";

const sourceSchema = z.object({
  workspaceId: z.uuid(),
  name: z.string().trim().min(2).max(160),
  kind: z.enum(["rss", "atom"]),
  url: z.url(),
  actor: z.string().trim().max(160).default(""),
});

export async function POST(request: Request) {
  if (!hasDatabase()) return Response.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  try {
    const user = await requireMembership(["regional_admin", "country_admin", "analyst", "contributor"]);
    const parsed = sourceSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return Response.json({ error: "INVALID_PAYLOAD", details: parsed.error.flatten() }, { status: 400 });
    if (!(await assertWorkspaceAccess(user, parsed.data.workspaceId, ["regional_admin", "country_admin", "analyst", "contributor"]))) {
      return Response.json({ error: "FORBIDDEN" }, { status: 403 });
    }
    const endpoint = assertPublicHttpUrl(parsed.data.url).toString();
    const [workspace] = await getDb().select({ countryCode: workspaces.countryCode }).from(workspaces).where(eq(workspaces.id, parsed.data.workspaceId)).limit(1);
    if (!workspace) return Response.json({ error: "WORKSPACE_NOT_FOUND" }, { status: 404 });

    const [existing] = await getDb().select({ id: sources.id }).from(sources).where(and(
      eq(sources.workspaceId, parsed.data.workspaceId),
      eq(sources.url, endpoint),
    )).limit(1);
    if (!existing) {
      const [sourceCount] = await getDb().select({ value: count() }).from(sources).where(and(
        eq(sources.workspaceId, parsed.data.workspaceId),
        eq(sources.status, "active"),
      ));
      if ((sourceCount?.value ?? 0) >= MAX_ACTIVE_FEEDS_PER_WORKSPACE) {
        return Response.json({
          error: "SOURCE_LIMIT_REACHED",
          limit: MAX_ACTIVE_FEEDS_PER_WORKSPACE,
        }, { status: 409 });
      }
    }
    const [source] = existing
      ? await getDb().update(sources).set({
          name: parsed.data.name,
          kind: parsed.data.kind,
          actor: parsed.data.actor,
          status: "active",
          updatedAt: new Date(),
        }).where(eq(sources.id, existing.id)).returning()
      : await getDb().insert(sources).values({
          ...parsed.data,
          url: endpoint,
          countryCode: workspace.countryCode,
        }).returning();

    await getDb().insert(auditLog).values({
      actorEmail: user.email,
      workspaceId: parsed.data.workspaceId,
      action: existing ? "source.updated" : "source.created",
      entityType: "source",
      entityId: source.id,
      metadata: { name: source.name, kind: source.kind },
    });
    return Response.json({ source }, { status: existing ? 200 : 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN";
    if (message === "URL_NOT_ALLOWED" || message === "URL_PROTOCOL_NOT_ALLOWED") return Response.json({ error: message }, { status: 400 });
    return Response.json({ error: message }, { status: message === "UNAUTHENTICATED" ? 401 : 403 });
  }
}
