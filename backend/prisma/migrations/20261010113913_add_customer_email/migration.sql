-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE INDEX "customers_merchant_id_email_idx" ON "customers"("merchant_id", "email");
