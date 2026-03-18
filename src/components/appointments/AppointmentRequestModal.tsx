"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AppointmentApiError,
  createAppointment,
  getUnavailableAppointmentSlots,
} from "@/lib/appointments-api";
import AuthModal, { type AuthMode } from "@/components/auth/AuthModal";
import { getCurrentUser } from "@/lib/account-api";
import {
  clinicTreatments,
  getPractitionersForTreatment,
  getPreferredClinicTreatment,
} from "@/data/clinic-offerings";
import {
  APPOINTMENT_TIME_SLOTS,
  createLocalDateTime,
} from "@/lib/appointment-slots";

function getTodayDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

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
  const router = useRouter();
  const [treatment, setTreatment] = useState(defaultTreatment ?? clinicTreatments[0]);
  const [doctor, setDoctor] = useState("");
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("register");
  const [pendingPayload, setPendingPayload] = useState<Parameters<typeof createAppointment>[0] | null>(null);
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
    setSelectedDate(getTodayDateValue());
    setSelectedTime("");
    setUnavailableSlots([]);
    setPendingPayload(null);
  }, [defaultTreatment, isOpen, preferredTreatments]);

  useEffect(() => {
    if (!isOpen) return;

    const nextDoctor = doctorOptions[0]?.name ?? "";
    if (!doctorOptions.some((option) => option.name === doctor)) {
      setDoctor(nextDoctor);
    }
  }, [doctor, doctorOptions, isOpen]);

  useEffect(() => {
    if (!isOpen || !doctor || !selectedDate) return;

    let active = true;
    setLoadingSlots(true);

    getUnavailableAppointmentSlots(doctor, selectedDate)
      .then((slots) => {
        if (!active) return;
        setUnavailableSlots(slots);
      })
      .catch(() => {
        if (!active) return;
        setUnavailableSlots([]);
      })
      .finally(() => {
        if (active) {
          setLoadingSlots(false);
        }
      });

    return () => {
      active = false;
    };
  }, [doctor, isOpen, selectedDate]);

  useEffect(() => {
    if (!selectedTime) return;

    if (unavailableSlots.includes(selectedTime)) {
      setSelectedTime("");
    }
  }, [selectedTime, unavailableSlots]);

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

    if (!selectedDate) {
      toast.error("Bitte waehlen Sie ein Datum aus.");
      return;
    }

    if (!selectedTime) {
      toast.error("Bitte waehlen Sie eine Uhrzeit aus.");
      return;
    }

    if (unavailableSlots.includes(selectedTime)) {
      toast.error("Dieser Termin ist inzwischen nicht mehr verfuegbar.");
      return;
    }

    const scheduledAt = createLocalDateTime(selectedDate, selectedTime);

    if (Number.isNaN(scheduledAt.getTime())) {
      toast.error("Der gewaehlte Termin ist ungueltig.");
      return;
    }

    const payload = {
      treatment: treatment.trim(),
      doctor: doctor.trim(),
      message: message.trim() || undefined,
      scheduledAt: scheduledAt.toISOString(),
    };

    setSubmitting(true);

    try {
      await createAppointment(payload);

      toast.success("Ihre Terminanfrage wurde gespeichert.");
      onClose();
    } catch (error) {
      if (error instanceof AppointmentApiError && error.status === 401) {
        setPendingPayload(payload);
        setAuthMode("register");
        setAuthOpen(true);
        toast.info("Bitte registrieren Sie sich, um den Termin abzuschließen.");
        return;
      }

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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-4 md:items-center md:py-8">
      <button
        type="button"
        aria-label="Modal schließen"
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          if (!submitting) onClose();
        }}
      />

      <div className="relative z-10 flex w-full max-w-xl max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-2xl md:max-h-[calc(100vh-4rem)] md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4 shrink-0">
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

        <form className="flex min-h-0 flex-1 flex-col overflow-hidden" onSubmit={handleSubmit}>
          <div className="space-y-4 overflow-y-auto pr-1">
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

          <div className="grid gap-4 md:grid-cols-[minmax(0,220px)_minmax(0,1fr)]">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Wunschdatum
              </label>
              <input
                type="date"
                value={selectedDate}
                min={getTodayDateValue()}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600"
              />
              <p className="text-xs text-slate-500">
                Bitte waehlen Sie den Tag, an dem Sie den Termin bevorzugen.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Uhrzeit
              </label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {APPOINTMENT_TIME_SLOTS.map((slot) => {
                  const selected = slot === selectedTime;
                  const unavailable = unavailableSlots.includes(slot);

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={unavailable || loadingSlots}
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                        unavailable
                          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                          : selected
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500">
                Jeder Slot entspricht 30 Minuten. Die finale Bestaetigung
                erfolgt durch unser Team.
              </p>
              {loadingSlots ? (
                <p className="text-xs text-slate-500">Verfuegbare Zeiten werden geladen...</p>
              ) : null}
            </div>
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
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 w-full shrink-0 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            {submitting ? "Wird gesendet..." : "Termin anfragen"}
          </button>
        </form>
      </div>

      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        onClose={() => {
          if (submitting) return;
          setAuthOpen(false);
        }}
        onSwitchMode={setAuthMode}
        onAuthSuccess={async () => {
          if (!pendingPayload) {
            setAuthOpen(false);
            router.refresh();
            return;
          }

          setSubmitting(true);

          try {
            await getCurrentUser();
            await createAppointment(pendingPayload);
            toast.success("Ihre Terminanfrage wurde gespeichert.");
            setPendingPayload(null);
            setAuthOpen(false);
            router.refresh();
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
        }}
      />
    </div>
  );
}
