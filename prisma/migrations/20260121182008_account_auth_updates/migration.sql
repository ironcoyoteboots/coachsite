/*
  Warnings:

  - You are about to drop the column `ownerAccountId` on the `Coach` table. All the data in the column will be lost.
  - Made the column `authUserId` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_ownerAccountId_fkey";

-- DropIndex
DROP INDEX "Coach_ownerAccountId_idx";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "authUserId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Coach" DROP COLUMN "ownerAccountId",
ADD COLUMN     "accountId" TEXT;

-- CreateIndex
CREATE INDEX "Coach_accountId_idx" ON "Coach"("accountId");

-- AddForeignKey
ALTER TABLE "Coach" ADD CONSTRAINT "Coach_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
