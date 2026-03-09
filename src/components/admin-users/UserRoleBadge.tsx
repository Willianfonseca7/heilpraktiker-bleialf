import type { UserRole } from "@/types/user";

type Props = {
  role: UserRole;
};

export default function UserRoleBadge({ role }: Props) {
  const roleStyles: Record<UserRole, string> = {
    SUPERADMIN: "bg-purple-100 text-purple-700 border-purple-200",
    ADMIN: "bg-blue-100 text-blue-700 border-blue-200",
    PATIENT: "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${roleStyles[role]}`}
    >
      {role}
    </span>
  );
}