/*
  Warnings:

  - The primary key for the `rsvps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `rsvps` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropIndex
DROP INDEX "rsvps_guestName_key";

-- AlterTable
ALTER TABLE "rsvps" DROP CONSTRAINT "rsvps_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id");
