import UserAccountForm from "@/components/account/UserAccountForm";
import type { UserAccountFormValues } from "@/components/account/UserAccountForm";
import type { UserRole } from "@/types/user";

type Props = {
  mode: "create" | "edit";
  initialData?: Partial<UserAccountFormValues>;
  submitting: boolean;
  onSubmit: (values: UserAccountFormValues) => void;
  onCancel: () => void;
};

export default function AdminUserForm({
  mode,
  initialData,
  submitting,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <UserAccountForm
      mode={mode}
      initialData={initialData}
      submitting={submitting}
      onSubmit={onSubmit}
      onCancel={onCancel}
      showRoleField
      showActiveField
      roleOptions={["ADMIN", "SUPERADMIN"]}
      submitLabel={mode === "edit" ? "Speichern" : "Admin erstellen"}
    />
  );
}
