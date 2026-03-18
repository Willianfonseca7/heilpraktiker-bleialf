ALTER TABLE "Appointment"
ADD COLUMN "userHasUnreadStatusUpdate" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Appointment_userId_userHasUnreadStatusUpdate_idx"
ON "Appointment"("userId", "userHasUnreadStatusUpdate");
