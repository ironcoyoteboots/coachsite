import type { ReactNode } from 'react';
import { SiteHeaderAdmin } from '@/components/SiteHeaderAdmin';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <SiteHeaderAdmin />
      {children}
    </div>
  );
}