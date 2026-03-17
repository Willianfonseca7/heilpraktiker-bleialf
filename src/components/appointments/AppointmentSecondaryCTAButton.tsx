"use client";

import AppointmentCTA from "@/components/appointments/AppointmentCTA";

type AppointmentSecondaryCTAButtonProps = {
  defaultTreatment: string;
  preferredTreatments: string[];
  label?: string;
};

export default function AppointmentSecondaryCTAButton({
  defaultTreatment,
  preferredTreatments,
  label = "Termin online buchen",
}: AppointmentSecondaryCTAButtonProps) {
  return (
    <AppointmentCTA
      defaultTreatment={defaultTreatment}
      preferredTreatments={preferredTreatments}
    >
      {({ onClick, disabled }) => (
        <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className="px-6 py-3 bg-black text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
        >
          {disabled ? "Wird geprüft..." : label}
        </button>
      )}
    </AppointmentCTA>
  );
}
