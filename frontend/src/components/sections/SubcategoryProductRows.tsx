"use client";

import React from "react";
import ProductRow from "@/components/sections/ProductRow";
import { categoryHref, type CategoryDefinition } from "@/lib/categories";
import type { Product } from "@/types/ecommerce";

interface SubcategoryProductRowsProps {
  category: CategoryDefinition;
  products: Product[];
  isLoading?: boolean;
  /** Background for every other row; pass "" to disable the striped bands. */
  bandClass?: string;
}

/** One product row per subcategory that currently has products. */
export default function SubcategoryProductRows({
  category,
  products,
  isLoading = false,
  bandClass = "bg-[#EEF5F4]",
}: SubcategoryProductRowsProps) {
  if (isLoading) return <ProductRow title="Loading…" products={[]} isLoading />;

  const rows = category.subcategories
    .map((sub) => ({ sub, items: products.filter((p) => p.subcategory === sub.name) }))
    .filter((row) => row.items.length > 0);

  return (
    <>
      {rows.map(({ sub, items }, i) => {
        const isBanded = bandClass !== "" && i % 2 === 1;
        return (
          <div key={sub.slug} className={isBanded ? `-mx-4 sm:-mx-6 px-4 sm:px-6 py-8 rounded-none sm:rounded-2xl ${bandClass}` : ""}>
            <ProductRow
              title={sub.name}
              products={items}
              seeAllHref={categoryHref(category.slug, sub.slug)}
            />
          </div>
        );
      })}
    </>
  );
}
