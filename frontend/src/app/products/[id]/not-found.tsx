import React from "react";
import Link from "next/link";
import { PackageX, ArrowLeft } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5E7EB] p-8 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <PackageX className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-[#1F2937]">Product Not Found</h2>
        <p className="text-xs text-zinc-500">
          The requested product doesn&apos;t exist or may have been removed from our catalog.
        </p>
        <div className="pt-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#082F6B] hover:bg-[#062452] text-white text-xs font-semibold shadow-xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse All Products</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
