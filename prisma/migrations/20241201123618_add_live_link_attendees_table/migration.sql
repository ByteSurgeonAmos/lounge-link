/*
  Warnings:

  - You are about to drop the column `date` on the `LiveLink` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `LiveLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `LiveLink` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AttendeeStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DECLINED');

-- AlterTable
ALTER TABLE "LiveLink" DROP COLUMN "date",
ADD COLUMN     "endDate" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "startDate" TIMESTAMPTZ NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "LiveLinkAttendee" (
    "id" TEXT NOT NULL,
    "liveLinkId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "AttendeeStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiveLinkAttendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LiveLinkAttendee_liveLinkId_userId_key" ON "LiveLinkAttendee"("liveLinkId", "userId");

-- CreateIndex
CREATE INDEX "LiveLink_authorId_idx" ON "LiveLink"("authorId");

-- CreateIndex
CREATE INDEX "LiveLink_startDate_idx" ON "LiveLink"("startDate");

-- AddForeignKey
ALTER TABLE "LiveLinkAttendee" ADD CONSTRAINT "LiveLinkAttendee_liveLinkId_fkey" FOREIGN KEY ("liveLinkId") REFERENCES "LiveLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveLinkAttendee" ADD CONSTRAINT "LiveLinkAttendee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
