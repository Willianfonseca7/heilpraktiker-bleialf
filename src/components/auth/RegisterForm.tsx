// src/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";

type RegisterFormProps = {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
};

export default function RegisterForm({
  onSwitchToLogin,
  onSuccess,
}: RegisterFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Bitte alle Pflichtfelder ausfüllen.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    if (!consent) {
      setError("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registrierung fehlgeschlagen.");
        return;
      }

      onSuccess?.();
    } catch {
      setError("Registrierung fehlgeschlagen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Vorname</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Max"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nachname</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Mustermann"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-600"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          E-Mail-Adresse
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.de"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-600"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Passwort</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-600"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Passwort bestätigen
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-600"
        />
      </div>

      <div className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
        <input
          id="privacy-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600"
        />
        <label
          htmlFor="privacy-consent"
          className="text-sm leading-6 text-gray-600"
        >
          Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß der
          Datenschutzerklärung zu.
        </label>
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-50"
      >
        {isSubmitting ? "Wird erstellt..." : "Konto erstellen"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Bereits registriert?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="font-medium text-teal-700 hover:underline"
        >
          Jetzt anmelden
        </button>
      </p>
    </form>
  );
}
