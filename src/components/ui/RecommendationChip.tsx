"use client";

import Link from "next/link";
import { getRecommendationLearnMoreHref } from "@/lib/treatment-links";

type RecommendationChipProps = {
  recommendation: string;
  className?: string;
  compact?: boolean;
};

export default function RecommendationChip({
  recommendation,
  className,
  compact = false,
}: RecommendationChipProps) {
  const href = getRecommendationLearnMoreHref(recommendation);

  return (
    <div
      className={
        className ??
        "flex flex-wrap items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2"
      }
    >
      <span className="text-sm font-medium text-emerald-800">{recommendation}</span>
      {href ? (
        <Link
          href={href}
          className={`inline-flex rounded-full border border-emerald-200 bg-white px-2.5 py-1 font-medium text-emerald-700 transition hover:border-emerald-300 hover:text-emerald-800 ${
            compact ? "text-[11px]" : "text-xs"
          }`}
        >
          Mehr erfahren
        </Link>
      ) : null}
    </div>
  );
}
