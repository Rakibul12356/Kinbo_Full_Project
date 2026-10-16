import type { Metadata } from "next";
import VendorStatusView from "@/views/vendor/VendorStatusView";

export const metadata: Metadata = { title: "Verification Status - Kinbo" };

export default function Page() {
  return <VendorStatusView />;
}
