import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type Context = {
  params: Promise<{ coachId: string }>;
};

// GET /api/admin/coaches/[coachId]
export async function GET(_req: Request, context: Context) {
  const { coachId } = await context.params;

  try {
    const coach = await prisma.coach.findUnique({
      where: { id: coachId },
    });

    if (!coach) {
      return NextResponse.json(
        { error: 'Coach not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(coach);
  } catch (err: any) {
    console.error('GET /api/admin/coaches/[coachId] error', err);

    return NextResponse.json(
      {
        error: 'Error loading coach',
        message: err?.message ?? String(err),
      },
      { status: 500 },
    );
  }
}

// PATCH /api/admin/coaches/[coachId]
// For now: ONLY update firstName to keep it simple.
export async function PATCH(req: Request, context: Context) {
  const { coachId } = await context.params;

  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    console.error('Error parsing JSON body', err);
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const { firstName } = body;

  if (typeof firstName !== 'string' || !firstName.trim()) {
    return NextResponse.json(
      { error: 'firstName is required' },
      { status: 400 },
    );
  }

  try {
    const updated = await prisma.coach.update({
      where: { id: coachId },
      data: {
        firstName,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error('PATCH /api/admin/coaches/[coachId] error', err);

    return NextResponse.json(
      {
        error: 'Error updating coach',
        message: err?.message ?? String(err),
      },
      { status: 500 },
    );
  }
}
