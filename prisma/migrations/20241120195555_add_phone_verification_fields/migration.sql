/*
  Warnings:

  - A unique constraint covering the columns `[phoneOtp]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneOtp" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneOtp_key" ON "User"("phoneOtp");
