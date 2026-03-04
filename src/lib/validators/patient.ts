export type CreatePatientInput = {
  firstName: string;
  lastName: string;
  email?: string | null;
  phone?: string | null;
};

export function parseCreatePatient(body: any): CreatePatientInput | null {
  if (!body) return null;

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";

  const email = body.email == null ? null : String(body.email).trim();
  const phone = body.phone == null ? null : String(body.phone).trim();

  if (!firstName || !lastName) return null;

  return { firstName, lastName, email: email || null, phone: phone || null };
}