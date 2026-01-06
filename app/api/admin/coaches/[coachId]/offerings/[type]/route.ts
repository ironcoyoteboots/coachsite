import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { OfferingType } from '@prisma/client';

// GET /api/admin/coaches/[coachId]/offerings/[type]
export async function GET(
  _req: Request,
  context: { params: Promise<{ coachId: string; type: string }> }
) {
  // 👇 IMPORTANT: params is a Promise in Next 16 dynamic APIs
  const { coachId, type } = await context.params;

  if (!coachId || !type) {
    // treat missing pieces as "not found", not 400
    return new NextResponse('Not found', { status: 404 });
  }

  const offering = await prisma.coachOffering.findUnique({
    where: {
      coachId_type: {
        coachId,
        type: type as OfferingType,
      },
    },
  });

  if (!offering) {
    // No offering yet for this coach+type → your UI uses this as "create" mode
    return new NextResponse('Not found', { status: 404 });
  }

  return NextResponse.json(offering);
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ coachId: string; type: string }> }
) {
  const { coachId, type } = await context.params;

  if (!coachId || !type) {
    return new NextResponse('Not found', { status: 404 });
  }

  const body = await req.json();

  // Don’t trust client for these fields
  const unsafeKeys = [
    'id',
    'coachId',
    'type',
    'createdDate',
    'modifiedDate',
    'configJson',
  ];

  const data = Object.fromEntries(
    Object.entries(body).filter(([key]) => !unsafeKeys.includes(key))
  );

  // Generic upsert — no field list duplication here
  const upserted = await prisma.coachOffering.upsert({
    where: {
      coachId_type: {
        coachId,
        type: type as OfferingType,
      },
    },
    create: {
      coachId,
      type: type as OfferingType,
      enabled: true, // default when first created
      ...data,
    },
    update: {
      ...data,
    },
  });

  return NextResponse.json(upserted);
}