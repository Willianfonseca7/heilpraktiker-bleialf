import AdminUsersPage from "@/components/admin-users/AdminUsersPage";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  if (session.role !== "SUPERADMIN") {
    redirect("/patients");
  }
  return <AdminUsersPage />;
}
