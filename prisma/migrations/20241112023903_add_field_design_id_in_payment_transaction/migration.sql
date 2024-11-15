-- AlterTable
ALTER TABLE "payment_transactions" ADD COLUMN     "designId" TEXT,
ALTER COLUMN "invitationId" DROP NOT NULL,
ALTER COLUMN "transactionDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_designId_fkey" FOREIGN KEY ("designId") REFERENCES "designs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
