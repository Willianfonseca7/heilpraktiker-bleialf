"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { UserRole } from "@/types/user";

export type UserAccountFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
};

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<UserAccountFormValues>;
  submitting: boolean;
  onSubmit: (values: UserAccountFormValues) => void;
  onCancel: () => void;
  showRoleField?: boolean;
  showActiveField?: boolean;
  roleOptions?: UserRole[];
  submitLabel?: string;
};

function buildFormValues(
  mode: "create" | "edit",
  initialData?: Partial<UserAccountFormValues>
): UserAccountFormValues {
  return {
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    email: initialData?.email ?? "",
    password: "",
    role: initialData?.role ?? "ADMIN",
    isActive: initialData?.isActive ?? true,
  };
}

export default function UserAccountForm({
  mode,
  initialData,
  submitting,
  onSubmit,
  onCancel,
  showRoleField = true,
  showActiveField = true,
  roleOptions = ["ADMIN", "SUPERADMIN"],
  submitLabel,
}: Props) {
  const [form, setForm] = useState<UserAccountFormValues>(
    buildFormValues(mode, initialData)
  );

  useEffect(() => {
    setForm(buildFormValues(mode, initialData));
  }, [mode, initialData]);

  const setField =
    (field: keyof UserAccountFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        field === "isActive"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value as never }));
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Vorname
          </label>
          <input
            type="text"
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Max"
            value={form.firstName}
            onChange={setField("firstName")}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nachname
          </label>
          <input
            type="text"
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Mustermann"
            value={form.lastName}
            onChange={setField("lastName")}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          E-Mail
        </label>
        <input
          type="email"
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
          placeholder="admin@example.com"
          value={form.email}
          onChange={setField("email")}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Passwort {mode === "edit" ? "(optional)" : ""}
        </label>
        <input
          type="password"
          className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
          placeholder={mode === "edit" ? "Neues Passwort" : "Passwort"}
          value={form.password}
          onChange={setField("password")}
          required={mode === "create"}
        />
      </div>

      {showRoleField || showActiveField ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {showRoleField ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Rolle
              </label>
              <select
                className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
                value={form.role}
                onChange={setField("role")}
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div />
          )}

          {showActiveField ? (
            <div className="flex items-center gap-2 pt-6">
              <input
                id="active"
                type="checkbox"
                checked={form.isActive}
                onChange={setField("isActive")}
                className="h-4 w-4 rounded border-slate-300 text-slate-900"
              />
              <label htmlFor="active" className="text-sm text-slate-700">
                Aktiv
              </label>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting
            ? mode === "edit"
              ? "Speichern..."
              : "Erstellen..."
            : submitLabel ??
              (mode === "edit" ? "Speichern" : "Admin erstellen")}
        </button>
      </div>
    </form>
  );
}
