import type { User } from "@/types/user";

type Props = {
  open: boolean;
  user: User | null;
  deleting: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export default function DeleteUserDialog({
  open,
  user,
  deleting,
  onConfirm,
  onClose,
}: Props) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-900">
          Admin löschen
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Möchtest du <span className="font-medium">{user.email}</span> wirklich
          löschen? Diese Aktion kann nicht rückgängig gemacht werden.
        </p>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-xl border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
          >
            {deleting ? "Löschen..." : "Löschen"}
          </button>
        </div>
      </div>
    </div>
  );
}
