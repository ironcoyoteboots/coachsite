import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { getCoachPageModelBySubdomain } from "@/lib/coachConfig";
import { CoachProvider } from "@/components/coach/CoachProvider";
import { SiteHeaderCoach } from "@/components/SiteHeaderCoach";

interface CoachLayoutProps {
  children: ReactNode;
  // In Next 16, params is a Promise
  params: Promise<{ subdomain: string }>;
}

export default async function CoachLayout(props: CoachLayoutProps) {
  const { children, params } = props;

  // ✅ Unwrap params ONCE
  const { subdomain } = await params;

  console.log("[CoachLayout] subdomain =", subdomain);

  if (!subdomain) {
    notFound();
  }

  const coachPageModel = await getCoachPageModelBySubdomain(subdomain);

  if (!coachPageModel) {
    console.log("[CoachLayout] no coach for subdomain", subdomain);
    notFound();
  }

  return (
    <CoachProvider coach={coachPageModel}>
      <div className="flex min-h-screen flex-col">
        <SiteHeaderCoach />
        <main className="flex-1">{children}</main>
      </div>
    </CoachProvider>
  );
}
