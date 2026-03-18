"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { PersistedHealthCheckResult } from "@/features/health-check/types";
import {
  appointmentStatusClasses,
  appointmentStatusLabels,
} from "@/lib/appointment-status";
import { formatDateTime } from "@/lib/date-format";
import type { ContactMessage } from "@/types/contact";
import type { Appointment } from "@/types/user";

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  createdAt: string | Date;
};

type PatientDetailData = {
  patient: Patient;
  appointments: Appointment[];
  healthChecks: PersistedHealthCheckResult[];
  contactMessages: ContactMessage[];
};

type PatientDetailProps = {
  initialData: PatientDetailData;
};

const healthLevelLabels: Record<PersistedHealthCheckResult["level"], string> = {
  low: "Niedrig",
  medium: "Mittel",
  high: "Erhoeht",
};

export default function PatientDetail({ initialData }: PatientDetailProps) {
  const INITIAL_SECTION_LIMIT = 3;
  const LOAD_MORE_STEP = 3;
  const router = useRouter();
  const [patient, setPatient] = useState<Patient>(initialData.patient);
  const [visibleAppointmentsCount, setVisibleAppointmentsCount] = useState(
    INITIAL_SECTION_LIMIT
  );
  const [visibleHealthChecksCount, setVisibleHealthChecksCount] = useState(
    INITIAL_SECTION_LIMIT
  );
  const [visibleContactMessagesCount, setVisibleContactMessagesCount] = useState(
    INITIAL_SECTION_LIMIT
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: initialData.patient.firstName,
    lastName: initialData.patient.lastName,
    email: initialData.patient.email ?? "",
    phone: initialData.patient.phone ?? "",
  });

  useEffect(() => {
    setVisibleAppointmentsCount(INITIAL_SECTION_LIMIT);
    setVisibleHealthChecksCount(INITIAL_SECTION_LIMIT);
    setVisibleContactMessagesCount(INITIAL_SECTION_LIMIT);
  }, [initialData]);

  const onChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = async () => {
    setError(null);
    setIsSaving(true);
    try {
      const nextPayload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
      };

      const current = {
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: patient.email ?? null,
        phone: patient.phone ?? null,
      };

      const payload: Partial<typeof nextPayload> = {};

      if (nextPayload.firstName !== current.firstName) {
        payload.firstName = nextPayload.firstName;
      }
      if (nextPayload.lastName !== current.lastName) {
        payload.lastName = nextPayload.lastName;
      }
      if (nextPayload.email !== current.email) {
        payload.email = nextPayload.email;
      }
      if (nextPayload.phone !== current.phone) {
        payload.phone = nextPayload.phone;
      }

      if (Object.keys(payload).length === 0) {
        setIsEditing(false);
        toast.message("Keine Änderungen.");
        setIsSaving(false);
        return;
      }

      const res = await fetch(`/api/patients/${patient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Speichern fehlgeschlagen.");
      }

      const updated = (await res.json()) as Patient;
      setPatient(updated);
      setIsEditing(false);
      toast.success("Gespeichert");
      router.refresh();
    } catch (e: any) {
      setError(e?.message || "Unbekannter Fehler.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Patient wirklich löschen?")) return;
    setError(null);
    setIsSaving(true);
    try {
      const res = await fetch(`/api/patients/${patient.id}`, { method: "DELETE" });
      if (!res.ok && res.status !== 204) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Löschen fehlgeschlagen.");
      }
      toast.success("Patient gelöscht");
      router.push("/patients");
    } catch (e: any) {
      setError(e?.message || "Unbekannter Fehler.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {patient.firstName} {patient.lastName}
          </h1>
          <p className="text-sm text-black/60 mt-1">
            Erstellt am: {formatDateTime(patient.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-black/5"
            >
              Bearbeiten
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60"
            >
              {isSaving ? "Speichern..." : "Speichern"}
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isSaving}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-60"
          >
            Löschen
          </button>
        </div>
      </div>

      {error ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-black/50">
            E-Mail
          </div>
          {!isEditing ? (
            <div className="mt-2 text-sm">{patient.email ?? "—"}</div>
          ) : (
            <input
              value={form.email}
              onChange={onChange("email")}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="name@domain.de"
            />
          )}
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-black/50">
            Telefon
          </div>
          {!isEditing ? (
            <div className="mt-2 text-sm">{patient.phone ?? "—"}</div>
          ) : (
            <input
              value={form.phone}
              onChange={onChange("phone")}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="+49 176 12345678"
            />
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-black/50">
            Vorname
          </div>
          {!isEditing ? (
            <div className="mt-2 text-sm">{patient.firstName}</div>
          ) : (
            <input
              value={form.firstName}
              onChange={onChange("firstName")}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
          )}
        </div>

        <div className="rounded-2xl border bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-black/50">
            Nachname
          </div>
          {!isEditing ? (
            <div className="mt-2 text-sm">{patient.lastName}</div>
          ) : (
            <input
              value={form.lastName}
              onChange={onChange("lastName")}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            />
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mt-4">
          <button
            onClick={() => {
              setIsEditing(false);
              setForm({
                firstName: patient.firstName,
                lastName: patient.lastName,
                email: patient.email ?? "",
                phone: patient.phone ?? "",
              });
            }}
            className="text-sm text-gray-600 hover:underline"
          >
            Abbrechen
          </button>
        </div>
      ) : null}

      <div className="mt-8 space-y-6">
        <section>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Terminanfragen</h2>
              <p className="mt-1 text-sm text-black/55">
                Alle Termininteraktionen dieses Patienten.
              </p>
            </div>
            <span className="rounded-full bg-black/5 px-3 py-1 text-sm text-black/60">
              {initialData.appointments.length} Eintraege
            </span>
          </div>

          {initialData.appointments.length === 0 ? (
            <div className="mt-4 rounded-2xl border bg-white px-5 py-4 text-sm text-black/60">
              Keine Terminanfragen vorhanden.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {initialData.appointments
                .slice(0, visibleAppointmentsCount)
                .map((appointment) => (
                <article
                  key={appointment.id}
                  className="rounded-2xl border bg-white p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">
                        {appointment.treatment}
                      </h3>
                      <p className="mt-1 text-sm text-black/55">
                        Anfrage vom {formatDateTime(appointment.createdAt)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${appointmentStatusClasses[appointment.status]}`}
                    >
                      {appointmentStatusLabels[appointment.status]}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <div className="text-xs uppercase tracking-wide text-black/45">
                        Behandler
                      </div>
                      <div className="mt-1">{appointment.doctor ?? "Automatisch zuweisen"}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-black/45">
                        Gewaehlter Termin
                      </div>
                      <div className="mt-1">
                        {appointment.scheduledAt
                          ? formatDateTime(appointment.scheduledAt)
                          : "Noch nicht festgelegt"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-black/45">
                        Letzte Aktualisierung
                      </div>
                      <div className="mt-1">{formatDateTime(appointment.updatedAt ?? appointment.createdAt)}</div>
                    </div>
                  </div>

                  {appointment.message ? (
                    <div className="mt-3 rounded-xl bg-black/[0.03] px-4 py-3 text-sm text-black/70">
                      {appointment.message}
                    </div>
                  ) : null}
                </article>
              ))}
              {initialData.appointments.length > visibleAppointmentsCount ? (
                <button
                  type="button"
                  onClick={() =>
                    setVisibleAppointmentsCount((current) => current + LOAD_MORE_STEP)
                  }
                  className="rounded-xl border bg-white px-4 py-2 text-sm font-medium hover:bg-black/5"
                >
                  Mehr laden ({Math.min(
                    LOAD_MORE_STEP,
                    initialData.appointments.length - visibleAppointmentsCount
                  )})
                </button>
              ) : null}
            </div>
          )}
        </section>

        <section>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Gesundheits-Checks</h2>
              <p className="mt-1 text-sm text-black/55">
                Bisher gespeicherte Auswertungen dieses Patienten.
              </p>
            </div>
            <span className="rounded-full bg-black/5 px-3 py-1 text-sm text-black/60">
              {initialData.healthChecks.length} Eintraege
            </span>
          </div>

          {initialData.healthChecks.length === 0 ? (
            <div className="mt-4 rounded-2xl border bg-white px-5 py-4 text-sm text-black/60">
              Keine Gesundheits-Checks vorhanden.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {initialData.healthChecks
                .slice(0, visibleHealthChecksCount)
                .map((result) => (
                <article key={result.id} className="rounded-2xl border bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">
                        Check vom {formatDateTime(result.createdAt)}
                      </h3>
                      <p className="mt-1 text-sm text-black/55">
                        Score: {result.totalScore}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      {healthLevelLabels[result.level]}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-black/70">
                    {result.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.recommendations.map((item) => (
                      <span
                        key={`${result.id}-${item}`}
                        className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
              {initialData.healthChecks.length > visibleHealthChecksCount ? (
                <button
                  type="button"
                  onClick={() =>
                    setVisibleHealthChecksCount((current) => current + LOAD_MORE_STEP)
                  }
                  className="rounded-xl border bg-white px-4 py-2 text-sm font-medium hover:bg-black/5"
                >
                  Mehr laden ({Math.min(
                    LOAD_MORE_STEP,
                    initialData.healthChecks.length - visibleHealthChecksCount
                  )})
                </button>
              ) : null}
            </div>
          )}
        </section>

        <section>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Nachrichten</h2>
              <p className="mt-1 text-sm text-black/55">
                Kontaktanfragen dieses Patienten ueber das oeffentliche Formular.
              </p>
            </div>
            <span className="rounded-full bg-black/5 px-3 py-1 text-sm text-black/60">
              {initialData.contactMessages.length} Eintraege
            </span>
          </div>

          {initialData.contactMessages.length === 0 ? (
            <div className="mt-4 rounded-2xl border bg-white px-5 py-4 text-sm text-black/60">
              Keine Nachrichten vorhanden.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {initialData.contactMessages
                .slice(0, visibleContactMessagesCount)
                .map((message) => (
                <article key={message.id} className="rounded-2xl border bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold">
                        {message.firstName} {message.lastName}
                      </h3>
                      <p className="mt-1 text-sm text-black/55">
                        {formatDateTime(message.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`mailto:${message.email}?subject=${encodeURIComponent("Rueckmeldung zu Ihrer Anfrage")}`}
                        className="rounded-xl border px-3 py-2 text-sm hover:bg-black/5"
                      >
                        Per E-Mail antworten
                      </a>
                      {message.phone ? (
                        <a
                          href={`tel:${message.phone}`}
                          className="rounded-xl border px-3 py-2 text-sm hover:bg-black/5"
                        >
                          Anrufen
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-black/[0.03] px-4 py-3 text-sm text-black/70">
                    {message.message}
                  </div>
                </article>
              ))}
              {initialData.contactMessages.length > visibleContactMessagesCount ? (
                <button
                  type="button"
                  onClick={() =>
                    setVisibleContactMessagesCount((current) => current + LOAD_MORE_STEP)
                  }
                  className="rounded-xl border bg-white px-4 py-2 text-sm font-medium hover:bg-black/5"
                >
                  Mehr laden ({Math.min(
                    LOAD_MORE_STEP,
                    initialData.contactMessages.length - visibleContactMessagesCount
                  )})
                </button>
              ) : null}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
