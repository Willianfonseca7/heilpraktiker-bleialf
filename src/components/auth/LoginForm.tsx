"use client";

import { useState } from "react";
import PasswordInput from "@/components/ui/PasswordInput";

type LoginFormProps = {
  onSwitchToRegister: () => void;
  onSuccess?: () => void;
};

export default function LoginForm({
  onSwitchToRegister,
  onSuccess,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Anmeldung fehlgeschlagen.");
        return;
      }

      onSuccess?.();
    } catch {
      setError("Anmeldung fehlgeschlagen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4 pb-4" onSubmit={handleSubmit}>
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

      <PasswordInput
        label="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="sticky bottom-0 -mx-1 space-y-4 bg-white px-1 pb-1 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-teal-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-teal-700 disabled:opacity-50"
        >
          {isSubmitting ? "Wird angemeldet..." : "Anmelden"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Noch kein Konto?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="font-medium text-teal-700 hover:underline"
          >
            Jetzt registrieren
          </button>
        </p>
      </div>
    </form>
  );
}
