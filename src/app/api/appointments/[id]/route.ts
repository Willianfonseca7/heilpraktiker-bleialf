import { AppointmentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAppointmentStatus(value: string): value is AppointmentStatus {
  return (
    value === AppointmentStatus.PENDING ||
    value === AppointmentStatus.CONFIRMED ||
    value === AppointmentStatus.CANCELED
  );
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await requireAdminSession();
  if (session instanceof NextResponse) return session;

  const { id } = await context.params;
  const body = await req.json().catch(() => null);
  const status =
    body && typeof body.status === "string" ? body.status.trim() : "";

  if (!id) {
    return NextResponse.json({ error: "Appointment ID fehlt." }, { status: 400 });
  }

  if (!isAppointmentStatus(status)) {
    return NextResponse.json({ error: "Ungueltiger Status." }, { status: 400 });
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: { status },
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
    appointment: {
      id: updated.id,
      treatment: updated.treatment,
      doctor: updated.doctor,
      message: updated.message,
      status: updated.status,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
      user: updated.user,
    },
  });
}
