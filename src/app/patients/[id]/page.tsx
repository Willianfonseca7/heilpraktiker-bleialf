import { headers } from "next/headers";
import PatientDetail from "@/components/ui/patient-detail";

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  createdAt: string | Date;
};

async function getPatient(id: string): Promise<Patient> {
  const h = await headers();
  const host = h.get("host");
  const cookie = h.get("cookie") ?? "";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/patients/${id}`, {
    cache: "no-store",
    headers: {
      cookie,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch patient");
  }

  return res.json();
}

export default async function PatientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const p = await getPatient(params.id);

  return <PatientDetail initialPatient={p} />;
}
