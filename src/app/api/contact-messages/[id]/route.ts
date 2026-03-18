export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { requireSession } from "@/lib/session";
import { updateContactMessageReadState } from "@/lib/service/contact-message.service";

type Params = { id: string };

export async function PATCH(
  request: Request,
  { params }: { params: Params }
) {
  try {
    const session = await requireSession();
    if (session instanceof NextResponse) return session;

    const id = params?.id;
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    const isRead = body?.isRead;

    if (typeof isRead !== "boolean") {
      return NextResponse.json(
        { error: "isRead must be a boolean" },
        { status: 400 }
      );
    }

    const updated = await updateContactMessageReadState(id, isRead);
    return NextResponse.json(updated);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Update failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
