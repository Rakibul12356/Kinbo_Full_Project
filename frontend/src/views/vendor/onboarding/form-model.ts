import { normalizePhone } from "@/lib/auth/auth-store";
import type {
  BusinessType,
  PaymentMethod,
  StoreInfo,
  UploadedFile,
  VendorAccount,
} from "@/lib/auth/types";
import { validateEmail, validatePhone } from "@/lib/auth/validation";

export const CITIES = [
  "Dhaka", "Chattogram", "Gazipur", "Narayanganj", "Khulna", "Rajshahi",
  "Sylhet", "Barishal", "Rangpur", "Mymensingh", "Cumilla",
];

export const MAX_CATEGORIES = 3;
export const DESCRIPTION_MIN = 30;
export const DESCRIPTION_MAX = 500;

export interface OnboardingValues {
  storeName: string;
  description: string;
  businessType: BusinessType;
  categories: string[];
  emails: string[];
  phones: string[];
  addressLine: string;
  area: string;
  city: string;
  postalCode: string;
  nidNumber: string;
  nidFront?: UploadedFile;
  nidBack?: UploadedFile;
  ownerPhoto?: UploadedFile;
  tradeLicenseNumber: string;
  tradeLicenseFile?: UploadedFile;
  tinNumber: string;
  tinFile?: UploadedFile;
  otherDocuments: UploadedFile[];
  addPaymentLater: boolean;
  paymentMethod: PaymentMethod;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branch: string;
  routingNumber: string;
  paymentProof?: UploadedFile;
  confirmed: boolean;
}

/** Keys are field names, or `emails.<i>` / `phones.<i>` for list items. */
export type OnboardingErrors = Record<string, string | undefined>;

