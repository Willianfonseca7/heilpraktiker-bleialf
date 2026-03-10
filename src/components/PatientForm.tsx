import { useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type PatientFormValues = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  insurancePlan: string;
};

const INSURANCE_OPTIONS = [
  { value: "", label: "Bitte auswählen..." },
  { value: "gesetzlich", label: "Gesetzlich (GKV)" },
  { value: "privat", label: "Privat (PKV)" },
  { value: "selbstzahler", label: "Selbstzahler" },
];

function validate(values: PatientFormValues) {
  const errors: Partial<Record<keyof PatientFormValues, string>> = {};

  if (!values.name.trim()) {
    errors.name = "Name ist erforderlich.";
  } else if (values.name.trim().split(/\s+/).length < 2) {
    errors.name = "Bitte Vor- und Nachname eingeben.";
  }
  if (!values.email.trim()) errors.email = "E-Mail ist erforderlich.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Ungültige E-Mail.";

  // Telefon optional, aber falls vorhanden, Mindestlänge prüfen
  if (values.phone && values.phone.replace(/\s/g, "").length < 6)
    errors.phone = "Telefon scheint ungültig.";

  if (!values.birthDate) errors.birthDate = "Geburtsdatum ist erforderlich.";
  if (!values.insurancePlan) errors.insurancePlan = "Bitte Krankenversicherung auswählen.";

  return errors;
}

export default function PatientForm({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Speichern",
}: {
  initialValues?: Partial<PatientFormValues>;
  onSubmit?: (values: PatientFormValues) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}) {
  const defaults = useMemo(
    () => ({
      name: "",
      email: "",
      phone: "",
      birthDate: "", // yyyy-mm-dd
      insurancePlan: "",
      ...initialValues,
    }),
    [initialValues]
  );

  const [values, setValues] = useState<PatientFormValues>(defaults);
  const [errors, setErrors] = useState<Partial<Record<keyof PatientFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField =
    (field: keyof PatientFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    try {
      setIsSubmitting(true);
      await onSubmit?.(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          value={values.name}
          onChange={setField("name")}
          className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
            errors.name ? "border-red-300 focus:ring-red-200" : "focus:ring-emerald-200"
          }`}
          placeholder="z. B. Pedro Silva"
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
        ) : null}
      </div>

      {/* E-Mail */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          E-Mail
        </label>
        <input
          value={values.email}
          onChange={setField("email")}
          className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
            errors.email ? "border-red-300 focus:ring-red-200" : "focus:ring-emerald-200"
          }`}
          placeholder="z. B. patient@email.com"
        />
        {errors.email ? (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        ) : null}
      </div>

      {/* Telefon */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Telefon (optional)
        </label>
        <input
          value={values.phone}
          onChange={setField("phone")}
          className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
            errors.phone ? "border-red-300 focus:ring-red-200" : "focus:ring-emerald-200"
          }`}
          placeholder="z. B. +49 176 12345678"
        />
        {errors.phone ? (
          <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
        ) : null}
      </div>

      {/* 2 Spalten */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Geburtsdatum */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Geburtsdatum
          </label>
          <input
            type="date"
            value={values.birthDate}
            onChange={setField("birthDate")}
            className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
              errors.birthDate
                ? "border-red-300 focus:ring-red-200"
                : "focus:ring-emerald-200"
            }`}
          />
          {errors.birthDate ? (
            <p className="mt-1 text-xs text-red-600">{errors.birthDate}</p>
          ) : null}
        </div>

        {/* Krankenversicherung */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Krankenversicherung
          </label>
          <select
            value={values.insurancePlan}
            onChange={setField("insurancePlan")}
            className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 ${
              errors.insurancePlan
                ? "border-red-300 focus:ring-red-200"
                : "focus:ring-emerald-200"
            }`}
          >
            {INSURANCE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.insurancePlan ? (
            <p className="mt-1 text-xs text-red-600">{errors.insurancePlan}</p>
          ) : null}
        </div>
      </div>

      {/* Aktionen */}
      <div className="flex items-center justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Abbrechen
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {isSubmitting ? "Speichern..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
