"use client";

import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/common/Breadcrumbs";
import ProductGrid from "@/components/modules/product/ProductGrid";
import FilterSidebar from "@/components/filters/FilterSidebar";
import {
  EMPTY_FILTER_STATE,
  applyFilters,
  type FilterSectionConfig,
  type FilterState,
} from "@/components/filters/filter-config";
import { useProducts } from "@/hooks/use-products";
import type { ProductFilterParams } from "@/services/product.service";
import { ArrowUpDown, SlidersHorizontal, X } from "lucide-react";

export const DEFAULT_FILTER_SECTIONS: FilterSectionConfig[] = [
  { type: "price" },
  { type: "discount" },
  { type: "rating" },
  {
    type: "facet",
    id: "tags",
    title: "Product Tags",
    field: "tags",
    searchable: true,
    searchPlaceholder: "Select Tags",
  },
  { type: "availability" },
];

interface ProductListingProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  /** Server-side product query, e.g. `{ category, subcategory }`. */
  query?: ProductFilterParams;
  /** Sidebar sections in display order; defaults to price, discount, rating, tags, availability. */
  filterSections?: FilterSectionConfig[];
}

export default function ProductListing({
  title,
  description,
  breadcrumbs,
  query,
  filterSections = DEFAULT_FILTER_SECTIONS,
}: ProductListingProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTER_STATE);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { data: products = [], isLoading } = useProducts({
    ...query,
    search: searchQuery || undefined,
  });

  const visibleProducts = applyFilters(products, filterSections, filters).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const sidebar = (
    <FilterSidebar sections={filterSections} products={products} state={filters} onChange={setFilters} />
  );

  return (
    <PageLayout onSearchChange={setSearchQuery} className="bg-[#F8FAFC]">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
          <aside className="hidden lg:block lg:self-start">
            {sidebar}
          </aside>

          <section className="min-w-0 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">{title}</h1>
                {description && <p className="mt-1 text-sm text-zinc-500">{description}</p>}
                <p className="mt-1 text-xs text-zinc-500">
                  {isLoading
                    ? "Loading products…"
                    : `${visibleProducts.length} product${visibleProducts.length === 1 ? "" : "s"} found`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-sm font-semibold text-[#1F2937] cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="hidden sm:block w-4 h-4 text-zinc-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort products"
                    className="text-sm bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-[#1F2937] outline-none focus:border-[#082F6B] cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            <ProductGrid products={visibleProducts} isLoading={isLoading} />
          </section>
        </div>
      </main>

      {/* Mobile filter drawer */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-[#F8FAFC] p-4 shadow-xl">
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Close filters"
                className="p-2 rounded-lg hover:bg-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebar}
          </div>
        </div>
      )}
    </PageLayout>
  );
}
