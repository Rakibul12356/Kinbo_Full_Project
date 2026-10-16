import type { Metadata } from "next";
import VendorOnboardingView from "@/views/vendor/VendorOnboardingView";

export const metadata: Metadata = { title: "Store Information - Kinbo" };

export default function Page() {
  return <VendorOnboardingView />;
}
