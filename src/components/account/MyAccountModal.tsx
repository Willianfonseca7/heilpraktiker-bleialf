"use client";

import Modal from "@/components/Modal";
import UserAccountForm, {
  type UserAccountFormValues,
} from "./UserAccountForm";
import type { CurrentUser } from "@/types/user";

type Props = {
  open: boolean;
  initialData?: CurrentUser | null;
  submitting: boolean;
  onSubmit: (values: UserAccountFormValues) => void;
  onClose: () => void;
};

export default function MyAccountModal({
  open,
  initialData,
  submitting,
  onSubmit,
  onClose,
}: Props) {
  return (
    <Modal isOpen={open} title="Mein Konto" onClose={onClose}>
      <div className="mb-5">
        <p className="text-sm text-slate-500">
          Bearbeite hier deine eigenen Profildaten. Diese Aenderungen werden
          direkt in deinem Benutzerkonto gespeichert.
        </p>
      </div>

      <UserAccountForm
        mode="edit"
        initialData={initialData ?? undefined}
        submitting={submitting}
        onSubmit={onSubmit}
        onCancel={onClose}
        showRoleField={false}
        showActiveField={false}
        submitLabel="Profil speichern"
      />
    </Modal>
  );
}
