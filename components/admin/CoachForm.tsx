'use client';
import { FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Coach, CoachStatus } from '@prisma/client';
import { ALL_PALETTES, type PaletteId, getPalettePreviewDots } from '@/lib/colorPalettes';
import { HERO_TITLE_FONT_OPTIONS, type CoachNameFontClass } from '@/lib/coachFonts';

type EditorMode = 'platform' | 'self';

// These are stored as String in Prisma, but in practice we constrain them:
type HeroMediaType = 'image' | 'video';
type HeroPrimaryButtonTarget = 'offerings' | 'contact' | 'custom';

const MEDIA_TYPE_OPTIONS: HeroMediaType[] = ['image', 'video'];

const BUTTON_TARGET_OPTIONS: HeroPrimaryButtonTarget[] = [
    'offerings',
    'contact',
    'custom',
];

interface CoachFormProps {
    mode: EditorMode;
    coach: Coach;
}

export function CoachForm({ mode, coach }: CoachFormProps) {

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);


    // Identity
    const [subdomain, setSubdomain] = useState(coach.subdomain);
    const [firstName, setFirstName] = useState(coach.firstName);
    const [lastName, setLastName] = useState(coach.lastName);
    const [businessName, setBusinessName] = useState(coach.businessName);
    const [sport, setSport] = useState(coach.sport);

    // Theme
    const [paletteId, setPaletteId] = useState<PaletteId>(
        coach.paletteId as PaletteId,
    );
    const [heroBusinessNameFontClass, setHeroBusinessNameFontClass] =
        useState<CoachNameFontClass>(
            coach.heroBusinessNameFontClass as CoachNameFontClass,
        );

    // Hero
    const [heroTagline, setHeroTagline] = useState(coach.heroTagline);
    const [heroMediaType, setHeroMediaType] = useState<HeroMediaType>(
        coach.heroMediaType as HeroMediaType,
    );
    const [heroMediaUrl, setHeroMediaUrl] = useState(coach.heroMediaUrl);
    const [heroPrimaryButtonLabel, setHeroPrimaryButtonLabel] = useState(
        coach.heroPrimaryButtonLabel,
    );
    const [heroPrimaryButtonSubtext, setHeroPrimaryButtonSubtext] = useState(
        coach.heroPrimaryButtonSubtext ?? '',
    );
    const [heroPrimaryButtonTarget, setHeroPrimaryButtonTarget] =
        useState<HeroPrimaryButtonTarget>(
            coach.heroPrimaryButtonTarget as HeroPrimaryButtonTarget,
        );
    const [heroPrimaryButtonHref, setHeroPrimaryButtonHref] = useState(
        coach.heroPrimaryButtonHref ?? '',
    );


    const heroTitleSample =
        (businessName && businessName.trim()) ||
        'Business Name';

    // Section titles
    const [offeringsSectionTitle, setOfferingsSectionTitle] = useState(
        coach.offeringsSectionTitle,
    );
    const [testimonialsTitle, setTestimonialsTitle] = useState(
        coach.testimonialsTitle,
    );
    const [eventsTitle, setEventsTitle] = useState(coach.eventsTitle);

    // About
    const [aboutPhotoUrl, setAboutPhotoUrl] = useState(coach.aboutPhotoUrl);
    const [aboutLocation, setAboutLocation] = useState(coach.aboutLocation);
    const [aboutBio, setAboutBio] = useState(coach.aboutBio);
    const [aboutPhilosophy, setAboutPhilosophy] = useState(
        coach.aboutPhilosophy ?? '',
    );

    // Status / meta (shown only in platform mode)
    const [status, setStatus] = useState<CoachStatus>(coach.status);
    const [subdomainStatus, setSubdomainStatus] = useState<'available' | 'taken' | 'checking' | null>(null);

    async function handleCheckSubdomain() {
        if (!subdomain) return;

        try {
            setSubdomainStatus('checking');
            const res = await fetch(
                `/api/admin/coaches/check-subdomain?subdomain=${encodeURIComponent(
                    subdomain,
                )}&coachId=${coach.id}`
            );

            const data = await res.json();
            setSubdomainStatus(data.available ? 'available' : 'taken');
        } catch {
            setSubdomainStatus('taken');
        }
    }

    const [dirty, setDirty] = useState(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSaved(false);

        const payload = {
            subdomain,
            firstName,
            lastName,
            businessName,
            sport,
            paletteId,
            heroBusinessNameFontClass,
            heroTagline,
            heroMediaType,
            heroMediaUrl,
            heroPrimaryButtonLabel,
            heroPrimaryButtonSubtext:
                heroPrimaryButtonSubtext.trim() === '' ? null : heroPrimaryButtonSubtext,
            heroPrimaryButtonTarget,
            heroPrimaryButtonHref:
                heroPrimaryButtonHref.trim() === '' ? null : heroPrimaryButtonHref,
            offeringsSectionTitle,
            testimonialsTitle,
            eventsTitle,
            aboutPhotoUrl,
            aboutLocation,
            aboutBio,
            aboutPhilosophy:
                aboutPhilosophy.trim() === '' ? null : aboutPhilosophy,
            status,
        };

        try {
            const res = await fetch(`/api/admin/coaches/${coach.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let details = '';
                try {
                    details = await res.text();
                } catch {
                    // ignore
                }
                // eslint-disable-next-line no-console
                console.error('Failed to update coach', res.status, details);
                setError(`Failed to save changes (HTTP ${res.status}).`);
                return;
            }

            setSaved(true);
            setDirty(false);

            startTransition(() => {
                router.refresh();
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Unexpected error updating coach', err);
            setError('Unexpected error saving changes.');
        }
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-md coach-form text-slate-500">
            {/* Identity */}
            <section className="space-y-4">
                <h2 className="font-semibold">Personal Info</h2>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div className="col-span-2 -mb-3">
                        <label htmlFor="subdomain">
                            Url Name
                            <div className="text-xs text-slate-500">
                                Customize the url for your coaching business. This will be your url –{' '}
                                <i>https://{subdomain || 'yourname'}.coachsite.io</i>
                            </div>
                        </label>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <input
                                id="subdomain"
                                className="flex-1"
                                value={subdomain}
                                onChange={(e) => { setSubdomain(e.target.value); setDirty(true); }}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="whitespace-nowrap rounded-lg border border-slate-600 bg-slate-500 text-white px-3 py-2 text-sm hover:bg-slate-400 hover:border-slate-500 "
                            onClick={handleCheckSubdomain}
                        >
                            Check availability
                        </button>

                        {subdomainStatus && (
                            <span
                                className={`mt-1 ml-3 text-sm ${subdomainStatus === 'checking'
                                    ? 'text-slate-400'
                                    : subdomainStatus === 'available'
                                        ? 'text-emerald-600'
                                        : 'text-red-600'
                                    }`}
                            >
                                {subdomainStatus === 'checking' && 'Checking availability...'}
                                {subdomainStatus === 'available' && '✓ This URL is available'}
                                {subdomainStatus === 'taken' && 'This URL is already taken'}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label className="" htmlFor="businessName">
                            Business name
                        </label>
                        <input
                            id="businessName"
                            className=""
                            value={businessName}
                            onChange={(e) => { setBusinessName(e.target.value); setDirty(true); }}
                        />
                    </div>
                    <div>
                        <label className="" htmlFor="sport">
                            Sport
                        </label>
                        <select
                            id="sport"
                            className=""
                            value={sport.toUpperCase()}
                            onChange={(e) =>
                                setSport(e.target.value)
                            }
                        >
                            <option value="PICKLEBALL">Pickleball</option>
                            <option value="GOLF">Golf</option>
                            <option value="YOGA">Yoga</option>
                            <option value="MARTIALARTS">Martial Arts</option>
                            <option value="DANCING">Dancing</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2  mt-6">
                    <div>
                        <label className="" htmlFor="firstName">
                            First name
                        </label>
                        <input
                            id="firstName"
                            className=""
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value); setDirty(true); }}
                        />
                    </div>

                    <div>
                        <label className="" htmlFor="lastName">
                            Last name
                        </label>
                        <input
                            id="lastName"
                            className=""
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value); setDirty(true); }}
                        />
                    </div>
                </div>


            </section>

            {/* Colors */}
            <section className="space-y-3">
                <h2 className="font-semibold">Colors</h2>
                <p className="text-xs text-slate-500">
                    Choose a palette. The samples show key colors such as background and buttons.
                </p>

                <div className="grid gap-3 md:grid-cols-2 mt-2">
                    {ALL_PALETTES.map((p) => {
                        const dots = getPalettePreviewDots(p.id);

                        return (
                            <label
                                key={p.id}
                                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 cursor-pointer transition
            ${paletteId === p.id
                                        ? 'border-sky-500 bg-white shadow-sm'
                                        : 'border-slate-200 bg-slate-50 hover:border-slate-500 hover:bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="paletteId"
                                        className="h-4 w-4"
                                        checked={paletteId === p.id}
                                        onChange={() => { setPaletteId(p.id); setDirty(true); }}
                                    />
                                    <span className="text-sm font-medium text-slate-700">
                                        {p.label}
                                    </span>
                                </div>

                                <div className="flex border-slate-400 border-1">
                                    {dots.map((cls, idx) => (
                                        <span
                                            key={idx}
                                            className={`h-4 w-4 ${cls}`}
                                        />
                                    ))}
                                </div>
                            </label>
                        );
                    })}
                </div>
            </section>


            {/* Hero */}
            <section className="space-y-4 ">
                <h2 className="font-semibold">Hero Section</h2>

                <div className="mt-6">
                    <label className="" htmlFor="heroTagline">
                        Tagline
                    </label>
                    <input
                        id="heroTagline"
                        className=""
                        value={heroTagline}
                        onChange={(e) => { setHeroTagline(e.target.value); setDirty(true); }}
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label className="" htmlFor="heroMediaType">
                            Media type
                        </label>
                        <select
                            id="heroMediaType"
                            className=""
                            value={heroMediaType}
                            onChange={(e) =>
                                setHeroMediaType(e.target.value as HeroMediaType)
                            }
                        >
                            {MEDIA_TYPE_OPTIONS.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="" htmlFor="heroMediaUrl">
                            Media URL
                        </label>
                        <input
                            id="heroMediaUrl"
                            className=""
                            value={heroMediaUrl}
                            onChange={(e) => { setHeroMediaUrl(e.target.value); setDirty(true); }}
                        />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label
                            className=""
                            htmlFor="heroPrimaryButtonLabel"
                        >
                            Primary button label
                        </label>
                        <input
                            id="heroPrimaryButtonLabel"
                            className=""
                            value={heroPrimaryButtonLabel}
                            onChange={(e) =>
                                setHeroPrimaryButtonLabel(e.target.value)
                            }
                        />
                    </div>
                </div>


                <div className="mt-6">
                    <label
                        className=""
                        htmlFor="heroPrimaryButtonSubtext"
                    >
                        Primary button subtext
                    </label>
                    <input
                        id="heroPrimaryButtonSubtext"
                        className=""
                        value={heroPrimaryButtonSubtext}
                        onChange={(e) =>
                            setHeroPrimaryButtonSubtext(e.target.value)
                        }
                    />
                </div>


                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label
                            className=""
                            htmlFor="heroPrimaryButtonTarget"
                        >
                            Primary button target
                        </label>
                        <select
                            id="heroPrimaryButtonTarget"
                            className=""
                            value={heroPrimaryButtonTarget}
                            onChange={(e) =>
                                setHeroPrimaryButtonTarget(
                                    e.target.value as HeroPrimaryButtonTarget,
                                )
                            }
                        >
                            {BUTTON_TARGET_OPTIONS.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label
                            className=""
                            htmlFor="heroPrimaryButtonHref"
                        >
                            Primary button href (for custom)
                        </label>
                        <input
                            id="heroPrimaryButtonHref"
                            className=""
                            value={heroPrimaryButtonHref}
                            onChange={(e) =>
                                setHeroPrimaryButtonHref(e.target.value)
                            }
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <label className="">Business Name Font</label>
                        <div className="text-xs text-slate-500 mb-1">
                            Customize the font for your business name in the hero section.
                        </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 gap-3">
                        {HERO_TITLE_FONT_OPTIONS.map((f) => (
                            <label
                                key={f.id}
                                title={f.label}
                                className={`flex items-center justify-between gap-4 rounded-lg border px-3 py-2 cursor-pointer transition
          ${heroBusinessNameFontClass === f.id
                                        ? 'border-sky-500 bg-white shadow-sm'
                                        : 'border-slate-200 bg-slate-50 hover:border-slate-500 hover:bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="heroBusinessNameFontClass"
                                        className="h-4 w-4"
                                        checked={heroBusinessNameFontClass === f.id}
                                        onChange={() => { setHeroBusinessNameFontClass(f.id); setDirty(true); }}
                                    />
                                    <span className={`text-base md:text-xl ${f.id} text-slate-700`}>
                                        {heroTitleSample}
                                    </span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

            </section>

            {/* Section titles */}
            <section className="space-y-4 ">
                <h2 className="font-semibold">Section titles</h2>

                <div className="mt-6">
                    <div>
                        <label
                            className=""
                            htmlFor="offeringsSectionTitle"
                        >
                            Offerings section title
                        </label>
                        <input
                            id="offeringsSectionTitle"
                            className=""
                            value={offeringsSectionTitle}
                            onChange={(e) =>
                                setOfferingsSectionTitle(e.target.value)
                            }
                        />
                    </div>

                    <div className="mt-6">
                        <label
                            className=""
                            htmlFor="testimonialsTitle"
                        >
                            Testimonials title
                        </label>
                        <input
                            id="testimonialsTitle"
                            className=""
                            value={testimonialsTitle}
                            onChange={(e) =>
                                setTestimonialsTitle(e.target.value)
                            }
                        />
                    </div>

                    <div className="mt-6">
                        <label className="" htmlFor="eventsTitle">
                            Events title
                        </label>
                        <input
                            id="eventsTitle"
                            className=""
                            value={eventsTitle}
                            onChange={(e) => { setEventsTitle(e.target.value); setDirty(true); }}
                        />
                    </div>
                </div>
            </section>

            {/* About */}
            <section className="space-y-4 ">
                <h2 className="font-semibold">About</h2>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label
                            className=""
                            htmlFor="aboutPhotoUrl"
                        >
                            Photo URL
                        </label>
                        <input
                            id="aboutPhotoUrl"
                            className=""
                            value={aboutPhotoUrl}
                            onChange={(e) => { setAboutPhotoUrl(e.target.value); setDirty(true); }}
                        />
                    </div>

                    <div>
                        <label
                            className=""
                            htmlFor="aboutLocation"
                        >
                            Location
                        </label>
                        <input
                            id="aboutLocation"
                            className=""
                            value={aboutLocation}
                            onChange={(e) => { setAboutLocation(e.target.value); setDirty(true); }}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="" htmlFor="aboutBio">
                        Bio
                    </label>
                    <textarea
                        id="aboutBio"
                        className=" min-h-[80px]"
                        value={aboutBio}
                        onChange={(e) => { setAboutBio(e.target.value); setDirty(true); }}
                    />
                </div>

                <div className="mt-6">
                    <label
                        className=""
                        htmlFor="aboutPhilosophy"
                    >
                        Philosophy
                    </label>
                    <textarea
                        id="aboutPhilosophy"
                        className=" min-h-[80px]"
                        value={aboutPhilosophy}
                        onChange={(e) => { setAboutPhilosophy(e.target.value); setDirty(true); }}
                    />
                </div>
            </section>

            {/* Status (platform mode only) */}
            {
                mode === 'platform' && (
                    <section className="space-y-4 ">
                        <h2 className="font-semibold">Status</h2>

                        <div className="grid gap-4 md:grid-cols-2 mt-6">
                            <div>
                                <select
                                    id="status"
                                    className=""
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value as CoachStatus);
                                        setDirty(true);
                                    }}
                                >
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="PENDING">PENDING</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Meta (read only) */}
            <section className="space-y-2 ">
                <h2 className="font-semibold">Dates</h2>

                <div className="text-xs text-gray-600">
                    <div>
                        <strong>Created:</strong>{' '}
                        {coach.createdDate
                            ? new Date(coach.createdDate).toLocaleString()
                            : '—'}
                    </div>
                    <div>
                        <strong>Last Modified:</strong>{' '}
                        {coach.modifiedDate
                            ? new Date(coach.modifiedDate).toLocaleString()
                            : '—'}
                    </div>
                    <div>
                        <strong>Status Change:</strong>{' '}
                        {coach.statusChangeDate
                            ? new Date(coach.statusChangeDate).toLocaleString()
                            : '—'}
                    </div>
                </div>
            </section>

            {/* Actions */}
            <div className="sticky bottom-0 z-10 -mx-6 border-t border-slate-200 bg-white/90 px-6 py-3 backdrop-blur">
                <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-slate-500">
                        {isPending
                            ? 'Saving changes…'
                            : saved
                                ? 'All changes saved'
                                : 'Save changes to publish'}
                        {error && (
                            <span className="ml-3 text-xs text-red-600">
                                {error}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:border-slate-300"
                            onClick={() =>
                                window.open(`/coach/${subdomain}`, '_blank', 'noopener,noreferrer')
                            }
                        >
                            View public page
                        </button>

                        <button
                            type="submit"
                            disabled={!dirty || isPending}
                            className={`rounded-lg px-3 py-2 text-sm font-medium text-white shadow-sm transition
                                 ${!dirty || isPending
                                    ? 'bg-slate-300 cursor-not-allowed'
                                    : 'bg-sky-600 hover:bg-sky-700'
                                }`}
                        >
                            {isPending ? 'Saving…' : 'Save and publish changes'}
                        </button>

                    </div>
                </div>
            </div>
        </form >
    );
}
