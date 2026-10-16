"use client";

import React from "react";
import { BadgeCheck, Plus, X } from "lucide-react";

interface MultiValueFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  /** The first value comes from signup and can't be edited or removed. */
  lockFirst?: boolean;
  lockedLabel?: string;
  icon?: React.ReactNode;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  addLabel: string;
  max?: number;
  /** Per-index error messages, aligned with `values`. */
  errors?: (string | undefined)[];
}

export default function MultiValueField({
  label,
  values,
  onChange,
  lockFirst = true,
  lockedLabel = "Verified · Primary",
  icon,
  type = "text",
  inputMode,
  placeholder,
  addLabel,
  max = 3,
  errors = [],
}: MultiValueFieldProps) {
  const update = (index: number, value: string) =>
    onChange(values.map((v, i) => (i === index ? value : v)));

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-[#1F2937]">{label}</p>
      {values.map((value, i) => {
        const locked = lockFirst && i === 0;
        const error = errors[i];
        return (
          <div key={i}>
            <div className="relative flex items-center gap-2">
              <div className="relative flex-1">
                {icon && (
                  <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
                    {icon}
                  </span>
                )}
                <input
                  type={type}
                  inputMode={inputMode}
                  value={value}
                  readOnly={locked}
                  placeholder={placeholder}
                  aria-label={`${label} ${i + 1}`}
                  onChange={(e) => update(i, e.target.value)}
                  className={`w-full rounded-xl border py-2.5 pr-4 text-sm transition focus:outline-none focus:ring-2 ${
                    icon ? "pl-10" : "pl-4"
                  } ${
                    locked
                      ? "border-[#E5E7EB] bg-zinc-50 text-zinc-600 cursor-not-allowed"
                      : error
                        ? "border-rose-500 focus:ring-rose-200"
                        : "border-[#E5E7EB] bg-white text-[#1F2937] focus:border-[#082F6B] focus:ring-[#082F6B]/20"
                  } ${locked ? "sm:pr-36" : ""}`}
                />
                {locked && (
                  <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 sm:inline-flex">
                    <BadgeCheck className="h-3 w-3" /> {lockedLabel}
                  </span>
                )}
              </div>
              {!locked && (
                <button
                  type="button"
                  onClick={() => onChange(values.filter((_, k) => k !== i))}
                  className="rounded-lg p-2 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                  aria-label={`Remove ${label} ${i + 1}`}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
          </div>
        );
      })}
      {values.length < max && (
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#082F6B] hover:underline cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> {addLabel}
        </button>
      )}
    </div>
  );
}
