import type { Metadata } from "next";
import VendorLoginView from "@/views/vendor/VendorLoginView";

export const metadata: Metadata = { title: "Seller Sign In - Kinbo" };

export default function Page() {
  return <VendorLoginView />;
}
