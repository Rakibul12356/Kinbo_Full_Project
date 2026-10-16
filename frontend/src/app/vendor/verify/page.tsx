import type { Metadata } from "next";
import VendorVerifyView from "@/views/vendor/VendorVerifyView";

export const metadata: Metadata = { title: "Verify Your Account - Kinbo" };

export default function Page() {
  return <VendorVerifyView />;
}
