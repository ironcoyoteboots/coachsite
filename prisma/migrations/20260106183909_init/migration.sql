-- CreateEnum
CREATE TYPE "CoachStatus" AS ENUM ('ACTIVE', 'PENDING', 'INACTIVE');

-- CreateEnum
CREATE TYPE "OfferingType" AS ENUM ('PRIVATE_LESSON', 'GROUP_CLASS', 'CLINIC', 'RETREAT');

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
    "aboutLocation" TEXT NOT NULL,
    "aboutBio" TEXT NOT NULL,
    "aboutPhilosophy" TEXT,
    "aboutCertifications" TEXT,
    "status" "CoachStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusChangeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coach_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachOffering" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "type" "OfferingType" NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT,
    "subtitle" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "priceDisplay" TEXT,
    "configJson" JSONB,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoachOffering_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "CoachOffering_coachId_type_key" ON "CoachOffering"("coachId", "type");

-- AddForeignKey
ALTER TABLE "CoachOffering" ADD CONSTRAINT "CoachOffering_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;
