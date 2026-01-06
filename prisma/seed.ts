// prisma/seed.ts
import 'dotenv/config';
import { prisma } from '../lib/prisma';
import { sampleConfig } from '../lib/coachConfig';

async function upsertCoach(config: any) {
  const coach = await prisma.coach.upsert({
    where: { subdomain: config.subdomain },
    update: {
      firstName: config.firstName,
      lastName: config.lastName,
      businessName: config.businessName,
      sport: config.sport,
      paletteId: config.paletteId,
      heroBusinessNameFontClass: config.heroBusinessNameFontClass,
      heroTagline: config.heroTagline,
      heroMediaType: config.heroMediaType,
      heroMediaUrl: config.heroMediaUrl,
      heroPrimaryButtonLabel: config.heroPrimaryButtonLabel,
      heroPrimaryButtonSubtext: config.heroPrimaryButtonSubtext,
      heroPrimaryButtonTarget: config.heroPrimaryButtonTarget,
      heroPrimaryButtonHref: config.heroPrimaryButtonHref,
      offeringsSectionTitle: config.offeringsSectionTitle,
      testimonialsTitle: config.testimonialsTitle,
      eventsTitle: config.eventsTitle,
      aboutPhotoUrl: config.about.photoUrl,
      aboutLocation: config.about.location,
      aboutBio: config.about.bio,
      aboutPhilosophy: config.about.philosophy,
      aboutCertifications: config.about.certifications
    },
    create: {
      subdomain: config.subdomain,
      firstName: config.firstName,
      lastName: config.lastName,
      businessName: config.businessName,
      sport: config.sport,
      paletteId: config.paletteId,
      heroBusinessNameFontClass: config.heroBusinessNameFontClass,
      heroTagline: config.heroTagline,
      heroMediaType: config.heroMediaType,
      heroMediaUrl: config.heroMediaUrl,
      heroPrimaryButtonLabel: config.heroPrimaryButtonLabel,
      heroPrimaryButtonSubtext: config.heroPrimaryButtonSubtext,
      heroPrimaryButtonTarget: config.heroPrimaryButtonTarget,
      heroPrimaryButtonHref: config.heroPrimaryButtonHref,
      offeringsSectionTitle: config.offeringsSectionTitle,
      testimonialsTitle: config.testimonialsTitle,
      eventsTitle: config.eventsTitle,
      aboutPhotoUrl: config.about.photoUrl,
      aboutLocation: config.about.location,
      aboutBio: config.about.bio,
      aboutPhilosophy: config.about.philosophy,
      aboutCertifications: config.about.certifications
    },
  });

  // Clear children for idempotent seed
  await prisma.coachOffering.deleteMany({ where: { coachId: coach.id } });
  await prisma.testimonial.deleteMany({ where: { coachId: coach.id } });
  await prisma.event.deleteMany({ where: { coachId: coach.id } });

  // Offerings
  for (const o of config.offerings) {
    await prisma.coachOffering.create({
      data: {
        coachId: coach.id,
        type: o.type,
        enabled: true,
        title: o.title,
        subtitle: null,
        description: o.description,
        imageUrl: o.imageUrl,
        priceDisplay: o.priceFrom ?? null,
        configJson: {
          id: o.id,
          levels: o.levels ?? [],
          ctaLabel: o.ctaLabel,
          ctaHref: o.ctaHref,
          priceFrom: o.priceFrom ?? null,
        },
      },
    });
  }

  // Testimonials
  for (const t of config.testimonials) {
    await prisma.testimonial.create({
      data: {
        coachId: coach.id,
        quote: t.quote,
        name: t.name,
        detail: t.detail ?? null,
      },
    });
  }

  // Events
  for (const e of config.events) {
    await prisma.event.create({
      data: {
        coachId: coach.id,
        title: e.title,
        dateLabel: e.dateLabel,
        type: e.type,
        location: e.location,
        spotsLeft: e.spotsLeft ?? null,
        totalSpots: e.totalSpots ?? null,
        ctaLabel: e.ctaLabel,
        ctaHref: e.ctaHref,
      },
    });
  }

  return coach;
}

async function main() {
  console.log('🌱 Seeding CoachSite…');

  await upsertCoach(sampleConfig);

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
