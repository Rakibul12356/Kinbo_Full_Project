"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, topDeals, unsplash, useCategoryProducts } from "./shared";

const SLUG = "grocery-food";

export default function GroceryFoodPage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "groceries",
              title: "Fresh Groceries Delivered",
              subtitle: "Rice, lentils, oil and spices at your doorstep.",
              image: unsplash("1542838132-92c53300491e"),
              theme: "bg-linear-to-r from-emerald-700 to-green-500",
              href: categoryHref(SLUG, "rice-lentils-oil-spices"),
            },
            {
              id: "organic",
              title: "Go Organic",
              subtitle: "Handpicked organic and local products.",
              image: unsplash("1506617420156-8e4536971650"),
              theme: "bg-linear-to-r from-lime-700 to-lime-500",
              href: categoryHref(SLUG, "organic-local-products"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-emerald-50" iconClass="text-emerald-600" />

        <ProductRow
          title="Daily Deals"
          products={topDeals(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <ProductRow
          title="Feel. Fresh. Fine."
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
          className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-8 sm:rounded-2xl bg-emerald-50/70"
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="" />
      </main>
    </PageLayout>
  );
}
