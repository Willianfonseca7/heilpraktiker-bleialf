// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import {
  getExpiredSessionCookieOptions,
  getSessionCookieOptions,
  getSessionMaxAgeSeconds,
  SESSION_COOKIE_NAME,
  signSession,
} from "@/lib/auth";
import { requireSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function countUnreadAppointmentUpdates(userId: string) {
  return prisma.appointment.count({
    where: {
      userId,
      userHasUnreadStatusUpdate: true,
    },
  });
}

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  if (!user || !user.isActive) {
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    response.cookies.set(SESSION_COOKIE_NAME, "", getExpiredSessionCookieOptions());
    return response;
  }

  const pendingAppointmentUpdates = await countUnreadAppointmentUpdates(user.id);

  return NextResponse.json({
    user: {
      ...user,
      pendingAppointmentUpdates,
    },
  });
}

export async function PATCH(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName =
    typeof body.lastName === "string" ? body.lastName.trim() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password =
    typeof body.password === "string" ? body.password.trim() : "";

  if (!firstName || !lastName || !email) {
    return NextResponse.json(
      { error: "Vorname, Nachname und E-Mail sind erforderlich." },
      { status: 400 }
    );
  }

  if (password && password.length < 6) {
    return NextResponse.json(
      { error: "Passwort muss mindestens 6 Zeichen lang sein." },
      { status: 400 }
    );
  }

  const emailOwner = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (emailOwner && emailOwner.id !== session.sub) {
    return NextResponse.json(
      { error: "E-Mail ist bereits vergeben." },
      { status: 409 }
    );
  }

  const updated = await prisma.user.update({
    where: { id: session.sub },
    data: {
      firstName,
      lastName,
      email,
      ...(password
        ? {
            passwordHash: await bcrypt.hash(password, 10),
          }
        : {}),
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

  const pendingAppointmentUpdates = await countUnreadAppointmentUpdates(updated.id);

  const token = await signSession({
    sub: updated.id,
    email: updated.email,
    role: updated.role,
    firstName: updated.firstName,
    lastName: updated.lastName,
  });

  const maxAge = getSessionMaxAgeSeconds();
  const sessionExpiresAt = new Date(Date.now() + maxAge * 1000);

  await prisma.user.update({
    where: { id: updated.id },
    data: { sessionExpiresAt },
  });

  const response = NextResponse.json({
    user: {
      ...updated,
      pendingAppointmentUpdates,
    },
  });
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(maxAge));

  return response;
}
