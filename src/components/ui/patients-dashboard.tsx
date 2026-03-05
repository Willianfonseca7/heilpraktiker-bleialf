"use client";

import { useMemo, useState } from "react";

type PatientDTO = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  createdAt: string; // ISO
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export default function PatientsDashboard({
  patients,
  total,
}: {
  patients: PatientDTO[];
  total: number;
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return patients;

    return patients.filter((p) => {
      const full = `${p.firstName} ${p.lastName}`.toLowerCase();
      const email = (p.email ?? "").toLowerCase();
      const phone = (p.phone ?? "").toLowerCase();
      return full.includes(s) || email.includes(s) || phone.includes(s);
    });
  }, [patients, q]);

  const newToday = useMemo(
    () => patients.filter((p) => isToday(p.createdAt)).length,
    [patients]
  );

  const last = patients[0]; // já vem orderBy desc

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Patients Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Gestão rápida de pacientes (demo)
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total pacientes</p>
          <p className="text-3xl font-semibold mt-1">{total}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Novos hoje</p>
          <p className="text-3xl font-semibold mt-1">{newToday}</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Último cadastro</p>
          <p className="text-base font-semibold mt-1">
            {last ? `${last.firstName} ${last.lastName}` : "—"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {last ? formatDate(last.createdAt) : ""}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xl">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, email ou telefone"
            className="w-full rounded-xl border border-gray-200 bg-white px-10 py-2.5 text-sm shadow-sm outline-none focus:border-gray-300 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
        <span className="text-sm text-gray-500">{filtered.length} resultado(s)</span>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-gray-50 border-b text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 text-left">Nome</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Telefone</th>
                <th className="px-5 py-3 text-left">Criado em</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((p, idx) => (
                <tr
                  key={p.id}
                  className={idx % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"}
                >
                  <td className="px-5 py-3 font-medium text-gray-900">
                    {p.firstName} {p.lastName}
                  </td>
                  <td className="px-5 py-3 text-gray-600">{p.email ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">{p.phone ?? "—"}</td>
                  <td className="px-5 py-3 text-gray-600">
                    {formatDate(p.createdAt)}
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td className="p-6 text-gray-500" colSpan={4}>
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t p-3 text-xs text-gray-500">
          Dica: essa busca é client-side (rápida). Depois podemos evoluir pra
          paginação + filtros server-side.
        </div>
      </div>
    </div>
  );
}
