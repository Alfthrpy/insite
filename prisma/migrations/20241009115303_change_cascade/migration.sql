-- DropForeignKey
ALTER TABLE "Quotes" DROP CONSTRAINT "Quotes_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "brides and grooms" DROP CONSTRAINT "brides and grooms_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "comentars" DROP CONSTRAINT "comentars_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "galerys" DROP CONSTRAINT "galerys_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "gifts" DROP CONSTRAINT "gifts_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "love_storys" DROP CONSTRAINT "love_storys_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "musics" DROP CONSTRAINT "musics_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "payment_transactions" DROP CONSTRAINT "payment_transactions_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "rsvps" DROP CONSTRAINT "rsvps_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "settings" DROP CONSTRAINT "settings_invitationId_fkey";

-- AlterTable
ALTER TABLE "payment_transactions" ALTER COLUMN "paymentMethod" SET DEFAULT 'dana';

-- AlterTable
ALTER TABLE "rsvps" ALTER COLUMN "confirmationStatus" SET DEFAULT 'pending';

-- AddForeignKey
ALTER TABLE "musics" ADD CONSTRAINT "musics_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentars" ADD CONSTRAINT "comentars_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brides and grooms" ADD CONSTRAINT "brides and grooms_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "love_storys" ADD CONSTRAINT "love_storys_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galerys" ADD CONSTRAINT "galerys_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
