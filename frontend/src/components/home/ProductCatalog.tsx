"use client";

import React, { useState } from "react";
import { useProducts, useCategories } from "@/hooks/use-products";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, Layers, AlertCircle, RefreshCw } from "lucide-react";

interface ProductCatalogProps {
  searchQuery?: string;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function ProductCatalog({
  searchQuery = "",
  selectedCategory = "All",
  onSelectCategory,
}: ProductCatalogProps) {
  const [internalCategory, setInternalCategory] = useState("All");
  const activeCategory = onSelectCategory ? selectedCategory : internalCategory;
  const setActiveCategory = onSelectCategory || setInternalCategory;

  const { data: categories = ["All", "Electronics", "Accessories", "Footwear", "Lifestyle"] } =
    useCategories();

  const {
    data: products,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useProducts({
    category: activeCategory === "All" ? undefined : activeCategory,
    search: searchQuery,
  });

  return (
    <section id="products" className="py-12 sm:py-16 container mx-auto px-4 sm:px-6">
      {/* Catalog Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Product Catalog</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {activeCategory === "All" ? "Featured Products" : `${activeCategory} Collection`}
          </h2>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                  : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {category}
            </button>
          ))}

          {/* TanStack Query Refetch Indicator / Button */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            title="Refetch products with TanStack Query"
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin text-indigo-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-4 animate-pulse"
            >
              <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
              <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
                <div className="h-9 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="p-8 rounded-2xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-center max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-rose-900 dark:text-rose-200 mb-1">
            Failed to load products
          </h3>
          <p className="text-xs text-rose-700 dark:text-rose-400 mb-4">
            An error occurred while communicating with the API.
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white font-medium text-xs hover:bg-rose-700 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && !isError && products && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && products && products.length === 0 && (
        <div className="text-center py-16 px-4">
          <Filter className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
            No products found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? `No results matching "${searchQuery}". Try a different keyword.`
              : "No products available in this category yet."}
          </p>
        </div>
      )}
    </section>
  );
}
