/*
  Warnings:

  - The values [BASIC,ENTERPRISE] on the enum `SubscriptionTier` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[paystackRef]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- AlterEnum
BEGIN;
CREATE TYPE "SubscriptionTier_new" AS ENUM ('FREE', 'PRO');
ALTER TABLE "User" ALTER COLUMN "subscriptionTier" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "subscriptionTier" TYPE "SubscriptionTier_new" USING ("subscriptionTier"::text::"SubscriptionTier_new");
ALTER TABLE "Subscription" ALTER COLUMN "tier" TYPE "SubscriptionTier_new" USING ("tier"::text::"SubscriptionTier_new");
ALTER TYPE "SubscriptionTier" RENAME TO "SubscriptionTier_old";
ALTER TYPE "SubscriptionTier_new" RENAME TO "SubscriptionTier";
DROP TYPE "SubscriptionTier_old";
ALTER TABLE "User" ALTER COLUMN "subscriptionTier" SET DEFAULT 'FREE';
COMMIT;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "paystackRef" TEXT;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" "PaymentStatus" NOT NULL,
    "reference" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_reference_key" ON "Transaction"("reference");

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_paystackRef_key" ON "Subscription"("paystackRef");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
