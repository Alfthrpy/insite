-- DropIndex
DROP INDEX "invitations_id_idx";

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");

-- CreateIndex
CREATE INDEX "brides and grooms_invitationId_idx" ON "brides and grooms"("invitationId");

-- CreateIndex
CREATE INDEX "comentars_invitationId_idx" ON "comentars"("invitationId");

-- CreateIndex
CREATE INDEX "events_invitationId_idx" ON "events"("invitationId");

-- CreateIndex
CREATE INDEX "invitations_userId_idx" ON "invitations"("userId");

-- CreateIndex
CREATE INDEX "invitations_link_idx" ON "invitations"("link");

-- CreateIndex
CREATE INDEX "musics_musicUrl_idx" ON "musics"("musicUrl");

-- CreateIndex
CREATE INDEX "payment_transactions_invitationId_paymentStatus_idx" ON "payment_transactions"("invitationId", "paymentStatus");

-- CreateIndex
CREATE INDEX "reviews_invitationId_idx" ON "reviews"("invitationId");

-- CreateIndex
CREATE INDEX "rsvps_invitationId_idx" ON "rsvps"("invitationId");
