"use client";

import React from "react";
import {
  BadgeCheck,
  Boxes,
  Package,
  PackagePlus,
  ShoppingBag,
  TrendingUp,
  Wallet,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import StatCard from "@/components/dashboard/StatCard";
import { VENDOR_NAV } from "@/components/dashboard/nav-config";
import RouteGuard from "@/components/auth/RouteGuard";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/auth/auth-store";
import { formatPrice } from "@/lib/utils";

const NEXT_UP = [
  {
    icon: PackagePlus,
    title: "Add & Manage Products",
    text: "Create listings with photos, prices, variants and stock.",
  },
  {
    icon: Boxes,
    title: "Manage Orders & Inventory",
    text: "Confirm orders, print invoices and keep stock up to date.",
  },
  {
    icon: TrendingUp,
    title: "View Earnings & Sales",
    text: "Track revenue, payouts and best-selling products.",
  },
];

function DashboardContent() {
  const { vendor } = useAuth();
  if (!vendor?.store) return null;
  const { store } = vendor;

  return (
    <DashboardShell
      brandLabel="Seller"
      navGroups={VENDOR_NAV}
      title={`Welcome, ${vendor.fullName.split(" ")[0]}!`}
      description="Here's what's happening with your store today."
      user={{
        name: store.storeName,
        email: vendor.email,
        tag: (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified Seller
          </span>
        ),
      }}
      onLogout={logout}
    >
      <div className="mb-6 flex flex-col gap-4 overflow-hidden rounded-2xl bg-[#082F6B] p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9A4D]">
            <BadgeCheck className="h-4 w-4" /> Verified Seller
          </p>
          <h2 className="mt-1 text-xl font-extrabold">{store.storeName}</h2>
          <p className="mt-1 text-sm text-white/70">
            Your store is live. Add your first products to start selling.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-sm font-semibold opacity-60">
          <PackagePlus className="h-4 w-4" />
          Add Product (soon)
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Sales" value={formatPrice(0)} icon={TrendingUp} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Orders" value="0" icon={ShoppingBag} accent="bg-sky-50 text-sky-600" />
        <StatCard label="Products" value="0" icon={Package} accent="bg-violet-50 text-violet-600" />
        <StatCard label="Balance" value={formatPrice(0)} icon={Wallet} accent="bg-orange-50 text-[#FF6B00]" />
      </div>

      <section className="mt-6 rounded-2xl border border-dashed border-[#082F6B]/25 bg-white p-6">
        <h3 className="text-base font-bold text-[#1F2937]">Coming next</h3>
        <p className="text-sm text-zinc-500">These sections of the Seller Center are being built.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {NEXT_UP.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl bg-[#F3F7FC] p-4">
              <Icon className="h-6 w-6 text-[#082F6B]" />
              <p className="mt-3 text-sm font-semibold text-[#1F2937]">{title}</p>
              <p className="mt-1 text-xs text-zinc-500">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </DashboardShell>
  );
}

export default function VendorDashboardView() {
  return (
    <RouteGuard step="dashboard">
      <DashboardContent />
    </RouteGuard>
  );
}
