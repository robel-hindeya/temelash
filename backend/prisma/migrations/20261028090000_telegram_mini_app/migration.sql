-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "telegram_user_id" BIGINT;

-- CreateTable
CREATE TABLE "telegram_contacts" (
    "telegram_user_id" BIGINT NOT NULL,
    "phone_e164" TEXT NOT NULL,
    "verified_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "telegram_contacts_pkey" PRIMARY KEY ("telegram_user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_merchant_id_telegram_user_id_key" ON "customers"("merchant_id", "telegram_user_id");
