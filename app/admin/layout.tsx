// app/coach/[subdomain]/layout.tsx
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getCoachPageModelBySubdomain } from '@/lib/coachConfig';
import { CoachProvider } from '@/components/coach/CoachProvider';
import { SiteHeaderCoach } from '@/components/SiteHeaderCoach';

interface CoachLayoutProps {
  children: ReactNode;
  params: { subdomain: string };
}

// This layout wraps ALL routes under /coach/[subdomain]
// Example: /coach/derek
export default async function CoachLayout({
  children,
  params,
}: CoachLayoutProps) {
  const subdomain = params.subdomain;

  // Load the public view model for this coach
  const coachPageModel = await getCoachPageModelBySubdomain(subdomain);

  if (!coachPageModel) {
    // If we don't find a coach for that subdomain, show 404
    notFound();
  }

  return (
    <CoachProvider coach={coachPageModel}>
      <div className="flex min-h-screen flex-col">
        {/* Coach-specific header (later we’ll have it read from context) */}
        <SiteHeaderCoach />
test
        <main className="flex-1">
          {children}
        </main>

        {/* Optional: coach public footer here if you want a different one later */}
      </div>
    </CoachProvider>
  );
}
