/*
  Warnings:

  - Added the required column `gross_amount` to the `payment_transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_transactions" ADD COLUMN     "gross_amount" DECIMAL(65,30) NOT NULL;
