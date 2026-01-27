'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { CoachOffering, OfferingType } from '@prisma/client';
import CoachOfferingForm from '@/components/admin/CoachOffering';
import Link from 'next/link';

type RouteParams = {
  coachId: string;
  type: OfferingType;
};

const OFFERING_FRIENDLY: Record<OfferingType, string> = {
  PRIVATE_LESSON: "Private Lessons",
  GROUP_CLASS: "Group Classes",
  CLINIC: "Clinics",
  RETREAT: "Retreats",
};


export default function CoachOfferingEditPage() {
  const { coachId, type } = useParams<RouteParams>();

  const [offering, setOffering] = useState<CoachOffering | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOffering() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `/api/admin/coaches/${coachId}/offerings/${type}`
        );

        if (res.status === 404) {
          // 404 means: no offering yet for this coach+type → "create" mode
          setOffering(null);
          return;
        }

        if (!res.ok) {
          const bodyText = await res.text().catch(() => '(no body)');
          console.error(
            'Failed to load offering',
            `status=${res.status}`,
            res.statusText,
            bodyText,
          );
          setError(`Failed to load offering (HTTP ${res.status}).`);
          return;
        }

        const data: CoachOffering = await res.json();
        setOffering(data);
      } catch (err) {
        console.error('Unexpected error loading offering', err);
        setError('Unexpected error loading offering.');
      } finally {
        setLoading(false);
      }
    }

    if (coachId && type) {
      void loadOffering();
    }
  }, [coachId, type]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Loading offering…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600 whitespace-pre-wrap">
          {error}
        </p>
      </div>
    );
  }

  // offering === null means "not created yet" → form should treat this as "Add"
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-600">
          {offering
            ? `Edit ${OFFERING_FRIENDLY[type]}`
            : `Add ${OFFERING_FRIENDLY[type]}`}
        </h1>
        <p className="text-sm text-gray-500">
          Configure the details for your {OFFERING_FRIENDLY[type]}.
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <Link
          href={`/admin/coaches/coach/${coachId}/offerings`}
          className="text-xs text-slate-400 hover:text-slate-200"
        >
          ← Back to all lesson offerings
        </Link>
      </div>

      <CoachOfferingForm coachId={coachId} type={type} offering={offering} />
    </div>
  );
}
