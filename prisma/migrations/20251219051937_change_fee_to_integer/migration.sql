/*
  Warnings:

  - You are about to alter the column `pre_registration_fee` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `onsite_registration_fee` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - You are about to alter the column `cook_registration_fee` on the `event` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "event" ALTER COLUMN "pre_registration_fee" SET DATA TYPE INTEGER,
ALTER COLUMN "onsite_registration_fee" SET DATA TYPE INTEGER,
ALTER COLUMN "cook_registration_fee" SET DATA TYPE INTEGER;
