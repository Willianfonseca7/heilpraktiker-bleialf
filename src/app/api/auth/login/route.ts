import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import {
  getSessionMaxAgeSeconds,
  getSessionCookieOptions,
  signSession,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";
import { sendLoginSuccessEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: String(email).trim().toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "User inactive" },
        { status: 403 }
      );
    }

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

    try {
      await sendLoginSuccessEmail({
        to: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } catch (error) {
      console.error("Failed to send login success email", error);
    }

    return response;
  } catch {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
