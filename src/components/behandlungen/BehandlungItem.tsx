"use client";

import { useState } from "react";

type BehandlungItemProps = {
  title: string;
  description: string;
};

export default function BehandlungItem({
  title,
  description,
}: BehandlungItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-gray-900">{title}</span>

        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-lg text-gray-500 transition-all duration-300 ${
            open ? "rotate-45 bg-gray-50 text-gray-900" : ""
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6">
            <div className="mb-4 h-px w-full bg-gray-100" />
            <p className="text-sm leading-7 text-gray-600">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
