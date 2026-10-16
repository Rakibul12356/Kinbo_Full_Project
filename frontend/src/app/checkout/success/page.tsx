import React from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { CheckCircle2, ShoppingBag } from "lucide-react";

export default function CheckoutSuccessPage() {
  const orderNumber = "KB-849201";

  return (
    <PageLayout>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-16 flex items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-3xl border border-[#E5E7EB] p-8 sm:p-10 text-center shadow-lg space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
              Order Confirmed
            </span>
            <h1 className="text-3xl font-black text-[#1F2937]">
              Thank You For Your Order!
            </h1>
            <p className="text-sm text-zinc-500">
              We&apos;ve received your order and are currently preparing it for shipment.
            </p>
          </div>

          <div className="bg-[#F3F7FC] p-4 rounded-2xl border border-[#E5E7EB] text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-500">Order ID:</span>
              <span className="font-bold text-[#082F6B] font-mono">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Estimated Delivery:</span>
              <span className="font-bold text-[#1F2937]">2-4 Business Days</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#082F6B] hover:bg-[#062452] text-white font-semibold text-sm transition shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#E5E7EB] hover:bg-zinc-50 text-[#1F2937] font-semibold text-sm transition"
            >
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
