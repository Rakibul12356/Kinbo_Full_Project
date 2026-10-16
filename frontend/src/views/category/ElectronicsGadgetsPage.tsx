"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, topDeals, unsplash, useCategoryProducts } from "./shared";

const SLUG = "electronics-gadgets";

export default function ElectronicsGadgetsPage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "gadgets",
              title: "Smart Tech, Smarter Prices",
              subtitle: "Phones, laptops and accessories from trusted brands.",
              image: unsplash("1498049794561-7780e7231661"),
              theme: "bg-linear-to-r from-[#082F6B] to-[#1458B8]",
              href: categoryListingHref(SLUG),
            },
            {
              id: "phones",
              title: "Latest Smartphones",
              subtitle: "Official warranty and fast delivery across Bangladesh.",
              image: unsplash("1511707171634-5f897ff02aa9"),
              theme: "bg-linear-to-r from-slate-900 to-slate-700",
              href: categoryHref(SLUG, "mobile-phones-tablets"),
            },
            {
              id: "audio",
              title: "Sound That Moves You",
              subtitle: "Headphones, earbuds and speakers.",
              image: unsplash("1505740420928-5e560c06d30e"),
              theme: "bg-linear-to-r from-violet-700 to-indigo-600",
              href: categoryHref(SLUG, "headphones-earbuds-speakers"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-blue-50" iconClass="text-blue-600" />

        <ProductRow
          title="Top Deals"
          products={topDeals(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <ProductRow
          title="Best Sellers"
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
          className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-8 sm:rounded-2xl bg-blue-50/60"
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="" />
      </main>
    </PageLayout>
  );
}
