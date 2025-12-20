-- AlterTable
ALTER TABLE "registration" ADD COLUMN     "cook_fee_per_person" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "delegate_fee_per_person" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "is_pre_registration" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "total_fee" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_reviewed_by_fkey" FOREIGN KEY ("reviewed_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
