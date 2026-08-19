import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDatabase } from "@/db";
import { auditLog, workspaceItems } from "@/db/schema";
import { assertWorkspaceAccess, requireMembership } from "@/lib/access";

const reviewSchema = z.object({
  workspaceId: z.string().uuid(),
  publicItemId: z.string().uuid(),
  relevance: z.enum(["direct", "indirect", "observe", "irrelevant"]),
  interpretation: z.string().trim().max(4000).default(""),
  recommendedAction: z.enum([
    "Dar seguimiento",
    "Explorar articulación",
    "Preparar contenido",
    "Compartir internamente",
    "No actuar por ahora",
  ]),
});

const relevanceConfig = {
  direct: { label: "Sí, directamente", status: "reviewed", priority: "follow" },
  indirect: { label: "Sí, indirectamente", status: "reviewed", priority: "insight" },
  observe: { label: "Solo observar", status: "reviewed", priority: "review" },
  irrelevant: { label: "No es relevante", status: "dismissed", priority: "review" },
} as const;

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
  if (!hasDatabase()) return Response.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  if (!sameOrigin(request)) return Response.json({ error: "INVALID_ORIGIN" }, { status: 403 });
  try {
    const user = await requireMembership(["regional_admin", "country_admin", "analyst", "contributor"]);
    const parsed = reviewSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) return Response.json({ error: "INVALID_PAYLOAD", details: parsed.error.flatten() }, { status: 400 });
    if (!(await assertWorkspaceAccess(user, parsed.data.workspaceId, ["regional_admin", "country_admin", "analyst", "contributor"]))) {
      return Response.json({ error: "FORBIDDEN" }, { status: 403 });
    }
    const decision = relevanceConfig[parsed.data.relevance];
    const internalNotes = [
      `Relevancia ONUDI: ${decision.label}`,
      `Acción recomendada: ${parsed.data.recommendedAction}`,
    ].join("\n");
    const [updated] = await getDb().update(workspaceItems).set({
      status: decision.status,
      interpretation: parsed.data.interpretation,
      internalNotes,
      priority: decision.priority,
      reviewedBy: user.email,
      reviewedAt: new Date(),
      updatedAt: new Date(),
    }).where(and(eq(workspaceItems.workspaceId, parsed.data.workspaceId), eq(workspaceItems.publicItemId, parsed.data.publicItemId))).returning({ id: workspaceItems.id });
    if (!updated) return Response.json({ error: "NOT_FOUND" }, { status: 404 });
    await getDb().insert(auditLog).values({
      actorEmail: user.email,
      workspaceId: parsed.data.workspaceId,
      action: `workspace_item.${decision.status}`,
      entityType: "public_item",
      entityId: parsed.data.publicItemId,
      metadata: {
        relevance: parsed.data.relevance,
        relevanceLabel: decision.label,
        recommendedAction: parsed.data.recommendedAction,
      },
    });
    return Response.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "UNKNOWN";
    return Response.json({ error: message }, { status: message === "UNAUTHENTICATED" ? 401 : 403 });
  }
}
