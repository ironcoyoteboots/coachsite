import type { ReactNode } from 'react';
import { SiteHeaderCoach } from '@/components/SiteHeaderCoach';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <SiteHeaderCoach />
      {children}
    </div>
  );
}