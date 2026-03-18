import { prisma } from "@/lib/db";

export async function listContactMessages() {
  const rows = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    message: row.message,
    isRead: row.isRead,
    createdAt: row.createdAt.toISOString(),
  }));
}

export async function createContactMessage(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  message: string;
}) {
  const row = await prisma.contactMessage.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone ?? null,
      message: input.message,
      isRead: false,
    },
  });

  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    message: row.message,
    isRead: row.isRead,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function updateContactMessageReadState(
  id: string,
  isRead: boolean
) {
  const row = await prisma.contactMessage.update({
    where: { id },
    data: { isRead },
  });

  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    message: row.message,
    isRead: row.isRead,
    createdAt: row.createdAt.toISOString(),
  };
}
