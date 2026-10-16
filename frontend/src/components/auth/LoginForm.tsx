"use client";

import React, { useState } from "react";
import { Mail, UserRound } from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import PasswordInput from "./PasswordInput";
import type { ActionResult } from "@/lib/auth/auth-store";
import { validateEmail } from "@/lib/auth/validation";

export const LOGIN_EMAIL_HINT_KEY = "kinbo_login_email";

export interface DemoAccount {
  label: string;
  description: string;
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (email: string, password: string) => ActionResult;
  demoAccounts?: DemoAccount[];
  submitLabel?: string;
}

export default function LoginForm({
  onSubmit,
  demoAccounts = [],
  submitLabel = "Sign In",
}: LoginFormProps) {
  // Only rendered after hydration (inside RouteGuard), so reading storage here is safe.
  const [email, setEmail] = useState(() => {
    const hint = sessionStorage.getItem(LOGIN_EMAIL_HINT_KEY) ?? "";
    sessionStorage.removeItem(LOGIN_EMAIL_HINT_KEY);
    return hint;
  });
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = {
      email: validateEmail(email),
      password: password ? undefined : "Password is required.",
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setIsSubmitting(true);
    const result = onSubmit(email, password);
    if (!result.ok) {
      setErrors({ form: result.error });
      setIsSubmitting(false);
    }
  };

  const fillDemo = (account: DemoAccount) => {
    setEmail(account.email);
    setPassword(account.password);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {errors.form && (
          <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
            {errors.form}
          </p>
        )}
        <Input
          id="login-email"
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          leftIcon={<Mail className="h-4 w-4" />}
        />
        <PasswordInput
          id="login-password"
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 text-zinc-600 cursor-pointer">
            <input type="checkbox" className="h-4 w-4 rounded accent-[#082F6B]" defaultChecked />
            Remember me
          </label>
          <button
            type="button"
            className="font-semibold text-[#082F6B] hover:underline cursor-pointer"
            onClick={() => setErrors({ form: "Password reset will be available once the backend is connected." })}
          >
            Forgot password?
          </button>
        </div>
        <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </form>

      {demoAccounts.length > 0 && (
        <div className="rounded-2xl border border-dashed border-[#082F6B]/30 bg-[#F3F7FC] p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#082F6B]">
            Demo accounts
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">Click one to fill the form.</p>
          <div className="mt-3 grid gap-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                type="button"
                onClick={() => fillDemo(account)}
                className="flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-left transition hover:border-[#082F6B] hover:shadow-sm cursor-pointer"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#082F6B]/10 text-[#082F6B]">
                  <UserRound className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[#1F2937]">{account.label}</span>
                  <span className="block truncate text-xs text-zinc-500">
                    {account.email} · {account.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
