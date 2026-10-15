"use client";

import React from "react";
import { Product } from "@/types/ecommerce";
import ProductCard from "./ProductCard";
import Skeleton from "@/components/ui/skeleton";
import { PackageOpen } from "lucide-react";

interface ProductGridProps {
  products?: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({
  products = [],
  isLoading = false,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-4 space-y-3"
          >
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-3 w-1/2 rounded-md" />
            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-9 w-20 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#E5E7EB] p-8">
        <PackageOpen className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-[#1F2937]">No products found</h3>
        <p className="text-sm text-zinc-500 mt-1 max-w-sm mx-auto">
          We couldn&apos;t find any products matching your selection. Try clearing filters or searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
