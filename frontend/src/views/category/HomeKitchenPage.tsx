"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, unsplash, useCategoryProducts } from "./shared";

const SLUG = "home-kitchen";

export default function HomeKitchenPage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "kitchen",
              title: "Cook Like A Pro",
              subtitle: "Cookware and kitchen tools for every home chef.",
              image: unsplash("1556909114-f6e7ad7d3136"),
              theme: "bg-linear-to-r from-amber-600 to-orange-500",
              href: categoryHref(SLUG, "kitchen-tools-cookware"),
            },
            {
              id: "decor",
              title: "Make It Home",
              subtitle: "Decor, lighting and bedding you will love.",
              image: unsplash("1586023492125-27b2c045efd7"),
              theme: "bg-linear-to-r from-stone-800 to-stone-600",
              href: categoryHref(SLUG, "home-decor-lighting"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-amber-50" iconClass="text-amber-600" />

        <ProductRow
          title="Home Essentials"
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="bg-amber-50/70" />
      </main>
    </PageLayout>
  );
}
