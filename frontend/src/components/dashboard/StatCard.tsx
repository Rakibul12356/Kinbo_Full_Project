import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  hint?: string;
  /** Tailwind classes for the icon tile, e.g. "bg-blue-50 text-blue-600". */
  accent?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  accent = "bg-[#082F6B]/10 text-[#082F6B]",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">{label}</p>
          <p className="mt-2 text-2xl font-extrabold text-[#1F2937]">{value}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      {hint && <p className="mt-3 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}
