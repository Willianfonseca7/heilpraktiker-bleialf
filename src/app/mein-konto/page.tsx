import { redirect } from "next/navigation";
import PublicAccountPage from "@/components/account/PublicAccountPage";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function MeinKontoPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  if (session.role !== "USER") {
    if (session.role === "SUPERADMIN") {
      redirect("/admin/users");
    }

    redirect("/patients");
  }

  return <PublicAccountPage />;
}
