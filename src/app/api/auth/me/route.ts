import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { getSessionMaxAgeSeconds, signSession } from "@/lib/auth";
import { requireSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    passwordHash?: string;
  } = {};

  if (typeof body.firstName === "string" && body.firstName.trim()) {
    data.firstName = body.firstName.trim();
  }

  if (typeof body.lastName === "string" && body.lastName.trim()) {
    data.lastName = body.lastName.trim();
  }

  if (typeof body.email === "string" && body.email.trim()) {
    data.email = body.email.trim();
  }

  if (typeof body.password === "string" && body.password.trim()) {
    if (body.password.trim().length < 6) {
      return NextResponse.json(
        { error: "Passwort muss mindestens 6 Zeichen lang sein." },
        { status: 400 }
      );
    }
    data.passwordHash = await bcrypt.hash(body.password.trim(), 10);
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "no valid fields to update" },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { id: session.sub },
    data,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
    },
  });

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

  const response = NextResponse.json({ user: updated });
  response.cookies.set("admin-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge,
  });

  return response;
}
