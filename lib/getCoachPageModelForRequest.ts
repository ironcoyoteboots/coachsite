// lib/getCoachPageModelForRequest.ts
import { getCoachPageModelBySubdomain } from "@/lib/coachConfig";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? "coachsite.io";

export async function getCoachPageModelForRequest(hostHeader: string | null) {
  if (!hostHeader) return null;

  const [hostnameRaw] = hostHeader.split(":"); // strip port
  const hostname = hostnameRaw.toLowerCase();

  // Root dev/prod → no coach model
  if (
    hostname === "localhost" ||
    hostname === BASE_DOMAIN ||
    hostname === `www.${BASE_DOMAIN}`
  ) {
    return null;
  }

  let subdomain: string | null = null;

  // Dev: derek.localhost
  if (hostname.endsWith(".localhost")) {
    const [sub] = hostname.split(".");
    subdomain = sub === "www" ? null : sub;
  }
  // Prod: derek.coachsite.io
  else if (hostname.endsWith(`.${BASE_DOMAIN}`)) {
    subdomain = hostname.replace(`.${BASE_DOMAIN}`, "");
    if (subdomain === "www") subdomain = null;
  }

  if (!subdomain) return null;

  const coachPageModel = await getCoachPageModelBySubdomain(subdomain);
  return coachPageModel; // may be null if no matching coach
}
