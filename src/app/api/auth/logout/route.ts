// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import {
  getExpiredSessionCookieOptions,
  SESSION_COOKIE_NAME,
  verifySession,
} from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    const session = await verifySession(token);

    if (session?.sub) {
      await prisma.user.update({
        where: { id: session.sub },
        data: { sessionExpiresAt: null },
      }).catch(() => null);
    }
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set(SESSION_COOKIE_NAME, "", getExpiredSessionCookieOptions());

  return response;
}
