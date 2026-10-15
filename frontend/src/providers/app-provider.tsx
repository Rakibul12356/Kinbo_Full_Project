"use client";

import React from "react";
import QueryProvider from "./query-provider";
import { CartProvider } from "@/context/cart-context";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <CartProvider>{children}</CartProvider>
    </QueryProvider>
  );
}
