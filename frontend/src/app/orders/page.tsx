"use client";

import React from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { Package, Truck, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";

export default function OrdersPage() {
  const sampleOrders = [
    {
      id: "ORD-2026-9812",
      date: "Oct 14, 2026",
      status: "In Transit",
      statusColor: "bg-amber-100 text-amber-700",
      total: "৳ 2,490",
      items: "Aura Noise-Cancelling Wireless Headphones (x1)",
    },
    {
      id: "ORD-2026-8741",
      date: "Oct 02, 2026",
      status: "Delivered",
      statusColor: "bg-emerald-100 text-emerald-700",
      total: "৳ 1,890",
      items: "Chronos Minimalist Chronograph Watch (x1)",
    },
  ];

  return (
    <PageLayout className="bg-[#F3F7FC]">

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 mb-1">
              <Link href="/account" className="hover:text-[#082F6B]">
                Account
              </Link>
              <span>/</span>
              <span className="text-[#082F6B]">Orders</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
              My Orders
            </h1>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#082F6B] text-white text-xs font-semibold hover:bg-[#062452] transition shadow-xs"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {sampleOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-[#E5E7EB] p-5 sm:p-6 shadow-2xs hover:shadow-sm transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E7EB] gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#082F6B]" />
                    <span className="font-bold text-sm text-[#1F2937]">
                      {order.id}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-400">Placed on {order.date}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                  <span className="font-bold text-base text-[#082F6B]">
                    {order.total}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <p className="text-xs text-zinc-600 font-medium">
                  {order.items}
                </p>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#082F6B] hover:text-[#FF6B00] transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageLayout>
  );
}
