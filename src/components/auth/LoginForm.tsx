// src/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";

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
    <form className="space-y-4" onSubmit={handleSubmit}>
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
    </form>
  );
}
