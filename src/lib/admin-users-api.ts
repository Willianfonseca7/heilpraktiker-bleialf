import type { CreateAdminPayload, UpdateUserPayload, User } from "@/types/user";

export class AdminUsersApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminUsersApiError";
    this.status = status;
  }
}

async function parseJson<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.error || data?.message || "Ein Fehler ist aufgetreten.";
    throw new AdminUsersApiError(message, res.status);
  }

  return data as T;
}

export async function getUsers(): Promise<User[]> {
  const res = await fetch("/api/users", {
    method: "GET",
    cache: "no-store",
  });

  const data = await parseJson<{ data: User[] }>(res);
  return data.data ?? [];
}

export async function createAdmin(payload: CreateAdminPayload): Promise<User> {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJson<{ created: User }>(res);
  return data.created;
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload
): Promise<User> {
  const res = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseJson<User>(res);
}

export async function deleteUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (res.status === 204) return;
  await parseJson<{ success: true }>(res);
}
