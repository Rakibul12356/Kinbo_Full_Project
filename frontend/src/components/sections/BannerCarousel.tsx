"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BannerSlide {
  id: string;
  /** Large headline; omit for an image-only banner. */
  title?: string;
  subtitle?: string;
  image: string;
  href?: string;
  ctaLabel?: string;
  /** Background classes for text banners, e.g. a Tailwind gradient. */
  theme?: string;
  /** Render `image` edge-to-edge instead of the text + image layout. */
  fullImage?: boolean;
}

interface BannerCarouselProps {
  slides: BannerSlide[];
  autoPlayMs?: number;
  className?: string;
}

function SlideContent({ slide }: { slide: BannerSlide }) {
  if (slide.fullImage) {
    return <img src={slide.image} alt={slide.title ?? ""} className="w-full h-full object-cover" />;
  }

  return (
    <div className={`relative w-full h-full flex items-center ${slide.theme ?? "bg-linear-to-r from-[#082F6B] to-[#1458B8]"}`}>
      <div className="relative z-10 w-full sm:w-3/5 px-6 sm:px-12 space-y-2 sm:space-y-3">
        {slide.title && (
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase leading-[1.05] tracking-tight text-white drop-shadow-sm">
            {slide.title}
          </h2>
        )}
        {slide.subtitle && (
          <p className="text-sm sm:text-base text-white/85 max-w-md">{slide.subtitle}</p>
        )}
        {slide.href && (
          <span className="inline-flex mt-2 rounded-full bg-white px-5 py-2 text-xs sm:text-sm font-bold text-[#082F6B] shadow-sm">
            {slide.ctaLabel ?? "Shop now"}
          </span>
        )}
      </div>
      <img
        src={slide.image}
        alt=""
        className="absolute right-0 top-0 h-full w-1/2 sm:w-2/5 object-cover [mask-image:linear-gradient(to_right,transparent,black_35%)]"
      />
    </div>
  );
}

export default function BannerCarousel({ slides, autoPlayMs = 5000, className = "" }: BannerCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || isPaused || autoPlayMs <= 0) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), autoPlayMs);
    return () => clearInterval(timer);
  }, [count, isPaused, autoPlayMs]);

  if (count === 0) return null;

  return (
    <div
      className={`space-y-3 ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl h-44 sm:h-60 lg:h-72 bg-zinc-100">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={slide.id} className="w-full h-full shrink-0" aria-hidden={i !== index}>
              {slide.href ? (
                <Link href={slide.href} tabIndex={i === index ? 0 : -1} className="block w-full h-full">
                  <SlideContent slide={slide} />
                </Link>
              ) : (
                <SlideContent slide={slide} />
              )}
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous banner"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-white/95 shadow-sm flex items-center justify-center text-[#1F2937] hover:bg-white cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next banner"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-white/95 shadow-sm flex items-center justify-center text-[#1F2937] hover:bg-white cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="flex items-center justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to banner ${i + 1}`}
              className={`w-3 h-3 rounded-full border transition cursor-pointer ${
                i === index ? "border-[#082F6B] bg-[#082F6B] ring-2 ring-[#082F6B]/20" : "border-zinc-300 bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
