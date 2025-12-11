// prisma/seed.ts
import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { sampleConfig } from '../lib/coachConfig';
import type {
  CoachConfig,
  CoachOfferingConfig,
  CoachTestimonialConfig,
  CoachEventConfig,
} from '../lib/coachConfig';

function getCoachDataFromConfig(config: CoachConfig) {
  return {
    subdomain: config.subdomain,
    firstName: config.firstName,
    lastName: config.lastName,
    businessName: config.businessName,
    sport: config.sport,
    paletteId: config.paletteId,

    // Hero (flattened in DB)
     heroBusinessNameFontClass: config.heroBusinessNameFontClass,
    heroTagline: config.heroTagline,
    heroMediaType: config.heroMediaType,
    heroMediaUrl: config.heroMediaUrl,
    heroPrimaryButtonLabel: config.heroPrimaryButtonLabel,
    heroPrimaryButtonSubtext: config.heroPrimaryButtonSubtext ?? null,
    heroPrimaryButtonTarget: config.heroPrimaryButtonTarget,
    heroPrimaryButtonHref: config.heroPrimaryButtonHref ?? null,

    // Section titles
    offeringsSectionTitle: config.offeringsSectionTitle,
    testimonialsTitle: config.testimonialsTitle,
    eventsTitle: config.eventsTitle,

    // About (flattened in DB)
    aboutPhotoUrl: config.about.photoUrl,
    aboutLocation: config.about.location,
    aboutBio: config.about.bio,
    aboutPhilosophy: config.about.philosophy ?? null,
    aboutCertifications: config.about.certifications ?? [],
  };
}

async function upsertCoachFromConfig(config: CoachConfig) {
  const coachData = getCoachDataFromConfig(config);

  // Upsert coach by subdomain
  const coach = await prisma.coach.upsert({
    where: { subdomain: config.subdomain },
    update: coachData,
    create: coachData,
  });

  // Clear child records so seed is idempotent
  await prisma.offering.deleteMany({ where: { coachId: coach.id } });
  await prisma.testimonial.deleteMany({ where: { coachId: coach.id } });
  await prisma.event.deleteMany({ where: { coachId: coach.id } });

  // Offerings
  const offerings: CoachOfferingConfig[] = config.offerings ?? [];
  if (offerings.length) {
    await prisma.offering.createMany({
      data: offerings.map((o) => ({
        coachId: coach.id,
        slug: o.id, // config.id -> slug
        type: o.type,
        title: o.title,
        description: o.description,
        imageUrl: o.imageUrl,
        levels: o.levels ?? [],
        priceFrom: o.priceFrom ?? null,
        ctaLabel: o.ctaLabel,
        ctaHref: o.ctaHref,
      })),
    });
  }

  // Testimonials
  const testimonials: CoachTestimonialConfig[] = config.testimonials ?? [];
  if (testimonials.length) {
    await prisma.testimonial.createMany({
      data: testimonials.map((t) => ({
        coachId: coach.id,
        // We ignore t.id for now; DB generates its own id
        quote: t.quote,
        name: t.name,
        detail: t.detail ?? null,
      })),
    });
  }

  // Events
  const events: CoachEventConfig[] = config.events ?? [];
  if (events.length) {
    await prisma.event.createMany({
      data: events.map((e) => ({
        coachId: coach.id,
        // We ignore e.id for now; DB generates its own id
        title: e.title,
        dateLabel: e.dateLabel,
        type: e.type,
        location: e.location,
        spotsLeft: e.spotsLeft ?? null,
        totalSpots: e.totalSpots ?? null,
        ctaLabel: e.ctaLabel,
        ctaHref: e.ctaHref,
      })),
    });
  }

  return coach;
}

async function main() {
  console.log('🌱 Seeding CoachSite database...');

  await upsertCoachFromConfig(sampleConfig);

  console.log('✅ Seed complete');
}

main()
  .catch((err) => {
    console.error('❌ Seed failed', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
