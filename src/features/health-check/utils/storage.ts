import type {
  AnswersMap,
  HealthCheckResult,
  StoredHealthCheckSession,
} from "../types";

const HEALTH_CHECK_ANSWERS_KEY = "health-check-answers";
const HEALTH_CHECK_RESULT_KEY = "health-check-result";
const HEALTH_CHECK_CLIENT_RESULT_ID_KEY = "health-check-client-result-id";
const HEALTH_CHECK_PERSISTED_RESULT_ID_KEY = "health-check-persisted-result-id";

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

export function saveHealthCheckClientResultId(clientResultId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HEALTH_CHECK_CLIENT_RESULT_ID_KEY, clientResultId);
}

export function getHealthCheckClientResultId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(HEALTH_CHECK_CLIENT_RESULT_ID_KEY);
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

export function savePersistedHealthCheckResultId(resultId: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(HEALTH_CHECK_PERSISTED_RESULT_ID_KEY, resultId);
}

export function getPersistedHealthCheckResultId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(HEALTH_CHECK_PERSISTED_RESULT_ID_KEY);
}

export function getStoredHealthCheckSession(): StoredHealthCheckSession | null {
  const answers = getHealthCheckAnswers();
  const result = getHealthCheckResult();
  const clientResultId = getHealthCheckClientResultId();

  if (!answers || !result || !clientResultId) {
    return null;
  }

  return {
    clientResultId,
    answers,
    result,
    persistedResultId: getPersistedHealthCheckResultId(),
  };
}

export function clearHealthCheckStorage() {
  if (typeof window === "undefined") return;

  sessionStorage.removeItem(HEALTH_CHECK_ANSWERS_KEY);
  sessionStorage.removeItem(HEALTH_CHECK_RESULT_KEY);
  sessionStorage.removeItem(HEALTH_CHECK_CLIENT_RESULT_ID_KEY);
  sessionStorage.removeItem(HEALTH_CHECK_PERSISTED_RESULT_ID_KEY);
}
