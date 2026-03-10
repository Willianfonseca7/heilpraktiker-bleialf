// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getExpiredSessionCookieOptions, SESSION_COOKIE_NAME } from "@/lib/auth";
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
    const response = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    response.cookies.set(SESSION_COOKIE_NAME, "", getExpiredSessionCookieOptions());
    return response;
  }

  return NextResponse.json({ user });
}
