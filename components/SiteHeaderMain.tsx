'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { User } from 'lucide-react';

const navItems = [
  { href: '/pricing', label: 'Pricing' }
];

export function SiteHeaderMain() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header
      className={
        `absolute top-0 left-0 w-full z-50 ` +
        (isHome ? 'bg-transparent' : 'bg-slate-800 backdrop-blur')
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="min-w-[150px]">
          {!isHome && (
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Coach<span className="text-lime-400">Site</span>
            </Link>
          )}
        </div>


        <nav className="flex items-center gap-4 text-sm text-slate-100 font-semibold">
          <SignedOut>

            {/* Coach sign-up CTA */}
            <Link
              href="/sign-up"
              className="rounded-full bg-lime-500 px-4 py-1 text-sm font-medium text-slate-100 hover:bg-lime-400 "
            >
              Get started
            </Link>

            {/* Coach sign-in */}
            <Link
              href="/sign-in"
              className="px-4 py-1 hover:text-lime-500"
            >
              Coach sign in
            </Link>


          </SignedOut>

          <SignedIn>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 px-3 py-1 text-sm font-medium text-white hover:border-lime-400 hover:text-lime-400"
            >
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </SignedIn>

          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  'transition  hover:text-lime-500' +
                  (isActive ? ' font-semibold ' : '')
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
