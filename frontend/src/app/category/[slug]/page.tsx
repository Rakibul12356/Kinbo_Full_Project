import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { CATEGORIES, categoryHref, getCategoryBySlug } from "@/lib/categories";
import { ChevronRight } from "lucide-react";

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

// Placeholder landing page; the final category page design is still to come.
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const Icon = category.icon;

  return (
    <PageLayout className="bg-[#F8FAFC]">
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <Breadcrumbs items={[{ label: category.name }]} />

        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${category.accent}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">{category.name}</h1>
            <p className="mt-1 text-sm text-zinc-500">{category.description}</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {category.subcategories.map((sub) => (
            <li key={sub.slug}>
              <Link
                href={categoryHref(category.slug, sub.slug)}
                className="group flex items-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-3.5 hover:shadow-md hover:border-[#082F6B]/20 transition"
              >
                <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${category.accent}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="flex-1 text-sm font-semibold text-[#1F2937] group-hover:text-[#082F6B]">
                  {sub.name}
                </span>
                <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#FF6B00]" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </PageLayout>
  );
}
