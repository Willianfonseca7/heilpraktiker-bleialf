"use client";

import { useState } from "react";
import AppointmentRequestModal from "@/components/appointments/AppointmentRequestModal";
import type { HealthCheckResult } from "@/features/health-check/types";

type ResultSummaryCardProps = {
  result: HealthCheckResult;
  firstName?: string;
};

const levelLabels: Record<HealthCheckResult["level"], string> = {
  low: "Geringe Belastung",
  medium: "Mittlere Belastung",
  high: "Hohe Belastung",
};

const categoryLabels: Record<keyof HealthCheckResult["categoryScores"], string> = {
  stress: "Stress",
  sleep: "Schlaf",
  digestion: "Verdauung",
  pain: "Schmerzen",
  energy: "Energie",
  immune: "Immunsystem",
};

export default function ResultSummaryCard({
  result,
  firstName,
}: ResultSummaryCardProps) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const topCategories = Object.entries(result.categoryScores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, score]) => score > 0)
    .slice(0, 3);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 text-left shadow-sm md:p-8">
      <div className="space-y-6">
        <div className="space-y-3 text-center">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-medium text-emerald-700">
            Ergebnis freigeschaltet
          </span>

          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {firstName ? `${firstName}, hier ist Ihre Auswertung` : "Hier ist Ihre Auswertung"}
          </h2>

          <p className="mx-auto max-w-2xl text-gray-600">{result.summary}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Gesamtbewertung
            </p>
            <p className="mt-3 text-2xl font-bold text-gray-900">
              {levelLabels[result.level]}
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Score: {result.totalScore} Punkte
            </p>
          </div>

          <div className="rounded-2xl bg-teal-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
              Auffällige Bereiche
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topCategories.length > 0 ? (
                topCategories.map(([category, score]) => (
                  <span
                    key={category}
                    className="rounded-full bg-white px-3 py-1 text-sm font-medium text-teal-800"
                  >
                    {categoryLabels[category as keyof HealthCheckResult["categoryScores"]]} ({score})
                  </span>
                ))
              ) : (
                <span className="text-sm text-teal-800">
                  Keine auffälligen Bereiche.
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Empfohlene nächste Schritte
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Auf Wunsch koennen Sie direkt eine passende Beratung anfragen.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAppointmentOpen(true)}
              className="inline-flex rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Termin online buchen
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {result.recommendations.map((recommendation) => (
              <li
                key={recommendation}
                className="rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900"
              >
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AppointmentRequestModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        defaultTreatment={result.recommendations[0]}
        preferredTreatments={result.recommendations}
      />
    </div>
  );
}
