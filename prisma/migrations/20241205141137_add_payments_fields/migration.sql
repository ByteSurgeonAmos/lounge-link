/*
  Warnings:

  - A unique constraint covering the columns `[paystackSubscriptionCode]` on the table `Subscription` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "nextPaymentDate" TIMESTAMP(3),
ADD COLUMN     "paystackSubscriptionCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_paystackSubscriptionCode_key" ON "Subscription"("paystackSubscriptionCode");
