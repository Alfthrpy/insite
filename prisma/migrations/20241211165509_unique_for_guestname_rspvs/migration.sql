/*
  Warnings:

  - A unique constraint covering the columns `[guestName]` on the table `rsvps` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "rsvps_guestName_key" ON "rsvps"("guestName");
