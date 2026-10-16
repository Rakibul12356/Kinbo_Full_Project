export type VendorStatus = "pending" | "approved" | "rejected";

export type BusinessType =
  | "individual"
  | "sole-proprietorship"
  | "partnership"
  | "limited-company";

export type PaymentMethod = "bank" | "bkash" | "nagad";

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  /** Compressed preview for images; PDFs keep metadata only (mock storage limit). */
  dataUrl?: string;
}

export interface StoreInfo {
  storeName: string;
  description: string;
  businessType: BusinessType;
  /** Category slugs from lib/categories.ts. */
  categories: string[];
  contact: {
    /** Index 0 is always the verified signup email / phone. */
    emails: string[];
    phones: string[];
  };
  address: {
    line: string;
    area: string;
    city: string;
    postalCode: string;
  };
  owner: {
    nidNumber: string;
    nidFront: UploadedFile;
    nidBack: UploadedFile;
    photo?: UploadedFile;
  };
  tradeLicense?: { number: string; file: UploadedFile };
  tin?: { number: string; file?: UploadedFile };
  otherDocuments: UploadedFile[];
  /** Optional at onboarding; vendors can add payout details later. */
  payment?: {
    method: PaymentMethod;
    accountName: string;
    accountNumber: string;
    bankName?: string;
    branch?: string;
    routingNumber?: string;
    proof?: UploadedFile;
  };
}

export interface VendorAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  emailVerified: boolean;
  otp?: string;
  store?: StoreInfo;
  status?: VendorStatus;
  rejectionReason?: string;
  submittedAt?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface AdminAccount {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export type Session =
  | { role: "vendor"; userId: string }
  | { role: "admin"; userId: string };

export interface AuthState {
  /** False on the server and during hydration; guards must wait for it. */
  ready: boolean;
  vendors: VendorAccount[];
  session: Session | null;
  /** Vendor who signed up (or tried to log in) but hasn't verified the OTP yet. */
  verifyingUserId: string | null;
}

export const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  individual: "Individual Seller",
  "sole-proprietorship": "Sole Proprietorship",
  partnership: "Partnership",
  "limited-company": "Limited Company",
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  bank: "Bank Account",
  bkash: "bKash",
  nagad: "Nagad",
};
