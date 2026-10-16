"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  AlertTriangle,
  Building2,
  Check,
  CreditCard,
  FileText,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Plus,
  Store,
  Trash2,
  Wallet,
} from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import RouteGuard from "@/components/auth/RouteGuard";
import FileUploadField from "@/components/forms/FileUploadField";
import MultiValueField from "@/components/forms/MultiValueField";
import SelectField from "@/components/forms/SelectField";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { VENDOR_ROUTES, logout, submitStoreInfo } from "@/lib/auth/auth-store";
import {
  BUSINESS_TYPE_LABELS,
  PAYMENT_METHOD_LABELS,
  type BusinessType,
  type PaymentMethod,
  type UploadedFile,
  type VendorAccount,
} from "@/lib/auth/types";
import { CATEGORIES } from "@/lib/categories";
import { formatFileSize, toUploadedFile } from "@/lib/file-utils";
import {
  CITIES,
  DESCRIPTION_MAX,
  MAX_CATEGORIES,
  SECTIONS,
  initialValues,
  sectionHasError,
  toStoreInfo,
  validateOnboarding,
  type OnboardingValues,
  type SectionId,
} from "./onboarding/form-model";

const MAX_DOC_BYTES = 5 * 1024 * 1024;
const MAX_OTHER_DOCS = 5;

const SECTION_ICONS: Record<SectionId, React.ElementType> = {
  store: Store,
  contact: Mail,
  address: MapPin,
  identity: IdCard,
  documents: FileText,
  payment: Wallet,
};

