export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/session";
import {
  getExpiredSessionCookieOptions,
  getSessionCookieOptions,
  getSessionMaxAgeSeconds,
  SESSION_COOKIE_NAME,
  signSession,
} from "@/lib/auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { AppRole } from "@/lib/auth";
import type { UserRole } from "@/types/user";

type Params = { id: string };

function isSuperadmin(role: AppRole | UserRole) {
  return role === "SUPERADMIN";
}

const USER_ROLES = {
  SUPERADMIN: "SUPERADMIN",
  ADMIN: "ADMIN",
} as const;

function isValidId(id: string) {
  return typeof id === "string" && id.length > 0;
}

export async function GET(_: Request, { params }: { params: Params }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  if (!isSuperadmin(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = params?.id;
  if (!isValidId(id)) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id },
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

  if (!user) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  if (!isSuperadmin(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

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
    email?: string;
    passwordHash?: string;
    role?: UserRole;
    isActive?: boolean;
  };
  const data: PatchData = {};

  if (typeof body.firstName === "string" && body.firstName.trim()) {
    data.firstName = body.firstName.trim();
  }
  if (typeof body.lastName === "string" && body.lastName.trim()) {
    data.lastName = body.lastName.trim();
  }
  if (typeof body.email === "string" && body.email.trim()) {
    data.email = body.email.trim();
  }
  if (typeof body.password === "string" && body.password.length >= 6) {
    data.passwordHash = await bcrypt.hash(body.password, 10);
  }
  if (body.role === USER_ROLES.SUPERADMIN) data.role = USER_ROLES.SUPERADMIN;
  if (body.role === USER_ROLES.ADMIN) data.role = USER_ROLES.ADMIN;
  if (typeof body.isActive === "boolean") data.isActive = body.isActive;

  if (Object.keys(data).length === 0) {
    return NextResponse.json(
      { error: "no valid fields to update" },
      { status: 400 }
    );
  }

  const updated = await prisma.user.update({
    where: { id },
    data,
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

  const response = NextResponse.json(updated);

  if (session.sub === updated.id) {
    if (!updated.isActive) {
      response.cookies.set(SESSION_COOKIE_NAME, "", getExpiredSessionCookieOptions());
      return response;
    }

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

    response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(maxAge));
  }

  return response;
}

export async function DELETE(_: Request, { params }: { params: Params }) {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;
  if (!isSuperadmin(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const id = params?.id;
  if (!isValidId(id)) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
