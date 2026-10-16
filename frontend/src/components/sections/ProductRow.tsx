"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/ecommerce";
import ProductCard from "@/components/modules/product/ProductCard";
import Skeleton from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductRowProps {
  title: string;
  products: Product[];
  isLoading?: boolean;
  seeAllHref?: string;
  /** Section background, e.g. "bg-[#EEF5F4]" for a full-bleed tinted band. */
  className?: string;
}

const CARD_WIDTH_CLASS = "w-[180px] sm:w-[210px] shrink-0";

export default function ProductRow({
  title,
  products,
  isLoading = false,
  seeAllHref,
  className = "",
}: ProductRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, products.length, isLoading]);

  if (!isLoading && products.length === 0) return null;

  const scroll = (direction: 1 | -1) => {
    const el = scrollRef.current;
    el?.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-[#1F2937]">{title}</h2>
        {seeAllHref && (
          <Link href={seeAllHref} className="text-sm font-semibold text-[#1F2937] hover:text-[#FF6B00] transition">
            see all
          </Link>
        )}
      </div>

      <div className="relative">
        <div ref={scrollRef} onScroll={updateArrows} className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`${CARD_WIDTH_CLASS} rounded-2xl border border-[#E5E7EB] bg-white p-4 space-y-3`}>
                  <Skeleton className="aspect-square w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-6 w-1/2 rounded-md" />
                </div>
              ))
            : products.map((product) => (
                <div key={product.id} className={CARD_WIDTH_CLASS}>
                  <ProductCard product={product} />
                </div>
              ))}
        </div>

        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={`Scroll ${title} left`}
            className="absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#E5E7EB] shadow-md flex items-center justify-center text-[#1F2937] hover:bg-[#F3F7FC] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={`Scroll ${title} right`}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-[#E5E7EB] shadow-md flex items-center justify-center text-[#1F2937] hover:bg-[#F3F7FC] cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
}
