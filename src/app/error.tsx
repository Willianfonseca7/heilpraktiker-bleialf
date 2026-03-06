"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold">Etwas ist schiefgelaufen.</h2>
      <p className="mt-2 text-sm text-gray-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
