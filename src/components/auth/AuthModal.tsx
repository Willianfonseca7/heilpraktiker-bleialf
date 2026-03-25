// src/components/auth/AuthModal.tsx
"use client";

import { useEffect } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export type AuthMode = "login" | "register";

type AuthModalProps = {
  isOpen: boolean;
  mode: AuthMode;
  onClose: () => void;
  onSwitchMode: (mode: AuthMode) => void;
  onAuthSuccess?: () => void;
};

export default function AuthModal({
  isOpen,
  mode,
  onClose,
  onSwitchMode,
  onAuthSuccess,
}: AuthModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-[100dvh] items-start justify-center overflow-y-auto px-4 md:items-center md:py-8"
      style={{
        paddingTop: "max(1rem, calc(env(safe-area-inset-top) + 1rem))",
        paddingBottom: "max(1rem, calc(env(safe-area-inset-bottom) + 1rem))",
      }}
    >
      <button
        type="button"
        aria-label="Modal schließen"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white p-6 shadow-2xl md:max-h-[calc(100vh-4rem)] md:p-8"
        style={{
          maxHeight:
            "calc(100dvh - 2rem - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
        }}
      >
        <div className="mb-6 flex shrink-0 items-start justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-700">
              {mode === "register" ? "Registrierung" : "Anmeldung"}
            </span>

            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "register"
                ? "Erstellen Sie Ihr Konto"
                : "Melden Sie sich an"}
            </h2>

            <p className="text-sm text-gray-600">
              {mode === "register"
                ? "Registrieren Sie sich, um Ihr vollständiges Ergebnis freizuschalten."
                : "Melden Sie sich an, um Ihr Ergebnis weiter anzusehen."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 flex shrink-0 rounded-2xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => onSwitchMode("register")}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
              mode === "register"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Registrieren
          </button>

          <button
            type="button"
            onClick={() => onSwitchMode("login")}
            className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
              mode === "login"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Anmelden
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          {mode === "register" ? (
            <RegisterForm
              onSwitchToLogin={() => onSwitchMode("login")}
              onSuccess={onAuthSuccess}
            />
          ) : (
            <LoginForm
              onSwitchToRegister={() => onSwitchMode("register")}
              onSuccess={onAuthSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
