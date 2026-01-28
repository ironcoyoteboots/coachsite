// lib/coachConfig.ts

import {
  PaletteId,
  PaletteClasses,
  getPaletteById,
} from "./colorPalettes";
import { prisma } from "./prisma";
import type { CoachNameFontClass } from "./coachFonts";
import type { OfferingType } from "@prisma/client";
import { OFFERING_TYPE_LABELS } from "./displayNames";

// ───────── Types ─────────

export interface CoachOfferingConfig {
  // Derived from CoachOffering row + configJson
  id: string;                      // UI id/slug, derived from configJson.id or type
  type: OfferingType;
  enabled: boolean;

  // Core public “card” fields (match schema)
  title?: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  priceDisplay?: string;

  // Everything else (schedule, CTA, levels, etc.) lives here
  config?: Record<string, any>;
}

export interface CoachAboutConfig {
  photoUrl: string;
  location: string;
  certifications: string;          // 🔹 single string, matches schema
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
  type: OfferingType;
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
  status: string;

  heroBusinessNameFontClass: CoachNameFontClass;
  heroTagline: string;
  heroMediaType: "image" | "video";
  heroMediaUrl: string;
  heroPrimaryButtonLabel: string;
  heroPrimaryButtonSubtext?: string;
  heroPrimaryButtonTarget: "offerings" | "contact" | "custom";
  heroPrimaryButtonHref?: string;

  offeringsSectionTitle: string;

  // 🔹 match relation name: coachOfferings
  coachOfferings: CoachOfferingConfig[];

  about: CoachAboutConfig;

  testimonialsTitle: string;
  testimonials: CoachTestimonialConfig[];

  eventsTitle: string;
  events: CoachEventConfig[];

  createdDate: Date;
  modifiedDate: Date;
  statusChangeDate: Date;
}

export interface CoachPageModel extends CoachConfig {
  palette: PaletteClasses;
}

export function getOfferingTypeLabel(type: OfferingType): string {
  return OFFERING_TYPE_LABELS[type];
}

// ───────── Sample Config (UI-level, for seeding) ─────────

export const sampleConfig: CoachConfig = {
  subdomain: "derek",
  firstName: "Derek",
  lastName: "Smith",
  businessName: "Derek Sedona Pickleball",
  sport: "Pickleball",
  paletteId: "darkBlue",
  heroBusinessNameFontClass: "coach-hero-font-ultra",
  heroTagline:
    "Level up your pickleball game in 4 weeks — without burning out or getting injured.",
  heroMediaType: "video",
  heroMediaUrl: "/videos/pickleball03.mov",
  heroPrimaryButtonLabel: "Set up a Consultation",
  heroPrimaryButtonSubtext:
    "Choose from Private lessons, group classes, and clinics in Sedona.",
  heroPrimaryButtonTarget: "offerings",

  offeringsSectionTitle: "Lesson formats that fit your needs",

  status: "ACTIVE",
  createdDate: new Date(),
  modifiedDate: new Date(),
  statusChangeDate: new Date(),

  coachOfferings: [
    {
      id: "private-lessons",
      type: "PRIVATE_LESSON",
      enabled: true,
      title: "Private Lessons",
      subtitle: "1-on-1 coaching",
      description:
        "One-on-one coaching focused entirely on your goals: consistency, strategy, or moving up a rating level.",
      imageUrl: "/images/coaches/derek/lesson.jpeg",
      priceDisplay: "From $75 / 60 min",
      config: {
        // optional: this will go into configJson
        // ctaLabel: "Schedule a private lesson",
        // ctaHref: "#contact",
      },
    },
    {
      id: "group-classes",
      type: "GROUP_CLASS",
      enabled: true,
      title: "Group Classes",
      subtitle: "Small group sessions",
      description:
        "Small group sessions focused on drilling, footwork, and point play with players at your level.",
      imageUrl: "/images/coaches/derek/group.jpeg",
      priceDisplay: "From $40 / player",
      config: {},
    },
    {
      id: "clinics",
      type: "CLINIC",
      enabled: true,
      title: "Specialty Clinics",
      subtitle: "Deep-dive clinics",
      description:
        "Deep dives on dinking, third shots, and net play in focused multi-hour clinics.",
      imageUrl: "/images/coaches/derek/clinic.jpeg",
      priceDisplay: "From $95 / clinic",
      config: {},
    },
  ],

  about: {
    photoUrl: "/images/coaches/derek/profile.jpeg",
    location: "Sedona, Arizona",
    certifications:
      "Example: IPTPA Certified Coach; 10+ years coaching experience",
    bio: `Derek’s pro tennis background helps players build a durable, confident game.`,
    philosophy:
      "Leave every session knowing one thing to stop, one thing to start, one thing to keep.",
  },

  testimonialsTitle: "Players who’ve trained with Derek",
  testimonials: [
    {
      id: "t1",
      quote: "I finally feel like I know what I am doing out there.",
      name: "Sarah M.",
      detail: "Recreational player, Sedona",
    },
    {
      id: "t2",
      quote: "My third shot and dinking game are night and day.",
      name: "James R.",
      detail: "3.0 → 3.5 player",
    },
  ],

  eventsTitle: "Upcoming sessions & clinics",
  events: [
    {
      id: "event1",
      title: "Dinking & Soft Game Clinic",
      dateLabel: "Saturday, Jan 18 • 9:00–11:30 AM",
      type: "CLINIC",
      location: "Sedona Community Courts",
      spotsLeft: 3,
      totalSpots: 8,
      ctaLabel: "Reserve a spot",
      ctaHref: "#contact",
    },
    {
      id: "event2",
      title: "Beginner Group Class Cycle",
      dateLabel: "Tuesdays in February • 5:00–6:15 PM",
      type: "GROUP_CLASS",
      location: "Village Courts",
      spotsLeft: 5,
      totalSpots: 10,
      ctaLabel: "Join the waitlist",
      ctaHref: "#contact",
    },
  ],
};

