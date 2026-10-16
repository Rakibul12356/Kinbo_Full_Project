"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, unsplash, useCategoryProducts } from "./shared";

const SLUG = "watches-jewelry-accessories";

export default function WatchesJewelryPage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "watches",
              title: "Timeless Elegance",
              subtitle: "Premium watches for every style.",
              image: unsplash("1523275335684-37898b6baf30"),
              theme: "bg-linear-to-r from-neutral-900 to-neutral-700",
              href: categoryHref(SLUG, "watches"),
            },
            {
              id: "jewelry",
              title: "Shine Bright",
              subtitle: "Fashion jewelry and gift items.",
              image: unsplash("1515562141207-7a88fb7ce338"),
              theme: "bg-linear-to-r from-violet-700 to-fuchsia-600",
              href: categoryHref(SLUG, "fashion-jewelry"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-violet-50" iconClass="text-violet-600" />

        <ProductRow
          title="Gift Picks"
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="bg-violet-50/70" />
      </main>
    </PageLayout>
  );
}
