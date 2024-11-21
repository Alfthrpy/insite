/*
  Warnings:

  - You are about to drop the column `invitationId` on the `reviews` table. All the data in the column will be lost.
  - Added the required column `designId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_invitationId_fkey";

-- DropIndex
DROP INDEX "reviews_invitationId_idx";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "invitationId",
ADD COLUMN     "designId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "reviews_designId_idx" ON "reviews"("designId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_designId_fkey" FOREIGN KEY ("designId") REFERENCES "designs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
