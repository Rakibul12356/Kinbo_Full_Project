"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";
import Link from "next/link";

interface HeroBannerProps {
  onExploreClick?: () => void;
}

export default function HeroBanner({ onExploreClick }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#F3F7FC] via-white to-[#F3F7FC] pt-10 pb-16 sm:pb-24 border-b border-[#E5E7EB]">
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-gradient-to-tr from-[#082F6B]/15 via-[#FF6B00]/10 to-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#082F6B]/20 bg-white/80 text-[#082F6B] text-xs font-semibold shadow-2xs backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Next.js 16 • TanStack Query • Kinbo Store</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F2937] tracking-tight leading-[1.1]">
            Curated Excellence for{" "}
            <span className="bg-gradient-to-r from-[#082F6B] via-[#082F6B] to-[#FF6B00] bg-clip-text text-transparent">
              Modern Lifestyle
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Discover a hand-picked collection of premium electronics, everyday carry gear,
            and luxury minimalist accessories engineered for elegance and performance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-xl bg-[#082F6B] hover:bg-[#062452] text-white font-semibold text-sm shadow-xl shadow-[#082F6B]/20 flex items-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/products"
              className="px-7 py-3.5 rounded-xl border border-[#E5E7EB] hover:border-zinc-400 text-[#1F2937] bg-white font-semibold text-sm transition hover:bg-zinc-50 shadow-2xs"
            >
              View Featured Deals
            </Link>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-[#E5E7EB] text-left">
            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#082F6B]/10 flex items-center justify-center text-[#082F6B] flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                  Fast Express Delivery
                </h4>
                <p className="text-xs text-zinc-500">
                  Complimentary free shipping on orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                  Verified Authentic
                </h4>
                <p className="text-xs text-zinc-500">
                  100% original goods with 2-year warranty
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#E5E7EB] shadow-2xs">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00] flex-shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1F2937] uppercase tracking-wider">
                  24/7 Dedicated Support
                </h4>
                <p className="text-xs text-zinc-500">
                  Instant real-time support anytime you need
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
