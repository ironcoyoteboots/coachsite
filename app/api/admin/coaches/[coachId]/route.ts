import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type ParamsContext = {
  params: Promise<{ coachId: string }>;
};

export async function GET(_req: Request, context: ParamsContext) {
  const { coachId } = await context.params;

  const coach = await prisma.coach.findUnique({
    where: { id: coachId },
  });

  if (!coach) {
    return new NextResponse('Coach not found', { status: 404 });
  }

  return NextResponse.json(coach);
}

export async function PATCH(req: Request, context: ParamsContext) {
  const { coachId } = await context.params;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new NextResponse('Invalid JSON body', { status: 400 });
  }

  // Get existing status so we can track statusChangeDate
  const existing = await prisma.coach.findUnique({
    where: { id: coachId },
    select: { status: true },
  });

  if (!existing) {
    return new NextResponse('Coach not found', { status: 404 });
  }

  // Strip fields the client should never control directly
  const {
    id: _ignoredId,
    createdDate: _ignoredCreated,
    modifiedDate: _ignoredModified,
    statusChangeDate: _ignoredStatusChanged,
    ...rest
  } = body;

  const data: any = {
    ...rest,
    modifiedDate: new Date(),
  };

  // If status changed, update statusChangeDate
  if (rest.status && rest.status !== existing.status) {
    data.statusChangeDate = new Date();
  }

  const updated = await prisma.coach.update({
    where: { id: coachId },
    data,
  });

  return NextResponse.json(updated);
}

