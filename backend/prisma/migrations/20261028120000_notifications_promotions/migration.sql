-- CreateTable
CREATE TABLE "notification_deliveries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "merchant_id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "promotion_id" UUID,
    "sent_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_deliveries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "merchant_id" UUID NOT NULL,
    "message" TEXT NOT NULL,
    "created_by_user_id" UUID,
    "audience_size" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notification_deliveries_key_key" ON "notification_deliveries"("key");

-- CreateIndex
CREATE INDEX "notification_deliveries_merchant_id_kind_created_at_idx" ON "notification_deliveries"("merchant_id", "kind", "created_at");

-- CreateIndex
CREATE INDEX "notification_deliveries_promotion_id_idx" ON "notification_deliveries"("promotion_id");

-- CreateIndex
CREATE INDEX "promotions_merchant_id_created_at_idx" ON "promotions"("merchant_id", "created_at");
