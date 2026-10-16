"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, topDeals, unsplash, useCategoryProducts } from "./shared";

const SLUG = "beauty-personal-care";

export default function BeautyPersonalCarePage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-[#FFF9FB]">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "glow",
              title: "Glow Every Day",
              subtitle: "100% authentic skincare and sunscreen.",
              image: unsplash("1556228578-8c89e6adf883"),
              theme: "bg-linear-to-r from-pink-600 to-rose-400",
              href: categoryHref(SLUG, "skincare-sunscreen"),
            },
            {
              id: "makeup",
              title: "Makeup Must-Haves",
              subtitle: "Bestselling cosmetics at the best prices.",
              image: unsplash("1596462502278-27bfdc403348"),
              theme: "bg-linear-to-r from-fuchsia-700 to-purple-600",
              href: categoryHref(SLUG, "makeup-cosmetics"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-pink-50" iconClass="text-pink-500" />

        <ProductRow
          title="BOGO & Beyond"
          products={topDeals(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
          className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-8 sm:rounded-2xl bg-[#EEF5F4]"
        />

        <ProductRow
          title="Keep It Luxe"
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="bg-pink-50/70" />
      </main>
    </PageLayout>
  );
}
