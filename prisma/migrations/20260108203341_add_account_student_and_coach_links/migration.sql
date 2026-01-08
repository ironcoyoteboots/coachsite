-- CreateEnum
CREATE TYPE "StudentSkillLevel" AS ENUM ('BEGINNER', 'ADVANCED_BEGINNER', 'INTERMEDIATE', 'ADVANCED_INTERMEDIATE', 'ADVANCED', 'EXPERT', 'EXPERT_PRO');

-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "StudentRelationship" AS ENUM ('SELF', 'CHILD', 'SPOUSE', 'OTHER');

-- AlterTable
ALTER TABLE "Coach" ADD COLUMN     "ownerAccountId" TEXT;

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "zip" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "skillLevelStudent" "StudentSkillLevel",
    "skillLevelCoach" "StudentSkillLevel",
    "status" "StudentStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "guardianName" TEXT,
    "guardianPhone" TEXT,
    "guardianEmail" TEXT,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountStudent" (
    "accountId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT true,
    "relationship" "StudentRelationship" NOT NULL DEFAULT 'SELF',

    CONSTRAINT "AccountStudent_pkey" PRIMARY KEY ("accountId","studentId")
);

-- CreateIndex
CREATE INDEX "Student_coachId_idx" ON "Student"("coachId");

-- CreateIndex
CREATE INDEX "Student_lastName_idx" ON "Student"("lastName");

-- CreateIndex
CREATE INDEX "Student_status_idx" ON "Student"("status");

-- CreateIndex
CREATE INDEX "Student_email_idx" ON "Student"("email");

-- CreateIndex
CREATE INDEX "AccountStudent_studentId_idx" ON "AccountStudent"("studentId");

-- CreateIndex
CREATE INDEX "Coach_ownerAccountId_idx" ON "Coach"("ownerAccountId");

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_ownerAccountId_fkey" FOREIGN KEY ("ownerAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountStudent" ADD CONSTRAINT "AccountStudent_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountStudent" ADD CONSTRAINT "AccountStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
