export type CreatePatientInput = {
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
};

export function parseCreatePatient(body: unknown): CreatePatientInput | null {
  if (!body || typeof body !== "object") return null;

  const input = body as Record<string, unknown>;

  const firstName =
    typeof input.firstName === "string" ? input.firstName.trim() : "";
  const lastName =
    typeof input.lastName === "string" ? input.lastName.trim() : "";

  const email = input.email == null ? null : String(input.email).trim();
  const phone = input.phone == null ? null : String(input.phone).trim();

  if (!firstName || !lastName) return null;

  return { firstName, lastName, email: email || null, phone: phone || null };
}
