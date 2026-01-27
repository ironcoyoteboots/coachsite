// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

const BASE_DOMAIN =
  process.env.NEXT_PUBLIC_BASE_DOMAIN ?? 'coachsite.io';

function getHostname(host: string | null): string {
  if (!host) return '';
  // strip port: "derek.localhost:3000" -> "derek.localhost"
  const [hostname] = host.split(':');
  return hostname.toLowerCase();
}

export default clerkMiddleware((auth, request: NextRequest) => {
  const url = request.nextUrl.clone();
  const hostHeader = request.headers.get('host');
  const hostname = getHostname(hostHeader);

  // 1. Local root: http://localhost:3000 -> no subdomain rewrite
  if (hostname === 'localhost') {
    return NextResponse.next();
  }

  // 2. Root domain + www in prod: coachsite.io or www.coachsite.io
  if (hostname === BASE_DOMAIN || hostname === `www.${BASE_DOMAIN}`) {
    return NextResponse.next();
  }

  let subdomain: string | null = null;

  // 3a. Dev: *.localhost (e.g. derek.localhost:3000)
  if (hostname.endsWith('.localhost')) {
    const parts = hostname.split('.');
    // "derek.localhost" -> ["derek","localhost"]
    if (parts.length >= 2) {
      subdomain = parts[0] === 'www' ? null : parts[0];
    }
  }
  // 3b. Prod: *.coachsite.io (or whatever BASE_DOMAIN is)
  else if (hostname.endsWith(`.${BASE_DOMAIN}`)) {
    subdomain = hostname.replace(`.${BASE_DOMAIN}`, '');
    if (subdomain === 'www') subdomain = null;
  }

  // If we didn't detect a valid subdomain, just continue
  if (!subdomain) {
    return NextResponse.next();
  }

  // 4. Only rewrite the root path
  if (url.pathname === '/') {
    url.pathname = `/coach/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
