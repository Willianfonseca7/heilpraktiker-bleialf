"use client";

import Link from "next/link";

export default function SessionExpiredPage() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl mb-3">Sitzung abgelaufen</h1>
      <p className="text-sm text-black/70 mb-6">
        Bitte melden Sie sich erneut an, um fortzufahren.
      </p>
      <Link
        href="/admin/login"
        className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-white"
      >
        Zur Anmeldung
      </Link>
    </div>
  );
}
