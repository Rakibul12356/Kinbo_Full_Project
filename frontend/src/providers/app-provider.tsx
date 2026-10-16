"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import QueryProvider from "./query-provider";
import { CartProvider } from "@/context/cart-context";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <CartProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2500}
          newestOnTop
          closeOnClick={false}
          closeButton={false}
          pauseOnFocusLoss={false}
          limit={3}
        />
      </CartProvider>
    </QueryProvider>
  );
}
