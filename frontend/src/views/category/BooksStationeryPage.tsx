"use client";

import PageLayout from "@/components/layout/PageLayout";
import BannerCarousel from "@/components/sections/BannerCarousel";
import ShopByCategory from "@/components/sections/ShopByCategory";
import ProductRow from "@/components/sections/ProductRow";
import SubcategoryProductRows from "@/components/sections/SubcategoryProductRows";
import { categoryHref, categoryListingHref } from "@/lib/categories";
import { bestSellers, subcategoryTiles, unsplash, useCategoryProducts } from "./shared";

const SLUG = "books-stationery-office-supplies";

export default function BooksStationeryPage() {
  const { category, products, isLoading } = useCategoryProducts(SLUG);

  return (
    <PageLayout className="bg-white">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 space-y-10">
        <BannerCarousel
          slides={[
            {
              id: "books",
              title: "Read More, Learn More",
              subtitle: "Books and educational materials for every age.",
              image: unsplash("1512820790803-83ca734da794"),
              theme: "bg-linear-to-r from-indigo-700 to-blue-600",
              href: categoryHref(SLUG, "books-educational-materials"),
            },
            {
              id: "stationery",
              title: "Back To School",
              subtitle: "Notebooks, pens and art supplies.",
              image: unsplash("1456735190827-d1262f71b8a3"),
              theme: "bg-linear-to-r from-yellow-500 to-amber-500",
              href: categoryHref(SLUG, "notebooks-pens-art-supplies"),
            },
          ]}
        />

        <ShopByCategory items={subcategoryTiles(category)} tileClass="bg-indigo-50" iconClass="text-indigo-600" />

        <ProductRow
          title="Student Picks"
          products={bestSellers(products)}
          isLoading={isLoading}
          seeAllHref={categoryListingHref(SLUG)}
        />

        <SubcategoryProductRows category={category} products={products} isLoading={isLoading} bandClass="bg-indigo-50/70" />
      </main>
    </PageLayout>
  );
}
