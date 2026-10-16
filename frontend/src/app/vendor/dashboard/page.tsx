import type { Metadata } from "next";
import VendorDashboardView from "@/views/vendor/VendorDashboardView";

export const metadata: Metadata = { title: "Seller Dashboard - Kinbo" };

export default function Page() {
  return <VendorDashboardView />;
}
