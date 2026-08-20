import { Clock3, LogOut, ShieldAlert } from "lucide-react";
import { redirect } from "next/navigation";
import ObservatoryApp from "@/components/observatory-app";
import { auth, getAuthMode, isAuthConfigured, signOut } from "@/auth";
import { getMemberships } from "@/lib/access";
import { getObservatoryData } from "@/lib/app-data";
import { BETA_IDENTITY_TENANT, validateBetaSession } from "@/lib/beta-accounts";

export const metadata = { title: "Observatorio | ONUDI" };
export const dynamic = "force-dynamic";

async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function AppPage() {
  if (!isAuthConfigured()) redirect("/acceso");
  const session = await auth();
  const email = session?.user?.email;
  const identityTenantId = session?.user?.identityTenantId;
  const identitySubject = session?.user?.identitySubject;
  if (!email || !identityTenantId || !identitySubject) redirect("/acceso");
  if (identityTenantId === BETA_IDENTITY_TENANT) {
    const account = await validateBetaSession(identitySubject, session.user?.sessionVersion);
    if (!account) redirect("/acceso?error=SessionExpired");
    if (account.mustChangePassword) redirect("/cambiar-clave");
  } else if (session.user?.mustChangePassword) redirect("/cambiar-clave");
  const memberships = await getMemberships({ email, identityTenantId, identitySubject });

  if (!memberships.length) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f4f7f9] p-5"><section className="w-full max-w-lg rounded-3xl border border-[#dbe5ea] bg-white p-7 text-center shadow-lg sm:p-9"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff2eb] text-[#cd5c2b]"><Clock3 size={27} /></span><h1 className="mt-5 text-2xl font-semibold text-[#17384d]">Acceso pendiente</h1><p className="mt-3 text-sm leading-6 text-[#637a87]">La cuenta <strong>{email}</strong> fue autenticada, pero todavía no tiene una membresía regional o de país. Solicitá acceso a una persona administradora de ONUDI.</p><div className="mt-5 flex items-start gap-2 rounded-xl bg-[#f2f8fb] p-4 text-left text-xs leading-5 text-[#557281]"><ShieldAlert className="mt-0.5 shrink-0" size={16} /> Esta separación evita que una cuenta válida vea información interna sin autorización.</div><form className="mt-6" action={logoutAction}><button className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[#cfdae0] px-5 py-3 text-sm font-semibold text-[#3d6175]"><LogOut size={16} /> Cerrar sesión</button></form></section></main>;
  }

  const data = await getObservatoryData(memberships);
  const workspaceOptions = memberships.map((membership) => ({ id: membership.workspaceId, code: membership.countryCode ?? "REG", name: membership.workspaceName }));
  const canApplyCostaRicaProfile = memberships.some((membership) => membership.role === "regional_admin" && membership.workspaceSlug === "regional");
  return <ObservatoryApp demo={false} authMode={getAuthMode()} userName={session.user?.name ?? email} userEmail={email} workspaceOptions={workspaceOptions} initialData={data} canApplyCostaRicaProfile={canApplyCostaRicaProfile} logoutAction={logoutAction} />;
}
