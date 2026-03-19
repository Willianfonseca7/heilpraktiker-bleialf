"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { HealthCheckResult } from "@/features/health-check/types";
import {
  getStoredHealthCheckSession,
  savePersistedHealthCheckResultId,
} from "@/features/health-check/utils/storage";
import LockedResultCard from "@/components/health-check/LockedResultCard";
import ResultSummaryCard from "@/components/health-check/ResultSummaryCard";
import { saveHealthCheckResult as persistHealthCheckResult } from "@/lib/health-check-api";

type SessionUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  isActive: boolean;
};

export default function GesundheitsCheckResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<HealthCheckResult | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [sessionResolved, setSessionResolved] = useState(false);
  const [isPersisting, setIsPersisting] = useState(false);

  useEffect(() => {
    const storedSession = getStoredHealthCheckSession();

    if (!storedSession) {
      router.replace("/gesundheits-check");
      return;
    }

    setResult(storedSession.result);
  }, [router]);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          cache: "no-store",
        });

        if (!active) return;

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = (await response.json()) as { user?: SessionUser };
        setUser(data.user ?? null);
      } catch {
        if (!active) return;
        setUser(null);
      } finally {
        if (active) {
          setSessionResolved(true);
        }
      }
    }

    loadSession();

    return () => {
      active = false;
    };
  }, []);

  const handleAuthenticated = async () => {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      setUser(null);
      return;
    }

    const data = (await response.json()) as { user?: SessionUser };
    setUser(data.user ?? null);
    router.refresh();
  };

  useEffect(() => {
    let active = true;

    async function persistCurrentResult() {
      if (!user || isPersisting) return;

      const storedSession = getStoredHealthCheckSession();
      if (!storedSession || storedSession.persistedResultId) return;

      try {
        setIsPersisting(true);

        const saved = await persistHealthCheckResult({
          clientResultId: storedSession.clientResultId,
          answers: storedSession.answers,
          result: storedSession.result,
        });

        if (!active) return;
        savePersistedHealthCheckResultId(saved.id);
      } catch {
        if (!active) return;
      } finally {
        if (active) {
          setIsPersisting(false);
        }
      }
    }

    persistCurrentResult();

    return () => {
      active = false;
    };
  }, [user, isPersisting]);

  if (!result) {
    return null;
  }

  if (!sessionResolved) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <section className="mx-auto max-w-4xl space-y-6 text-center">
        <div className="space-y-3">
          <span className="inline-flex rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-700">
            Gesundheits-Check Ergebnis
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Ihre persönliche Auswertung ist fertig
          </h1>

          <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
            Auf Basis Ihrer Antworten wurde eine erste ganzheitliche Einschätzung
            erstellt.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/"
            className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            Zur Startseite
          </Link>
        </div>

        {user ? (
          <ResultSummaryCard result={result} firstName={user.firstName} />
        ) : (
          <LockedResultCard
            previewText={result.summary}
            onAuthenticated={handleAuthenticated}
          />
        )}
      </section>
    </main>
  );
}
