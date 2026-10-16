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

// Some browser extensions (e.g. Bitdefender) inject attributes into the DOM
// before React hydrates, which causes hydration mismatch errors.
const stripExtensionAttrsScript = `(function(){var a=["bis_skin_checked","bis_register","bis_size","bis_id"];function c(n){if(n.nodeType!==1)return;for(var i=n.attributes.length-1;i>=0;i--){var k=n.attributes[i].name;if(a.indexOf(k)>-1||k.indexOf("__processed_")===0)n.removeAttribute(k);}}function s(r){c(r);var e=r.querySelectorAll?r.querySelectorAll("*"):[];for(var j=0;j<e.length;j++)c(e[j]);}new MutationObserver(function(m){for(var i=0;i<m.length;i++){var r=m[i];if(r.type==="attributes")c(r.target);else for(var j=0;j<r.addedNodes.length;j++)s(r.addedNodes[j]);}}).observe(document.documentElement,{attributes:true,childList:true,subtree:true});s(document.documentElement);})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: stripExtensionAttrsScript }} />
      </head>
      <body
        className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans"
        suppressHydrationWarning
      >
        <AppProvider>
          {children}
          <CartDrawer />
          <SupportChatWidget />
        </AppProvider>
      </body>
    </html>
  );
}
