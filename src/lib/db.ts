import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const allowSelfSigned =
  process.env.NODE_ENV !== "production" &&
  process.env.ALLOW_SELF_SIGNED === "true";

if (allowSelfSigned) {
  // Local/dev fix for environments that don't trust Supabase cert chain.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: allowSelfSigned ? { rejectUnauthorized: false } : undefined,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
