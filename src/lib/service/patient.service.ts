import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { SessionPayload } from "@/lib/auth";

function safeTrim(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

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
    createdAt: p.createdAt.toISOString(),
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

export async function ensurePatientExistsForSession(session: SessionPayload) {
  const email = safeTrim(session.email);

  if (!email) {
    return null;
  }

  const existing = await prisma.patient.findUnique({
    where: { email },
  });

  if (existing) {
    return existing;
  }

  const firstName = safeTrim(session.firstName) || "Online";
  const lastName = safeTrim(session.lastName) || "Anfrage";

  try {
    return await prisma.patient.create({
      data: {
        firstName,
        lastName,
        email,
      },
    });
  } catch (error) {
    // If another request created the patient in parallel, reuse it.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return prisma.patient.findUnique({
        where: { email },
      });
    }

    throw error;
  }
}
