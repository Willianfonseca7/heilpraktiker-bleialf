"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createAppointment } from "@/lib/appointments-api";
import {
  clinicTreatments,
  getPractitionersForTreatment,
  getPreferredClinicTreatment,
} from "@/data/clinic-offerings";

type AppointmentRequestModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultTreatment?: string;
  preferredTreatments: string[];
};

export default function AppointmentRequestModal({
  isOpen,
  onClose,
  defaultTreatment,
  preferredTreatments,
}: AppointmentRequestModalProps) {
  const [treatment, setTreatment] = useState(defaultTreatment ?? clinicTreatments[0]);
  const [doctor, setDoctor] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const doctorOptions = useMemo(
    () => getPractitionersForTreatment(treatment),
    [treatment]
  );

  useEffect(() => {
    if (!isOpen) return;
    const initialTreatment = defaultTreatment
      ? getPreferredClinicTreatment([defaultTreatment, ...preferredTreatments])
      : getPreferredClinicTreatment(preferredTreatments);

    setTreatment(initialTreatment);
    setMessage("");
  }, [defaultTreatment, isOpen, preferredTreatments]);

  useEffect(() => {
    if (!isOpen) return;

    const nextDoctor = doctorOptions[0]?.name ?? "";
    if (!doctorOptions.some((option) => option.name === doctor)) {
      setDoctor(nextDoctor);
    }
  }, [doctor, doctorOptions, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !submitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [isOpen, onClose, submitting]);

  if (!isOpen) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!treatment.trim()) {
      toast.error("Bitte waehlen Sie eine Behandlung aus.");
      return;
    }

    setSubmitting(true);

    try {
      await createAppointment({
        treatment: treatment.trim(),
        doctor: doctor.trim(),
        message: message.trim() || undefined,
      });

      toast.success("Ihre Terminanfrage wurde gespeichert.");
      onClose();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Terminanfrage konnte nicht gespeichert werden.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Modal schließen"
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          if (!submitting) onClose();
        }}
      />

      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
              Terminanfrage
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Beratung anfragen
            </h2>
            <p className="text-sm text-slate-600">
              Senden Sie uns Ihren Wunsch. Ihre Anfrage wird Ihrem Benutzerkonto
              zugeordnet und kann spaeter im Bereich Mein Konto eingesehen werden.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (!submitting) onClose();
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
          >
            ✕
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Behandlung
            </label>
            <select
              value={treatment}
              onChange={(event) => setTreatment(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600"
            >
              {clinicTreatments.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {preferredTreatments.length > 0 ? (
              <p className="text-xs text-slate-500">
                Basierend auf Ihrem Check empfehlen wir besonders:{" "}
                {preferredTreatments.join(", ")}.
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Passender Behandler
            </label>
            <select
              value={doctor}
              onChange={(event) => setDoctor(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600"
            >
              {doctorOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              Der Behandler wird automatisch passend zur gewaehlten Behandlung
              vorgeschlagen.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Nachricht
            </label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Beschreiben Sie kurz Ihr Anliegen oder Ihre Terminwuensche."
              rows={5}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {submitting ? "Wird gesendet..." : "Termin anfragen"}
          </button>
        </form>
      </div>
    </div>
  );
}
