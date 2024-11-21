/*
  Warnings:

  - Added the required column `name` to the `comentars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comentars" ADD COLUMN     "name" TEXT NOT NULL;
