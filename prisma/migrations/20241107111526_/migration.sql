-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_designId_fkey";

-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_musicId_fkey";

-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_qouteId_fkey";

-- AlterTable
ALTER TABLE "comentars" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "invitations" ALTER COLUMN "designId" DROP NOT NULL,
ALTER COLUMN "musicId" DROP NOT NULL,
ALTER COLUMN "qouteId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "musics" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_designId_fkey" FOREIGN KEY ("designId") REFERENCES "designs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES "musics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_qouteId_fkey" FOREIGN KEY ("qouteId") REFERENCES "Quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
