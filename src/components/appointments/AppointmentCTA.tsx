"use client";

import { useState } from "react";
import AppointmentRequestModal from "@/components/appointments/AppointmentRequestModal";

type TriggerRenderProps = {
  onClick: () => void;
  disabled: boolean;
};

type AppointmentCTAProps = {
  defaultTreatment: string;
  preferredTreatments: string[];
  children: (props: TriggerRenderProps) => React.ReactNode;
};

export default function AppointmentCTA({
  defaultTreatment,
  preferredTreatments,
  children,
}: AppointmentCTAProps) {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const handleClick = () => {
    setAppointmentOpen(true);
  };

  return (
    <>
      {children({ onClick: handleClick, disabled: false })}

      <AppointmentRequestModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        defaultTreatment={defaultTreatment}
        preferredTreatments={preferredTreatments}
      />
    </>
  );
}
