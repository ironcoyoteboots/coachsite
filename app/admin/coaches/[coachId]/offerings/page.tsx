// app/(admin)/admin/coaches/coach/[coachId]/offerings/page.tsx
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { OfferingType } from "@prisma/client";

const OFFERING_TYPE_META: Record<
  OfferingType,
  { label: string; tagline: string }
> = {
  PRIVATE_LESSON: {
    label: "Private Lessons",
    tagline: "1-on-1 coaching tailored to a single player.",
  },
  GROUP_CLASS: {
    label: "Group Classes",
    tagline: "Small group sessions with players at a similar level.",
  },
  CLINIC: {
    label: "Clinics",
    tagline: "Focused, multi-hour deep dives on specific skills.",
  },
  RETREAT: {
    label: "Retreats",
    tagline: "Multi-day training experiences and destination camps.",
  },
};

type PageParams = Promise<{ coachId: string }>;

export default async function CoachOfferingsPage({
  params,
}: {
  params: PageParams;
}) {
  noStore();

  const { coachId } = await params;

  const coach = await prisma.coach.findUnique({
    where: { id: coachId },
    include: {
      coachOfferings: true,
    },
  });

  if (!coach) {
    notFound();
  }

  const offeringsByType = new Map(
    coach.coachOfferings.map((o) => [o.type, o])
  );

  const allTypes = Object.keys(OFFERING_TYPE_META) as OfferingType[];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-600 mt-5">
            Offerings for {coach.businessName}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure your different lesson offerings
          </p>
        </div>

        <div className="mt-5">
          <Link
            href={`/admin/coaches/coach/${coach.id}`}
            className="text-xs text-slate-400 hover:text-slate-200"
          >
            ← Back to coach
          </Link>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {allTypes.map((type) => {
          const meta = OFFERING_TYPE_META[type];
          const offering = offeringsByType.get(type);

          const hasOffering = !!offering;
          const enabled = offering?.enabled ?? false;

          const title = offering?.title || meta.label;
          const subtitle = offering?.subtitle || meta.tagline;
          const price = offering?.priceDisplay || "";
          const description =
            offering?.description ||
            (hasOffering
              ? "This offering type is configured but does not have a description yet."
              : "This offering type is not yet configured for this coach.");

          const ctaLabel = hasOffering ? "Edit offering" : "Add offering";

          return (
            <div
              key={type}
              className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="text-sm text-white">
                  {meta.label}
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400">Status:</span>{" "}
                  {hasOffering ? (
                    <span
                      className={
                        enabled
                          ? "text-emerald-300"
                          : "text-amber-300"
                      }
                    >
                      {enabled ? "Enabled" : "Disabled"}
                    </span>
                  ) : (
                    <span className="text-slate-200">
                      Not configured
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400">Tagline:</span>{" "}
                  <span className="text-slate-100">{subtitle}</span>
                </div>

                {price && (
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400">Price:</span>{" "}
                    <span className="text-slate-100">{price}</span>
                  </div>
                )}

                <div className="text-xs text-slate-300">
                  <span className="text-slate-400">Summary:</span>{" "}
                  <span className="text-slate-100">{description}</span>
                </div>
              </div>

              <div className="flex gap-2 text-xs mt-2 sm:mt-0">
                <Link
                  href={`/admin/coaches/coach/${coach.id}/offerings/${type}`}
                  className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 hover:bg-slate-800 text-slate-200"
                >
                  {ctaLabel}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
