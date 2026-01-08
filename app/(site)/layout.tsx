import type { ReactNode } from 'react';
import { SiteHeaderStudent } from '@/components/SiteHeaderStudent';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <SiteHeaderStudent />
      {children}
    </div>
  );
}