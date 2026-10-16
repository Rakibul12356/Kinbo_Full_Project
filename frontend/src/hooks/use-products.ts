import { useQuery } from "@tanstack/react-query";
import { productService, type ProductFilterParams } from "@/services/product.service";

export const PRODUCT_QUERY_KEYS = {
  all: ["products"] as const,
  list: (filters?: ProductFilterParams) => ["products", "list", filters] as const,
  detail: (idOrSlug: string) => ["products", "detail", idOrSlug] as const,
  categories: ["products", "categories"] as const,
};

export function useProducts(filters?: ProductFilterParams) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.list(filters),
    queryFn: () => productService.getProducts(filters),
  });
}

export function useProduct(idOrSlug: string) {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.detail(idOrSlug),
    queryFn: () => productService.getProductById(idOrSlug),
    enabled: Boolean(idOrSlug),
  });
}

export function useCategories() {
  return useQuery({
    queryKey: PRODUCT_QUERY_KEYS.categories,
    queryFn: () => productService.getCategories(),
  });
}
