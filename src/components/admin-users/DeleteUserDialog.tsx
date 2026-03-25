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
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-4 md:items-center md:py-8">
      <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-xl md:max-h-[calc(100vh-4rem)]">
        <h2 className="shrink-0 text-xl font-semibold text-slate-900">
          Admin löschen
        </h2>
        <p className="mt-2 min-h-0 flex-1 overflow-y-auto text-sm text-slate-600">
          Möchtest du <span className="font-medium">{user.email}</span> wirklich
          löschen? Diese Aktion kann nicht rückgängig gemacht werden.
        </p>

        <div className="mt-6 flex shrink-0 flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
          <button
            onClick={onClose}
            className="w-full rounded-xl border px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 sm:w-auto"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="w-full rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60 sm:w-auto"
          >
            {deleting ? "Löschen..." : "Löschen"}
          </button>
        </div>
      </div>
    </div>
  );
}
