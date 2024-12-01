/*
  Warnings:

  - Added the required column `date` to the `LiveLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collaboration" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "LiveLink" ADD COLUMN     "date" TIMESTAMPTZ NOT NULL;
