"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminAppointmentsSection from "@/components/appointments/AdminAppointmentsSection";
import AdminContactMessagesSection from "@/components/kontakt/AdminContactMessagesSection";
import Modal from "@/components/Modal";
import PatientForm from "@/components/PatientForm";
import { toast } from "sonner";
import { formatDateTime, toDate } from "@/lib/date-format";
import type { ContactMessage } from "@/types/contact";

type Patient = {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone?: string | null;
  createdAt: string | Date;

  // campos novos do formulário (podem não existir nos pacientes vindos do banco)
  birthDate?: string; // yyyy-mm-dd
  insurancePlan?: string; // gesetzlich | privat | selbstzahler | etc
};

type PatientsDashboardProps = {
  patients: Patient[];
  total: number;
  contactMessages: ContactMessage[];
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function PatientsDashboard({
  patients,
  total,
  contactMessages,
}: PatientsDashboardProps) {
  // Copia local para poder adicionar via modal (sem backend por enquanto)
  const [items, setItems] = useState<Patient[]>(patients ?? []);
  const [query, setQuery] = useState("");
  const router = useRouter();

  // Modal Create
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Se o server enviar novos pacientes, sincroniza
  useEffect(() => {
    setItems(patients ?? []);
  }, [patients]);

  const filteredPatients = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((p) => {
      const fullName = `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim().toLowerCase();
      const email = (p.email ?? "").toLowerCase();
      const phone = (p.phone ?? "").toString().toLowerCase();

      return fullName.includes(q) || email.includes(q) || phone.includes(q);
    });
  }, [items, query]);

  // KPIs
  const totalPatients = useMemo(() => items.length, [items.length]);

  const newToday = useMemo(() => {
    const today = new Date();
    return items.filter((p) => isSameDay(toDate(p.createdAt), today)).length;
  }, [items]);

  const lastRegistered = useMemo(() => {
    if (!items.length) return null;
    return items
      .slice()
      .sort((a, b) => toDate(b.createdAt).getTime() - toDate(a.createdAt).getTime())[0];
  }, [items]);

  const totalContactMessages = useMemo(
    () => contactMessages.length,
    [contactMessages.length]
  );

  const latestContactMessage = useMemo(() => {
    if (!contactMessages.length) return null;

    return [...contactMessages].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];
  }, [contactMessages]);

  // Create handler (persist in backend)
  const handleCreatePatient = async (values: {
  name: string;
  email: string;
  phone?: string;
  birthDate: string;
  insurancePlan: string;
}) => {

  const toastId = toast.loading("Patient wird gespeichert...");

  try {

    const { firstName, lastName } = splitName(values.name);
    if (!firstName || !lastName) {
      throw new Error("Bitte Vor- und Nachname eingeben.");
    }

    const response = await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email: values.email,
        phone: values.phone || null,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody?.error || "Fehler beim Erstellen des Patienten");
    }

    const result = (await response.json()) as { created: Patient };

    setItems((prev) => [result.created, ...prev]);

    setIsCreateOpen(false);
    setQuery("");

    toast.success("Patient erfolgreich erstellt", { id: toastId });

  } catch (error: unknown) {
    toast.error("Fehler beim Speichern", {
      id: toastId,
      description: getErrorMessage(error, "Fehler beim Speichern"),
    });
  }
};

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Patientenverwaltung</h1>
        <p className="mt-1 text-sm text-gray-500">Patientenübersicht (Demo)</p>
      </div>

      {/* KPI cards */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Gesamtanzahl der Patienten</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totalPatients}</p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Heute neu registriert</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{newToday}</p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Letzte Registrierung</p>
          {lastRegistered ? (
            <>
              <p className="mt-2 text-base font-semibold text-gray-900">
                {lastRegistered.firstName} {lastRegistered.lastName}
              </p>
              <p className="mt-1 text-sm text-gray-500">{formatDateTime(lastRegistered.createdAt)}</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-gray-500">—</p>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Kontaktanfragen gesamt</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{totalContactMessages}</p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Letzte Kontaktanfrage</p>
          {latestContactMessage ? (
            <>
              <p className="mt-2 text-base font-semibold text-gray-900">
                {latestContactMessage.firstName} {latestContactMessage.lastName}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {formatDateTime(latestContactMessage.createdAt)}
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-gray-500">—</p>
          )}
        </div>
      </div>

      {/* Search + Create button */}
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xl">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nach Name, E-Mail oder Telefonnummer suchen"
            className="w-full rounded-xl border px-10 py-2 outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">🔎</span>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
        >
          + Neuer Patient
        </button>
      </div>

      {/* Counter */}
      <div className="mb-3 text-sm text-gray-500">{filteredPatients.length} Ergebnisse gefunden</div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full table-auto">
            <thead className="sticky top-0 bg-gray-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">E-Mail</th>
                <th className="px-5 py-3">Telefon</th>
                <th className="px-5 py-3">Erstellt am</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-gray-500" colSpan={4}>
                    Keine Patienten gefunden.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((p, idx) => (
                  <tr
                    key={String(p.id)}
                    onClick={() => router.push(`/patients/${p.id}`)}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} cursor-pointer hover:bg-black/5`}
                  >
                    <td className="px-5 py-3 font-medium text-gray-900">
                      <Link
                        href={`/patients/${p.id}`}
                        className="hover:underline underline-offset-4"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {p.firstName} {p.lastName}
                      </Link>
                    </td>
                    <td className="px-5 py-3">{p.email}</td>
                    <td className="px-5 py-3">{p.phone ? p.phone : "—"}</td>
                    <td className="px-5 py-3">{formatDateTime(p.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t px-5 py-3 text-xs text-gray-500">
          Hinweis: Diese Suche ist clientseitig (schnell). Später können wir auf Paginierung + serverseitige Filter erweitern.
        </div>
      </div>

      {/* Modal Create */}
      <Modal
        isOpen={isCreateOpen}
        title="Neuer Patient"
        onClose={() => setIsCreateOpen(false)}
        size="md"
      >
        <PatientForm
          initialValues={{
            name: "",
            email: "",
            phone: "",
            birthDate: "",
            insurancePlan: "",
          }}
          onSubmit={handleCreatePatient}
          onCancel={() => setIsCreateOpen(false)}
          submitLabel="Speichern"
        />
      </Modal>

      <AdminAppointmentsSection />
      <AdminContactMessagesSection messages={contactMessages} />
    </div>
  );
}
