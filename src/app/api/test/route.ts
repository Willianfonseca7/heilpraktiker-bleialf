export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.testTable.findMany({ orderBy: { createdAt: "desc" } });
  const count = await prisma.testTable.count();
  return NextResponse.json(
    { count, data },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  const name = body?.name;
  if (!name || typeof name !== "string") {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  const created = await prisma.testTable.create({
    data: { name },
  });

  const count = await prisma.testTable.count();

  return NextResponse.json({ created, count }, { status: 201 });
}
