import Link from "next/link";

import { notFound } from 'next/navigation';
import { getCoachPageModelBySubdomain } from '@/lib/coachConfig';

type Params = Promise<{ subdomain: string }>;

export default async function CoachPage({ params }: { params: Params }) {
  const { subdomain } = await params;

  const coach = await getCoachPageModelBySubdomain(subdomain);

  if (!coach) {
    notFound();
  }

  const { palette } = coach;

  const offerings = coach.offerings ?? [];
  const testimonials = coach.testimonials ?? [];
  const events = coach.events ?? [];

  const offeringGridCols =
  offerings.length <= 1
    ? 'grid-cols-1'
    : offerings.length === 2
    ? 'grid-cols-1 sm:grid-cols-2'
    : offerings.length === 3
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';

  return (
    <main className={`min-h-screen ${palette.pageBg} ${palette.textPrimary}`}>
      {/* HERO */}
      <section
        className="
          relative w-full
          min-h-[340px]
          sm:min-h-[380px]
          md:min-h-[440px]
          lg:min-h-[520px]
          xl:min-h-[580px]
          max-h-[550px]
          overflow-hidden
        "
      >
        {/* Background media */}
        {coach.heroMediaType === 'video' ? (
          <video
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={coach.heroMediaUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 h-full w-full object-cover object-center"
            src={coach.heroMediaUrl}
            alt={coach.businessName}
          />
        )}

        {/* Overlay from palette */}
        <div className={`absolute inset-0 ${palette.heroOverlay}`} />

        {/* Hero content */}
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 md:px-8 lg:px-10">
            <div className="w-full flex flex-col items-center">
              {/* Coach business name – font configurable */}
              <h1
                className={`
                  ${coach.heroBusinessNameFontClass}
                  text-4xl tracking-wider
                  sm:text-5xl md:text-6xl lg:text-7xl ${palette.textHero}
                `}
              >
                {coach.businessName}
              </h1>

              {/* Tagline pill */}
              <p
                className={`
                  mt-4 inline-block rounded-[10px] px-6 py-6 text-base sm:text-2xl
                  ${palette.heroTaglineBg} ${palette.textHeroTagline}
                `}
              >
                {coach.heroTagline}
              </p>
            </div>

            <div className="mt-2 flex flex-col items-center gap-3">
              <Link
                href={
                  coach.heroPrimaryButtonTarget === 'offerings'
                    ? '#offerings'
                    : coach.heroPrimaryButtonTarget === 'contact'
                    ? '#contact'
                    : coach.heroPrimaryButtonHref ?? '#offerings'
                }
                className={`
                  rounded-full px-8 py-3 text-base font-semibold sm:text-2xl sm:whitespace-nowrap
                  ${palette.buttonBg} ${palette.textButton} ${palette.buttonHoverBg}
                `}
              >
                {coach.heroPrimaryButtonLabel}
              </Link>

              {coach.heroPrimaryButtonSubtext && (
                <p className={`text-sm sm:text-xl ${palette.textHero}`}>
                  {coach.heroPrimaryButtonSubtext}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      {offerings.length > 0 && (
        <section
          id="offerings"
          className={`border-t ${palette.border} ${palette.sectionBg}`}
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {coach.offeringsSectionTitle}
                </h2>
                <p className={`mt-2 text-sm ${palette.textMuted}`}>
                  Private lessons, small group sessions, clinics, and retreats
                  built around your goals.
                </p>
              </div>
            </div>

            <div className={`grid gap-6 ${offeringGridCols}`}>
              {offerings.map((offering) => (
                <article
                  key={offering.id}
                  className={`
                    flex flex-col overflow-hidden rounded-2xl border
                    ${palette.border} ${palette.cardBg}
                  `}
                >
                  <div className="aspect-4/4 w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={offering.imageUrl}
                      alt={offering.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col space-y-3 p-4">
                    <h3 className="text-base font-semibold md:text-lg">
                      {offering.title}
                    </h3>
                    <p className={`text-sm ${palette.textPrimary}`}>
                      {offering.description}
                    </p>
                    {offering.levels && offering.levels.length > 0 && (
                      <p className={`text-xs ${palette.textMuted}`}>
                        Levels:{' '}
                        {offering.levels
                          .map((lvl) => lvl.toString())
                          .join(', ')}
                      </p>
                    )}
                    {offering.priceFrom && (
                      <p
                        className={`text-xs  ${palette.textPrimary}`}
                      >
                        {offering.priceFrom}
                      </p>
                    )}
                    <div className="pt-2 mt-auto flex justify-center">
                      <Link
                        href={offering.ctaHref}
                        className={`
                          inline-flex w-4/5 sm:w-auto mx-auto items-center justify-center rounded-full px-5 py-2 text-md 
                          ${palette.buttonBg} ${palette.textButton} ${palette.buttonHoverBg}
                        `}
                      >
                        {offering.ctaLabel}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ABOUT COACH */}
      {coach.about && (
        <section
          id="about"
          className={`border-t ${palette.border} ${palette.sectionAltBg}`}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-center md:py-16">
            <div className="w-full max-w-sm">
              <div className="relative inline-block">
                <div className="absolute -inset-1 rounded-3xl" />
                <div
                  className={`
                    relative overflow-hidden rounded-3xl border p-2 aspect-4/5 mr-10
                    ${palette.border} ${palette.cardBg}
                  `}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coach.about.photoUrl}
                    alt={coach.about.name}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="max-w-xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Meet Coach {coach.firstName} {coach.lastName}
              </h2>
              <p className={`text-sm ${palette.textMuted}`}>
                Based in {coach.about.location}
              </p>

              <p className={`text-sm ${palette.textPrimary}`}>
                {coach.about.bio}
              </p>

              {coach.about.philosophy && (
                <p className={`text-sm italic ${palette.textMuted}`}>
                  “{coach.about.philosophy}”
                </p>
              )}

              {coach.about.certifications && (
                <ul className="mt-2 space-y-1 text-sm">
                  {coach.about.certifications.map((cert) => (
                    <li key={cert} className={palette.textMuted}>
                      • {cert}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section
          id="testimonials"
          className={`border-t ${palette.border} ${palette.sectionBg}`}
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="mb-8 max-w-xl space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {coach.testimonialsTitle}
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <figure
                  key={t.id}
                  className={`
                    flex h-full flex-col justify-between rounded-2xl border p-5
                    ${palette.border} ${palette.cardBg}
                  `}
                >
                  <blockquote className={`text-sm ${palette.textPrimary}`}>
                    “{t.quote}”
                  </blockquote>
                  <figcaption
                    className={`mt-4 text-xs ${palette.textMuted}`}
                  >
                    <span className={` ${palette.textPrimary}`}>
                      {t.name}
                    </span>
                    {t.detail && <> • {t.detail}</>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVENTS / NEXT SESSIONS */}
      {events.length > 0 && (
        <section
          id="events"
          className={`border-t ${palette.border} ${palette.sectionAltBg}`}
        >
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {coach.eventsTitle}
                </h2>
                <p className={`mt-2 text-sm ${palette.textMuted}`}>
                  Lock in a spot in the next class or clinic.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {events.map((event) => {
                const capacityLabel =
                  event.spotsLeft != null && event.totalSpots
                    ? `${event.spotsLeft} of ${event.totalSpots} spots left`
                    : undefined;

                return (
                  <div
                    key={event.id}
                    className={`
                      flex flex-col justify-between gap-4 rounded-2xl border p-4
                      md:flex-row md:items-center
                      ${palette.border} ${palette.cardBg}
                    `}
                  >
                    <div className="space-y-1">
                      <p
                        className={`
                          text-xs uppercase tracking-[0.2em]
                          ${palette.textMuted}
                        `}
                      >
                        {event.type.toLowerCase()}
                      </p>
                      <h3 className="text-base font-semibold md:text-lg">
                        {event.title}
                      </h3>
                      <p className={`text-sm ${palette.textPrimary}`}>
                        {event.dateLabel}
                      </p>
                      <p className={`text-xs ${palette.textMuted}`}>
                        {event.location}
                      </p>
                      {capacityLabel && (
                        <p className="text-xs text-red-400 font-bold">
                          {capacityLabel}
                        </p>
                      )}
                    </div>
                    <div className="md:text-right">
                      <Link
                        href={event.ctaHref}
                        className={`
                          inline-flex items-center justify-center rounded-full px-4 py-2 text-md 
                          ${palette.buttonBg} ${palette.textButton} ${palette.buttonHoverBg}
                        `}
                      >
                        {event.ctaLabel}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT / SIMPLE CTA (so #contact works) */}
      <section
        id="contact"
        className={`border-t ${palette.border} ${palette.sectionBg}`}
      >
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Ready to play better pickleball?
          </h2>
          <p className={`mt-2 text-sm ${palette.textMuted}`}>
            For now, this can be a simple contact link. Later we’ll wire this to
            a proper booking and payment flow.
          </p>
          <div className="mt-4">
            <a
              href=""
              className={`
                inline-flex items-center justify-center rounded-full px-6 py-3 text-md 
                ${palette.buttonBg} ${palette.textButton} ${palette.buttonHoverBg}
              `}
            >
              Contact Coach {coach.firstName} to get started
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
