"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F3F7FC]">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5E7EB] p-8 text-center shadow-lg space-y-5">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#1F2937]">Something went wrong!</h2>
          <p className="text-xs text-zinc-500">
            {error.message || "An unexpected error occurred while processing this request."}
          </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#082F6B] hover:bg-[#062452] text-white text-xs font-semibold shadow-xs transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#1F2937] hover:bg-zinc-50 text-xs font-semibold transition"
          >
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
