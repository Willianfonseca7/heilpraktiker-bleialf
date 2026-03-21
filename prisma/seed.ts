import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import { Pool } from "pg";

const allowSelfSigned =
  process.env.NODE_ENV !== "production" &&
  process.env.ALLOW_SELF_SIGNED === "true";

if (allowSelfSigned) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("superadmin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@heilpraktiker.de" },
    update: {
      firstName: "Super",
      lastName: "Admin",
      passwordHash,
      role: "SUPERADMIN",
      isActive: true,
    },
    create: {
      firstName: "Super",
      lastName: "Admin",
      email: "admin@heilpraktiker.de",
      passwordHash,
      role: "SUPERADMIN",
      isActive: true,
    },
  });

  console.log("SUPERADMIN ready: admin@heilpraktiker.de / superadmin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
