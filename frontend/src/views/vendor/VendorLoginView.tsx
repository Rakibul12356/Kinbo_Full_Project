"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RouteGuard from "@/components/auth/RouteGuard";
import { VENDOR_ROUTES, loginVendor, resetDemoData } from "@/lib/auth/auth-store";
import { DEMO_PASSWORD } from "@/lib/auth/demo-accounts";

const DEMO_VENDOR_LOGINS = [
  {
    label: "Verified Vendor",
    description: "Approved → Dashboard",
    email: "verified@kinbo.com",
    password: DEMO_PASSWORD,
  },
  {
    label: "Unverified Vendor",
    description: "Pending admin review",
    email: "pending@kinbo.com",
    password: DEMO_PASSWORD,
  },
];

export default function VendorLoginView() {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    const result = loginVendor(email, password);
    if (result.ok) {
      if (result.otp) {
        toast.info(`Please verify your email first. Demo OTP: ${result.otp}`);
      } else {
        toast.success("Welcome back!");
      }
      router.push(result.redirectTo);
    }
    return result;
  };

  return (
    <RouteGuard step="vendor-guest">
      <AuthLayout
        title="Sign in to Seller Center"
        subtitle="Manage your store, products and orders."
        footer={
          <div className="space-y-3">
            <p>
              New to Kinbo?{" "}
              <Link href={VENDOR_ROUTES.signup} className="font-semibold text-[#082F6B] hover:underline">
                Create a seller account
              </Link>
            </p>
            <button
              type="button"
              onClick={() => {
                resetDemoData();
                toast.info("Demo data reset.");
              }}
              className="text-xs text-zinc-400 hover:text-zinc-600 underline cursor-pointer"
            >
              Reset demo data
            </button>
          </div>
        }
      >
        <LoginForm onSubmit={handleLogin} demoAccounts={DEMO_VENDOR_LOGINS} />
      </AuthLayout>
    </RouteGuard>
  );
}
