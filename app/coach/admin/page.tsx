// app/coach/admin/page.tsx
import { prisma } from '@/lib/prisma';
import { CoachForm } from '@/components/admin/CoachForm';
import { unstable_noStore as noStore } from 'next/cache';

// TODO: replace with real auth-based lookup later
const TEMP_COACH_SUBDOMAIN = 'derek';

export default async function CoachSelfAdminPage() {
  noStore();

  const coach = await prisma.coach.findUnique({
    where: { subdomain: TEMP_COACH_SUBDOMAIN },
  });

  if (!coach) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold mb-4">Coach Admin</h1>
          <p className="text-sm text-slate-300">
            No coach record found for subdomain &quot;
            {TEMP_COACH_SUBDOMAIN}&quot;.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10  mt-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-2xl font-semibold">Edit My Page</h1>

       <CoachForm mode="self" coach={coach} />
      </div>
    </main>
  );
}
