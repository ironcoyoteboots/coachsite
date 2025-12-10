// lib/coachConfig.ts

// ───────── Palette + font types ─────────

import {
    PaletteId,
    PaletteClasses,
    getPaletteById,
} from './colorPalettes';
import { prisma } from './prisma';


export type CoachNameFontClass =
    | 'coach-hero-font-inter'
    | 'coach-hero-font-quicksand'
    | 'coach-hero-font-ultra'
    | 'coach-hero-font-anton';

// ───────── Coach config types ─────────

export type CoachOfferingType =
    | 'PRIVATE_LESSON'
    | 'GROUP_CLASS'
    | 'CLINIC'
    | 'RETREAT';

export type CoachLevel =
    | 'Beginner'
    | 'Intermediate'
    | 'Advanced'
    | 'All levels';


export interface CoachOfferingConfig {
    id: string;
    type: CoachOfferingType;
    title: string;
    description: string;
    imageUrl: string;
    levels?: CoachLevel[];
    priceFrom?: string;
    ctaLabel: string;
    ctaHref: string;
}

export interface CoachAboutConfig {
    photoUrl: string;
    name: string;
    location: string;
    certifications?: string[];
    bio: string;
    philosophy?: string;
}

export interface CoachTestimonialConfig {
    id: string;
    quote: string;
    name: string;
    detail?: string;
}

export interface CoachEventConfig {
    id: string;
    title: string;
    dateLabel: string;
    type: CoachOfferingType;
    location: string;
    spotsLeft?: number;
    totalSpots?: number;
    ctaLabel: string;
    ctaHref: string;
}

export interface CoachConfig {
    subdomain: string;
    firstName: string;
    lastName: string;
    businessName: string;
    sport: string;
    paletteId: PaletteId;
    heroBusinessNameFontClass: CoachNameFontClass;
    heroTagline: string;
    heroMediaType: 'image' | 'video';
    heroMediaUrl: string;
    heroPrimaryButtonLabel: string;
    heroPrimaryButtonSubtext?: string;
    heroPrimaryButtonTarget: 'offerings' | 'contact' | 'custom';
    heroPrimaryButtonHref?: string;

    offeringsSectionTitle: string;
    offerings: CoachOfferingConfig[];

    about: CoachAboutConfig;

    testimonialsTitle: string;
    testimonials: CoachTestimonialConfig[];

    eventsTitle: string;
    events: CoachEventConfig[];
}

// ───────── Sample  config ─────────

export const sampleConfig: CoachConfig = {
    subdomain: 'derek',
    firstName: "Derek",
    lastName: "Smith",
    businessName: 'Derek Sedona Pickleball',
    sport: 'Pickleball',
    paletteId: 'darkBlue', // lightSand, lightMint, lightGray, darkGray, darkBlue, sunset, classic
    heroBusinessNameFontClass: 'coach-hero-font-ultra',
    heroTagline:
        'Level up your pickleball game in 4 weeks — without burning out or getting injured.',
    heroMediaType: 'video',
    heroMediaUrl: '/videos/pickleball03.mov',
    heroPrimaryButtonLabel: 'Set up a Consultation',
    heroPrimaryButtonSubtext: 'Choose from Private lessons, group classes, and clinics in Sedona.',
    heroPrimaryButtonTarget: 'offerings',

    offeringsSectionTitle: 'Lesson formats that fit your needs',
    offerings: [
        {
            id: 'private-lessons',
            type: 'PRIVATE_LESSON',
            title: 'Private Lessons',
            description:
                'One-on-one coaching focused entirely on your goals: consistency, strategy, or moving up a rating level.',
            imageUrl: '/images/coaches/derek/lesson.jpeg',
            levels: ['Beginner', 'Intermediate', 'Advanced'],
            priceFrom: 'From $75 / 60 min',
            ctaLabel: 'Schedule a private lesson',
            ctaHref: '#contact', // later → /privatelessons
        },
        {
            id: 'group-classes',
            type: 'GROUP_CLASS',
            title: 'Group Classes',
            description:
                'Small group sessions focused on drilling, footwork, and point play with players at your level.',
            imageUrl: '/images/coaches/derek/group.jpeg',
            levels: ['Beginner', 'Intermediate'],
            priceFrom: 'From $40 / player',
            ctaLabel: 'Join a group class',
            ctaHref: '#events', // later → /groupclasses
        },
        {
            id: 'clinics',
            type: 'CLINIC',
            title: 'Specialty Clinics',
            description:
                'Deep dives on dinking, third shots, and net play in focused multi-hour clinics.',
            imageUrl: '/images/coaches/derek/clinic.jpeg',
            levels: ['All levels'],
            priceFrom: 'From $95 / clinic',
            ctaLabel: 'See upcoming clinics',
            ctaHref: '#events',
        },
    ],

    about: {
        photoUrl: '/images/coaches/derek/profile.jpeg',
        name: 'Derek Smith',
        location: 'Sedona, Arizona',
        certifications: [
            'Example: IPTPA Certified Coach',
            '10+ years coaching experience',
        ],
        bio: `Derek pro tennis background helps players build a durable, confident game they can rely on in tournaments and rec play. His sessions blend technical work, movement, and decision-making so you leave each lesson knowing exactly what to practice.`,
        philosophy:
            'You should leave every session knowing one thing to stop doing, one thing to start doing, and one thing to keep doing.',
    },

    testimonialsTitle: 'Players who’ve trained with Derek',
    testimonials: [
        {
            id: 't1',
            quote:
                'I went from hoping I’d win points to actually having a plan for every serve and return. I finally feel like I know what I’m doing out there.',
            name: 'Sarah M.',
            detail: 'Recreational player, Sedona',
        },
        {
            id: 't2',
            quote:
                'Derek breaks things down in a way that makes sense. My third shot and dinking game are night and day.',
            name: 'James R.',
            detail: '3.0 → 3.5 player',
        },
    ],

    eventsTitle: 'Upcoming sessions & clinics',
    events: [
        {
            id: 'event1',
            title: 'Dinking & Soft Game Clinic',
            dateLabel: 'Saturday, Jan 18 • 9:00–11:30 AM',
            type: 'CLINIC',
            location: 'Sedona Community Courts',
            spotsLeft: 3,
            totalSpots: 8,
            ctaLabel: 'Reserve a spot',
            ctaHref: '#contact',
        },
        {
            id: 'event2',
            title: 'Beginner Group Class Cycle',
            dateLabel: 'Tuesdays in February • 5:00–6:15 PM',
            type: 'GROUP_CLASS',
            location: 'Village Courts',
            spotsLeft: 5,
            totalSpots: 10,
            ctaLabel: 'Join the waitlist',
            ctaHref: '#contact',
        },
    ],
};

