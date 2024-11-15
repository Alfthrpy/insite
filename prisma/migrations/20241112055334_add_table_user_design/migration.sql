/*
  Warnings:

  - You are about to drop the column `invitationId` on the `payment_transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[designId]` on the table `invitations` will be added. If there are existing duplicate values, this will fail.
  - Made the column `designId` on table `invitations` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_designId_fkey";

-- DropForeignKey
ALTER TABLE "payment_transactions" DROP CONSTRAINT "payment_transactions_invitationId_fkey";

-- DropIndex
DROP INDEX "payment_transactions_invitationId_paymentStatus_idx";

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "designId" SET NOT NULL;

-- AlterTable
ALTER TABLE "payment_transactions" DROP COLUMN "invitationId";

-- DropEnum
DROP TYPE "confirmation_status";

-- DropEnum
DROP TYPE "payment_method";

-- DropEnum
DROP TYPE "payment_status";

-- CreateTable
CREATE TABLE "UserDesign" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "designId" TEXT NOT NULL,
    "purchased" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserDesign_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invitations_designId_key" ON "invitations"("designId");

-- CreateIndex
CREATE INDEX "payment_transactions_paymentStatus_idx" ON "payment_transactions"("paymentStatus");

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_designId_fkey" FOREIGN KEY ("designId") REFERENCES "designs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDesign" ADD CONSTRAINT "UserDesign_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDesign" ADD CONSTRAINT "UserDesign_designId_fkey" FOREIGN KEY ("designId") REFERENCES "designs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
