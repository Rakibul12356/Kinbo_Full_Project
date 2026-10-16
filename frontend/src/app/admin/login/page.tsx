import type { Metadata } from "next";
import AdminLoginView from "@/views/admin/AdminLoginView";

export const metadata: Metadata = { title: "Admin Sign In - Kinbo" };

export default function Page() {
  return <AdminLoginView />;
}
