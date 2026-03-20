export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { AppRole } from "@/lib/auth";
import type { UserRole } from "@/types/user";

function isSuperadmin(role: AppRole | UserRole) {
  return role === "SUPERADMIN";
}

const USER_ROLES = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
} as const;

export async function GET() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  if (!isSuperadmin(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
      sessionExpiresAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ data: users });
}

export async function POST(req: Request) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  if (!isSuperadmin(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const firstName =
    typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName =
    typeof body.lastName === "string" ? body.lastName.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role =
    body.role === USER_ROLES.SUPERADMIN
      ? USER_ROLES.SUPERADMIN
      : USER_ROLES.ADMIN;
  const isActive = typeof body.isActive === "boolean" ? body.isActive : true;

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json(
      { error: "Vorname, Nachname, E-Mail und Passwort sind erforderlich" },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const created = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      role,
      isActive,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      isActive: true,
      sessionExpiresAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json({ created }, { status: 201 });
}
