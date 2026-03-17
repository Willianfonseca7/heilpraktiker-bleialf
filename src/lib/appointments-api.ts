import type { Appointment, CreateAppointmentPayload } from "@/types/user";

class AppointmentApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AppointmentApiError";
    this.status = status;
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.error || data?.message || "Ein Fehler ist aufgetreten.";
    throw new AppointmentApiError(message, res.status);
  }

  return data as T;
}

export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<Appointment> {
  const res = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<{ appointment: Appointment }>(res);
  return data.appointment;
}

export async function getOwnAppointments(): Promise<Appointment[]> {
  const res = await fetch("/api/appointments", {
    method: "GET",
    cache: "no-store",
  });

  const data = await parseJson<{ appointments: Appointment[] }>(res);
  return data.appointments;
}
