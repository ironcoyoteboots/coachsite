import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw = (url.searchParams.get('subdomain') ?? '').trim().toLowerCase();
  const coachId = url.searchParams.get('coachId'); // optional (for edit pages)

  if (!raw) {
    return NextResponse.json(
      { available: false, reason: 'missing_subdomain' },
      { status: 400 },
    );
  }

  // Basic normalization (keeps it simple; tighten later if you want)
  const subdomain = raw.replace(/\s+/g, '-');

  const existing = await prisma.coach.findUnique({
    where: { subdomain },
    select: { id: true },
  });

  // If no record exists, it's available
  if (!existing) {
    return NextResponse.json({ available: true, subdomain });
  }

  // If editing and it's the same coach, allow it
  if (coachId && existing.id === coachId) {
    return NextResponse.json({ available: true, subdomain });
  }

  return NextResponse.json({ available: false, subdomain });
}
