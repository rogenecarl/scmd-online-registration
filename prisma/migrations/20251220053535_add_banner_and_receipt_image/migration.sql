/*
  Warnings:

  - You are about to drop the column `logo` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "logo",
ADD COLUMN     "banner" TEXT;

-- AlterTable
ALTER TABLE "registration" ADD COLUMN     "receipt_image" TEXT;
