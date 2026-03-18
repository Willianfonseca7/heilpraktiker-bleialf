import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const session = await requireSession();
  if (session instanceof NextResponse) return session;

  const updated = await prisma.appointment.updateMany({
    where: {
      userId: session.sub,
      userHasUnreadStatusUpdate: true,
    },
    data: {
      userHasUnreadStatusUpdate: false,
    },
  });

  return NextResponse.json({
    updatedCount: updated.count,
  });
}
