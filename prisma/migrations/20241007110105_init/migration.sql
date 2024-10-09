-- CreateEnum
CREATE TYPE "payment_method" AS ENUM ('cash', 'credit_card', 'transfer');

-- CreateEnum
CREATE TYPE "payment_status" AS ENUM ('pending', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "confirmation_status" AS ENUM ('pending', 'confirmed', 'declined');

-- CreateTable
CREATE TABLE "musics" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "musicUrl" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "musics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comentars" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" BIGINT NOT NULL,

    CONSTRAINT "comentars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brides and grooms" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "nameGroom" VARCHAR(255) NOT NULL,
    "imageGroom" VARCHAR(255) NOT NULL,
    "parentGroom" VARCHAR(255) NOT NULL,
    "linkInstagramGroom" VARCHAR(255),
    "linkFbGroom" VARCHAR(255),
    "linkTwitterGroom" VARCHAR(255),
    "linkYtbGroom" VARCHAR(255),
    "nameBride" VARCHAR(255) NOT NULL,
    "imageBride" VARCHAR(255) NOT NULL,
    "parentBride" VARCHAR(255) NOT NULL,
    "linkInstagramBride" VARCHAR(255),
    "linkFbBride" VARCHAR(255),
    "linkTwitterBride" VARCHAR(255),
    "linkYtbBride" VARCHAR(255),
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "brides and grooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "nameEvent" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "dateEvent" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "linkNavigationMap" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_transactions" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "paymentMethod" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(8,2) NOT NULL,
    "paymentStatus" VARCHAR(255) NOT NULL DEFAULT 'pending',
    "transactionDate" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "payment_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rsvps" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "guestName" VARCHAR(255) NOT NULL,
    "numberOfPeople" BIGINT NOT NULL,
    "confirmationStatus" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "rsvps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" UUID NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "designId" VARCHAR(255) NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotes" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "designs" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "templateFile" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "designs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gifts" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "nameAccount" VARCHAR(255) NOT NULL,
    "noAccount" VARCHAR(255) NOT NULL,
    "imgAccount" VARCHAR(255),
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "gifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "love_storys" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "story" TEXT NOT NULL,
    "imageUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "love_storys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "textPembuka" TEXT NOT NULL,
    "textAcara" TEXT NOT NULL,
    "textPenutup" TEXT NOT NULL,
    "broadcast" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galerys" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "galerys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" UUID NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "invitationId" VARCHAR(255) NOT NULL,
    "rate" BIGINT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(0) NOT NULL,
    "updatedAt" TIMESTAMP(0) NOT NULL,
    "deletedAt" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "musics" ADD CONSTRAINT "musics_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentars" ADD CONSTRAINT "comentars_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "brides and grooms" ADD CONSTRAINT "brides and grooms_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rsvps" ADD CONSTRAINT "rsvps_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_designId_fkey" FOREIGN KEY ("designId") REFERENCES "designs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quotes" ADD CONSTRAINT "Quotes_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gifts" ADD CONSTRAINT "gifts_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "love_storys" ADD CONSTRAINT "love_storys_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "settings_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galerys" ADD CONSTRAINT "galerys_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
