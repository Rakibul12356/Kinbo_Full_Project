import type { Metadata } from "next";
import VendorSignupView from "@/views/vendor/VendorSignupView";

export const metadata: Metadata = { title: "Become a Seller - Kinbo" };

export default function Page() {
  return <VendorSignupView />;
}
