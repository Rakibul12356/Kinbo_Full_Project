"use client";

import React from "react";
import { Filter } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  sortBy = "featured",
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-[#E5E7EB]">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === category
                ? "bg-[#082F6B] text-white shadow-sm"
                : "bg-white hover:bg-zinc-100 text-[#1F2937] border border-[#E5E7EB]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Sort Selector */}
      {onSortChange && (
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter className="w-4 h-4 text-zinc-500" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs sm:text-sm bg-white border border-[#E5E7EB] rounded-xl px-3 py-2 text-[#1F2937] outline-none focus:border-[#082F6B] cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      )}
    </div>
  );
}
