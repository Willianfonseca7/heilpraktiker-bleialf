import { AppointmentStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getDayBounds } from "@/lib/appointment-slots";
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

  const existing = await prisma.appointment.findUnique({
    where: { id },
    select: {
      id: true,
      doctor: true,
      scheduledAt: true,
    },
  });

  if (!existing) {
    return NextResponse.json({ error: "Anfrage nicht gefunden." }, { status: 404 });
  }

  if (status === AppointmentStatus.CONFIRMED) {
    if (!existing.doctor || !existing.scheduledAt) {
      return NextResponse.json(
        { error: "Zur Bestaetigung werden Behandler und Terminzeit benoetigt." },
        { status: 400 }
      );
    }

    const { start, end } = getDayBounds(existing.scheduledAt.toISOString().slice(0, 10));

    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        id: { not: id },
        doctor: existing.doctor,
        status: AppointmentStatus.CONFIRMED,
        scheduledAt: {
          gte: start,
          lte: end,
        },
      },
      select: {
        id: true,
        scheduledAt: true,
      },
    });

    if (
      conflictingAppointment?.scheduledAt &&
      conflictingAppointment.scheduledAt.getTime() === existing.scheduledAt.getTime()
    ) {
      return NextResponse.json(
        { error: "Dieser Termin wurde bereits bestaetigt und ist nicht mehr verfuegbar." },
        { status: 409 }
      );
    }
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: {
      status,
      userHasUnreadStatusUpdate: status !== AppointmentStatus.PENDING,
    },
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
      scheduledAt: updated.scheduledAt?.toISOString() ?? null,
      userHasUnreadStatusUpdate: updated.userHasUnreadStatusUpdate,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
      user: updated.user,
    },
  });
}
