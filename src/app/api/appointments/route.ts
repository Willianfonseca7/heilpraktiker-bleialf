import { NextResponse } from "next/server";
import {
  getPractitionersForTreatment,
  isClinicTreatment,
  isValidPractitionerForTreatment,
} from "@/data/clinic-offerings";
import { prisma } from "@/lib/db";
import { ensurePatientExistsForSession } from "@/lib/service/patient.service";
import { requireSession } from "@/lib/session";
import type { AppointmentStatus } from "@/types/user";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const APPOINTMENT_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELED: "CANCELED",
} as const;

function toAppStatus(status: AppointmentStatus) {
  return status;
}

function toIsoDate(value: Date | null) {
  return value ? value.toISOString() : null;
}

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const appointments = await prisma.appointment.findMany({
    where: { userId: session.sub },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      treatment: true,
      doctor: true,
      message: true,
      status: true,
      scheduledAt: true,
      userHasUnreadStatusUpdate: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({
    appointments: appointments.map((appointment) => ({
      id: appointment.id,
      treatment: appointment.treatment,
      doctor: appointment.doctor,
      message: appointment.message,
      status: toAppStatus(appointment.status),
      scheduledAt: toIsoDate(appointment.scheduledAt),
      userHasUnreadStatusUpdate: appointment.userHasUnreadStatusUpdate,
      createdAt: appointment.createdAt.toISOString(),
      updatedAt: appointment.updatedAt.toISOString(),
    })),
  });
}

export async function POST(req: Request) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const treatment =
      typeof body.treatment === "string" ? body.treatment.trim() : "";
    const doctor =
      typeof body.doctor === "string" ? body.doctor.trim() : "";
    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const scheduledAtRaw =
      typeof body.scheduledAt === "string" ? body.scheduledAt.trim() : "";
    let scheduledAt: Date | null = null;

    if (scheduledAtRaw) {
      const parsed = new Date(scheduledAtRaw);

      if (Number.isNaN(parsed.getTime())) {
        return NextResponse.json(
          { error: "Ungueltiger Terminzeitpunkt." },
          { status: 400 }
        );
      }

      scheduledAt = parsed;
    }

    if (!treatment) {
      return NextResponse.json(
        { error: "Bitte eine Behandlung auswaehlen." },
        { status: 400 }
      );
    }

    if (!isClinicTreatment(treatment)) {
      return NextResponse.json(
        { error: "Die gewaehlte Behandlung ist nicht verfuegbar." },
        { status: 400 }
      );
    }

    const practitionerOptions = getPractitionersForTreatment(treatment);

    if (practitionerOptions.length === 0) {
      return NextResponse.json(
        { error: "Fuer diese Behandlung ist aktuell kein Behandler hinterlegt." },
        { status: 400 }
      );
    }

    if (!doctor) {
      return NextResponse.json(
        { error: "Bitte einen passenden Behandler auswaehlen." },
        { status: 400 }
      );
    }

    if (!isValidPractitionerForTreatment(treatment, doctor)) {
      return NextResponse.json(
        { error: "Der gewaehlte Behandler passt nicht zur Behandlung." },
        { status: 400 }
      );
    }

    try {
      await ensurePatientExistsForSession(session);
    } catch (error) {
      // Creating the clinical patient record should not block the actual
      // appointment request. We log the issue and continue with the request.
      console.error("Failed to ensure patient exists for appointment", error);
    }

    const created = await prisma.appointment.create({
      data: {
        userId: session.sub,
        treatment,
        doctor: doctor || null,
        message: message || null,
        status: APPOINTMENT_STATUS.PENDING,
        scheduledAt,
        userHasUnreadStatusUpdate: false,
      },
      select: {
        id: true,
        treatment: true,
        doctor: true,
        message: true,
        status: true,
        scheduledAt: true,
        userHasUnreadStatusUpdate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(
      {
        appointment: {
          id: created.id,
          treatment: created.treatment,
          doctor: created.doctor,
          message: created.message,
          status: toAppStatus(created.status),
          scheduledAt: toIsoDate(created.scheduledAt),
          userHasUnreadStatusUpdate: created.userHasUnreadStatusUpdate,
          createdAt: created.createdAt.toISOString(),
          updatedAt: created.updatedAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create appointment", error);
    const message =
      error instanceof Error
        ? error.message
        : "Terminanfrage konnte nicht gespeichert werden.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
