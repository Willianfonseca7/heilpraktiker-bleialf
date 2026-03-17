import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await requireAdminSession();
  if (session instanceof NextResponse) return session;

  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json({
    appointments: appointments.map((appointment) => ({
      id: appointment.id,
      treatment: appointment.treatment,
      doctor: appointment.doctor,
      message: appointment.message,
      status: appointment.status,
      scheduledAt: appointment.scheduledAt?.toISOString() ?? null,
      createdAt: appointment.createdAt.toISOString(),
      updatedAt: appointment.updatedAt.toISOString(),
      user: appointment.user,
    })),
  });
}
