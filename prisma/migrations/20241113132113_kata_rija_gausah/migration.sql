/*
  Warnings:

  - You are about to drop the `UserDesign` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDesign" DROP CONSTRAINT "UserDesign_designId_fkey";

-- DropForeignKey
ALTER TABLE "UserDesign" DROP CONSTRAINT "UserDesign_userId_fkey";

-- DropTable
DROP TABLE "UserDesign";
