export type UserRole = "SUPERADMIN" | "ADMIN" | "USER";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  sessionExpiresAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CurrentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

export type CreateAdminPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "SUPERADMIN" | "ADMIN";
  isActive?: boolean;
};

export type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
};

export type UpdateOwnProfilePayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
};
