/*
  Warnings:

  - You are about to drop the column `templateFile` on the `designs` table. All the data in the column will be lost.
  - You are about to drop the column `gross_amount` on the `payment_transactions` table. All the data in the column will be lost.
  - You are about to alter the column `rate` on the `reviews` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `numberOfPeople` on the `rsvps` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `templateName` to the `designs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "designs" DROP COLUMN "templateFile",
ADD COLUMN     "templateName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payment_transactions" DROP COLUMN "gross_amount";

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rate" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "rsvps" ALTER COLUMN "numberOfPeople" SET DEFAULT 1,
ALTER COLUMN "numberOfPeople" SET DATA TYPE INTEGER,
ALTER COLUMN "confirmationStatus" SET DEFAULT 'belum konfirmasi';

-- AlterTable
ALTER TABLE "settings" ALTER COLUMN "title" SET DEFAULT 'Pernikahan',
ALTER COLUMN "textPembuka" SET DEFAULT 'Assalamualaikum',
ALTER COLUMN "textAcara" SET DEFAULT 'Pernikahan Awal',
ALTER COLUMN "textPenutup" SET DEFAULT 'Pernikahan Akhir',
ALTER COLUMN "broadcast" SET DEFAULT 'Halo semuanya...';
