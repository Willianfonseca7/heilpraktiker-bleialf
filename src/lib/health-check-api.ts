import type {
  AnswersMap,
  HealthCheckResult,
  PersistedHealthCheckResult,
} from "@/features/health-check/types";

class HealthCheckApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "HealthCheckApiError";
    this.status = status;
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.error || data?.message || "Ein Fehler ist aufgetreten.";
    throw new HealthCheckApiError(message, res.status);
  }

  return data as T;
}

export async function saveHealthCheckResult(params: {
  clientResultId: string;
  answers: AnswersMap;
  result: HealthCheckResult;
}): Promise<PersistedHealthCheckResult> {
  const res = await fetch("/api/health-check-results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const data = await parseJson<{ result: PersistedHealthCheckResult }>(res);
  return data.result;
}

export async function getOwnHealthCheckResults(): Promise<PersistedHealthCheckResult[]> {
  const res = await fetch("/api/health-check-results", {
    method: "GET",
    cache: "no-store",
  });

  const data = await parseJson<{ results: PersistedHealthCheckResult[] }>(res);
  return data.results;
}