export const SECTIONS = [
  { id: "store", title: "Store Details", fields: ["storeName", "description", "categories"] },
  { id: "contact", title: "Contact Information", fields: ["emails", "phones"] },
  { id: "address", title: "Business Address", fields: ["addressLine", "area", "postalCode"] },
  { id: "identity", title: "Owner Identity (NID)", fields: ["nidNumber", "nidFront", "nidBack"] },
  {
    id: "documents",
    title: "Business Documents",
    fields: ["tradeLicenseNumber", "tradeLicenseFile", "tinNumber"],
  },
  {
    id: "payment",
    title: "Payment Information",
    fields: ["accountName", "accountNumber", "bankName", "branch", "routingNumber"],
  },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export function sectionHasError(sectionId: SectionId, errors: OnboardingErrors) {
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  return Object.entries(errors).some(
    ([key, message]) =>
      message && section.fields.some((f) => key === f || key.startsWith(`${f}.`))
  );
}

export function initialValues(vendor: VendorAccount): OnboardingValues {
  const s = vendor.store;
  return {
    storeName: s?.storeName ?? "",
    description: s?.description ?? "",
    businessType: s?.businessType ?? "individual",
    categories: s?.categories ?? [],
    emails: [vendor.email, ...(s?.contact.emails.slice(1) ?? [])],
    phones: [vendor.phone, ...(s?.contact.phones.slice(1) ?? [])],
    addressLine: s?.address.line ?? "",
    area: s?.address.area ?? "",
    city: s?.address.city ?? "Dhaka",
    postalCode: s?.address.postalCode ?? "",
    nidNumber: s?.owner.nidNumber ?? "",
    nidFront: s?.owner.nidFront,
    nidBack: s?.owner.nidBack,
    ownerPhoto: s?.owner.photo,
    tradeLicenseNumber: s?.tradeLicense?.number ?? "",
    tradeLicenseFile: s?.tradeLicense?.file,
    tinNumber: s?.tin?.number ?? "",
    tinFile: s?.tin?.file,
    otherDocuments: s?.otherDocuments ?? [],
    addPaymentLater: !!s && !s.payment,
    paymentMethod: s?.payment?.method ?? "bank",
    accountName: s?.payment?.accountName ?? vendor.fullName,
    accountNumber: s?.payment?.accountNumber ?? "",
    bankName: s?.payment?.bankName ?? "",
    branch: s?.payment?.branch ?? "",
    routingNumber: s?.payment?.routingNumber ?? "",
    paymentProof: s?.payment?.proof,
    confirmed: false,
  };
}

const req = (value: string, label: string) => (value.trim() ? undefined : `${label} is required.`);

function listErrors(
  prefix: "emails" | "phones",
  values: string[],
  validateOne: (v: string) => string | undefined,
  normalize: (v: string) => string
): OnboardingErrors {
  const errors: OnboardingErrors = {};
  const seen = new Set<string>();
  values.forEach((value, i) => {
    const key = normalize(value);
    if (i > 0) {
      errors[`${prefix}.${i}`] = validateOne(value) ?? (seen.has(key) ? "Already added." : undefined);
    }
    seen.add(key);
  });
  return errors;
}

export function validateOnboarding(v: OnboardingValues): OnboardingErrors {
  const needsTradeLicense =
    v.businessType !== "individual" || !!v.tradeLicenseNumber.trim() || !!v.tradeLicenseFile;
  const needsTin = v.businessType === "limited-company" || !!v.tinNumber.trim() || !!v.tinFile;

  const errors: OnboardingErrors = {
    storeName:
      v.storeName.trim().length < 3 ? "Store name must be at least 3 characters." : undefined,
    description:
      v.description.trim().length < DESCRIPTION_MIN
        ? `Describe your store in at least ${DESCRIPTION_MIN} characters.`
        : undefined,
    categories: v.categories.length ? undefined : "Pick at least one category.",
    ...listErrors("emails", v.emails, validateEmail, (e) => e.trim().toLowerCase()),
    ...listErrors("phones", v.phones, validatePhone, normalizePhone),
    addressLine: req(v.addressLine, "Address"),
    area: req(v.area, "Area / Thana"),
    postalCode: /^\d{4}$/.test(v.postalCode.trim()) ? undefined : "Postal code must be 4 digits.",
    nidNumber: /^(\d{10}|\d{13}|\d{17})$/.test(v.nidNumber.trim())
      ? undefined
      : "NID must be 10, 13 or 17 digits.",
    nidFront: v.nidFront ? undefined : "Upload the front side of your NID.",
    nidBack: v.nidBack ? undefined : "Upload the back side of your NID.",
    tradeLicenseNumber: needsTradeLicense ? req(v.tradeLicenseNumber, "Trade license number") : undefined,
    tradeLicenseFile:
      needsTradeLicense && !v.tradeLicenseFile ? "Upload a copy of your trade license." : undefined,
    tinNumber: needsTin
      ? /^\d{12}$/.test(v.tinNumber.trim())
        ? undefined
        : "e-TIN must be 12 digits."
      : undefined,
    confirmed: v.confirmed ? undefined : "Please confirm the information is accurate.",
  };

  if (!v.addPaymentLater) {
    errors.accountName = req(v.accountName, "Account holder name");
    if (v.paymentMethod === "bank") {
      errors.accountNumber = /^\d{10,17}$/.test(v.accountNumber.trim())
        ? undefined
        : "Enter a valid bank account number (10–17 digits).";
      errors.bankName = req(v.bankName, "Bank name");
      errors.branch = req(v.branch, "Branch");
      errors.routingNumber =
        !v.routingNumber.trim() || /^\d{9}$/.test(v.routingNumber.trim())
          ? undefined
          : "Routing number must be 9 digits.";
    } else {
      errors.accountNumber = validatePhone(v.accountNumber);
    }
  }
  return errors;
}

export function toStoreInfo(v: OnboardingValues): StoreInfo {
  const isBank = v.paymentMethod === "bank";
  return {
    storeName: v.storeName.trim(),
    description: v.description.trim(),
    businessType: v.businessType,
    categories: v.categories,
    contact: {
      emails: v.emails.map((e) => e.trim().toLowerCase()).filter(Boolean),
      phones: v.phones.map(normalizePhone).filter(Boolean),
    },
    address: {
      line: v.addressLine.trim(),
      area: v.area.trim(),
      city: v.city,
      postalCode: v.postalCode.trim(),
    },
    owner: {
      nidNumber: v.nidNumber.trim(),
      nidFront: v.nidFront!,
      nidBack: v.nidBack!,
      photo: v.ownerPhoto,
    },
    tradeLicense:
      v.tradeLicenseNumber.trim() && v.tradeLicenseFile
        ? { number: v.tradeLicenseNumber.trim(), file: v.tradeLicenseFile }
        : undefined,
    tin: v.tinNumber.trim() ? { number: v.tinNumber.trim(), file: v.tinFile } : undefined,
    otherDocuments: v.otherDocuments,
    payment: v.addPaymentLater
      ? undefined
      : {
          method: v.paymentMethod,
          accountName: v.accountName.trim(),
          accountNumber: v.accountNumber.trim(),
          bankName: isBank ? v.bankName.trim() : undefined,
          branch: isBank ? v.branch.trim() : undefined,
          routingNumber: isBank ? v.routingNumber.trim() || undefined : undefined,
          proof: v.paymentProof,
        },
  };
}