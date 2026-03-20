export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { ok, created, badRequest, serverError } from "@/lib/http";
import { parseCreatePatient } from "@/lib/validators/patient";
import { listPatients, createPatient } from "@/lib/service/patient.service";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export async function GET() {
  try {
    const result = await listPatients();
    return ok(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error: unknown) {
    return serverError("Failed to list patients", getErrorMessage(error));
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const input = parseCreatePatient(body);

    if (!input) return badRequest("firstName and lastName are required");

    const result = await createPatient(input);
    return created(result);
  } catch (error: unknown) {
    // se email unique estourar, Prisma joga erro -> você pode tratar depois
    return serverError("Failed to create patient", getErrorMessage(error));
  }
}
