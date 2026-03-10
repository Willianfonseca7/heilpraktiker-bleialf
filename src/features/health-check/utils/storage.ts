import type { AnswersMap, HealthCheckResult } from "../types";

const HEALTH_CHECK_ANSWERS_KEY = "health-check-answers";
const HEALTH_CHECK_RESULT_KEY = "health-check-result";

export function saveHealthCheckAnswers(answers: AnswersMap) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HEALTH_CHECK_ANSWERS_KEY, JSON.stringify(answers));
}

export function getHealthCheckAnswers(): AnswersMap | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(HEALTH_CHECK_ANSWERS_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AnswersMap;
  } catch {
    return null;
  }
}

export function saveHealthCheckResult(result: HealthCheckResult) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HEALTH_CHECK_RESULT_KEY, JSON.stringify(result));
}

export function getHealthCheckResult(): HealthCheckResult | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(HEALTH_CHECK_RESULT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as HealthCheckResult;
  } catch {
    return null;
  }
}

export function clearHealthCheckStorage() {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(HEALTH_CHECK_ANSWERS_KEY);
  sessionStorage.removeItem(HEALTH_CHECK_RESULT_KEY);
}