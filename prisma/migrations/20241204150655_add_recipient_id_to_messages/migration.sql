/*
  Warnings:

  - Added the required column `recipientId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "recipientId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Message_recipientId_idx" ON "Message"("recipientId");
