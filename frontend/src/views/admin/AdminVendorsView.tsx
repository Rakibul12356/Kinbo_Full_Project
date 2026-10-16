"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { Check, Eye, X } from "lucide-react";
import DocumentGallery from "@/components/auth/DocumentGallery";
import RouteGuard from "@/components/auth/RouteGuard";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useAuth } from "@/hooks/use-auth";
import { reviewVendor } from "@/lib/auth/auth-store";
import { formatAddress, storeDocuments } from "@/lib/auth/store-utils";
import { getCategoryBySlug } from "@/lib/categories";
import {
  BUSINESS_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  type VendorAccount,
  type VendorStatus,
} from "@/lib/auth/types";
import AdminShell from "./AdminShell";
import VendorStatusBadge from "./VendorStatusBadge";

type Filter = "all" | VendorStatus;
const FILTERS: { id: Filter; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "all", label: "All" },
];

const formatDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

function DetailRow({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 py-2 text-sm">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="font-medium text-[#1F2937] break-words">{value || "—"}</dd>
    </div>
  );
}

function ReviewModal({ vendor, onClose }: { vendor: VendorAccount; onClose: () => void }) {
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState("");
  const store = vendor.store!;

  const decide = (decision: "approved" | "rejected") => {
    const result = reviewVendor(vendor.id, decision, reason);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success(`${store.storeName} ${decision}.`);
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose} title="Vendor application" className="max-w-2xl">
      <div className="max-h-[65vh] overflow-y-auto pr-1">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#082F6B] text-xl font-bold text-white">
            {store.storeName.charAt(0)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold text-[#1F2937]">{store.storeName}</p>
            <p className="text-xs text-zinc-500">Submitted {formatDate(vendor.submittedAt)}</p>
          </div>
          <VendorStatusBadge status={vendor.status} />
        </div>

        <p className="mt-4 text-sm text-zinc-600">{store.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {store.categories.map((slug) => (
            <span key={slug} className="rounded-full bg-[#082F6B]/10 px-2.5 py-0.5 text-xs font-semibold text-[#082F6B]">
              {getCategoryBySlug(slug)?.name ?? slug}
            </span>
          ))}
        </div>

        <h4 className="mt-6 text-xs font-bold uppercase tracking-wider text-zinc-400">Owner & Contact</h4>
        <dl className="divide-y divide-[#E5E7EB]">
          <DetailRow label="Full name" value={vendor.fullName} />
          <DetailRow label="NID number" value={store.owner.nidNumber} />
          <DetailRow label="Emails" value={store.contact.emails.join(", ")} />
          <DetailRow label="Phones" value={store.contact.phones.join(", ")} />
        </dl>

        <h4 className="mt-5 text-xs font-bold uppercase tracking-wider text-zinc-400">Business</h4>
        <dl className="divide-y divide-[#E5E7EB]">
          <DetailRow label="Business type" value={BUSINESS_TYPE_LABELS[store.businessType]} />
          <DetailRow label="Address" value={formatAddress(store)} />
          <DetailRow label="Trade license" value={store.tradeLicense?.number} />
          <DetailRow label="e-TIN" value={store.tin?.number} />
          <DetailRow
            label="Payout"
            value={
              store.payment
                ? `${PAYMENT_METHOD_LABELS[store.payment.method]} · ${store.payment.accountName} · ${store.payment.accountNumber}${
                    store.payment.bankName ? ` (${store.payment.bankName}, ${store.payment.branch})` : ""
                  }${store.payment.routingNumber ? ` · Routing ${store.payment.routingNumber}` : ""}`
                : "Will add later"
            }
          />
        </dl>

        <h4 className="mt-5 mb-2 text-xs font-bold uppercase tracking-wider text-zinc-400">Documents</h4>
        <DocumentGallery documents={storeDocuments(store)} />

        {vendor.status === "rejected" && vendor.rejectionReason && (
          <p className="mt-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
            <span className="font-bold">Rejection reason:</span> {vendor.rejectionReason}
          </p>
        )}

        {rejecting && (
          <div className="mt-5 space-y-1.5">
            <label htmlFor="reject-reason" className="block text-xs font-semibold text-[#1F2937]">
              Reason for rejection (shown to the vendor)
            </label>
            <textarea
              id="reject-reason"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. NID copy is blurry, please upload a clear scan."
              className="w-full rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm focus:border-[#082F6B] focus:outline-none focus:ring-2 focus:ring-[#082F6B]/20"
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col-reverse gap-2 border-t border-[#E5E7EB] pt-4 sm:flex-row sm:justify-end">
        {rejecting ? (
          <>
            <Button variant="ghost" onClick={() => setRejecting(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => decide("rejected")} disabled={!reason.trim()}>
              Confirm Rejection
            </Button>
          </>
        ) : (
          <>
            {vendor.status !== "rejected" && (
              <Button variant="outline" className="text-rose-600" onClick={() => setRejecting(true)}>
                <X className="h-4 w-4" /> Reject
              </Button>
            )}
            {vendor.status !== "approved" && (
              <Button onClick={() => decide("approved")}>
                <Check className="h-4 w-4" /> Approve
              </Button>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}

function VendorsContent() {
  const { vendors } = useAuth();
  const [filter, setFilter] = useState<Filter>("pending");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const applications = vendors.filter((v) => v.store);
  const visible = applications
    .filter((v) => filter === "all" || v.status === filter)
    .sort((a, b) => (b.submittedAt ?? "").localeCompare(a.submittedAt ?? ""));
  const selected = applications.find((v) => v.id === selectedId);

  return (
    <AdminShell title="Vendor Applications" description="Verify vendor documents and approve or reject stores.">
      <div className="mb-4 flex gap-2 overflow-x-auto scrollbar-none" role="tablist">
        {FILTERS.map(({ id, label }) => {
          const n = id === "all" ? applications.length : applications.filter((v) => v.status === id).length;
          const active = filter === id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(id)}
              className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                active ? "bg-[#082F6B] text-white" : "bg-white text-zinc-600 border border-[#E5E7EB] hover:border-[#082F6B]"
              }`}
            >
              {label} <span className={active ? "text-white/70" : "text-zinc-400"}>({n})</span>
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-xs">
        {visible.length === 0 ? (
          <p className="px-5 py-14 text-center text-sm text-zinc-500">No applications in this list.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-[#F3F7FC] text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <tr>
                  <th className="px-5 py-3">Store</th>
                  <th className="px-5 py-3">Owner</th>
                  <th className="px-5 py-3">Business type</th>
                  <th className="px-5 py-3">Submitted</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {visible.map((v) => (
                  <tr key={v.id} className="hover:bg-[#F3F7FC]/60">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#082F6B]/10 font-bold text-[#082F6B]">
                          {v.store!.storeName.charAt(0)}
                        </span>
                        <span className="font-semibold text-[#1F2937]">{v.store!.storeName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[#1F2937]">{v.fullName}</p>
                      <p className="text-xs text-zinc-500">{v.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600">{BUSINESS_TYPE_LABELS[v.store!.businessType]}</td>
                    <td className="px-5 py-3.5 text-zinc-600">{formatDate(v.submittedAt)}</td>
                    <td className="px-5 py-3.5"><VendorStatusBadge status={v.status} /></td>
                    <td className="px-5 py-3.5 text-right">
                      <Button size="sm" variant="outline" onClick={() => setSelectedId(v.id)}>
                        <Eye className="h-3.5 w-3.5" /> Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <ReviewModal key={selected.id} vendor={selected} onClose={() => setSelectedId(null)} />}
    </AdminShell>
  );
}

export default function AdminVendorsView() {
  return (
    <RouteGuard step="admin">
      <VendorsContent />
    </RouteGuard>
  );
}
