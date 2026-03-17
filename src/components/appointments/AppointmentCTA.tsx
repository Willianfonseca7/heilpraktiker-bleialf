"use client";

import { useState } from "react";
import AppointmentRequestModal from "@/components/appointments/AppointmentRequestModal";
import AuthModal, { type AuthMode } from "@/components/auth/AuthModal";
import { getCurrentUser } from "@/lib/account-api";

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
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("register");
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [checkingSession, setCheckingSession] = useState(false);

  const handleClick = async () => {
    setCheckingSession(true);

    try {
      await getCurrentUser();
      setAppointmentOpen(true);
    } catch {
      setAuthMode("register");
      setAuthOpen(true);
    } finally {
      setCheckingSession(false);
    }
  };

  return (
    <>
      {children({ onClick: handleClick, disabled: checkingSession })}

      <AuthModal
        isOpen={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={setAuthMode}
        onAuthSuccess={() => {
          setAuthOpen(false);
          setAppointmentOpen(true);
        }}
      />

      <AppointmentRequestModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        defaultTreatment={defaultTreatment}
        preferredTreatments={preferredTreatments}
      />
    </>
  );
}
