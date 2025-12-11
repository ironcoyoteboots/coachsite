-- CreateEnum
CREATE TYPE "CoachStatus" AS ENUM ('ACTIVE', 'PENDING', 'INACTIVE');

-- AlterTable
ALTER TABLE "Coach" ADD COLUMN     "status" "CoachStatus" NOT NULL DEFAULT 'ACTIVE';
