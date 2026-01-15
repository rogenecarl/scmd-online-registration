-- AlterTable
ALTER TABLE "event" ADD COLUMN     "onsite_sibling_discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "pre_registration_sibling_discount" INTEGER NOT NULL DEFAULT 0;
