// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const BASE_DOMAIN =
  process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'coachsite.io';

export default clerkMiddleware((auth, request: NextRequest) => {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') ?? '';

  // 1. Skip subdomain rewriting behavior on localhost,
  //    but still let Clerk run for auth.
  if (host.startsWith('localhost')) {
    return NextResponse.next();
  }

  // 2. Skip root domain + www (no rewrite)
  if (host === BASE_DOMAIN || host === `www.${BASE_DOMAIN}`) {
    return NextResponse.next();
  }

  // 3. Only handle *.coachsite.io
  if (!host.endsWith(`.${BASE_DOMAIN}`)) {
    return NextResponse.next();
  }

  // Extract subdomain
  const subdomain = host.replace(`.${BASE_DOMAIN}`, '');

  // Only rewrite root path
  if (url.pathname === '/') {
    url.pathname = `/coach/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
});

// Keep your matcher (this is fine with Clerk)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
