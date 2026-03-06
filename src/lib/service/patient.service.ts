// src/lib/service/patient.service.ts
import { prisma } from "@/lib/db";

export async function listPatients() {
  const rows = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });

  const data = rows.map((p) => ({
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    email: p.email,
    phone: p.phone,
    createdAt: p.createdAt.toISOString(), // ✅ serializável
  }));

  const count = await prisma.patient.count();
  return { count, data };
}

export async function createPatient(input: {
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
}) {
  const createdRow = await prisma.patient.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email ?? null,
      phone: input.phone ?? null,
    },
  });

  const created = {
    id: createdRow.id,
    firstName: createdRow.firstName,
    lastName: createdRow.lastName,
    email: createdRow.email,
    phone: createdRow.phone,
    createdAt: createdRow.createdAt.toISOString(),
  };

  const count = await prisma.patient.count();
  return { created, count };
}
