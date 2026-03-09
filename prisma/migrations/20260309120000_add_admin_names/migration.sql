ALTER TABLE "User"
ADD COLUMN "firstName" TEXT,
ADD COLUMN "lastName" TEXT;

UPDATE "User"
SET
  "firstName" = COALESCE(NULLIF("firstName", ''), 'Admin'),
  "lastName" = COALESCE(NULLIF("lastName", ''), 'Benutzer');

ALTER TABLE "User"
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;
