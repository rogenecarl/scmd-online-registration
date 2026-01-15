/*
  Warnings:

  - You are about to drop the column `registration_id` on the `cook` table. All the data in the column will be lost.
  - You are about to drop the column `registration_id` on the `delegate` table. All the data in the column will be lost.
  - You are about to drop the column `cook_fee_per_person` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `delegate_fee_per_person` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `is_pre_registration` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `receipt_image` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed_at` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `reviewed_by` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `registration` table. All the data in the column will be lost.
  - You are about to drop the column `total_fee` on the `registration` table. All the data in the column will be lost.
  - Added the required column `batch_id` to the `cook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `batch_id` to the `delegate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cook" DROP CONSTRAINT "cook_registration_id_fkey";

-- DropForeignKey
ALTER TABLE "delegate" DROP CONSTRAINT "delegate_registration_id_fkey";

-- DropForeignKey
ALTER TABLE "registration" DROP CONSTRAINT "registration_reviewed_by_fkey";

-- DropIndex
DROP INDEX "cook_registration_id_idx";

-- DropIndex
DROP INDEX "delegate_registration_id_idx";

-- DropIndex
DROP INDEX "registration_status_idx";

-- AlterTable
ALTER TABLE "cook" DROP COLUMN "registration_id",
ADD COLUMN     "batch_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "delegate" DROP COLUMN "registration_id",
ADD COLUMN     "batch_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "registration" DROP COLUMN "cook_fee_per_person",
DROP COLUMN "delegate_fee_per_person",
DROP COLUMN "is_pre_registration",
DROP COLUMN "receipt_image",
DROP COLUMN "remarks",
DROP COLUMN "reviewed_at",
DROP COLUMN "reviewed_by",
DROP COLUMN "status",
DROP COLUMN "total_fee";

-- CreateTable
CREATE TABLE "registration_batch" (
    "id" TEXT NOT NULL,
    "registration_id" TEXT NOT NULL,
    "batch_number" INTEGER NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "receipt_image" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "reviewed_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "total_fee" INTEGER NOT NULL DEFAULT 0,
    "delegate_fee_per_person" INTEGER NOT NULL DEFAULT 0,
    "cook_fee_per_person" INTEGER NOT NULL DEFAULT 0,
    "is_pre_registration" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "registration_batch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "registration_batch_registration_id_idx" ON "registration_batch"("registration_id");

-- CreateIndex
CREATE INDEX "registration_batch_status_idx" ON "registration_batch"("status");

-- CreateIndex
CREATE INDEX "cook_batch_id_idx" ON "cook"("batch_id");

-- CreateIndex
CREATE INDEX "delegate_batch_id_idx" ON "delegate"("batch_id");

-- AddForeignKey
ALTER TABLE "registration_batch" ADD CONSTRAINT "registration_batch_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_batch" ADD CONSTRAINT "registration_batch_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delegate" ADD CONSTRAINT "delegate_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "registration_batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cook" ADD CONSTRAINT "cook_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "registration_batch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
