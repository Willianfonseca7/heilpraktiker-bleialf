"use client";

import { useState } from "react";
import AuthModal, { type AuthMode } from "@/components/auth/AuthModal";

type LockedResultCardProps = {
  previewText: string;
  onAuthenticated?: () => void;
};

export default function LockedResultCard({
  previewText,
  onAuthenticated,
}: LockedResultCardProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("register");

  const openRegisterModal = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  const openLoginModal = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const closeModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    onAuthenticated?.();
  };

  return (
    <>
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-6 text-center">
          <div className="space-y-3">
            <span className="inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
              Ergebnis bereit
            </span>

            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Ihr persönliches Ergebnis ist verfügbar
            </h2>

            <p className="mx-auto max-w-2xl text-gray-600">
              Ihr Gesundheits-Check wurde erfolgreich ausgewertet. Um Ihr
              vollständiges Ergebnis und passende Behandlungsempfehlungen zu
              sehen, registrieren Sie sich bitte oder melden Sie sich an.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-teal-300 bg-teal-50 p-5 text-left">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-700">
              Vorschau
            </p>

            <p className="text-gray-700">{previewText}</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openRegisterModal}
              className="inline-flex rounded-xl bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
            >
              Jetzt registrieren
            </button>

            <button
              type="button"
              onClick={openLoginModal}
              className="inline-flex rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Bereits ein Konto? Anmelden
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        mode={authMode}
        onClose={closeModal}
        onSwitchMode={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
