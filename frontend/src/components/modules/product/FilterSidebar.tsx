"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/ecommerce";
import { ChevronRight, RotateCcw, Star } from "lucide-react";

export interface FilterLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface ProductFilterState {
  minPrice: string;
  maxPrice: string;
  minRating: number;
  inStockOnly: boolean;
  discountOnly: boolean;
}

export const DEFAULT_PRODUCT_FILTERS: ProductFilterState = {
  minPrice: "",
  maxPrice: "",
  minRating: 0,
  inStockOnly: false,
  discountOnly: false,
};

export function applyProductFilters(products: Product[], filters: ProductFilterState): Product[] {
  const min = filters.minPrice === "" ? undefined : Number(filters.minPrice);
  const max = filters.maxPrice === "" ? undefined : Number(filters.maxPrice);
  return products.filter((p) => {
    if (min !== undefined && p.price < min) return false;
    if (max !== undefined && p.price > max) return false;
    if (filters.minRating > 0 && p.rating < filters.minRating) return false;
    if (filters.inStockOnly && p.stock <= 0) return false;
    if (filters.discountOnly && !(p.originalPrice && p.originalPrice > p.price)) return false;
    return true;
  });
}

const RATING_OPTIONS = [4, 3, 2];

interface FilterSidebarProps {
  /** Heading for the navigation links block, e.g. the parent category name. */
  linksTitle?: string;
  links?: FilterLink[];
  filters: ProductFilterState;
  onChange: (filters: ProductFilterState) => void;
  onReset: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4 border-b border-[#E5E7EB] last:border-b-0">
      <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function FilterSidebar({
  linksTitle,
  links,
  filters,
  onChange,
  onReset,
}: FilterSidebarProps) {
  const update = (patch: Partial<ProductFilterState>) => onChange({ ...filters, ...patch });

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4">
      <div className="flex items-center justify-between py-4 border-b border-[#E5E7EB]">
        <h2 className="text-sm font-bold text-[#1F2937]">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#082F6B] hover:text-[#FF6B00] transition cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {links && links.length > 0 && (
        <Section title={linksTitle ?? "Categories"}>
          <ul className="space-y-0.5 -mx-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                    link.active
                      ? "bg-[#F3F7FC] font-semibold text-[#082F6B]"
                      : "text-[#1F2937] hover:bg-[#F3F7FC] hover:text-[#082F6B]"
                  }`}
                >
                  {link.label}
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${link.active ? "text-[#FF6B00]" : "text-zinc-300"}`} />
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Price (৳)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => update({ minPrice: e.target.value })}
            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#082F6B]"
          />
          <span className="text-zinc-400">–</span>
          <input
            type="number"
            min={0}
            inputMode="numeric"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: e.target.value })}
            className="w-full rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2 text-sm outline-none focus:border-[#082F6B]"
          />
        </div>
      </Section>

      <Section title="Rating">
        <div className="space-y-1">
          {RATING_OPTIONS.map((rating) => {
            const isActive = filters.minRating === rating;
            return (
              <button
                key={rating}
                type="button"
                onClick={() => update({ minRating: isActive ? 0 : rating })}
                className={`w-full flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition cursor-pointer ${
                  isActive ? "bg-[#F3F7FC] font-semibold text-[#082F6B]" : "text-[#1F2937] hover:bg-[#F3F7FC]"
                }`}
              >
                <span className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3.5 h-3.5 ${
                        star <= rating ? "text-amber-400 fill-amber-400" : "text-zinc-200 fill-zinc-200"
                      }`}
                    />
                  ))}
                </span>
                & up
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Availability">
        <div className="space-y-2.5">
          <label className="flex items-center gap-2.5 text-sm text-[#1F2937] cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => update({ inStockOnly: e.target.checked })}
              className="w-4 h-4 accent-[#082F6B]"
            />
            In stock only
          </label>
          <label className="flex items-center gap-2.5 text-sm text-[#1F2937] cursor-pointer">
            <input
              type="checkbox"
              checked={filters.discountOnly}
              onChange={(e) => update({ discountOnly: e.target.checked })}
              className="w-4 h-4 accent-[#082F6B]"
            />
            On discount
          </label>
        </div>
      </Section>
    </div>
  );
}
