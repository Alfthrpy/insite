/*
  Warnings:

  - You are about to drop the column `invitationId` on the `Quotes` table. All the data in the column will be lost.
  - You are about to drop the column `invitationId` on the `musics` table. All the data in the column will be lost.
  - Added the required column `musicId` to the `invitations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qouteId` to the `invitations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quotes" DROP CONSTRAINT "Quotes_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "musics" DROP CONSTRAINT "musics_invitationId_fkey";

-- AlterTable
ALTER TABLE "Quotes" DROP COLUMN "invitationId";

-- AlterTable
ALTER TABLE "brides and grooms" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "invitations" ADD COLUMN     "musicId" TEXT NOT NULL,
ADD COLUMN     "qouteId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "musics" DROP COLUMN "invitationId";

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "musics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_qouteId_fkey" FOREIGN KEY ("qouteId") REFERENCES "Quotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
