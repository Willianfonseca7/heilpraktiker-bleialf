"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CreateAdminPayload, UpdateUserPayload, User } from "@/types/user";
import {
  AdminUsersApiError,
  createAdmin,
  deleteUser,
  getUsers,
  updateUser,
} from "@/lib/admin-users-api";
import AdminUsersHeader from "./AdminUsersHeader";
import AdminUsersTable from "./AdminUsersTable";
import AdminUserModal from "./AdminUserModal";
import DeleteUserDialog from "./DeleteUserDialog";

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const isEdit = Boolean(editingUser);

  const handlePermissionError = (err: unknown) => {
    if (
      err instanceof AdminUsersApiError &&
      (err.status === 401 || err.status === 403)
    ) {
      router.replace("/patients");
      router.refresh();
      return true;
    }

    return false;
  };

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setFeedback(null);
    } catch (err: any) {
      if (handlePermissionError(err)) {
        return;
      }
      setFeedback(err?.message ?? "Fehler beim Laden der Admins.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const modalInitial = useMemo(() => {
    if (!editingUser) return null;
    return {
      firstName: editingUser.firstName,
      lastName: editingUser.lastName,
      email: editingUser.email,
      role: editingUser.role,
      isActive: editingUser.isActive,
    };
  }, [editingUser]);

  const handleCreateClick = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = (user: User) => {
    setDeletingUser(user);
  };

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "SUPERADMIN" | "ADMIN" | "PATIENT";
    isActive: boolean;
  }) => {
    setSubmitting(true);
    setFeedback(null);
    try {
      if (!values.firstName.trim()) {
        throw new Error("Vorname ist erforderlich.");
      }

      if (!values.lastName.trim()) {
        throw new Error("Nachname ist erforderlich.");
      }

      if (!values.email.trim()) {
        throw new Error("E-Mail ist erforderlich.");
      }

      if (!isEdit && !values.password.trim()) {
        throw new Error("Passwort ist erforderlich.");
      }

      if (isEdit && editingUser) {
        const payload: UpdateUserPayload = {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          role: values.role,
          isActive: values.isActive,
        };
        if (values.password.trim()) payload.password = values.password.trim();

        const updated = await updateUser(editingUser.id, payload);
        setUsers((prev) =>
          prev.map((u) => (u.id === updated.id ? updated : u))
        );
        setModalOpen(false);
        setEditingUser(null);
      } else {
        const payload: CreateAdminPayload = {
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          password: values.password.trim(),
          role: values.role === "SUPERADMIN" ? "SUPERADMIN" : "ADMIN",
          isActive: values.isActive,
        };
        const created = await createAdmin(payload);
        setUsers((prev) => [created, ...prev]);
        setModalOpen(false);
      }
    } catch (err: any) {
      if (handlePermissionError(err)) {
        return;
      }
      setFeedback(err?.message ?? "Aktion fehlgeschlagen.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;
    setDeleting(true);
    setFeedback(null);
    try {
      await deleteUser(deletingUser.id);
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
      setDeletingUser(null);
    } catch (err: any) {
      if (handlePermissionError(err)) {
        return;
      }
      setFeedback(err?.message ?? "Löschen fehlgeschlagen.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <AdminUsersHeader
        title="Admin Verwaltung"
        description="Nur SUPERADMIN kann Admin-Konten erstellen, bearbeiten oder löschen."
        buttonLabel="Admin erstellen"
        onCreateClick={handleCreateClick}
      />

      {feedback ? (
        <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {feedback}
        </div>
      ) : null}

      <div className="mt-6">
        <AdminUsersTable
          users={users}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AdminUserModal
        open={modalOpen}
        mode={isEdit ? "edit" : "create"}
        initialData={modalInitial}
        submitting={submitting}
        onSubmit={handleSubmit}
        onClose={() => {
          setModalOpen(false);
          setEditingUser(null);
        }}
      />

      <DeleteUserDialog
        open={Boolean(deletingUser)}
        user={deletingUser}
        deleting={deleting}
        onConfirm={confirmDelete}
        onClose={() => setDeletingUser(null)}
      />
    </div>
  );
}
