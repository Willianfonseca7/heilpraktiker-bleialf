import type { CurrentUser, UpdateOwnProfilePayload, User } from "@/types/user";

class AccountApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AccountApiError";
    this.status = status;
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.error || data?.message || "Ein Fehler ist aufgetreten.";
    throw new AccountApiError(message, res.status);
  }

  return data as T;
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    cache: "no-store",
  });

  const data = await parseJson<{ user: CurrentUser }>(res);
  return data.user;
}

export async function updateCurrentUser(
  payload: UpdateOwnProfilePayload
): Promise<CurrentUser> {
  const res = await fetch("/api/auth/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<{ user: User }>(res);
  return data.user;
}
