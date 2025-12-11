'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { Coach } from '@prisma/client';
import { CoachForm } from '@/components/admin/CoachForm';

export default function CoachEditPage() {
  const { coachId } = useParams<{ coachId: string }>();

  const [coach, setCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCoach() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/admin/coaches/${coachId}`);

        if (!res.ok) {
          const bodyText = await res.text().catch(() => '(no body)');
          console.error(
            'Failed to load coach',
            `status=${res.status}`,
            res.statusText,
            bodyText,
          );

          if (res.status === 404) {
            setError('Coach not found.');
          } else {
            setError(`Failed to load coach (HTTP ${res.status}).`);
          }
          return;
        }

        const data: Coach = await res.json();
        setCoach(data);
      } catch (err) {
        console.error('Unexpected error loading coach', err);
        setError('Unexpected error loading coach.');
      } finally {
        setLoading(false);
      }
    }

    if (coachId) {
      void loadCoach();
    }
  }, [coachId]);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Loading coach…</p>
      </div>
    );
  }

  if (error || !coach) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600 whitespace-pre-wrap">
          {error ?? 'Coach not found.'}
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Edit coach
        </h1>
        <p className="text-sm text-gray-500">
          Update core profile and hero details for this coach.
        </p>
      </div>

      <CoachForm mode="platform" coach={coach} />
    </div>
  );
}
