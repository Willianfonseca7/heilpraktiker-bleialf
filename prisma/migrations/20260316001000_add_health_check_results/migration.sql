DO $$
BEGIN
    CREATE TYPE "HealthCheckLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE "HealthCheckResult" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clientResultId" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "level" "HealthCheckLevel" NOT NULL,
    "categoryScores" JSONB NOT NULL,
    "summary" TEXT NOT NULL,
    "recommendations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthCheckResult_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "HealthCheckResult_userId_clientResultId_key"
ON "HealthCheckResult"("userId", "clientResultId");

CREATE INDEX "HealthCheckResult_userId_createdAt_idx"
ON "HealthCheckResult"("userId", "createdAt");

ALTER TABLE "HealthCheckResult"
ADD CONSTRAINT "HealthCheckResult_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
