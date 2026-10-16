import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductListing from "@/components/modules/product/ProductListing";
import { CATEGORIES, categoryHref, getCategoryBySlug, getSubcategory } from "@/lib/categories";

interface PageProps {
  params: Promise<{ slug: string; subSlug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.flatMap((category) =>
    category.subcategories.map((sub) => ({ slug: category.slug, subSlug: sub.slug }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const category = getCategoryBySlug(slug);
  const subcategory = category && getSubcategory(category, subSlug);
  if (!category || !subcategory) return { title: "Category not found - Kinbo" };
  return {
    title: `${subcategory.name} - ${category.name} - Kinbo`,
    description: `Shop ${subcategory.name} in ${category.name} at Kinbo.`,
  };
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { slug, subSlug } = await params;
  const category = getCategoryBySlug(slug);
  const subcategory = category && getSubcategory(category, subSlug);
  if (!category || !subcategory) notFound();

  return (
    <ProductListing
      title={subcategory.name}
      breadcrumbs={[
        { label: category.name, href: categoryHref(category.slug) },
        { label: subcategory.name },
      ]}
      query={{ category: category.name, subcategory: subcategory.name }}
      sidebarTitle={category.name}
      sidebarLinks={category.subcategories.map((sub) => ({
        label: sub.name,
        href: categoryHref(category.slug, sub.slug),
        active: sub.slug === subcategory.slug,
      }))}
    />
  );
}
