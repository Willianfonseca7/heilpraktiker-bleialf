"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminAppointment, AppointmentStatus } from "@/types/user";
import {
  getAdminAppointments,
  updateAppointmentStatus,
} from "@/lib/admin-appointments-api";
import AdminAppointmentCard from "@/components/appointments/AdminAppointmentCard";

export default function AdminAppointmentsSection() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadAppointments() {
      try {
        const data = await getAdminAppointments();
        if (!active) return;
        setAppointments(data);
      } catch (error) {
        if (!active) return;
        toast.error(
          error instanceof Error
            ? error.message
            : "Terminanfragen konnten nicht geladen werden."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAppointments();

    return () => {
      active = false;
    };
  }, []);

  const pendingAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.status === "PENDING"),
    [appointments]
  );

  const processedAppointments = useMemo(
    () => appointments.filter((appointment) => appointment.status !== "PENDING"),
    [appointments]
  );

  const handleStatusChange = async (
    id: string,
    status: AppointmentStatus
  ) => {
    setUpdatingId(id);

    try {
      const { appointment } = await updateAppointmentStatus(id, { status });
      setAppointments((current) =>
        current.map((item) => (item.id === id ? appointment : item))
      );
      toast.success("Status der Anfrage aktualisiert.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Status konnte nicht aktualisiert werden."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <section className="mt-10 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Terminanfragen
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Hier koennen ADMIN und SUPERADMIN neue Anfragen annehmen oder ablehnen.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Offene Terminanfragen
          </h3>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            {pendingAppointments.length} offen
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
            Terminanfragen werden geladen...
          </div>
        ) : pendingAppointments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
            Aktuell liegen keine offenen Terminanfragen vor.
          </div>
        ) : (
          <div className="grid gap-4">
            {pendingAppointments.map((appointment) => (
              <AdminAppointmentCard
                key={appointment.id}
                appointment={appointment}
                updating={updatingId === appointment.id}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">
          Bearbeitete Anfragen
        </h3>

        {!loading && processedAppointments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
            Noch keine bearbeiteten Anfragen vorhanden.
          </div>
        ) : (
          <div className="grid gap-4">
            {processedAppointments.map((appointment) => (
              <AdminAppointmentCard
                key={appointment.id}
                appointment={appointment}
                updating={updatingId === appointment.id}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
