import type { Appointment, CreateAppointmentPayload } from "@/types/user";

export class AppointmentApiError extends Error {
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

export async function getUnavailableAppointmentSlots(
  doctor: string,
  date: string
): Promise<string[]> {
  const searchParams = new URLSearchParams({
    doctor,
    date,
  });

  const res = await fetch(`/api/appointments/availability?${searchParams.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await parseJson<{ unavailableSlots: string[] }>(res);
  return data.unavailableSlots;
}

export async function markAppointmentUpdatesAsSeen(): Promise<number> {
  const res = await fetch("/api/appointments/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await parseJson<{ updatedCount: number }>(res);
  return data.updatedCount;
}
