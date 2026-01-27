// components/SiteHeader.tsx
"use client";

import { useEffect, useState } from "react";
import { SiteHeaderMain } from "@/components/SiteHeaderMain";
import { SiteHeaderCoach } from "@/components/SiteHeaderCoach";

const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN ?? "coachsite.io";

export function SiteHeader() {
  const [host, setHost] = useState<string>("");

  useEffect(() => {
    // Runs only on the client
    setHost(window.location.hostname.toLowerCase());
  }, []);

  let isCoachHost = false;

  if (host) {
    // Root dev / prod → main header
    if (
      host === "localhost" ||
      host === BASE_DOMAIN ||
      host === `www.${BASE_DOMAIN}`
    ) {
      isCoachHost = false;
    }
    // Subdomains in dev (derek.localhost) or prod (derek.coachsite.io) → coach header
    else if (host.endsWith(".localhost") || host.endsWith(`.${BASE_DOMAIN}`)) {
      const [sub] = host.split(".");
      isCoachHost = sub !== "www";
    }
  }

  return isCoachHost ? <SiteHeaderCoach /> : <SiteHeaderMain />;
}
