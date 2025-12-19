/*
  Warnings:

  - The values [PROVIDER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('USER', 'ADMIN', 'PRESIDENT');
ALTER TABLE "public"."user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "church_id" TEXT;

-- CreateTable
CREATE TABLE "division" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "church" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "division_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "church_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "division_id" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coordinator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pastor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pastor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT NOT NULL,
    "logo" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "registration_deadline" TIMESTAMP(3) NOT NULL,
    "pre_registration_fee" DECIMAL(10,2) NOT NULL,
    "pre_registration_start" TIMESTAMP(3) NOT NULL,
    "pre_registration_end" TIMESTAMP(3) NOT NULL,
    "onsite_registration_fee" DECIMAL(10,2) NOT NULL,
    "cook_registration_fee" DECIMAL(10,2) NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'UPCOMING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "church_id" TEXT NOT NULL,
    "president_id" TEXT NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "reviewed_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delegate" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "nickname" TEXT,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "registration_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delegate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cook" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "nickname" TEXT,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "registration_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "division_name_key" ON "division"("name");

-- CreateIndex
CREATE UNIQUE INDEX "church_name_key" ON "church"("name");

-- CreateIndex
CREATE INDEX "church_division_id_idx" ON "church"("division_id");

-- CreateIndex
CREATE UNIQUE INDEX "coordinator_division_id_key" ON "coordinator"("division_id");

-- CreateIndex
CREATE UNIQUE INDEX "pastor_church_id_key" ON "pastor"("church_id");

-- CreateIndex
CREATE INDEX "event_status_idx" ON "event"("status");

-- CreateIndex
CREATE INDEX "event_start_date_idx" ON "event"("start_date");

-- CreateIndex
CREATE INDEX "registration_event_id_idx" ON "registration"("event_id");

-- CreateIndex
CREATE INDEX "registration_church_id_idx" ON "registration"("church_id");

-- CreateIndex
CREATE INDEX "registration_president_id_idx" ON "registration"("president_id");

-- CreateIndex
CREATE INDEX "registration_status_idx" ON "registration"("status");

-- CreateIndex
CREATE UNIQUE INDEX "registration_event_id_church_id_key" ON "registration"("event_id", "church_id");

-- CreateIndex
CREATE INDEX "delegate_registration_id_idx" ON "delegate"("registration_id");

-- CreateIndex
CREATE INDEX "cook_registration_id_idx" ON "cook"("registration_id");

-- CreateIndex
CREATE INDEX "user_church_id_idx" ON "user"("church_id");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "church" ADD CONSTRAINT "church_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinator" ADD CONSTRAINT "coordinator_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pastor" ADD CONSTRAINT "pastor_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_church_id_fkey" FOREIGN KEY ("church_id") REFERENCES "church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_president_id_fkey" FOREIGN KEY ("president_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delegate" ADD CONSTRAINT "delegate_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cook" ADD CONSTRAINT "cook_registration_id_fkey" FOREIGN KEY ("registration_id") REFERENCES "registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
