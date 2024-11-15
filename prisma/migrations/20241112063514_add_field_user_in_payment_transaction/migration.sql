/*
  Warnings:

  - Added the required column `userId` to the `payment_transactions` table without a default value. This is not possible if the table is not empty.
  - Made the column `designId` on table `payment_transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "payment_transactions" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "designId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
