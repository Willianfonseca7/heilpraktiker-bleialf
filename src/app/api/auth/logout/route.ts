import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const token = cookies().get("admin-session")?.value;

  if (token) {
    try {
      const session = await verifySession(token);
      await prisma.user.update({
        where: { id: session.sub },
        data: { sessionExpiresAt: null },
      });
    } catch {
      // Ignore invalid or expired tokens during logout cleanup.
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
