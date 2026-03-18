ALTER TABLE "ContactMessage"
ADD COLUMN IF NOT EXISTS "isRead" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS "ContactMessage_isRead_createdAt_idx"
ON "ContactMessage"("isRead", "createdAt");
