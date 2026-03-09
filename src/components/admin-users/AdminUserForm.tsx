import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { UserRole } from "@/types/user";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
};

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<FormValues>;
  submitting: boolean;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
};

export default function AdminUserForm({
  mode,
  initialData,
  submitting,
  onSubmit,
  onCancel,
}: Props) {
  const values: FormValues = {
    firstName: initialData?.firstName ?? "",
    lastName: initialData?.lastName ?? "",
    email: initialData?.email ?? "",
    password: "",
    role: initialData?.role ?? "ADMIN",
    isActive: initialData?.isActive ?? true,
  };

  const [form, setForm] = useState<FormValues>(values);

  const setField =
    (field: keyof FormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        field === "isActive"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value as any }));
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Rolle
          </label>
          <select
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-slate-200"
            value={form.role}
            onChange={setField("role")}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="SUPERADMIN">SUPERADMIN</option>
          </select>
        </div>

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
      </div>

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
            : mode === "edit"
            ? "Speichern"
            : "Admin erstellen"}
        </button>
      </div>
    </form>
  );
}
