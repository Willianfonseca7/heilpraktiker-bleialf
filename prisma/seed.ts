// prisma/seed.ts
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash("superadmin123", 10)

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
  })

  console.log("✅ SUPERADMIN ready: admin@heilpraktiker.de / superadmin123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
