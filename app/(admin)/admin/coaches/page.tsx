// app/(admin)/admin/coaches/page.tsx
import { unstable_noStore as noStore } from 'next/cache';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function AdminCoachesPage() {
    const coaches = await prisma.coach.findMany({
        orderBy: { businessName: 'asc' },
    });

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold  text-slate-600 mt-5">Coaches</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        All coaches in the database.
                    </p>
                </div>
                {/* later: add "New coach" button here */}
            </div>

            {coaches.length === 0 && (
                <p className="text-sm text-slate-300">
                    No coaches found. Seed the database or create a new coach.
                </p>
            )}

            <div className="mt-4 space-y-3">
                {coaches.map((coach) => (
                    <div
                        key={coach.id}
                        className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="space-y-1">
                            <div className="text-sm text-white">
                                {/* Name → edit page */}
                                {coach.firstName} {coach.lastName}
                                <span className="ml-2 text-xs text-lime-400">
                                    ({coach.sport})
                                </span>
                            </div>

                            <div className="text-xs text-slate-300">
                                Business:{' '}
                                <span className="text-white">{coach.businessName}</span>
                            </div>

                            <div className="text-xs text-slate-300">
                                Subdomain:{' '}
                                <span className="ml-2 mr-2 text-xs text-white">
                                    {coach.subdomain}
                                </span>
                                {/* Subdomain → public coach page */}
                                <Link
                                    href={`https://${coach.subdomain}.coachsite.io`}
                                    className="text-emerald-300 hover:text-white"
                                    target="_blank"
                                >
                                    https://{coach.subdomain}.coachsite.io
                                </Link>

                                <span className="ml-2 mr-2 text-xs text-white">{coach.status}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 text-xs">
                            <Link
                                href={`/admin/coaches/coach/${coach.id}`}
                                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 hover:bg-slate-800 text-slate-200"
                            >
                                Edit
                            </Link>
                            <Link
                                href={`/admin/coaches/coach/${coach.id}/offerings`}
                                className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 hover:bg-slate-800 text-slate-200"
                            >
                                Offerings
                            </Link>
                            <Link
                                href={`/coach/${coach.subdomain}`}
                                className="inline-flex items-center rounded-full border border-emerald-500 px-3 py-1 text-emerald-300 hover:bg-emerald-500/10"
                                target="_blank"
                            >
                                View site
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
