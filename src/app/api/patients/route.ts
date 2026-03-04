export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { createPatient, listPatients } from "@/lib/service/patient.service";
import { parseCreatePatient } from "@/lib/validators/patient";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await listPatients();
  return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const input = parseCreatePatient(body);
  if (!input) {
    return NextResponse.json({ error: "firstName and lastName are required" }, { status: 400 });
  }

  const result = await createPatient(input);
  return NextResponse.json(result, { status: 201 });
}
