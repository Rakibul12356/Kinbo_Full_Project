"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, topDeals, unsplash, useCategoryProducts } from "./shared";

const SLUG = "home-appliances-furniture";

export default function HomeAppliancesFurniturePage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "furniture",
              title: "Upgrade Your Living Room",
              subtitle: "Chairs, tables, shelves and mattresses.",
              image: unsplash("1555041469-a586c61ea9bc"),
              theme: "bg-linear-to-r from-teal-700 to-emerald-600",
              href: categoryHref(SLUG, "chairs-tables-shelves"),
            },
            {
              id: "appliances",
              title: "Kitchen Appliances",
              subtitle: "Kettles, blenders and rice cookers.",
              image: unsplash("1594213114663-d94db9b17125"),
              theme: "bg-linear-to-r from-slate-800 to-slate-600",
              href: categoryHref(SLUG, "electric-kettle-blender-rice-cooker"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-teal-50" iconClass="text-teal-600" />

        <ProductRow
          title="Mega Savings"
          products={topDeals(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <ProductRow
          title="Upgrade Your Home"
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
          className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-8 sm:rounded-2xl bg-teal-50/70"
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="" />
      </main>
    </PageLayout>
  );
}
