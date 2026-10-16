"use client";

import React from "react";
import { usePathname } from "next/navigation";

const NON_STOREFRONT_PREFIXES = ["/vendor", "/admin"];

/** Hides shopper-only UI (cart drawer, support chat) on seller and admin pages. */
export default function StorefrontOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hidden = NON_STOREFRONT_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  return hidden ? null : <>{children}</>;
}
