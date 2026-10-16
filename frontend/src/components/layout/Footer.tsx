"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Users, Code2, Phone, MessageCircle, MapPin } from "lucide-react";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Return and Refund Policy", href: "/refund-policy" },
];

const services = [
  { label: "Express Home Delivery", href: "/products" },
  { label: "100% Genuine Guaranteed", href: "/products" },
  { label: "Easy Returns & Replacement", href: "/refund-policy" },
  { label: "Corporate & Bulk Orders", href: "/contact" },
  { label: "Gift Cards & Promotions", href: "/products" },
];

const usefulLinks = [
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Account", href: "/account" },
  { label: "Track My Order", href: "/orders" },
  { label: "Sell on Kinbo", href: "/vendor/signup" },
];

const paymentMethods = [
  { label: "bKash", cls: "text-[#D82A65] font-black" },
  { label: "নগদ", cls: "text-[#F7941D] font-black" },
  { label: "Rocket", cls: "text-[#8C3494] font-black" },
  { label: "upay", cls: "text-[#005BAC] font-black" },
  { label: "tap", cls: "text-[#00A19D] font-black" },
  { label: "VISA", cls: "text-[#1A1F71] font-black italic tracking-wider" },
  { label: "MC", cls: "mastercard" },
  { label: "AMEX", cls: "amex" },
];

const logistics = [
  { label: "Steadfast", cls: "text-[#00897B] font-bold" },
  { label: "Pathao", cls: "text-[#E02424] font-black" },
  { label: "paperfly", cls: "text-[#0070BA] font-bold italic" },
  { label: "REDX", cls: "redx" },
];

const badgeBase =
  "h-8 min-w-14 px-2.5 rounded-md border border-[#E5E7EB] bg-white flex items-center justify-center text-[11px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]";

