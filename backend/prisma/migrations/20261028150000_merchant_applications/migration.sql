-- CreateTable
CREATE TABLE "merchant_applications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "business_name" TEXT NOT NULL,
    "category" TEXT,
    "city" TEXT,
    "contact_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_e164" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "rejection_reason" TEXT,
    "merchant_id" UUID,
    "decided_by_user_id" UUID,
    "decided_at" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "merchant_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "merchant_applications_status_created_at_idx" ON "merchant_applications"("status", "created_at");

-- CreateIndex
CREATE INDEX "merchant_applications_email_idx" ON "merchant_applications"("email");
