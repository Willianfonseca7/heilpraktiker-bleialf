import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySession, type SessionPayload } from "./auth";

export async function getSession(): Promise<SessionPayload | null> {
  const token = cookies().get("admin-session")?.value;
  if (!token) return null;
  try {
    return await verifySession(token);
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return session;
}
