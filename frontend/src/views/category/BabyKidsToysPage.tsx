"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, unsplash, useCategoryProducts } from "./shared";

const SLUG = "baby-kids-toys";

export default function BabyKidsToysPage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "comfort",
              title: "Pick Your Baby's Comfort",
              subtitle: "Diapers, baby care and feeding essentials.",
              image: unsplash("1515488042361-ee00e0ddd4e4"),
              theme: "bg-linear-to-r from-sky-500 to-cyan-400",
              href: categoryHref(SLUG, "diapers-baby-care"),
            },
            {
              id: "toys",
              title: "Learn Through Play",
              subtitle: "Educational toys and games for growing minds.",
              image: unsplash("1596461404969-9ae70f2830c1"),
              theme: "bg-linear-to-r from-orange-500 to-amber-400",
              href: categoryHref(SLUG, "educational-toys-games"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-[#FFF7E0]" iconClass="text-sky-600" />

        <ProductRow
          title="Parents' Favourites"
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="bg-sky-50/70" />
      </main>
    </PageLayout>
  );
}
