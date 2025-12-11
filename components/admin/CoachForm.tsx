'use client';

import { FormEvent, useState } from 'react';
import type { Coach, CoachStatus } from '@prisma/client';
import { ALL_PALETTES, type PaletteId } from '@/lib/colorPalettes';
import type { CoachNameFontClass } from '@/lib/coachConfig';

type EditorMode = 'platform' | 'self';

// These are stored as String in Prisma, but in practice we constrain them:
type HeroMediaType = 'image' | 'video';
type HeroPrimaryButtonTarget = 'offerings' | 'contact' | 'custom';

const HERO_FONT_OPTIONS: CoachNameFontClass[] = [
    'coach-hero-font-inter',
    'coach-hero-font-quicksand',
    'coach-hero-font-ultra',
    'coach-hero-font-anton',
];

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


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // For now we just log the payload; we will wire PATCH next.
        // eslint-disable-next-line no-console
        console.log('CoachForm submit (not wired yet)', {
            id: coach.id,
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
                heroPrimaryButtonSubtext.trim() === ''
                    ? null
                    : heroPrimaryButtonSubtext,
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
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 text-md coach-form text-slate-500">
            {/* Identity */}
            <section className="space-y-4">
                <h2 className="font-semibold">Personal Info</h2>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label className="" htmlFor="subdomain">
                            Subdomain
                        </label>
                        <input
                            id="subdomain"
                            className=""
                            value={subdomain}
                            onChange={(e) => setSubdomain(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="" htmlFor="sport">
                            Sport
                        </label>
                        <input
                            id="sport"
                            className=""
                            value={sport}
                            onChange={(e) => setSport(e.target.value)}
                        />
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
                            onChange={(e) => setFirstName(e.target.value)}
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
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <label className="" htmlFor="businessName">
                        Business name
                    </label>
                    <input
                        id="businessName"
                        className=""
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                </div>
            </section>

            {/* Theme */}
            <section className="space-y-4 ">
                <h2 className="font-semibold">Theme</h2>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label className="" htmlFor="paletteId">
                            Choose a Color Palette
                        </label>
                        <select
                            id="paletteId"
                            className=""
                            value={paletteId}
                            onChange={(e) =>
                                setPaletteId(e.target.value as PaletteId)
                            }
                        >
                            {ALL_PALETTES.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        show color palettes here

                    </div>
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
                        onChange={(e) => setHeroTagline(e.target.value)}
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label
                            className=""
                            htmlFor="heroBusinessNameFontClass"
                        >
                            Hero business name font
                        </label>
                        <select
                            id="heroBusinessNameFontClass"
                            className=""
                            value={heroBusinessNameFontClass}
                            onChange={(e) =>
                                setHeroBusinessNameFontClass(
                                    e.target.value as CoachNameFontClass,
                                )
                            }
                        >
                            {HERO_FONT_OPTIONS.map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>show examples of fonts</div>

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
                            onChange={(e) => setHeroMediaUrl(e.target.value)}
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
                            onChange={(e) => setEventsTitle(e.target.value)}
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
                            onChange={(e) => setAboutPhotoUrl(e.target.value)}
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
                            onChange={(e) => setAboutLocation(e.target.value)}
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
                        onChange={(e) => setAboutBio(e.target.value)}
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
                        onChange={(e) => setAboutPhilosophy(e.target.value)}
                    />
                </div>
            </section>

            {/* Status (platform mode only) */}
            {mode === 'platform' && (
                <section className="space-y-4 ">
                    <h2 className="font-semibold">Status</h2>

                    <div className="grid gap-4 md:grid-cols-2 mt-6">
                        <div>
                            <label className="" htmlFor="status">
                                Status
                            </label>
                            <select
                                id="status"
                                className=""
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as CoachStatus)
                                }
                            >
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="PENDING">PENDING</option>
                                <option value="INACTIVE">INACTIVE</option>
                            </select>
                        </div>
                    </div>
                </section>
            )}

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
            <section className=" flex items-center justify-between">
                <button
                    type="submit"
                    className="border rounded px-4 py-2"
                >
                    Save (not wired yet)
                </button>
                <p className="text-xs text-gray-500">
                    Loads from the database; next step is wiring this to PATCH.
                </p>
            </section>
        </form>
    );
}
