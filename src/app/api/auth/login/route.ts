import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionMaxAgeSeconds, signSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

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
      where: { email },
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
      return NextResponse.json({ error: "User inactive" }, { status: 403 });
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
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    response.cookies.set("admin-session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge,
    });

    return response;
  } catch (error) {
    console.error("[auth/login] error:", error);
    return NextResponse.json(
      {
        error: "Login failed",
        detail:
          process.env.NODE_ENV === "development"
            ? String((error as Error)?.message ?? error)
            : undefined,
      },
      { status: 500 }
    );
  }
}
