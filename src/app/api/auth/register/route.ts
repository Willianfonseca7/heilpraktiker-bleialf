import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import {
  getSessionMaxAgeSeconds,
  getSessionCookieOptions,
  signSession,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";
import { sendRegistrationEmail } from "@/lib/email";
import type { UserRole } from "@/types/user";

const DEFAULT_USER_ROLE: UserRole = "USER";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "").trim();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Bitte alle Pflichtfelder ausfüllen." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Passwort muss mindestens 6 Zeichen lang sein." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "E-Mail ist bereits registriert." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        role: DEFAULT_USER_ROLE,
        isActive: true,
      },
    });

    const token = await signSession({
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    const maxAge = getSessionMaxAgeSeconds();
    const sessionExpiresAt = new Date(Date.now() + maxAge * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { sessionExpiresAt },
    });

    try {
      await sendRegistrationEmail({
        to: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (error) {
      console.error("Failed to send registration email", error);
    }

    const response = NextResponse.json({
      success: true,
      role: user.role,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions(maxAge));

    return response;
  } catch {
    return NextResponse.json(
      { error: "Registrierung fehlgeschlagen." },
      { status: 500 }
    );
  }
}
