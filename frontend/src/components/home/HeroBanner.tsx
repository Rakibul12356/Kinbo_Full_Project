"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";

interface HeroBannerProps {
  onExploreClick?: () => void;
}

export default function HeroBanner({ onExploreClick }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 pt-8 pb-16 sm:pb-24 border-b border-zinc-200/60 dark:border-zinc-800/60">
      {/* Decorative blurred background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/15 to-pink-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Next.js 16 • TanStack Query • Axios Architecture</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
            Curated Excellence for{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
              Modern Lifestyle
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Discover a hand-picked collection of premium electronics, everyday carry gear,
            and luxury minimalist accessories engineered for elegance and performance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 flex items-center gap-2 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#products"
              className="px-7 py-3.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40"
            >
              View Featured Deals
            </a>
          </div>

          {/* Value Propositions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-zinc-200/80 dark:border-zinc-800/80 text-left">
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Fast Express Delivery
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Complimentary free shipping on orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Verified Authentic
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  100% original goods with 2-year warranty
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-950/80 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  24/7 Dedicated Support
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
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
