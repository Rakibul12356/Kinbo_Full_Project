"use client";

/**
 * Frontend-only mock auth. Everything lives in localStorage until the backend
 * auth API exists; swap these functions for API calls when it does.
 */

import { DEMO_ADMIN, DEMO_VENDORS } from "./demo-accounts";
import type { AuthState, StoreInfo, VendorAccount, VendorStatus } from "./types";

const STORAGE_KEY = "kinbo_mock_auth";
const STORAGE_VERSION = 2;

export const VENDOR_ROUTES = {
  signup: "/vendor/signup",
  verify: "/vendor/verify",
  login: "/vendor/login",
  onboarding: "/vendor/onboarding",
  status: "/vendor/status",
  dashboard: "/vendor/dashboard",
} as const;

export const ADMIN_ROUTES = {
  login: "/admin/login",
  dashboard: "/admin/dashboard",
  vendors: "/admin/vendors",
} as const;

export type ActionResult<T = object> =
  | ({ ok: true } & T)
  | { ok: false; error: string };

const SERVER_STATE: AuthState = {
  ready: false,
  vendors: [],
  session: null,
  verifyingUserId: null,
};

let state: AuthState | null = null;
const listeners = new Set<() => void>();

function freshState(): AuthState {
  return {
    ready: true,
    vendors: structuredClone(DEMO_VENDORS),
    session: null,
    verifyingUserId: null,
  };
}

function load(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.version === STORAGE_VERSION) {
        return { ...parsed.data, ready: true };
      }
    }
  } catch {
    // Corrupt storage falls back to the demo seed below.
  }
  return freshState();
}

function setState(next: AuthState) {
  state = next;
  try {
    const data = { vendors: next.vendors, session: next.session, verifyingUserId: next.verifyingUserId };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, data }));
  } catch {
    // Quota errors (e.g. a large logo) shouldn't break the in-memory flow.
  }
  listeners.forEach((listener) => listener());
}

function update(patch: Partial<AuthState>) {
  setState({ ...getAuthSnapshot(), ...patch });
}

function updateVendor(id: string, patch: Partial<VendorAccount>) {
  const current = getAuthSnapshot();
  update({
    vendors: current.vendors.map((v) => (v.id === id ? { ...v, ...patch } : v)),
  });
}

export function getAuthSnapshot(): AuthState {
  if (!state) state = load();
  return state;
}

export function getServerAuthSnapshot(): AuthState {
  return SERVER_STATE;
}

export function subscribeAuth(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/* ---------- Helpers ---------- */

const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

export function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("880") ? `0${digits.slice(3)}` : digits;
}

/** Where a vendor belongs right now, based on how far they got in onboarding. */
export function vendorHomeRoute(vendor: VendorAccount): string {
  if (!vendor.emailVerified) return VENDOR_ROUTES.verify;
  if (!vendor.store) return VENDOR_ROUTES.onboarding;
  if (vendor.status !== "approved") return VENDOR_ROUTES.status;
  return VENDOR_ROUTES.dashboard;
}

export function getCurrentVendor(s: AuthState): VendorAccount | null {
  if (s.session?.role !== "vendor") return null;
  const { userId } = s.session;
  return s.vendors.find((v) => v.id === userId) ?? null;
}

/* ---------- Vendor actions ---------- */

export function signupVendor(input: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}): ActionResult<{ otp: string }> {
  const current = getAuthSnapshot();
  const email = input.email.trim().toLowerCase();
  const phone = normalizePhone(input.phone);

  if (current.vendors.some((v) => v.email === email) || email === DEMO_ADMIN.email) {
    return { ok: false, error: "An account with this email already exists." };
  }
  if (current.vendors.some((v) => v.phone === phone)) {
    return { ok: false, error: "This phone number is already registered." };
  }

  const otp = generateOtp();
  const vendor: VendorAccount = {
    id: `vendor-${Date.now()}`,
    fullName: input.fullName.trim(),
    email,
    phone,
    password: input.password,
    emailVerified: false,
    otp,
    createdAt: new Date().toISOString(),
  };

  update({
    vendors: [...current.vendors, vendor],
    session: null,
    verifyingUserId: vendor.id,
  });
  return { ok: true, otp };
}

export function getVerifyingVendor(s: AuthState): VendorAccount | null {
  return s.vendors.find((v) => v.id === s.verifyingUserId) ?? null;
}

export function verifyOtp(code: string): ActionResult {
  const current = getAuthSnapshot();
  const vendor = getVerifyingVendor(current);
  if (!vendor) return { ok: false, error: "Verification session expired. Please sign in again." };
  if (vendor.otp !== code) return { ok: false, error: "Incorrect code. Please try again." };

  update({
    vendors: current.vendors.map((v) =>
      v.id === vendor.id ? { ...v, emailVerified: true, otp: undefined } : v
    ),
    verifyingUserId: null,
  });
  return { ok: true };
}

export function resendOtp(): ActionResult<{ otp: string }> {
  const vendor = getVerifyingVendor(getAuthSnapshot());
  if (!vendor) return { ok: false, error: "Verification session expired. Please sign in again." };
  const otp = generateOtp();
  updateVendor(vendor.id, { otp });
  return { ok: true, otp };
}

export function loginVendor(
  email: string,
  password: string
): ActionResult<{ redirectTo: string; otp?: string }> {
  const current = getAuthSnapshot();
  const vendor = current.vendors.find((v) => v.email === email.trim().toLowerCase());
  if (!vendor || vendor.password !== password) {
    return { ok: false, error: "Invalid email or password." };
  }

  if (!vendor.emailVerified) {
    const otp = generateOtp();
    update({
      vendors: current.vendors.map((v) => (v.id === vendor.id ? { ...v, otp } : v)),
      session: null,
      verifyingUserId: vendor.id,
    });
    return { ok: true, redirectTo: VENDOR_ROUTES.verify, otp };
  }

  update({ session: { role: "vendor", userId: vendor.id }, verifyingUserId: null });
  return { ok: true, redirectTo: vendorHomeRoute(vendor) };
}

export function submitStoreInfo(store: StoreInfo): ActionResult {
  const vendor = getCurrentVendor(getAuthSnapshot());
  if (!vendor) return { ok: false, error: "Please sign in again." };
  updateVendor(vendor.id, {
    store,
    status: "pending",
    rejectionReason: undefined,
    reviewedAt: undefined,
    submittedAt: new Date().toISOString(),
  });
  return { ok: true };
}

/* ---------- Admin actions ---------- */

export function loginAdmin(email: string, password: string): ActionResult {
  if (email.trim().toLowerCase() !== DEMO_ADMIN.email || password !== DEMO_ADMIN.password) {
    return { ok: false, error: "Invalid admin credentials." };
  }
  update({ session: { role: "admin", userId: DEMO_ADMIN.id }, verifyingUserId: null });
  return { ok: true };
}

export function reviewVendor(
  vendorId: string,
  decision: Exclude<VendorStatus, "pending">,
  reason?: string
): ActionResult {
  if (getAuthSnapshot().session?.role !== "admin") {
    return { ok: false, error: "Only admins can review vendors." };
  }
  updateVendor(vendorId, {
    status: decision,
    rejectionReason: decision === "rejected" ? reason?.trim() || "Documents could not be verified." : undefined,
    reviewedAt: new Date().toISOString(),
  });
  return { ok: true };
}

/* ---------- Shared ---------- */

export function logout() {
  update({ session: null });
}

export function resetDemoData() {
  setState(freshState());
}
