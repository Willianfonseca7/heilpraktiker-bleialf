import type { User } from "@/types/user";
import UserRoleBadge from "./UserRoleBadge";

type Props = {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export default function AdminUsersTable({ users, loading, onEdit, onDelete }: Props) {
  const now = Date.now();

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="max-h-[520px] overflow-auto">
        <table className="w-full table-auto text-left">
          <thead className="sticky top-0 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">E-Mail</th>
              <th className="px-5 py-3">Rolle</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Erstellt</th>
              <th className="px-5 py-3 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {loading ? (
              <tr>
                <td className="px-5 py-6 text-slate-500" colSpan={6}>
                  Lade Admins...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td className="px-5 py-6 text-slate-500" colSpan={6}>
                  Keine Admins gefunden.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-5 py-3 font-medium text-slate-900">
                    {user.email}
                  </td>
                  <td className="px-5 py-3">
                    <UserRoleBadge role={user.role} />
                  </td>
                  <td className="px-5 py-3">
                    {user.isActive &&
                    user.sessionExpiresAt &&
                    new Date(user.sessionExpiresAt).getTime() > now ? (
                      <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                        Aktiv
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700">
                        Deaktiviert
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-slate-500">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("de-DE")
                      : "—"}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Bearbeiten
                      </button>
                      <button
                        onClick={() => onDelete(user)}
                        className="rounded-lg border border-rose-200 px-3 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
                      >
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
