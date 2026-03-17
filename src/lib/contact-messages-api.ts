import type {
  ContactMessage,
  CreateContactMessagePayload,
} from "@/types/contact";

export class ContactMessagesApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function readJsonOrThrow(response: Response) {
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message =
      data?.error || data?.message || "Ein Fehler ist aufgetreten.";
    throw new ContactMessagesApiError(message, response.status);
  }

  return data;
}

export async function createContactMessage(
  payload: CreateContactMessagePayload
): Promise<ContactMessage> {
  const response = await fetch("/api/contact-messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await readJsonOrThrow(response);
  return data.message as ContactMessage;
}

