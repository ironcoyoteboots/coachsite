// lib/coachConfig.ts

// ───────── Palette + font types ─────────

import {
  PaletteId,
  PaletteClasses,
  getPaletteById,
} from './colorPalettes';


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

export interface CoachHeroConfig {
  businessName: string;
  tagline: string;
  heroMediaType: 'image' | 'video';
  heroMediaUrl: string;
  primaryButtonLabel: string;
  primaryButtonSubtext?: string;
  primaryButtonTarget: 'offerings' | 'contact' | 'custom';
  primaryButtonHref?: string;
}

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
  sport: string;
  paletteId: PaletteId;
  heroNameFontClass: CoachNameFontClass;
  hero: CoachHeroConfig;

  offeringsSectionTitle: string;
  offerings: CoachOfferingConfig[];

  about: CoachAboutConfig;

  testimonialsTitle: string;
  testimonials: CoachTestimonialConfig[];

  eventsTitle: string;
  events: CoachEventConfig[];
}

// ───────── Sample "nick" config ─────────

const nickConfig: CoachConfig = {
  subdomain: 'nick',
  firstName: "Nick",
  lastName: "Parsons",
  sport: 'Pickleball',
  paletteId: 'lightSand', // lightSand, lightMint, lightGray, darkGray, darkBlue
  heroNameFontClass: 'coach-hero-font-ultra', // one of your 4 font optionsheroNameFontClass: 
  hero: {
    businessName: 'Nick Parsons Pickleball Coaching',
    tagline:
      'Level up your pickleball game in 4 weeks — without burning out or getting injured.',
    heroMediaType: 'video', // or 'image'
    heroMediaUrl: '/videos/hero2.mp4', // reuse your home hero for now
    primaryButtonLabel: 'View lesson options',
    primaryButtonSubtext:
      'Private lessons, group classes, and clinics in Sedona.',
    primaryButtonTarget: 'offerings',
  },

  offeringsSectionTitle: 'Lesson formats that fit your game',
  offerings: [
    {
      id: 'private-lessons',
      type: 'PRIVATE_LESSON',
      title: 'Private Lessons',
      description:
        'One-on-one coaching focused entirely on your goals: consistency, strategy, or moving up a rating level.',
      imageUrl: '/images/sample/private-lesson.jpg',
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
      imageUrl: '/images/sample/group-class.jpg',
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
      imageUrl: '/images/sample/clinic.jpg',
      levels: ['All levels'],
      priceFrom: 'From $95 / clinic',
      ctaLabel: 'See upcoming clinics',
      ctaHref: '#events',
    },
  ],

  about: {
    photoUrl: '/images/sample/nick-coach-headshot.jpg',
    name: 'Nick Parsons',
    location: 'Sedona, Arizona',
    certifications: [
      'Example: IPTPA Certified Coach',
      '10+ years coaching experience',
    ],
    bio: `Nick helps adult players build a durable, confident game they can rely on in tournaments and rec play. His sessions blend technical work, movement, and decision-making so you leave each lesson knowing exactly what to practice.`,
    philosophy:
      'You should leave every session knowing one thing to stop doing, one thing to start doing, and one thing to keep doing.',
  },

  testimonialsTitle: 'Players who’ve trained with Nick',
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
        'Nick breaks things down in a way that makes sense. My third shot and dinking game are night and day.',
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

// Registry of configs (for now just nick)
const coachConfigs: Record<string, CoachConfig> = {
  nick: nickConfig,
};

// What the page actually consumes
export interface CoachPageModel extends CoachConfig {
  palette: PaletteClasses;
}

export async function getCoachPageModelBySubdomain(
  subdomain: string,
): Promise<CoachPageModel | null> {
  const base = coachConfigs[subdomain];
  if (!base) return null;

  const palette = getPaletteById(base.paletteId);

  return {
    ...base,
    palette,
  };
}
