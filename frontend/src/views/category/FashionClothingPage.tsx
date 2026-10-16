"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, unsplash, useCategoryProducts } from "./shared";

const SLUG = "fashion-clothing";

export default function FashionClothingPage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "new-season",
              title: "New Season Styles",
              subtitle: "Fresh looks for men, women and kids, up to 40% off.",
              image: unsplash("1441986300917-64674bd600d8"),
              theme: "bg-linear-to-r from-rose-600 to-pink-500",
              href: categoryListingHref(SLUG),
            },
            {
              id: "footwear",
              title: "Step Up Your Game",
              subtitle: "Sneakers, sandals and formal shoes for every occasion.",
              image: unsplash("1542291026-7eec264c27ff"),
              theme: "bg-linear-to-r from-zinc-900 to-zinc-700",
              href: categoryHref(SLUG, "shoes-footwear"),
            },
            {
              id: "shopping",
              title: "Shop The Look",
              subtitle: "Bags, accessories and everything in between.",
              image: unsplash("1483985988355-763728e1935b"),
              theme: "bg-linear-to-r from-amber-500 to-orange-500",
              href: categoryHref(SLUG, "bags-luggage"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-rose-50" iconClass="text-rose-500" />

        <ProductRow
          title="Trending Now"
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="bg-rose-50/60" />
      </main>
    </PageLayout>
  );
}
