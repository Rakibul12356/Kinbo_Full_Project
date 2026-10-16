"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MailCheck, Info } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import RouteGuard from "@/components/auth/RouteGuard";
import { LOGIN_EMAIL_HINT_KEY } from "@/components/auth/LoginForm";
import Button from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { VENDOR_ROUTES, resendOtp, verifyOtp } from "@/lib/auth/auth-store";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_S = 30;

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!domain) return email;
  return `${name.slice(0, 2)}${"•".repeat(Math.max(name.length - 2, 1))}@${domain}`;
}

function VerifyForm() {
  const router = useRouter();
  const { verifyingVendor } = useAuth();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState<string>();
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_S);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  if (!verifyingVendor) return null;

  const focusAt = (i: number) => inputsRef.current[Math.min(Math.max(i, 0), OTP_LENGTH - 1)]?.focus();

  const fillFrom = (start: number, text: string) => {
    const chars = text.replace(/\D/g, "").slice(0, OTP_LENGTH - start).split("");
    if (!chars.length) return;
    setDigits((prev) => {
      const next = [...prev];
      chars.forEach((c, k) => (next[start + k] = c));
      return next;
    });
    setError(undefined);
    focusAt(start + chars.length);
  };

  const handleKeyDown = (i: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i]) {
      e.preventDefault();
      setDigits((prev) => prev.map((d, k) => (k === i - 1 ? "" : d)));
      focusAt(i - 1);
    } else if (e.key === "ArrowLeft") {
      focusAt(i - 1);
    } else if (e.key === "ArrowRight") {
      focusAt(i + 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError("Enter the 6-digit code.");
      return;
    }
    const email = verifyingVendor.email;
    const result = verifyOtp(code);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    sessionStorage.setItem(LOGIN_EMAIL_HINT_KEY, email);
    toast.success("Email verified! Please sign in to continue.");
    router.push(VENDOR_ROUTES.login);
  };

  const handleResend = () => {
    const result = resendOtp();
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(undefined);
    setCooldown(RESEND_COOLDOWN_S);
    focusAt(0);
    toast.info(`New code sent. Demo OTP: ${result.otp}`);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="flex items-center gap-3 rounded-2xl bg-[#F3F7FC] p-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#082F6B] text-white">
          <MailCheck className="h-5 w-5" />
        </span>
        <p className="text-sm text-zinc-600">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-[#1F2937]">{maskEmail(verifyingVendor.email)}</span>{" "}
          and <span className="font-semibold text-[#1F2937]">{verifyingVendor.phone}</span>.
        </p>
      </div>

      <div>
        <div className="flex justify-between gap-2 sm:gap-3">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              value={digit}
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              aria-label={`Digit ${i + 1}`}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length > 1) {
                  fillFrom(i, value);
                } else if (/^\d?$/.test(value)) {
                  setDigits((prev) => prev.map((d, k) => (k === i ? value : d)));
                  setError(undefined);
                  if (value) focusAt(i + 1);
                }
              }}
              onKeyDown={handleKeyDown(i)}
              onPaste={(e) => {
                e.preventDefault();
                fillFrom(i, e.clipboardData.getData("text"));
              }}
              className={`h-12 w-full sm:h-14 rounded-xl border text-center text-xl font-bold text-[#1F2937] transition focus:outline-none focus:ring-2 ${
                error
                  ? "border-rose-400 focus:ring-rose-200"
                  : digit
                    ? "border-[#082F6B] focus:ring-[#082F6B]/20"
                    : "border-[#E5E7EB] focus:border-[#082F6B] focus:ring-[#082F6B]/20"
              }`}
            />
          ))}
        </div>
        {error && <p role="alert" className="mt-2 text-xs text-rose-500">{error}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full">
        Verify & Continue
      </Button>

      <p className="text-center text-sm text-zinc-500">
        Didn&apos;t get the code?{" "}
        {cooldown > 0 ? (
          <span className="font-semibold text-zinc-400">Resend in {cooldown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-[#082F6B] hover:underline cursor-pointer"
          >
            Resend code
          </button>
        )}
      </p>

      {verifyingVendor.otp && (
        <div className="flex items-start gap-2 rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Demo mode — no email is actually sent. Your code is{" "}
            <span className="font-mono text-sm font-bold tracking-widest">{verifyingVendor.otp}</span>
          </span>
        </div>
      )}
    </form>
  );
}

export default function VendorVerifyView() {
  return (
    <RouteGuard step="verify">
      <AuthLayout
        step={2}
        title="Verify your email & phone"
        subtitle="Enter the code to confirm it's really you."
        footer={
          <Link href={VENDOR_ROUTES.login} className="font-semibold text-[#082F6B] hover:underline">
            Back to sign in
          </Link>
        }
      >
        <VerifyForm />
      </AuthLayout>
    </RouteGuard>
  );
}
