/*
  Warnings:

  - You are about to drop the column `email` on the `coordinator` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `coordinator` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `pastor` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `pastor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "coordinator" DROP COLUMN "email",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "pastor" DROP COLUMN "email",
DROP COLUMN "phone";
