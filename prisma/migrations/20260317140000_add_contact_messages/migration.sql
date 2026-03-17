CREATE TABLE "ContactMessage" (
  "id" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "message" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
