export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/session";
import { NextResponse } from "next/server";

type Params = { id: string };

function isValidId(id: string) {
  return typeof id === "string" && id.length > 0;
}

export async function GET(_: Request, { params }: { params: Params }) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const id = params?.id;
    if (!isValidId(id)) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json(patient, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const id = params?.id;
    if (!isValidId(id)) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "invalid body" }, { status: 400 });
    }

    type PatchData = {
      firstName?: string;
      lastName?: string;
      email?: string | null;
      phone?: string | null;
    };
    const data: PatchData = {};

    if (typeof body.firstName === "string") data.firstName = body.firstName;
    if (typeof body.lastName === "string") data.lastName = body.lastName;
    if (body.email === null || typeof body.email === "string") data.email = body.email;
    if (body.phone === null || typeof body.phone === "string") data.phone = body.phone;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "no valid fields to update" }, { status: 400 });
    }

    const updated = await prisma.patient.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Params }) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const id = params?.id;
    if (!isValidId(id)) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.patient.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
