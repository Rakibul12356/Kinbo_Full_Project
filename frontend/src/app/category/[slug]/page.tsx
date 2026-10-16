import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryBySlug } from "@/lib/categories";
import { CATEGORY_PAGES } from "@/views/category";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category not found - Kinbo" };
  return {
    title: `${category.name} - Kinbo`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const CategoryLanding = CATEGORY_PAGES[slug];
  if (!CategoryLanding) notFound();

  return <CategoryLanding />;
}
