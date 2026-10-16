import type { Metadata } from "next";
import AdminVendorsView from "@/views/admin/AdminVendorsView";

export const metadata: Metadata = { title: "Vendor Applications - Kinbo" };

export default function Page() {
  return <AdminVendorsView />;
}
