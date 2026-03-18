"use client";

import type { AdminAppointment, AppointmentStatus } from "@/types/user";

type AdminAppointmentCardProps = {
  appointment: AdminAppointment;
  updating: boolean;
  onStatusChange: (id: string, status: AppointmentStatus) => void;
};

const statusLabels: Record<AppointmentStatus, string> = {
  PENDING: "Offen",
  CONFIRMED: "Akzeptiert",
  CANCELED: "Abgelehnt",
};

const statusClasses: Record<AppointmentStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  CANCELED: "bg-rose-50 text-rose-700",
};

function formatAppointmentDateTime(value: string) {
  return new Date(value).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function AdminAppointmentCard({
  appointment,
  updating,
  onStatusChange,
}: AdminAppointmentCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-emerald-100 hover:shadow-md md:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold leading-tight text-slate-900">
            {appointment.user.firstName} {appointment.user.lastName}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{appointment.user.email}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[appointment.status]}`}
        >
          {statusLabels[appointment.status]}
        </span>
      </div>

      <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-4">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Behandlung</dt>
          <dd className="mt-1 font-medium text-slate-800">{appointment.treatment}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Behandler</dt>
          <dd className="mt-1">{appointment.doctor ?? "Automatisch zuweisen"}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Anfrage vom</dt>
          <dd className="mt-1">
            {formatAppointmentDateTime(appointment.createdAt)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Status</dt>
          <dd className="mt-1">{statusLabels[appointment.status]}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Gewaehlter Termin</dt>
          <dd className="mt-1">
            {appointment.scheduledAt
              ? formatAppointmentDateTime(appointment.scheduledAt)
              : "Noch nicht festgelegt"}
          </dd>
        </div>
      </dl>

      {appointment.message ? (
        <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          {appointment.message}
        </div>
      ) : null}

      {appointment.status === "PENDING" ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Aktion erforderlich
          </span>
          <button
            type="button"
            disabled={updating}
            onClick={() => onStatusChange(appointment.id, "CONFIRMED")}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Akzeptieren
          </button>
          <button
            type="button"
            disabled={updating}
            onClick={() => onStatusChange(appointment.id, "CANCELED")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Ablehnen
          </button>
        </div>
      ) : null}
    </article>
  );
}
