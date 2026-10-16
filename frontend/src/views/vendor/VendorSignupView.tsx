"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Mail, Phone, User } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";
import RouteGuard from "@/components/auth/RouteGuard";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { VENDOR_ROUTES, signupVendor } from "@/lib/auth/auth-store";
import {
  passwordStrength,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "@/lib/auth/validation";

type Field = "fullName" | "email" | "phone" | "password" | "confirmPassword";

const STRENGTH_COLORS = ["bg-rose-500", "bg-rose-500", "bg-amber-500", "bg-sky-500", "bg-emerald-500"];

export default function VendorSignupView() {
  const router = useRouter();
  const [values, setValues] = useState<Record<Field, string>>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field | "terms" | "form", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }));
  };

  const strength = passwordStrength(values.password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = {
      fullName: validateName(values.fullName),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      password: validatePassword(values.password),
      confirmPassword:
        values.confirmPassword === values.password ? undefined : "Passwords do not match.",
      terms: acceptTerms ? undefined : "Please accept the seller terms to continue.",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    const result = signupVendor(values);
    if (!result.ok) {
      setErrors({ form: result.error });
      setIsSubmitting(false);
      return;
    }
    toast.info(`Verification code sent to ${values.email}. Demo OTP: ${result.otp}`);
    router.push(VENDOR_ROUTES.verify);
  };

  return (
    <RouteGuard step="vendor-guest">
      <AuthLayout
        step={1}
        title="Create your seller account"
        subtitle="Start selling on Kinbo in a few simple steps."
        footer={
          <>
            Already have an account?{" "}
            <Link href={VENDOR_ROUTES.login} className="font-semibold text-[#082F6B] hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {errors.form && (
            <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {errors.form}
            </p>
          )}
          <Input
            id="signup-name"
            label="Full Name"
            autoComplete="name"
            placeholder="e.g. Rahim Uddin"
            value={values.fullName}
            onChange={set("fullName")}
            error={errors.fullName}
            leftIcon={<User className="h-4 w-4" />}
          />
          <Input
            id="signup-email"
            label="Email Address"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <Input
            id="signup-phone"
            label="Phone Number"
            type="tel"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            value={values.phone}
            onChange={set("phone")}
            error={errors.phone}
            leftIcon={<Phone className="h-4 w-4" />}
          />
          <div className="space-y-2">
            <PasswordInput
              id="signup-password"
              label="Password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={values.password}
              onChange={set("password")}
              error={errors.password}
            />
            {values.password && (
              <div className="flex items-center gap-2">
                <div className="flex flex-1 gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i <= strength.score ? STRENGTH_COLORS[strength.score] : "bg-zinc-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="w-16 text-right text-[11px] font-semibold text-zinc-500">
                  {strength.label}
                </span>
              </div>
            )}
          </div>
          <PasswordInput
            id="signup-confirm-password"
            label="Confirm Password"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={values.confirmPassword}
            onChange={set("confirmPassword")}
            error={errors.confirmPassword}
          />

          <div>
            <label className="flex items-start gap-2.5 text-xs text-zinc-600 cursor-pointer">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => {
                  setAcceptTerms(e.target.checked);
                  setErrors((err) => ({ ...err, terms: undefined }));
                }}
                className="mt-0.5 h-4 w-4 rounded accent-[#082F6B]"
              />
              <span>
                I agree to Kinbo&apos;s{" "}
                <span className="font-semibold text-[#082F6B]">Seller Terms</span> and{" "}
                <span className="font-semibold text-[#082F6B]">Privacy Policy</span>.
              </span>
            </label>
            {errors.terms && <p className="mt-1 text-xs text-rose-500">{errors.terms}</p>}
          </div>

          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
            Create Account
          </Button>
        </form>
      </AuthLayout>
    </RouteGuard>
  );
}