function Section({
  id,
  no,
  title,
  description,
  children,
}: {
  id: SectionId;
  no: number;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const Icon = SECTION_ICONS[id];
  return (
    <section
      id={`section-${id}`}
      className="scroll-mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-7 shadow-xs"
    >
      <div className="mb-5 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#082F6B]/10 text-[#082F6B]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-[#1F2937]">
            <span className="mr-1.5 text-zinc-400">{no}.</span>
            {title}
          </h2>
          <p className="text-xs text-zinc-500">{description}</p>
        </div>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function SectionNav({ completed }: { completed: Record<SectionId, boolean> }) {
  const doneCount = Object.values(completed).filter(Boolean).length;
  return (
    <nav aria-label="Form sections" className="sticky top-6 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-xs">
      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Progress</p>
      <p className="mt-1 text-sm font-semibold text-[#1F2937]">
        {doneCount} of {SECTIONS.length} sections complete
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-[#082F6B] transition-all"
          style={{ width: `${(doneCount / SECTIONS.length) * 100}%` }}
        />
      </div>
      <ol className="mt-4 space-y-1">
        {SECTIONS.map(({ id, title }, i) => (
          <li key={id}>
            <a
              href={`#section-${id}`}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-zinc-600 hover:bg-[#F3F7FC] hover:text-[#082F6B]"
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  completed[id] ? "bg-[#082F6B] text-white" : "bg-zinc-100 text-zinc-500"
                }`}
              >
                {completed[id] ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
              </span>
              {title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function OnboardingForm({ vendor }: { vendor: VendorAccount }) {
  const router = useRouter();
  const [values, setValues] = useState<OnboardingValues>(() => initialValues(vendor));
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const otherDocsRef = useRef<HTMLInputElement>(null);

  const liveErrors = validateOnboarding(values);
  const errors = showErrors ? liveErrors : {};
  const completed = Object.fromEntries(
    SECTIONS.map(({ id }) => [id, !sectionHasError(id, liveErrors)])
  ) as Record<SectionId, boolean>;

  const set = <K extends keyof OnboardingValues>(key: K, value: OnboardingValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));
  const text = (key: keyof OnboardingValues) => (e: React.ChangeEvent<HTMLInputElement>) =>
    set(key, e.target.value as never);

  const toggleCategory = (slug: string) => {
    const selected = values.categories.includes(slug);
    if (!selected && values.categories.length >= MAX_CATEGORIES) {
      toast.info(`You can pick up to ${MAX_CATEGORIES} categories.`);
      return;
    }
    set("categories", selected ? values.categories.filter((c) => c !== slug) : [...values.categories, slug]);
  };

  const addOtherDocuments = async (files: FileList | null) => {
    if (!files) return;
    const room = MAX_OTHER_DOCS - values.otherDocuments.length;
    const picked = Array.from(files).slice(0, room);
    if (files.length > room) toast.info(`Up to ${MAX_OTHER_DOCS} additional documents.`);
    const accepted: UploadedFile[] = [];
    for (const file of picked) {
      if (file.size > MAX_DOC_BYTES) {
        toast.error(`${file.name} is larger than 5 MB.`);
        continue;
      }
      accepted.push(await toUploadedFile(file));
    }
    if (accepted.length) setValues((v) => ({ ...v, otherDocuments: [...v.otherDocuments, ...accepted] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowErrors(true);
    const firstInvalid = SECTIONS.find(({ id }) => sectionHasError(id, liveErrors));
    if (firstInvalid || liveErrors.confirmed) {
      toast.error("Please fix the highlighted fields.");
      document
        .getElementById(firstInvalid ? `section-${firstInvalid.id}` : "confirm-box")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setIsSubmitting(true);
    const result = submitStoreInfo(toStoreInfo(values));
    if (!result.ok) {
      toast.error(result.error);
      setIsSubmitting(false);
      return;
    }
    toast.success("Application submitted for review!");
    router.push(VENDOR_ROUTES.status);
  };

  const individual = values.businessType === "individual";
  const isBank = values.paymentMethod === "bank";
  const listErrors = (prefix: string, length: number) =>
    Array.from({ length }, (_, i) => errors[`${prefix}.${i}`]);

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <SectionNav completed={completed} />
      </aside>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {vendor.status === "rejected" && (
          <div role="alert" className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Your previous application was rejected</p>
              <p className="mt-0.5">{vendor.rejectionReason}</p>
              <p className="mt-1 text-xs text-rose-700/80">Update the details below and resubmit.</p>
            </div>
          </div>
        )}

        <Section
          id="store"
          no={1}
          title="Store Details"
          description="Basic details about your business. All products are sold under the Kinbo brand."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="store-name"
              label="Store Name"
              placeholder="e.g. Rahim Electronics"
              value={values.storeName}
              onChange={text("storeName")}
              error={errors.storeName}
              maxLength={60}
            />
            <SelectField
              id="business-type"
              label="Business Type"
              value={values.businessType}
              onChange={(v) => set("businessType", v as BusinessType)}
              options={Object.entries(BUSINESS_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="store-description" className="block text-xs font-semibold text-[#1F2937]">
              Store Description
            </label>
            <textarea
              id="store-description"
              rows={3}
              maxLength={DESCRIPTION_MAX}
              placeholder="What do you sell? What makes your store special?"
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm text-[#1F2937] placeholder:text-zinc-400 focus:outline-none focus:ring-2 ${
                errors.description
                  ? "border-rose-500 focus:ring-rose-200"
                  : "border-[#E5E7EB] focus:border-[#082F6B] focus:ring-[#082F6B]/20"
              }`}
            />
            <div className="flex justify-between text-xs">
              <span className="text-rose-500">{errors.description}</span>
              <span className="text-zinc-400">
                {values.description.length}/{DESCRIPTION_MAX}
              </span>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-[#1F2937]">
              What will you sell?{" "}
              <span className="font-normal text-zinc-400">(up to {MAX_CATEGORIES})</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(({ slug, name, icon: Icon }) => {
                const active = values.categories.includes(slug);
                return (
                  <button
                    key={slug}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleCategory(slug)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      active
                        ? "border-[#082F6B] bg-[#082F6B] text-white"
                        : "border-[#E5E7EB] text-zinc-600 hover:border-[#082F6B] hover:text-[#082F6B]"
                    }`}
                  >
                    {active ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                    {name}
                  </button>
                );
              })}
            </div>
            {errors.categories && <p className="mt-1.5 text-xs text-rose-500">{errors.categories}</p>}
          </div>
        </Section>

        <Section
          id="contact"
          no={2}
          title="Contact Information"
          description="Your signup email & phone are your primary contacts. Add more for orders or support."
        >
          <MultiValueField
            label="Email Addresses"
            type="email"
            placeholder="e.g. support@yourstore.com"
            addLabel="Add another email"
            icon={<Mail className="h-4 w-4" />}
            values={values.emails}
            onChange={(v) => set("emails", v)}
            errors={listErrors("emails", values.emails.length)}
          />
          <MultiValueField
            label="Phone Numbers"
            type="tel"
            inputMode="tel"
            placeholder="01XXXXXXXXX"
            addLabel="Add another phone"
            icon={<Phone className="h-4 w-4" />}
            values={values.phones}
            onChange={(v) => set("phones", v)}
            errors={listErrors("phones", values.phones.length)}
          />
        </Section>

        <Section id="address" no={3} title="Business Address" description="Where your business operates and ships from.">
          <Input
            id="address-line"
            label="Address"
            placeholder="House / shop no., road, building"
            value={values.addressLine}
            onChange={text("addressLine")}
            error={errors.addressLine}
          />
          <div className="grid gap-4 sm:grid-cols-3">
            <Input
              id="address-area"
              label="Area / Thana"
              placeholder="e.g. Dhanmondi"
              value={values.area}
              onChange={text("area")}
              error={errors.area}
            />
            <SelectField
              id="address-city"
              label="City"
              value={values.city}
              onChange={(v) => set("city", v)}
              options={CITIES.map((c) => ({ value: c, label: c }))}
            />
            <Input
              id="address-postal"
              label="Postal Code"
              inputMode="numeric"
              maxLength={4}
              placeholder="1205"
              value={values.postalCode}
              onChange={text("postalCode")}
              error={errors.postalCode}
            />
          </div>
        </Section>

        <Section
          id="identity"
          no={4}
          title="Owner Identity (NID)"
          description="Must match the account holder. Make sure all four corners and text are clearly visible."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input id="owner-name" label="Owner Name" value={vendor.fullName} readOnly className="bg-zinc-50 text-zinc-600" />
            <Input
              id="nid-number"
              label="NID Number"
              inputMode="numeric"
              placeholder="10, 13 or 17 digits"
              value={values.nidNumber}
              onChange={text("nidNumber")}
              error={errors.nidNumber}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <FileUploadField
              id="nid-front"
              label="NID Front Side"
              hint="JPG/PNG/PDF, max 5 MB"
              required
              value={values.nidFront}
              onChange={(f) => set("nidFront", f)}
              error={errors.nidFront}
            />
            <FileUploadField
              id="nid-back"
              label="NID Back Side"
              hint="JPG/PNG/PDF, max 5 MB"
              required
              value={values.nidBack}
              onChange={(f) => set("nidBack", f)}
              error={errors.nidBack}
            />
            <FileUploadField
              id="owner-photo"
              label="Owner Photo"
              hint="Clear face photo"
              accept="image/*"
              value={values.ownerPhoto}
              onChange={(f) => set("ownerPhoto", f)}
            />
          </div>
        </Section>

        <Section
          id="documents"
          no={5}
          title="Business Documents"
          description={
            individual
              ? "Individual sellers can skip these, but adding them speeds up verification."
              : "Trade license is required for registered businesses."
          }
        >
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_220px]">
            <Input
              id="trade-license-number"
              label={individual ? "Trade License Number (optional)" : "Trade License Number"}
              placeholder="TRAD/DNCC/000000/2026"
              value={values.tradeLicenseNumber}
              onChange={text("tradeLicenseNumber")}
              error={errors.tradeLicenseNumber}
            />
            <FileUploadField
              id="trade-license-file"
              label="Trade License Copy"
              hint="JPG/PNG/PDF"
              required={!individual || !!values.tradeLicenseNumber.trim()}
              value={values.tradeLicenseFile}
              onChange={(f) => set("tradeLicenseFile", f)}
              error={errors.tradeLicenseFile}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_220px]">
            <Input
              id="tin-number"
              label={values.businessType === "limited-company" ? "e-TIN Number" : "e-TIN Number (optional)"}
              inputMode="numeric"
              maxLength={12}
              placeholder="12 digits"
              value={values.tinNumber}
              onChange={text("tinNumber")}
              error={errors.tinNumber}
            />
            <FileUploadField
              id="tin-file"
              label="e-TIN Certificate"
              hint="JPG/PNG/PDF"
              value={values.tinFile}
              onChange={(f) => set("tinFile", f)}
            />
          </div>

          <div>
            <p className="mb-1.5 text-xs font-semibold text-[#1F2937]">
              Other Documents <span className="font-normal text-zinc-400">(optional — BIN/VAT, product authorization, etc.)</span>
            </p>
            {values.otherDocuments.length > 0 && (
              <ul className="mb-2 space-y-2">
                {values.otherDocuments.map((doc, i) => (
                  <li key={`${doc.name}-${i}`} className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] px-3 py-2">
                    {doc.dataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={doc.dataUrl} alt="" className="h-8 w-8 rounded object-cover" />
                    ) : (
                      <FileText className="h-5 w-5 shrink-0 text-[#082F6B]" />
                    )}
                    <span className="min-w-0 flex-1 truncate text-sm text-[#1F2937]">{doc.name}</span>
                    <span className="text-xs text-zinc-400">{formatFileSize(doc.size)}</span>
                    <button
                      type="button"
                      onClick={() => set("otherDocuments", values.otherDocuments.filter((_, k) => k !== i))}
                      className="rounded-md p-1 text-zinc-400 hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                      aria-label={`Remove ${doc.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {values.otherDocuments.length < MAX_OTHER_DOCS && (
              <button
                type="button"
                onClick={() => otherDocsRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-[#082F6B]/40 px-3 py-2 text-xs font-semibold text-[#082F6B] hover:bg-[#F3F7FC] cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" /> Add document
              </button>
            )}
            <input
              ref={otherDocsRef}
              type="file"
              multiple
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => {
                addOtherDocuments(e.target.files);
                e.target.value = "";
              }}
            />
          </div>
        </Section>

        <Section id="payment" no={6} title="Payment Information" description="Where we'll send your earnings.">
          <label className="flex items-center gap-2.5 text-sm text-zinc-600 cursor-pointer">
            <input
              type="checkbox"
              checked={values.addPaymentLater}
              onChange={(e) => set("addPaymentLater", e.target.checked)}
              className="h-4 w-4 rounded accent-[#082F6B]"
            />
            I&apos;ll add payment details later
          </label>

          {!values.addPaymentLater && (
            <>
              <div className="grid grid-cols-3 gap-3" role="radiogroup" aria-label="Payment method">
                {(Object.keys(PAYMENT_METHOD_LABELS) as PaymentMethod[]).map((method) => {
                  const active = values.paymentMethod === method;
                  return (
                    <button
                      key={method}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => set("paymentMethod", method)}
                      className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 text-sm font-semibold transition cursor-pointer ${
                        active
                          ? "border-[#082F6B] bg-[#082F6B]/5 text-[#082F6B]"
                          : "border-[#E5E7EB] text-zinc-600 hover:border-zinc-300"
                      }`}
                    >
                      {method === "bank" ? <Building2 className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
                      {PAYMENT_METHOD_LABELS[method]}
                    </button>
                  );
                })}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="account-name"
                  label="Account Holder Name"
                  value={values.accountName}
                  onChange={text("accountName")}
                  error={errors.accountName}
                />
                <Input
                  id="account-number"
                  label={isBank ? "Account Number" : `${PAYMENT_METHOD_LABELS[values.paymentMethod]} Number`}
                  inputMode="numeric"
                  placeholder={isBank ? "10–17 digits" : "01XXXXXXXXX"}
                  value={values.accountNumber}
                  onChange={text("accountNumber")}
                  error={errors.accountNumber}
                />
                {isBank && (
                  <>
                    <Input
                      id="bank-name"
                      label="Bank Name"
                      placeholder="e.g. Dutch-Bangla Bank"
                      value={values.bankName}
                      onChange={text("bankName")}
                      error={errors.bankName}
                    />
                    <Input
                      id="bank-branch"
                      label="Branch"
                      placeholder="e.g. Dhanmondi"
                      value={values.branch}
                      onChange={text("branch")}
                      error={errors.branch}
                    />
                    <Input
                      id="routing-number"
                      label="Routing Number (optional)"
                      inputMode="numeric"
                      maxLength={9}
                      placeholder="9 digits"
                      value={values.routingNumber}
                      onChange={text("routingNumber")}
                      error={errors.routingNumber}
                    />
                  </>
                )}
              </div>
              <FileUploadField
                id="payment-proof"
                label={isBank ? "Cheque Leaf / Bank Statement" : "Wallet Account Screenshot"}
                hint="Helps verify the account belongs to you"
                aspect="wide"
                value={values.paymentProof}
                onChange={(f) => set("paymentProof", f)}
                className="sm:max-w-md"
              />
            </>
          )}
        </Section>

        <div id="confirm-box" className="scroll-mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
          <label className="flex items-start gap-2.5 text-sm text-zinc-600 cursor-pointer">
            <input
              type="checkbox"
              checked={values.confirmed}
              onChange={(e) => set("confirmed", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded accent-[#082F6B]"
            />
            I confirm that the information and documents provided are accurate. Kinbo may contact me
            for additional verification.
          </label>
          {errors.confirmed && <p className="mt-1 text-xs text-rose-500">{errors.confirmed}</p>}
          <Button type="submit" size="lg" className="mt-5 w-full" isLoading={isSubmitting}>
            Submit for Review
          </Button>
        </div>
      </form>
    </div>
  );
}

function OnboardingContent() {
  const { vendor } = useAuth();
  if (!vendor) return null;
  return (
    <AuthLayout
      wide
      step={3}
      title={vendor.status === "rejected" ? "Update your store information" : "Complete your store information"}
      subtitle={`Hi ${vendor.fullName.split(" ")[0]}, tell us about your business so our team can verify it.`}
      footer={
        <button type="button" onClick={logout} className="font-semibold text-zinc-500 hover:text-[#082F6B] cursor-pointer">
          Sign out and continue later
        </button>
      }
    >
      <OnboardingForm vendor={vendor} />
    </AuthLayout>
  );
}

export default function VendorOnboardingView() {
  return (
    <RouteGuard step="onboarding">
      <OnboardingContent />
    </RouteGuard>
  );
}
