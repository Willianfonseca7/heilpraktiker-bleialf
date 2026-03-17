DO $$
BEGIN
    CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "doctor" TEXT,
    "message" TEXT,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Appointment_userId_createdAt_idx"
ON "Appointment"("userId", "createdAt");

CREATE INDEX "Appointment_status_createdAt_idx"
ON "Appointment"("status", "createdAt");

ALTER TABLE "Appointment"
ADD CONSTRAINT "Appointment_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