// ───────── Helpers / Mapping ─────────

function parseOfferingConfig(raw: any): Record<string, any> {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(String(raw));
  } catch {
    return {};
  }
}

export function mapCoachRecordToConfig(coach: any): CoachConfig {
  return {
    subdomain: coach.subdomain,
    firstName: coach.firstName,
    lastName: coach.lastName,
    businessName: coach.businessName,
    sport: coach.sport,
    paletteId: coach.paletteId as PaletteId,

    status: coach.status,
    createdDate: coach.createdDate,
    modifiedDate: coach.modifiedDate,
    statusChangeDate: coach.statusChangeDate,

    heroBusinessNameFontClass: coach.heroBusinessNameFontClass,
    heroTagline: coach.heroTagline,
    heroMediaType: coach.heroMediaType,
    heroMediaUrl: coach.heroMediaUrl,
    heroPrimaryButtonLabel: coach.heroPrimaryButtonLabel,
    heroPrimaryButtonSubtext: coach.heroPrimaryButtonSubtext ?? undefined,
    heroPrimaryButtonTarget: coach.heroPrimaryButtonTarget,
    heroPrimaryButtonHref: coach.heroPrimaryButtonHref ?? undefined,

    offeringsSectionTitle: coach.offeringsSectionTitle,

    // 🔹 Coach → CoachOffering[] (matches your schema)
    coachOfferings: (coach.coachOfferings ?? []).map((o: any) => {
      const cfg = parseOfferingConfig(o.configJson);

      return {
        id: cfg.id ?? o.type.toLowerCase(), // fall back to type if no id in configJson
        type: o.type as OfferingType,
        enabled: o.enabled,
        title: o.title ?? undefined,
        subtitle: o.subtitle ?? undefined,
        description: o.description ?? undefined,
        imageUrl: o.imageUrl ?? undefined,
        priceDisplay: o.priceDisplay ?? undefined,
        config: cfg,
      };
    }),

    about: {
      photoUrl: coach.aboutPhotoUrl,
      location: coach.aboutLocation,
      certifications: coach.aboutCertifications ?? "",
      bio: coach.aboutBio,
      philosophy: coach.aboutPhilosophy ?? undefined,
    },

    testimonialsTitle: coach.testimonialsTitle,
    testimonials: coach.testimonials.map((t: any) => ({
      id: t.id,
      quote: t.quote,
      name: t.name,
      detail: t.detail ?? undefined,
    })),

    eventsTitle: coach.eventsTitle,
    events: coach.events.map((e: any) => ({
      id: e.id,
      title: e.title,
      dateLabel: e.dateLabel,
      type: e.type as OfferingType,
      location: e.location,
      spotsLeft: e.spotsLeft ?? undefined,
      totalSpots: e.totalSpots ?? undefined,
      ctaLabel: e.ctaLabel,
      ctaHref: e.ctaHref,
    })),
  };
}

export async function getCoachPageModelBySubdomain(
  subdomain: string
): Promise<CoachPageModel | null> {
  const coach = await prisma.coach.findUnique({
    where: { subdomain },
    include: {
      coachOfferings: true,  // 🔹 must exist on Coach
      testimonials: true,
      events: true,
    },
  });

  if (!coach) return null;

  return {
    ...mapCoachRecordToConfig(coach),
    palette: getPaletteById(coach.paletteId as PaletteId),
  };
}
