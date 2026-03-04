export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
  });

  const count = await prisma.patient.count();

  return NextResponse.json({ count, data }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const firstName = body?.firstName;
  const lastName = body?.lastName;
  const email = body?.email ?? null;
  const phone = body?.phone ?? null;

  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: "firstName and lastName are required" },
      { status: 400 }
    );
  }

  const created = await prisma.patient.create({
    data: { firstName, lastName, email, phone },
  });

  const count = await prisma.patient.count();

  return NextResponse.json({ created, count }, { status: 201 });
}