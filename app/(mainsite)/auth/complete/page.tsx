import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { AccountRole } from "@prisma/client";
import { ensureAccountFromClerk } from "@/lib/auth/account";

// keep this helper as-is
function getSubdomainFromHost(host: string | null): string | null {
  if (!host) return null;

  const [hostname] = host.split(":");

  if (hostname === "localhost") return null;

  if (hostname.endsWith(".localhost")) {
    const [sub] = hostname.split(".");
    if (sub === "www") return null;
    return sub;
  }

  const parts = hostname.split(".");

  if (parts.length <= 2) {
    return null;
  }

  const sub = parts[0];
  if (sub === "www") return null;

  return sub;
}

export default async function AuthCompletePage() {
  // ✅ headers() returns a Promise in your setup, so we MUST await it
  const headersList = await headers();
  const host = headersList.get("host");
  const subdomain = getSubdomainFromHost(host);

  const roleHint: AccountRole = subdomain ? "STUDENT" : "COACH";

  try {
    await ensureAccountFromClerk(roleHint);
  } catch (err) {
    console.error("ensureAccountFromClerk failed in /auth/complete", err);
    // if something is off (e.g. not logged in), just push to /account or /sign-in
    return redirect("/account");
  }

  if (subdomain) {
    // student flow from coach subdomain
    return redirect(`/coach/${subdomain}/students/new`);
  }

  // coach flow from main site
  return redirect("/onboarding/coach");
}
