import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, ShieldCheck, Store, TrendingUp, Truck, Users } from "lucide-react";
import VendorStepper from "./VendorStepper";

const SIDE_CONTENT = {
  vendor: {
    eyebrow: "Kinbo Seller Center",
    title: "Grow your business with Bangladesh's trusted marketplace",
    points: [
      { icon: Users, text: "Reach millions of customers across 64 districts" },
      { icon: Truck, text: "Nationwide delivery handled by our 3PL partners" },
      { icon: TrendingUp, text: "Real-time sales, earnings and inventory insights" },
      { icon: ShieldCheck, text: "Secure weekly payouts to bank, bKash or Nagad" },
    ],
  },
  admin: {
    eyebrow: "Kinbo Admin",
    title: "Manage vendors, products and orders from one place",
    points: [
      { icon: BadgeCheck, text: "Review and approve vendor applications" },
      { icon: Store, text: "Monitor stores and product quality" },
      { icon: TrendingUp, text: "Track marketplace performance" },
    ],
  },
} as const;

interface AuthLayoutProps {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  /** Shows the vendor onboarding stepper at this (1-based) step. */
  step?: number;
  variant?: keyof typeof SIDE_CONTENT;
  /** Long forms drop the side panel and use a wider centered card. */
  wide?: boolean;
  footer?: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  step,
  variant = "vendor",
  wide = false,
  footer,
}: AuthLayoutProps) {
  const side = SIDE_CONTENT[variant];

  const header = (
    <>
      {step && (
        <div className="mb-8">
          <VendorStepper current={step} />
        </div>
      )}
      <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#1F2937] tracking-tight">
        {title}
      </h1>
      {subtitle && <p className="mt-1.5 text-sm text-zinc-500">{subtitle}</p>}
    </>
  );

  const logo = (
    <Link href="/" aria-label="Kinbo home" className="inline-flex">
      <Image
        src="/images/logo-trimmed.png"
        alt="Kinbo"
        width={131}
        height={36}
        className="h-8 w-auto"
        style={{ width: "auto" }}
        priority
      />
    </Link>
  );

  if (wide) {
    return (
      <div className="min-h-screen flex-1 bg-[#F3F7FC]">
        <header className="border-b border-[#E5E7EB] bg-white">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
            {logo}
            <span className="text-xs font-semibold text-zinc-500">{side.eyebrow}</span>
          </div>
        </header>
        <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="mx-auto max-w-5xl">
            {header}
            <div className="mt-8">{children}</div>
            {footer && <div className="mt-6 text-center text-sm text-zinc-500">{footer}</div>}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-1 grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] bg-white">
      <aside className="relative hidden lg:sticky lg:top-0 lg:flex lg:h-screen flex-col justify-between overflow-hidden bg-[#082F6B] p-12 text-white">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#FF6B00]/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <span className="inline-flex rounded-xl bg-white px-3 py-2">{logo}</span>
        </div>

        <div className="relative space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FF9A4D]">
              {side.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl xl:text-4xl font-extrabold leading-tight">
              {side.title}
            </h2>
          </div>
          <ul className="space-y-4">
            {side.points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-white/85">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4.5 w-4.5 text-[#FF9A4D]" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs text-white/50">
          © 2026 Kinbo Limited. All rights reserved.
        </p>
      </aside>

      <main className="flex flex-col px-5 py-8 sm:px-10 lg:px-16 xl:px-24">
        <div className="lg:hidden mb-8">{logo}</div>
        <div className="my-auto w-full max-w-md mx-auto">
          {header}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-zinc-500">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
