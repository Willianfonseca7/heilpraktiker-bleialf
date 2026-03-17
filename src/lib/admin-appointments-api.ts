import type {
  AdminAppointment,
  AppointmentStatus,
  UpdateAppointmentStatusPayload,
} from "@/types/user";

class AdminAppointmentsApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminAppointmentsApiError";
    this.status = status;
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.error || data?.message || "Ein Fehler ist aufgetreten.";
    throw new AdminAppointmentsApiError(message, res.status);
  }

  return data as T;
}

export async function getAdminAppointments(): Promise<AdminAppointment[]> {
  const res = await fetch("/api/appointments/admin", {
    method: "GET",
    cache: "no-store",
  });

  const data = await parseJson<{ appointments: AdminAppointment[] }>(res);
  return data.appointments;
}

export async function updateAppointmentStatus(
  id: string,
  payload: UpdateAppointmentStatusPayload
): Promise<{ appointment: AdminAppointment }> {
  const res = await fetch(`/api/appointments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<{ appointment: AdminAppointment }>(res);
}

export const appointmentAdminActions: Record<
  "accept" | "reject",
  AppointmentStatus
> = {
  accept: "CONFIRMED",
  reject: "CANCELED",
};
