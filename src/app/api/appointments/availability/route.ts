import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  APPOINTMENT_TIME_SLOTS,
  formatSlotFromDate,
  getDayBounds,
} from "@/lib/appointment-slots";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const doctor = searchParams.get("doctor")?.trim() ?? "";
    const date = searchParams.get("date")?.trim() ?? "";

    if (!doctor || !date) {
      return NextResponse.json(
        { error: "Arzt und Datum sind erforderlich." },
        { status: 400 }
      );
    }

    const { start, end } = getDayBounds(date);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return NextResponse.json({ error: "Ungueltiges Datum." }, { status: 400 });
    }

    const takenAppointments = await prisma.appointment.findMany({
      where: {
        doctor,
        status: "CONFIRMED",
        scheduledAt: {
          gte: start,
          lte: end,
        },
      },
      select: {
        scheduledAt: true,
      },
    });

    const unavailableSlots = takenAppointments
      .map((appointment) =>
        appointment.scheduledAt ? formatSlotFromDate(appointment.scheduledAt) : null
      )
      .filter((slot): slot is string => Boolean(slot));

    return NextResponse.json({
      slots: APPOINTMENT_TIME_SLOTS,
      unavailableSlots,
    });
  } catch (error) {
    console.error("Failed to load appointment availability", error);
    return NextResponse.json(
      { error: "Verfuegbare Termine konnten nicht geladen werden." },
      { status: 500 }
    );
  }
}
