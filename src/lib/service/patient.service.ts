import { prisma } from "@/lib/db";
import type { CreatePatientInput } from "@/lib/validators/patient";

export async function listPatients() {
  const data = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });
  const count = await prisma.patient.count();
  return { count, data };
}

export async function createPatient(input: CreatePatientInput) {
  const created = await prisma.patient.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
    },
  });

  const count = await prisma.patient.count();
  return { created, count };
}
