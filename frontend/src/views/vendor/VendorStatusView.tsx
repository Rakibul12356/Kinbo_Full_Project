"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  FileSearch,
  LayoutDashboard,
  PencilLine,
  RefreshCw,
  Send,
  XCircle,
} from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import RouteGuard from "@/components/auth/RouteGuard";
import Button from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { VENDOR_ROUTES, logout } from "@/lib/auth/auth-store";
import { storeDocuments } from "@/lib/auth/store-utils";
import {
  BUSINESS_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  type VendorAccount,
  type VendorStatus,
} from "@/lib/auth/types";

const STATUS_UI: Record<
  VendorStatus,
  { icon: React.ElementType; title: string; message: string; tone: string; badge: string }
> = {
  pending: {
    icon: Clock,
    title: "Application submitted",
    message:
      "Our team is reviewing your documents. This usually takes 1–2 business days. We'll notify you by email and SMS once a decision is made.",
    tone: "bg-amber-50 text-amber-600 ring-amber-100",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  approved: {
    icon: CheckCircle2,
    title: "You're approved!",
    message: "Your store has been verified. You can now add products, manage orders and track your earnings.",
    tone: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rejected: {
    icon: XCircle,
    title: "Application rejected",
    message: "Unfortunately we couldn't verify your application. Please review the reason below and resubmit.",
    tone: "bg-rose-50 text-rose-600 ring-rose-100",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
};

const STATUS_LABEL: Record<VendorStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

function Timeline({ vendor }: { vendor: VendorAccount }) {
  const status = vendor.status ?? "pending";
  const decided = status !== "pending";
  const steps = [
    { icon: Send, label: "Application submitted", detail: formatDate(vendor.submittedAt), state: "done" },
    {
      icon: FileSearch,
      label: "Admin document review",
      detail: decided ? "Completed" : "In progress",
      state: decided ? "done" : "active",
    },
    {
      icon: status === "rejected" ? XCircle : CheckCircle2,
      label: decided ? `Decision: ${STATUS_LABEL[status]}` : "Decision",
      detail: decided ? formatDate(vendor.reviewedAt) : "Waiting",
      state: status === "rejected" ? "error" : decided ? "done" : "todo",
    },
  ] as const;

  return (
    <ol className="space-y-0">
      {steps.map(({ icon: Icon, label, detail, state }, i) => (
        <li key={label} className="relative flex gap-4 pb-6 last:pb-0">
          {i < steps.length - 1 && (
            <span
              className={`absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-0.5 ${
                state === "done" ? "bg-[#082F6B]" : "bg-[#E5E7EB]"
              }`}
              aria-hidden
            />
          )}
          <span
            className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              state === "done"
                ? "bg-[#082F6B] text-white"
                : state === "active"
                  ? "bg-amber-100 text-amber-600 ring-4 ring-amber-50"
                  : state === "error"
                    ? "bg-rose-100 text-rose-600"
                    : "bg-zinc-100 text-zinc-400"
            }`}
          >
            <Icon className={`h-4 w-4 ${state === "active" ? "animate-pulse" : ""}`} />
          </span>
          <div className="pt-1.5">
            <p className="text-sm font-semibold text-[#1F2937]">{label}</p>
            <p className="text-xs text-zinc-500">{detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function SummaryRow({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 text-sm">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="text-right font-medium text-[#1F2937]">{value || "—"}</dd>
    </div>
  );
}

function StatusContent() {
  const router = useRouter();
  const { vendor } = useAuth();
  if (!vendor?.store) return null;

  const status = vendor.status ?? "pending";
  const ui = STATUS_UI[status];
  const Icon = ui.icon;
  const { store } = vendor;

  return (
    <AuthLayout
      wide
      step={status === "approved" ? 5 : 4}
      title="Verification status"
      subtitle="Track the review of your seller application."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col items-center text-center">
            <span className={`flex h-16 w-16 items-center justify-center rounded-full ring-8 ${ui.tone}`}>
              <Icon className="h-8 w-8" />
            </span>
            <span className={`mt-5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${ui.badge}`}>
              Status: {STATUS_LABEL[status]}
            </span>
            <h2 className="mt-3 text-xl font-extrabold text-[#1F2937]">{ui.title}</h2>
            <p className="mt-2 max-w-md text-sm text-zinc-500">{ui.message}</p>
          </div>

          {status === "rejected" && vendor.rejectionReason && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              <p className="font-bold">Reason from admin</p>
              <p className="mt-1">{vendor.rejectionReason}</p>
            </div>
          )}

          <div className="mt-8 border-t border-[#E5E7EB] pt-6">
            <Timeline vendor={vendor} />
          </div>

          <div className="mt-8 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button variant="ghost" onClick={logout}>
              Sign out
            </Button>
            {status === "pending" && (
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="h-4 w-4" />
                Refresh status
              </Button>
            )}
            {status === "rejected" && (
              <Button onClick={() => router.push(VENDOR_ROUTES.onboarding)}>
                <PencilLine className="h-4 w-4" />
                Edit & Resubmit
              </Button>
            )}
            {status === "approved" && (
              <Button onClick={() => router.push(VENDOR_ROUTES.dashboard)}>
                <LayoutDashboard className="h-4 w-4" />
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#082F6B] text-lg font-bold text-white">
              {store.storeName.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate font-bold text-[#1F2937]">{store.storeName}</p>
              <p className="text-xs text-zinc-500">{BUSINESS_TYPE_LABELS[store.businessType]}</p>
            </div>
          </div>
          <dl className="mt-4 divide-y divide-[#E5E7EB]">
            <SummaryRow label="Owner" value={vendor.fullName} />
            <SummaryRow label="Emails" value={`${store.contact.emails.length}`} />
            <SummaryRow label="Phones" value={`${store.contact.phones.length}`} />
            <SummaryRow label="City" value={store.address.city} />
            <SummaryRow label="NID" value={`••••${store.owner.nidNumber.slice(-4)}`} />
            <SummaryRow label="Trade License" value={store.tradeLicense?.number} />
            <SummaryRow label="Documents" value={`${storeDocuments(store).length} file(s)`} />
            <SummaryRow
              label="Payout"
              value={store.payment ? PAYMENT_METHOD_LABELS[store.payment.method] : "Add later"}
            />
          </dl>
        </aside>
      </div>
    </AuthLayout>
  );
}

export default function VendorStatusView() {
  return (
    <RouteGuard step="status">
      <StatusContent />
    </RouteGuard>
  );
}
