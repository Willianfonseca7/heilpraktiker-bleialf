"use client";

import AppointmentCTA from "@/components/appointments/AppointmentCTA";
import { PrimaryCTAButton } from "@/components/ui/Buttons";

type AppointmentPrimaryCTAButtonProps = {
  defaultTreatment: string;
  preferredTreatments: string[];
  label?: string;
};

export default function AppointmentPrimaryCTAButton({
  defaultTreatment,
  preferredTreatments,
  label = "Termin anfragen",
}: AppointmentPrimaryCTAButtonProps) {
  return (
    <AppointmentCTA
      defaultTreatment={defaultTreatment}
      preferredTreatments={preferredTreatments}
    >
      {({ onClick, disabled }) => (
        <PrimaryCTAButton onClick={onClick}>
          {disabled ? "Wird geprüft..." : label}
        </PrimaryCTAButton>
      )}
    </AppointmentCTA>
  );
}
