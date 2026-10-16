"use client";

import React from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { adminNav } from "@/components/dashboard/nav-config";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/lib/auth/auth-store";

/** Admin flavour of DashboardShell; every admin page wraps its content in this. */
export default function AdminShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { admin, vendors } = useAuth();
  const pending = vendors.filter((v) => v.store && v.status === "pending").length;

  return (
    <DashboardShell
      brandLabel="Admin"
      navGroups={adminNav(pending)}
      title={title}
      description={description}
      actions={actions}
      user={{ name: admin?.fullName ?? "Admin", email: admin?.email ?? "" }}
      onLogout={logout}
    >
      {children}
    </DashboardShell>
  );
}
