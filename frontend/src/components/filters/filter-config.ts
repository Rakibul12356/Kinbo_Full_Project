import { calculateDiscount, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/ecommerce";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface PricePreset {
  min?: number;
  max?: number;
  /** Defaults to "Under ৳500" / "৳500 - ৳1000" / "Over ৳2000" style labels. */
  label?: string;
}

export type FacetField = "category" | "subcategory" | "tags";

/**
 * Serializable description of one sidebar section, so server pages can pass
 * the sidebar layout down as plain props.
 */
export type FilterSectionConfig =
  | { type: "links"; title: string; links: { label: string; href: string; active?: boolean }[] }
  | { type: "price"; title?: string; presets?: PricePreset[]; step?: number }
  | { type: "discount"; title?: string; options?: number[] }
  | { type: "rating"; title?: string; options?: number[] }
  | {
      type: "facet";
      id: string;
      title: string;
      field: FacetField;
      searchable?: boolean;
      searchPlaceholder?: string;
      /** Fixed options; when omitted they are built from the products with counts. */
      options?: FilterOption[];
    }
  | { type: "availability"; title?: string };

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface FilterState {
  price: PriceRange;
  minDiscount?: number;
  minRating?: number;
  facets: Record<string, string[]>;
  availability: string[];
}

export const EMPTY_FILTER_STATE: FilterState = {
  price: {},
  facets: {},
  availability: [],
};

export const DEFAULT_PRICE_PRESETS: PricePreset[] = [
  { max: 500 },
  { min: 500, max: 1000 },
  { min: 1000, max: 2000 },
  { min: 2000 },
];

export const DEFAULT_DISCOUNT_OPTIONS = [10, 20, 30, 40, 50];
export const DEFAULT_RATING_OPTIONS = [4, 3, 2];

export const AVAILABILITY_OPTIONS: FilterOption[] = [
  { label: "In stock only", value: "in-stock" },
  { label: "On discount", value: "on-discount" },
];

export function pricePresetLabel(preset: PricePreset): string {
  if (preset.label) return preset.label;
  if (preset.min === undefined && preset.max !== undefined) return `Under ${formatPrice(preset.max)}`;
  if (preset.max === undefined && preset.min !== undefined) return `Over ${formatPrice(preset.min)}`;
  return `${formatPrice(preset.min ?? 0)} - ${formatPrice(preset.max ?? 0)}`;
}

function facetValues(product: Product, field: FacetField): string[] {
  const value = product[field];
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

export function buildFacetOptions(products: Product[], field: FacetField): FilterOption[] {
  const counts = new Map<string, number>();
  for (const product of products) {
    for (const value of facetValues(product, field)) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([value, count]) => ({ label: value, value, count }));
}

export function isFilterStateEmpty(state: FilterState): boolean {
  return (
    state.price.min === undefined &&
    state.price.max === undefined &&
    state.minDiscount === undefined &&
    state.minRating === undefined &&
    state.availability.length === 0 &&
    Object.values(state.facets).every((values) => values.length === 0)
  );
}

export function applyFilters(
  products: Product[],
  sections: FilterSectionConfig[],
  state: FilterState
): Product[] {
  const facetSections = sections.filter(
    (s): s is Extract<FilterSectionConfig, { type: "facet" }> => s.type === "facet"
  );

  return products.filter((p) => {
    if (state.price.min !== undefined && p.price < state.price.min) return false;
    if (state.price.max !== undefined && p.price > state.price.max) return false;
    if (state.minDiscount !== undefined && calculateDiscount(p.price, p.originalPrice) < state.minDiscount) {
      return false;
    }
    if (state.minRating !== undefined && p.rating < state.minRating) return false;
    if (state.availability.includes("in-stock") && p.stock <= 0) return false;
    if (state.availability.includes("on-discount") && calculateDiscount(p.price, p.originalPrice) === 0) {
      return false;
    }
    for (const section of facetSections) {
      const selected = state.facets[section.id] ?? [];
      if (selected.length === 0) continue;
      const values = facetValues(p, section.field);
      if (!selected.some((value) => values.includes(value))) return false;
    }
    return true;
  });
}
