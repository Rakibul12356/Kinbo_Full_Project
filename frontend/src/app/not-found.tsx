import React from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <PageLayout>

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#082F6B]/10 flex items-center justify-center mx-auto text-[#082F6B]">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-[#1F2937]">404</h1>
            <h2 className="text-xl font-bold text-[#1F2937]">Page Not Found</h2>
            <p className="text-sm text-zinc-500">
              The page you are looking for might have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#082F6B] hover:bg-[#062452] text-white font-semibold text-sm transition shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[#1F2937] hover:bg-zinc-50 font-semibold text-sm transition"
            >
              <span>Explore Products</span>
            </Link>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
