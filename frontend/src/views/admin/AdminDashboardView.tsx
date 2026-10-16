"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, Store, XCircle } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RouteGuard from "@/components/auth/RouteGuard";
import { useAuth } from "@/hooks/use-auth";
import { ADMIN_ROUTES } from "@/lib/auth/auth-store";
import AdminShell from "./AdminShell";
import VendorStatusBadge from "./VendorStatusBadge";

function DashboardContent() {
  const { vendors } = useAuth();
  const applications = vendors.filter((v) => v.store);
  const count = (status: string) => applications.filter((v) => v.status === status).length;
  const recent = [...applications]
    .sort((a, b) => (b.submittedAt ?? "").localeCompare(a.submittedAt ?? ""))
    .slice(0, 5);

  return (
    <AdminShell title="Admin Dashboard" description="Marketplace overview.">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Vendors" value={vendors.length} icon={Store} hint="Including incomplete signups" />
        <StatCard label="Pending Review" value={count("pending")} icon={Clock} accent="bg-amber-50 text-amber-600" />
        <StatCard label="Approved" value={count("approved")} icon={BadgeCheck} accent="bg-emerald-50 text-emerald-600" />
        <StatCard label="Rejected" value={count("rejected")} icon={XCircle} accent="bg-rose-50 text-rose-600" />
      </div>

      <section className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
          <h2 className="text-base font-bold text-[#1F2937]">Recent applications</h2>
          <Link
            href={ADMIN_ROUTES.vendors}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#082F6B] hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-zinc-500">No applications yet.</p>
        ) : (
          <ul className="divide-y divide-[#E5E7EB]">
            {recent.map((v) => (
              <li key={v.id} className="flex items-center gap-3 px-5 py-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#082F6B]/10 text-sm font-bold text-[#082F6B]">
                  {v.store!.storeName.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#1F2937]">{v.store!.storeName}</p>
                  <p className="truncate text-xs text-zinc-500">{v.fullName} · {v.email}</p>
                </div>
                <VendorStatusBadge status={v.status} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </AdminShell>
  );
}

export default function AdminDashboardView() {
  return (
    <RouteGuard step="admin">
      <DashboardContent />
    </RouteGuard>
  );
}
