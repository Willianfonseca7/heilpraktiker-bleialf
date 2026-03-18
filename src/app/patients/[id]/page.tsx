import { headers } from "next/headers";
import PatientDetail from "@/components/ui/patient-detail";
import type { PersistedHealthCheckResult } from "@/features/health-check/types";
import type { Appointment } from "@/types/user";

export const dynamic = "force-dynamic";

type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  createdAt: string | Date;
};

type ContactMessage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
};

type PatientDetailPayload = {
  patient: Patient;
  appointments: Appointment[];
  healthChecks: PersistedHealthCheckResult[];
  contactMessages: ContactMessage[];
};

async function getPatient(id: string): Promise<PatientDetailPayload> {
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
  const detail = await getPatient(params.id);

  return <PatientDetail initialData={detail} />;
}
