"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  createdAt: string | Date;
};

type PatientDetailProps = {
  initialPatient: Patient;
};

function toDate(value: string | Date) {
  return value instanceof Date ? value : new Date(value);
}

function formatDateTime(value: string | Date) {
  const d = toDate(value);
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function PatientDetail({ initialPatient }: PatientDetailProps) {
  const router = useRouter();
  const [patient, setPatient] = useState<Patient>(initialPatient);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: initialPatient.firstName,
    lastName: initialPatient.lastName,
    email: initialPatient.email ?? "",
    phone: initialPatient.phone ?? "",
  });

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
    <div className="max-w-5xl mx-auto p-10">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold">
            {patient.firstName} {patient.lastName}
          </h1>
          <p className="text-sm text-black/60 mt-1">
            Erstellt am: {formatDateTime(patient.createdAt)}
          </p>
        </div>

        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg border hover:bg-black/5"
            >
              Bearbeiten
            </button>
          ) : (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
            >
              {isSaving ? "Speichern..." : "Speichern"}
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-5">
          <div className="text-xs uppercase tracking-wide text-black/50">
            E-Mail
          </div>
          {!isEditing ? (
            <div className="mt-2 text-sm">{patient.email ?? "—"}</div>
          ) : (
            <input
              value={form.email}
              onChange={onChange("email")}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-200"
              placeholder="name@domain.de"
            />
          )}
        </div>

        <div className="rounded-xl border bg-white p-5">
          <div className="text-xs uppercase tracking-wide text-black/50">
            Telefon
          </div>
          {!isEditing ? (
            <div className="mt-2 text-sm">{patient.phone ?? "—"}</div>
          ) : (
            <input
              value={form.phone}
              onChange={onChange("phone")}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-200"
              placeholder="+49 176 12345678"
            />
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-5">
          <div className="text-xs uppercase tracking-wide text-black/50">
            Vorname
          </div>
          {!isEditing ? (
            <div className="mt-2 text-sm">{patient.firstName}</div>
          ) : (
            <input
              value={form.firstName}
              onChange={onChange("firstName")}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-200"
            />
          )}
        </div>

        <div className="rounded-xl border bg-white p-5">
          <div className="text-xs uppercase tracking-wide text-black/50">
            Nachname
          </div>
          {!isEditing ? (
            <div className="mt-2 text-sm">{patient.lastName}</div>
          ) : (
            <input
              value={form.lastName}
              onChange={onChange("lastName")}
              className="mt-2 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-200"
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
    </div>
  );
}
