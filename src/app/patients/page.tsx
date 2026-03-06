import { listPatients } from "@/lib/service/patient.service";
import PatientsDashboard from "@/components/ui/patients-dashboard";

export default async function PatientsPage() {
  const { count, data } = await listPatients();

  return (
    <div className="p-10">
      <PatientsDashboard patients={data} total={count} />
    </div>
  );
}
