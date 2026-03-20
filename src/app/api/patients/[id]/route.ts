export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { NextResponse } from "next/server";
import type { CategoryScores } from "@/features/health-check/types";

type Params = { id: string };

function isValidId(id: string) {
  return typeof id === "string" && id.length > 0;
}

export async function GET(_: Request, { params }: { params: Params }) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const id = params?.id;
    if (!isValidId(id)) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    let user:
      | {
          id: string;
          firstName: string;
          lastName: string;
          email: string;
        }
      | null = null;

    if (patient.email) {
      user = await prisma.user.findUnique({
        where: { email: patient.email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      });
    }

    const [appointments, healthChecks, contactMessages] = await Promise.all([
      user
        ? prisma.appointment.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              treatment: true,
              doctor: true,
              message: true,
              status: true,
              scheduledAt: true,
              createdAt: true,
              updatedAt: true,
            },
          })
        : Promise.resolve([]),
      user
        ? prisma.healthCheckResult.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              clientResultId: true,
              totalScore: true,
              level: true,
              categoryScores: true,
              summary: true,
              recommendations: true,
              createdAt: true,
            },
          })
        : Promise.resolve([]),
      patient.email
        ? prisma.contactMessage.findMany({
            where: { email: patient.email },
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phone: true,
              message: true,
              createdAt: true,
            },
          })
        : Promise.resolve([]),
    ]);

    type PatientAppointmentRecord = (typeof appointments)[number];
    type PatientHealthCheckRecord = (typeof healthChecks)[number];
    type PatientContactMessageRecord = (typeof contactMessages)[number];

    return NextResponse.json(
      {
        patient: {
          id: patient.id,
          firstName: patient.firstName,
          lastName: patient.lastName,
          email: patient.email,
          phone: patient.phone,
          createdAt: patient.createdAt.toISOString(),
        },
        appointments: appointments.map((appointment: PatientAppointmentRecord) => ({
          id: appointment.id,
          treatment: appointment.treatment,
          doctor: appointment.doctor,
          message: appointment.message,
          status: appointment.status,
          scheduledAt: appointment.scheduledAt?.toISOString() ?? null,
          createdAt: appointment.createdAt.toISOString(),
          updatedAt: appointment.updatedAt.toISOString(),
        })),
        healthChecks: healthChecks.map((result: PatientHealthCheckRecord) => ({
          id: result.id,
          clientResultId: result.clientResultId,
          totalScore: result.totalScore,
          level: result.level.toLowerCase(),
          categoryScores: result.categoryScores as CategoryScores,
          summary: result.summary,
          recommendations: result.recommendations as string[],
          createdAt: result.createdAt.toISOString(),
        })),
        contactMessages: contactMessages.map((message: PatientContactMessageRecord) => ({
          id: message.id,
          firstName: message.firstName,
          lastName: message.lastName,
          email: message.email,
          phone: message.phone,
          message: message.message,
          createdAt: message.createdAt.toISOString(),
        })),
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const id = params?.id;
    if (!isValidId(id)) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }

    type PatchData = {
      firstName?: string;
      lastName?: string;
      email?: string | null;
      phone?: string | null;
    };
    const data: PatchData = {};

    if (typeof body.firstName === "string") data.firstName = body.firstName;
    if (typeof body.lastName === "string") data.lastName = body.lastName;
    if (body.email === null || typeof body.email === "string") data.email = body.email;
    if (body.phone === null || typeof body.phone === "string") data.phone = body.phone;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "no valid fields to update" }, { status: 400 });
    }

    const updated = await prisma.patient.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Params }) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const id = params?.id;
    if (!isValidId(id)) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.patient.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
