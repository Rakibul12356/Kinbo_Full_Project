import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/app-provider";
import CartDrawer from "@/components/modules/cart/CartDrawer";
import SupportChatWidget from "@/components/common/SupportChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kinbo - Curated Excellence for Modern Lifestyle",
  description:
    "Kinbo is an online store built with Next.js 16, React 19, TanStack Query, and Tailwind CSS v4.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans">
        <AppProvider>
          {children}
          <CartDrawer />
          <SupportChatWidget />
        </AppProvider>
      </body>
    </html>
  );
}
