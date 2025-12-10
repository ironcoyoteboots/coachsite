-- CreateTable
CREATE TABLE "Coach" (
    "id" TEXT NOT NULL,
    "subdomain" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "paletteId" TEXT NOT NULL,
    "heroBusinessNameFontClass" TEXT NOT NULL,
    "heroTagline" TEXT NOT NULL,
    "heroMediaType" TEXT NOT NULL,
    "heroMediaUrl" TEXT NOT NULL,
    "heroPrimaryButtonLabel" TEXT NOT NULL,
    "heroPrimaryButtonSubtext" TEXT,
    "heroPrimaryButtonTarget" TEXT NOT NULL,
    "heroPrimaryButtonHref" TEXT,
    "offeringsSectionTitle" TEXT NOT NULL,
    "testimonialsTitle" TEXT NOT NULL,
    "eventsTitle" TEXT NOT NULL,
    "aboutPhotoUrl" TEXT NOT NULL,
    "aboutName" TEXT NOT NULL,
    "aboutLocation" TEXT NOT NULL,
    "aboutBio" TEXT NOT NULL,
    "aboutPhilosophy" TEXT,
    "aboutCertifications" TEXT[],

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offering" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "levels" TEXT[],
    "priceFrom" TEXT,
    "ctaLabel" TEXT NOT NULL,
    "ctaHref" TEXT NOT NULL,

    CONSTRAINT "Offering_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "detail" TEXT,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dateLabel" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "spotsLeft" INTEGER,
    "totalSpots" INTEGER,
    "ctaLabel" TEXT NOT NULL,
    "ctaHref" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coach_subdomain_key" ON "Coach"("subdomain");

-- CreateIndex
CREATE INDEX "Coach_subdomain_idx" ON "Coach"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "Offering_slug_key" ON "Offering"("slug");

-- AddForeignKey
ALTER TABLE "Offering" ADD CONSTRAINT "Offering_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
