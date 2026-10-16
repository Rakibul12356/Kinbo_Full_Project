import { normalizePhone } from "./auth-store";

export const validateName = (v: string) =>
  v.trim().length < 3 ? "Enter your full name (at least 3 characters)." : undefined;

export const validateEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? undefined : "Enter a valid email address.";

/** Bangladeshi mobile: 01XXXXXXXXX, optionally prefixed with +880 / 880. */
export const validatePhone = (v: string) =>
  /^01[3-9]\d{8}$/.test(normalizePhone(v)) ? undefined : "Enter a valid BD mobile number (01XXXXXXXXX).";

export const validatePassword = (v: string) => {
  if (v.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) return "Use both letters and numbers.";
  return undefined;
};

export const required = (label: string) => (v: string) =>
  v.trim() ? undefined : `${label} is required.`;

export function passwordStrength(v: string): { score: 0 | 1 | 2 | 3 | 4; label: string } {
  let score = 0;
  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
  if (/\d/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  return { score: score as 0 | 1 | 2 | 3 | 4, label: labels[score] };
}
