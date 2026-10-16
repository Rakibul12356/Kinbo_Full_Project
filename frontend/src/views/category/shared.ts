import { useProducts } from "@/hooks/use-products";
import { calculateDiscount } from "@/lib/utils";
import {
  categoryHref,
  getCategoryBySlug,
  type CategoryDefinition,
} from "@/lib/categories";
import type { CategoryTile } from "@/components/sections/ShopByCategory";
import type { Product } from "@/types/ecommerce";

export function unsplash(photoId: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&auto=format&fit=crop&q=80`;
}

export function useCategoryProducts(slug: string) {
  const category = getCategoryBySlug(slug);
  if (!category) throw new Error(`Unknown category slug: ${slug}`);
  const { data: products = [], isLoading } = useProducts({ category: category.name });
  return { category, products, isLoading };
}

export function subcategoryTiles(
  category: CategoryDefinition,
  images: Record<string, string> = {}
): CategoryTile[] {
  return category.subcategories.map((sub) => ({
    name: sub.name,
    href: categoryHref(category.slug, sub.slug),
    icon: sub.icon,
    image: images[sub.slug],
  }));
}

export function bestSellers(products: Product[]): Product[] {
  return [...products].sort((a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating);
}

export function topDeals(products: Product[]): Product[] {
  return products
    .filter((p) => calculateDiscount(p.price, p.originalPrice) > 0)
    .sort(
      (a, b) =>
        calculateDiscount(b.price, b.originalPrice) - calculateDiscount(a.price, a.originalPrice)
    );
}

export function productsInSubcategory(products: Product[], subcategoryName: string): Product[] {
  return products.filter((p) => p.subcategory === subcategoryName);
}
