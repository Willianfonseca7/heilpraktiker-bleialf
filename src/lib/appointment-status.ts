import type { Appointment, AppointmentStatus } from "@/types/user";

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  PENDING: "Offen",
  CONFIRMED: "Akzeptiert",
  CANCELED: "Abgelehnt",
};

export const appointmentStatusClasses: Record<AppointmentStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  CANCELED: "bg-rose-50 text-rose-700",
};

export const appointmentFilterLabels: Record<"ALL" | AppointmentStatus, string> = {
  ALL: "Alle",
  PENDING: "Offen",
  CONFIRMED: "Akzeptiert",
  CANCELED: "Abgelehnt",
};

export const appointmentFilterOrder: Array<"ALL" | AppointmentStatus> = [
  "PENDING",
  "ALL",
  "CONFIRMED",
  "CANCELED",
];

export function getAppointmentStatusLabel(status: Appointment["status"]) {
  return appointmentStatusLabels[status];
}

export function getAppointmentStatusClass(status: Appointment["status"]) {
  return appointmentStatusClasses[status];
}
