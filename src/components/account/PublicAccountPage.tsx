"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UserAccountForm, {
  type UserAccountFormValues,
} from "@/components/account/UserAccountForm";
import { getCurrentUser, updateCurrentUser } from "@/lib/account-api";
import {
  getOwnAppointments,
  markAppointmentUpdatesAsSeen,
} from "@/lib/appointments-api";
import { getOwnHealthCheckResults } from "@/lib/health-check-api";
import {
  appointmentStatusClasses,
  appointmentStatusLabels,
} from "@/lib/appointment-status";
import { formatAppointmentDateTime } from "@/lib/date-format";
import type { PersistedHealthCheckResult } from "@/features/health-check/types";
import type { Appointment, CurrentUser } from "@/types/user";

export default function PublicAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [results, setResults] = useState<PersistedHealthCheckResult[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [currentUser, ownResults, ownAppointments] = await Promise.all([
          getCurrentUser(),
          getOwnHealthCheckResults(),
          getOwnAppointments(),
        ]);

        if (!active) return;

        setUser(currentUser);
        setResults(ownResults);
        setAppointments(ownAppointments);

        if (ownAppointments.some((appointment) => appointment.userHasUnreadStatusUpdate)) {
          markAppointmentUpdatesAsSeen()
            .then(() => {
              if (!active) return;

              setAppointments((currentAppointments) =>
                currentAppointments.map((appointment) => ({
                  ...appointment,
                  userHasUnreadStatusUpdate: false,
                }))
              );
              setUser((currentUserState) =>
                currentUserState
                  ? {
                      ...currentUserState,
                      pendingAppointmentUpdates: 0,
                    }
                  : currentUserState
              );
              window.dispatchEvent(new CustomEvent("appointment-notifications-cleared"));
            })
            .catch(() => undefined);
        }
      } catch (error) {
        if (!active) return;
        const message =
          error instanceof Error
            ? error.message
            : "Daten konnten nicht geladen werden.";
        toast.error(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (values: UserAccountFormValues) => {
    setSubmitting(true);

    try {
      const updated = await updateCurrentUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password.trim() || undefined,
      });

      setUser(updated);
      toast.success("Profil erfolgreich aktualisiert.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Profil konnte nicht aktualisiert werden.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Abmeldung fehlgeschlagen.");
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm text-slate-500">Mein Konto wird geladen...</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-sm text-rose-600">Benutzerdaten konnten nicht geladen werden.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 space-y-3">
        <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
          Mein Konto
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Willkommen, {user.firstName}
        </h1>
        <p className="max-w-2xl text-base text-slate-600">
          Hier koennen Sie Ihre Profildaten aktualisieren und Ihre bisherigen
          Ergebnisse aus dem Gesundheits-Check einsehen.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loggingOut ? "Wird abgemeldet..." : "Abmelden"}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Profil</h2>
            <p className="mt-2 text-sm text-slate-500">
              Aenderungen werden direkt in Ihrem Benutzerkonto gespeichert.
            </p>
          </div>

          <UserAccountForm
            mode="edit"
            initialData={user}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={() => undefined}
            showRoleField={false}
            showActiveField={false}
            submitLabel="Profil speichern"
            showCancelButton={false}
          />
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Ihre Gesundheits-Checks
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Hier sehen Sie die Ergebnisse aller gespeicherten Auswertungen.
              </p>
            </div>

            {results.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 px-5 py-6 text-sm text-slate-500">
                Noch keine gespeicherten Ergebnisse vorhanden.
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result) => (
                  <article
                    key={result.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-900">
                        Gesundheits-Check vom{" "}
                        {new Date(result.createdAt).toLocaleDateString("de-DE")}
                      </h3>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700">
                        Score: {result.totalScore}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {result.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {result.recommendations.map((recommendation) => (
                        <span
                          key={recommendation}
                          className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                        >
                          {recommendation}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Ihre Terminanfragen
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Hier sehen Sie Ihre bisher gespeicherten Anfragen.
              </p>
            </div>

            {appointments.length === 0 ? (
              <div className="rounded-2xl bg-slate-50 px-5 py-6 text-sm text-slate-500">
                Noch keine Terminanfragen vorhanden.
              </div>
            ) : (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <article
                    key={appointment.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-900">
                        {appointment.treatment}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${appointmentStatusClasses[appointment.status]}`}
                      >
                        {appointmentStatusLabels[appointment.status]}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-600">
                      Anfrage vom{" "}
                      {new Date(appointment.createdAt).toLocaleDateString("de-DE")}
                    </p>

                    {appointment.scheduledAt ? (
                      <p className="mt-2 text-sm font-medium text-slate-700">
                        Gewaehlter Termin:{" "}
                        {formatAppointmentDateTime(appointment.scheduledAt)}
                      </p>
                    ) : null}

                    {appointment.doctor ? (
                      <p className="mt-3 text-sm text-slate-700">
                        Gewuenschter Behandler: {appointment.doctor}
                      </p>
                    ) : null}

                    {appointment.message ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {appointment.message}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