function Badge({ label, cls }: { label: string; cls: string }) {
  if (cls === "mastercard") {
    return (
      <div className={badgeBase} aria-label="Mastercard">
        <span className="w-4 h-4 rounded-full bg-[#EB001B]" />
        <span className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-1.5 mix-blend-multiply" />
      </div>
    );
  }
  if (cls === "amex") {
    return (
      <div className={`${badgeBase} !bg-[#006FCF] !border-[#006FCF]`}>
        <span className="text-white font-black text-[9px] tracking-wide leading-none">AMEX</span>
      </div>
    );
  }
  if (cls === "redx") {
    return (
      <div className={badgeBase}>
        <span className="text-[#E53935] font-black tracking-tight">
          RED<span className="text-[#E53935]">X</span>
        </span>
      </div>
    );
  }
  return (
    <div className={badgeBase}>
      <span className={cls}>{label}</span>
    </div>
  );
}

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xl font-medium text-[#1F2937] mb-6">{title}</h4>
      <ul className="space-y-3 text-sm text-zinc-700">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-[#006AFF] transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white text-zinc-700 text-sm">
      <div className="container mx-auto px-4 sm:px-6 pt-12 sm:pt-14 pb-8">
        <div className="space-y-12 sm:space-y-14">
          {/* Row 1: Logo + value propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <div className="space-y-5">
              <div className="h-12 flex items-center">
                <Link href="/" className="inline-flex items-center" aria-label="Kinbo home">
                  <Image
                    src="/images/logo-trimmed.png"
                    alt="Kinbo"
                    width={131}
                    height={36}
                    style={{ width: "auto" }}
                    className="h-8 sm:h-9 w-auto object-contain"
                    priority
                  />
                </Link>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed max-w-xs">
                The Premier Multi-Category E-Commerce Platform for Bangladesh.
              </p>
            </div>

            <div className="space-y-5">
              <div className="h-12 flex items-center">
                <BadgeCheck className="w-12 h-12 text-[#006AFF]" strokeWidth={1.75} />
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed max-w-xs">
                Authentic products sourced from verified manufacturers, distributors and
                importers.
              </p>
            </div>

            <div className="space-y-5">
              <div className="h-12 flex items-center">
                <Users className="w-12 h-12 text-teal-700" strokeWidth={2} fill="currentColor" />
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed max-w-xs">
                Our customers are at the heart of everything we do, with dedicated 24/7 care.
              </p>
            </div>

            <div className="space-y-5">
              <div className="h-12 flex items-center">
                <div className="w-12 h-12 rounded-xl bg-indigo-700 text-white flex items-center justify-center">
                  <Code2 className="w-7 h-7" />
                </div>
              </div>
              <p className="text-sm text-zinc-700 leading-relaxed max-w-xs">
                We innovate with cutting-edge technology to deliver the highest standards of
                performance and quality.
              </p>
            </div>
          </div>

          {/* Row 2: Navigation columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <LinkColumn title="Quick Links" links={quickLinks} />
            <LinkColumn title="Our Services" links={services} />
            <LinkColumn title="Useful Links" links={usefulLinks} />

            <div>
              <h4 className="text-xl font-medium text-[#1F2937] mb-6">Contact Info</h4>
              <div className="space-y-3 text-sm text-zinc-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>Hotline:</span>
                  <a
                    href="tel:09610016778"
                    className="text-teal-700 underline underline-offset-2 hover:text-teal-800"
                  >
                    09610016778
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>Whatsapp:</span>
                  <a
                    href="https://wa.me/8801810117100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 underline underline-offset-2 hover:text-teal-800"
                  >
                    01810117100
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    Address: D/15-1, Road-36, Block-D, Section-10, Mirpur, Dhaka-1216
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Payment partners (3 cols) + 3PL partners (1 col) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
            <div className="lg:col-span-3 space-y-5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <h4 className="text-base font-semibold text-[#1F2937]">
                  Online Payment Partners
                </h4>
                <span className="text-sm text-zinc-600">Verified by</span>
                <span className="px-2 py-0.5 rounded bg-[#1E4FA3] text-white text-[10px] font-bold tracking-tight">
                  SSLCOMMERZ
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {[...paymentMethods, ...paymentMethods.slice(0, 4)].map((m, i) => (
                  <Badge key={`${m.label}-${i}`} {...m} />
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-base font-semibold text-[#1F2937]">3PL Partners</h4>
              <div className="flex flex-wrap items-center gap-3">
                {logistics.map((m) => (
                  <Badge key={m.label} {...m} />
                ))}
              </div>
            </div>
          </div>

          {/* Row 4: App, social, license, DBID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <div className="space-y-5">
              <h4 className="text-base font-semibold text-[#1F2937]">Download Our App</h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black text-white hover:bg-zinc-800 transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.944 1.944 0 01-.61-1.393V3.207c0-.528.22-1.01.609-1.393zm11.24 11.24l2.25 2.25-11.83 6.786 9.58-9.036zm0-2.108L5.27 1.91l11.83 6.786-2.25 2.25zm1.503 1.054l3.155 1.808c.87.498.87 1.31 0 1.808l-3.155 1.808-1.89-1.89 1.89-1.89-.001.364z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[8px] uppercase leading-none text-zinc-300">Get it on</div>
                    <div className="text-xs font-semibold leading-tight">Google Play</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black text-white hover:bg-zinc-800 transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.65-.79 1.09-1.89.97-3-.93.04-2.07.62-2.73 1.4-.58.67-1.09 1.76-.95 2.84 1.05.08 2.06-.45 2.71-1.24z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[8px] leading-none text-zinc-300">Download on the</div>
                    <div className="text-xs font-semibold leading-tight">App Store</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-base font-semibold text-[#1F2937]">Connect in Social</h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:opacity-85 transition"
                >
                  <svg className="w-8 h-8 fill-[#0A66C2]" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:opacity-85 transition"
                >
                  <svg className="w-8 h-8 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FF543E] via-[#C837AB] to-[#FFD521] text-white flex items-center justify-center hover:opacity-85 transition"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.441-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:opacity-85 transition"
                >
                  <svg className="w-8 h-8 fill-[#FF0000]" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-base font-semibold text-[#1F2937]">Trade License Number</h4>
              <p className="text-sm text-zinc-700">TRAD/DNCC/057602/2026</p>
            </div>

            <div className="space-y-5">
              <h4 className="text-base font-semibold text-[#1F2937]">DBID</h4>
              <p className="text-sm text-zinc-700">915741315</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-[#E5E7EB] text-center text-sm text-zinc-700">
          <p>© 2026 Kinbo Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}