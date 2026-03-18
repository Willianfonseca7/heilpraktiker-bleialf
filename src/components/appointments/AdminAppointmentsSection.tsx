"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import type { AdminAppointment, AppointmentStatus } from "@/types/user";
import {
  appointmentFilterLabels as filterLabels,
  appointmentFilterOrder as filterOrder,
} from "@/lib/appointment-status";
import {
  getAdminAppointments,
  updateAppointmentStatus,
} from "@/lib/admin-appointments-api";
import AdminAppointmentCard from "@/components/appointments/AdminAppointmentCard";

type AppointmentFilter = "ALL" | AppointmentStatus;
type AppointmentSortOrder = "DESC" | "ASC";

export default function AdminAppointmentsSection() {
  const INITIAL_VISIBLE_COUNT = 3;
  const LOAD_MORE_STEP = 3;
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<AppointmentFilter>("PENDING");
  const [sortOrder, setSortOrder] = useState<AppointmentSortOrder>("DESC");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

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

  const statusCounts = useMemo(
    () => ({
      ALL: appointments.length,
      PENDING: appointments.filter((appointment) => appointment.status === "PENDING").length,
      CONFIRMED: appointments.filter((appointment) => appointment.status === "CONFIRMED").length,
      CANCELED: appointments.filter((appointment) => appointment.status === "CANCELED").length,
    }),
    [appointments]
  );

  const visibleAppointments = useMemo(() => {
    let next = [...appointments];

    if (statusFilter !== "ALL") {
      next = next.filter((appointment) => appointment.status === statusFilter);
    }

    next.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();

      return sortOrder === "DESC" ? bTime - aTime : aTime - bTime;
    });

    return next;
  }, [appointments, sortOrder, statusFilter]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [sortOrder, statusFilter]);

  const displayedAppointments = useMemo(() => {
    if (statusFilter === "ALL") {
      return visibleAppointments.slice(0, visibleCount);
    }

    return visibleAppointments;
  }, [statusFilter, visibleAppointments, visibleCount]);

  const canLoadMore =
    statusFilter === "ALL" && visibleAppointments.length > displayedAppointments.length;

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

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {filterOrder.map((filter) => {
              const active = statusFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {filterLabels[filter]}
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {statusCounts[filter]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="text-sm font-medium text-slate-600" htmlFor="appointment-sort-order">
              Sortierung
            </label>
            <select
              id="appointment-sort-order"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value as AppointmentSortOrder)
              }
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="DESC">Neueste zuerst</option>
              <option value="ASC">Älteste zuerst</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Übersicht der Terminanfragen
            </h3>
            <p className="text-sm text-slate-500">
              {statusFilter === "ALL"
                ? "Alle Anfragen im aktuellen Systemstatus."
                : `Gefiltert nach: ${filterLabels[statusFilter]}.`}
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {visibleAppointments.length} Einträge
          </span>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
            Terminanfragen werden geladen...
          </div>
        ) : visibleAppointments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
            Für diesen Filter liegen aktuell keine Terminanfragen vor.
          </div>
        ) : (
          <div className="grid gap-4">
            {displayedAppointments.map((appointment) => (
              <AdminAppointmentCard
                key={appointment.id}
                appointment={appointment}
                updating={updatingId === appointment.id}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}

        {canLoadMore ? (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((current) => current + LOAD_MORE_STEP)
              }
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
            >
              Mehr laden (
              {Math.min(
                LOAD_MORE_STEP,
                visibleAppointments.length - displayedAppointments.length
              )}
              )
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
