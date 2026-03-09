import AdminUserForm from "./AdminUserForm";
import type { UserRole } from "@/types/user";

type InitialData = {
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initialData?: InitialData | null;
  submitting: boolean;
  onSubmit: (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
  }) => void;
  onClose: () => void;
};

export default function AdminUserModal({
  open,
  mode,
  initialData,
  submitting,
  onSubmit,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {mode === "edit" ? "Admin bearbeiten" : "Neuen Admin erstellen"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {mode === "edit"
                ? "Ändere Daten oder Status des Admins."
                : "Erstelle einen neuen Admin-Benutzer."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
          >
            X
          </button>
        </div>

        <AdminUserForm
          mode={mode}
          initialData={initialData ?? undefined}
          submitting={submitting}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
