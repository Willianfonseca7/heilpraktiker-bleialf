"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/PasswordInput";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json().catch(() => null);
      const role = data?.role;
      if (role === "SUPERADMIN") {
        router.push("/admin/users");
      } else {
        router.push("/patients");
      }
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error ?? "Anmeldung fehlgeschlagen");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl mb-6">Admin-Anmeldung</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="E-Mail"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputClassName="rounded-none border p-2 text-base focus:border-gray-400 focus:ring-0"
          containerClassName=""
        />

        <button type="submit" className="bg-emerald-600 text-white p-2 w-full hover:bg-emerald-700">
          Anmelden
        </button>
      </form>
    </div>
  );
}
