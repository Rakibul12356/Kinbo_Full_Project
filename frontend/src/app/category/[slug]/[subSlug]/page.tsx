import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductListing from "@/components/modules/product/ProductListing";
import type { FilterSectionConfig } from "@/components/filters/filter-config";
import {
  ALL_PRODUCTS_SLUG,
  CATEGORIES,
  categoryHref,
  categoryListingHref,
  getCategoryBySlug,
  getSubcategory,
} from "@/lib/categories";

interface PageProps {
  params: Promise<{ slug: string; subSlug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.flatMap((category) => [
    { slug: category.slug, subSlug: ALL_PRODUCTS_SLUG },
    ...category.subcategories.map((sub) => ({ slug: category.slug, subSlug: sub.slug })),
  ]);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category not found - Kinbo" };
  if (subSlug === ALL_PRODUCTS_SLUG) return { title: `All ${category.name} - Kinbo` };
  const subcategory = getSubcategory(category, subSlug);
  if (!subcategory) return { title: "Category not found - Kinbo" };
  return {
    title: `${subcategory.name} - ${category.name} - Kinbo`,
    description: `Shop ${subcategory.name} in ${category.name} at Kinbo.`,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { slug, subSlug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const isAll = subSlug === ALL_PRODUCTS_SLUG;
  const subcategory = isAll ? undefined : getSubcategory(category, subSlug);
  if (!isAll && !subcategory) notFound();

  const filterSections: FilterSectionConfig[] = [
    {
      type: "links",
      title: category.name,
      links: [
        { label: `All ${category.name}`, href: categoryListingHref(category.slug), active: isAll },
        ...category.subcategories.map((sub) => ({
          label: sub.name,
          href: categoryHref(category.slug, sub.slug),
          active: sub.slug === subcategory?.slug,
        })),
      ],
    },
    { type: "price" },
    { type: "discount" },
    { type: "rating" },
    ...(isAll
      ? [{ type: "facet", id: "subcategory", title: "Category", field: "subcategory" } as const]
      : []),
    {
      type: "facet",
      id: "tags",
      title: "Product Tags",
      field: "tags",
      searchable: true,
      searchPlaceholder: "Select Tags",
    },
    { type: "availability" },
  ];

  return (
    <ProductListing
      title={subcategory?.name ?? `All ${category.name}`}
      breadcrumbs={[
        { label: category.name, href: categoryHref(category.slug) },
        { label: subcategory?.name ?? "All Products" },
      ]}
      query={{ category: category.name, subcategory: subcategory?.name }}
      filterSections={filterSections}
    />
  );
}
