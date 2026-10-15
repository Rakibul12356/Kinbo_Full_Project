import React from "react";
import Skeleton from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-4 mb-8">
        <Skeleton className="h-4 w-32 rounded-md" />
        <Skeleton className="h-8 w-64 rounded-md" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-xl" />
          ))}
        </div>
      </div>
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
    </div>
  );
}
