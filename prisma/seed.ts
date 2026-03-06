import "dotenv/config";
import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  const adminEmail = "wfonseca7@hotmail.com";
  const passwordHash = await bcrypt.hash("superadmin123", 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      role: Role.SUPERADMIN,
      isActive: true,
    },
    create: {
      email: adminEmail,
      passwordHash,
      role: Role.SUPERADMIN,
      isActive: true,
    },
  });

  console.log("✅ SUPERADMIN ready: wfonseca7@hotmail.com / superadmin123");
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
