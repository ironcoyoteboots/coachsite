// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const BASE_DOMAIN =
  process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'coachsite.io';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const host = request.headers.get('host') ?? '';

  // 🛑 1. SKIP middleware entirely during localhost development
  if (host.startsWith('localhost')) {
    return NextResponse.next();
  }

  // 🛑 2. SKIP root domain + www
  if (host === BASE_DOMAIN || host === `www.${BASE_DOMAIN}`) {
    return NextResponse.next();
  }

  // 🛑 3. Only handle *.coachsite.io
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
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
