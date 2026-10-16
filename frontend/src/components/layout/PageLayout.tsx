import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  /** Wires the navbar search box to the page; omit on pages without search. */
  onSearchChange?: (query: string) => void;
  /** Extra classes for the page wrapper, e.g. a background color. */
  className?: string;
}

export default function PageLayout({ children, onSearchChange, className = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col justify-between ${className}`.trim()}>
      <Navbar onSearchChange={onSearchChange} />
      {children}
      <Footer />
    </div>
  );
}
