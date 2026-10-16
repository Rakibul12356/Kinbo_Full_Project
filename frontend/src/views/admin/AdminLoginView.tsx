"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import RouteGuard from "@/components/auth/RouteGuard";
import { ADMIN_ROUTES, VENDOR_ROUTES, loginAdmin } from "@/lib/auth/auth-store";
import { DEMO_ADMIN } from "@/lib/auth/demo-accounts";

export default function AdminLoginView() {
  const router = useRouter();

  const handleLogin = (email: string, password: string) => {
    const result = loginAdmin(email, password);
    if (result.ok) {
      toast.success("Signed in as admin.");
      router.push(ADMIN_ROUTES.dashboard);
    }
    return result;
  };

  return (
    <RouteGuard step="admin-guest">
      <AuthLayout
        variant="admin"
        title="Admin sign in"
        subtitle="Restricted area for Kinbo staff."
        footer={
          <>
            Are you a seller?{" "}
            <Link href={VENDOR_ROUTES.login} className="font-semibold text-[#082F6B] hover:underline">
              Seller sign in
            </Link>
          </>
        }
      >
        <LoginForm
          onSubmit={handleLogin}
          demoAccounts={[
            {
              label: "Admin",
              description: "Review vendor applications",
              email: DEMO_ADMIN.email,
              password: DEMO_ADMIN.password,
            },
          ]}
        />
      </AuthLayout>
    </RouteGuard>
  );
}
