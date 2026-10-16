import type { Metadata } from "next";
import AdminDashboardView from "@/views/admin/AdminDashboardView";

export const metadata: Metadata = { title: "Admin Dashboard - Kinbo" };

export default function Page() {
  return <AdminDashboardView />;
}