// What the page actually consumes
export interface CoachPageModel extends CoachConfig {
    palette: PaletteClasses;
}

type CoachWithRelations = any;

function mapCoachRecordToConfig(coach: CoachWithRelations): CoachConfig {
    return {
        subdomain: coach.subdomain,
        firstName: coach.firstName,
        lastName: coach.lastName,
        businessName: coach.businessName,
        sport: coach.sport,
        paletteId: coach.paletteId as PaletteId,

        heroBusinessNameFontClass:
            coach.heroBusinessNameFontClass as CoachNameFontClass,
        heroTagline: coach.heroTagline,
        heroMediaType: coach.heroMediaType as 'image' | 'video',
        heroMediaUrl: coach.heroMediaUrl,
        heroPrimaryButtonLabel: coach.heroPrimaryButtonLabel,
        heroPrimaryButtonSubtext: coach.heroPrimaryButtonSubtext ?? undefined,
        heroPrimaryButtonTarget: coach.heroPrimaryButtonTarget as
            | 'offerings'
            | 'contact'
            | 'custom',
        heroPrimaryButtonHref: coach.heroPrimaryButtonHref ?? undefined,

        offeringsSectionTitle: coach.offeringsSectionTitle,
        offerings: coach.offerings.map((o: any) => ({
            id: o.slug, // DB slug -> config id
            type: o.type as CoachOfferingType,
            title: o.title,
            description: o.description,
            imageUrl: o.imageUrl,
            levels: (o.levels ?? []) as CoachLevel[],
            priceFrom: o.priceFrom ?? undefined,
            ctaLabel: o.ctaLabel,
            ctaHref: o.ctaHref,
        })),

        about: {
            photoUrl: coach.aboutPhotoUrl,
            name: coach.aboutName,
            location: coach.aboutLocation,
            certifications: coach.aboutCertifications ?? [],
            bio: coach.aboutBio,
            philosophy: coach.aboutPhilosophy ?? undefined,
        },

        testimonialsTitle: coach.testimonialsTitle,
        testimonials: coach.testimonials.map((t: any) => ({
            id: t.id, // use DB id now
            quote: t.quote,
            name: t.name,
            detail: t.detail ?? undefined,
        })),

        eventsTitle: coach.eventsTitle,
        events: coach.events.map((e: any) => ({
            id: e.id, // use DB id now
            title: e.title,
            dateLabel: e.dateLabel,
            type: e.type as CoachOfferingType,
            location: e.location,
            spotsLeft: e.spotsLeft ?? undefined,
            totalSpots: e.totalSpots ?? undefined,
            ctaLabel: e.ctaLabel,
            ctaHref: e.ctaHref,
        })),
    };
}

export async function getCoachPageModelBySubdomain(
    subdomain: string,
): Promise<CoachPageModel | null> {
    const coach = await prisma.coach.findUnique({
        where: { subdomain },
        include: {
            offerings: true,
            testimonials: true,
            events: true,
        },
    });

    if (!coach) return null;

    const config = mapCoachRecordToConfig(coach as CoachWithRelations);
    const palette = getPaletteById(config.paletteId);

    return {
        ...config,
        palette,
    };
}

