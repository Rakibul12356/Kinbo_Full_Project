import React from "react";
import type { VendorStatus } from "@/lib/auth/types";

const STYLES: Record<VendorStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function VendorStatusBadge({ status }: { status?: VendorStatus }) {
  if (!status) {
    return (
      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-xs font-semibold text-zinc-500">
        Incomplete
      </span>
    );
  }
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STYLES[status]}`}>
      {status}
    </span>
  );
}
