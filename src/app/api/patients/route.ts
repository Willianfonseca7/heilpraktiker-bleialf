export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ok, created, badRequest, serverError } from "@/lib/http";
import { parseCreatePatient } from "@/lib/validators/patient";
import { listPatients, createPatient } from "@/lib/service/patient.service";

export async function GET() {
  try {
    const result = await listPatients();
    return ok(result, { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    return serverError("Failed to list patients", String(e?.message ?? e));
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const input = parseCreatePatient(body);

    if (!input) return badRequest("firstName and lastName are required");

    const result = await createPatient(input);
    return created(result);
  } catch (e: any) {
    // se email unique estourar, Prisma joga erro -> você pode tratar depois
    return serverError("Failed to create patient", String(e?.message ?? e));
  }
}