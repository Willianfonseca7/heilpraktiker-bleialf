export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { badRequest, created, serverError } from "@/lib/http";
import { createContactMessage } from "@/lib/service/contact-message.service";

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    const firstName = normalizeString(body?.firstName);
    const lastName = normalizeString(body?.lastName);
    const email = normalizeString(body?.email);
    const phone = normalizeString(body?.phone);
    const message = normalizeString(body?.message);

    if (!firstName || !lastName || !email || !message) {
      return badRequest("Bitte fuellen Sie alle Pflichtfelder aus.");
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return badRequest("Bitte geben Sie eine gueltige E-Mail-Adresse ein.");
    }

    const savedMessage = await createContactMessage({
      firstName,
      lastName,
      email,
      phone: phone || null,
      message,
    });

    return created({ message: savedMessage });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Kontaktanfrage konnte nicht gespeichert werden.";

    return serverError(message, String(message));
  }
}
