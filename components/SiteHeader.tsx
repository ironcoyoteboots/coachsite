'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/demo', label: 'Demo' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-slate-900"
        >
          CoachSite
        </Link>

        <nav className="flex items-center gap-4 text-sm text-slate-600">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  'transition hover:text-slate-900' +
                  (isActive ? ' font-semibold text-slate-900' : '')
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
