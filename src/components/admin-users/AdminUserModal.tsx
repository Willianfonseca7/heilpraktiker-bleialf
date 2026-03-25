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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 md:items-center md:py-8">
      <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-xl md:max-h-[calc(100vh-4rem)]">
        <div className="mb-5 flex shrink-0 items-start justify-between gap-4">
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

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <AdminUserForm
            mode={mode}
            initialData={initialData ?? undefined}
            submitting={submitting}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}
