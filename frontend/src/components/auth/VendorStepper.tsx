import React from "react";
import { Check } from "lucide-react";

export const VENDOR_STEPS = [
  "Create Account",
  "Verify",
  "Store Info",
  "Review",
  "Start Selling",
] as const;

/** `current` is 1-based, matching the onboarding step numbers. */
export default function VendorStepper({ current }: { current: number }) {
  return (
    <ol className="flex items-start w-full" aria-label="Vendor onboarding progress">
      {VENDOR_STEPS.map((label, i) => {
        const stepNo = i + 1;
        const done = stepNo < current;
        const active = stepNo === current;
        return (
          <li
            key={label}
            className="relative flex flex-1 flex-col items-center text-center"
            aria-current={active ? "step" : undefined}
          >
            {i > 0 && (
              <span
                className={`absolute top-4 right-1/2 h-0.5 w-full -translate-y-1/2 ${
                  done || active ? "bg-[#082F6B]" : "bg-[#E5E7EB]"
                }`}
                aria-hidden
              />
            )}
            <span
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                done
                  ? "bg-[#082F6B] text-white"
                  : active
                    ? "bg-white text-[#082F6B] ring-2 ring-[#FF6B00]"
                    : "bg-white text-zinc-400 ring-1 ring-[#E5E7EB]"
              }`}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={3} /> : stepNo}
            </span>
            <span
              className={`mt-2 text-[10px] sm:text-xs font-semibold leading-tight ${
                active ? "text-[#082F6B]" : done ? "text-[#1F2937]" : "text-zinc-400"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
