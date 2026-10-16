"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, unsplash, useCategoryProducts } from "./shared";

const SLUG = "sports-fitness-outdoor";

export default function SportsFitnessPage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "fitness",
              title: "Your Path To Total Fitness",
              subtitle: "Gym equipment, yoga mats and more.",
              image: unsplash("1517836357463-d25dfeac3438"),
              theme: "bg-linear-to-r from-red-900 to-red-700",
              href: categoryHref(SLUG, "gym-equipment"),
            },
            {
              id: "sports",
              title: "Game On",
              subtitle: "Football, cricket and badminton gear.",
              image: unsplash("1461896836934-ffe607ba8211"),
              theme: "bg-linear-to-r from-orange-600 to-amber-500",
              href: categoryHref(SLUG, "football-cricket-badminton"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-[#E5F0EE]" iconClass="text-orange-600" />

        <ProductRow
          title="Feel. Fit. Fine."
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} />
      </main>
    </PageLayout>
  );
}
