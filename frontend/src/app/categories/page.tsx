import type { Metadata } from "next";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { CATEGORIES, categoryHref } from "@/lib/categories";
import { ArrowRight, ChevronRight, Home, LayoutGrid } from "lucide-react";

export const metadata: Metadata = {
  title: "All Categories - Kinbo",
  description: "Browse every product category and subcategory available on Kinbo.",
};

const SUBCATEGORY_PREVIEW_COUNT = 5;

export default function CategoriesPage() {
  const totalSubcategories = CATEGORIES.reduce((sum, c) => sum + c.subcategories.length, 0);

  return (
    <PageLayout className="bg-[#F8FAFC]">

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Link href="/" className="inline-flex items-center gap-1 hover:text-[#082F6B] transition">
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
          <span className="font-semibold text-[#1F2937]">All Categories</span>
        </nav>

        <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#082F6B] via-[#0B3F8C] to-[#1458B8] text-white px-6 py-8 sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute right-24 -bottom-20 w-48 h-48 rounded-full bg-[#FF6B00]/20" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-2xl bg-white/15 ring-1 ring-white/25 flex items-center justify-center">
                <LayoutGrid className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                  Shop by Category
                </h1>
                <p className="mt-2 max-w-xl text-sm sm:text-base text-white/80">
                  Everything you need, from fashion and gadgets to groceries and furniture, all in one place.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-xl bg-white/10 ring-1 ring-white/20 px-4 py-3">
                <div className="text-xl font-extrabold">{CATEGORIES.length}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">Categories</div>
              </div>
              <div className="rounded-xl bg-white/10 ring-1 ring-white/20 px-4 py-3">
                <div className="text-xl font-extrabold">{totalSubcategories}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/70">Subcategories</div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const preview = category.subcategories.slice(0, SUBCATEGORY_PREVIEW_COUNT);
            const remaining = category.subcategories.length - preview.length;
            return (
              <article
                key={category.slug}
                className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-5 hover:shadow-lg hover:border-[#082F6B]/20 transition"
              >
                <Link href={categoryHref(category.slug)} className="flex items-start gap-4">
                  <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center ${category.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-[#1F2937] group-hover:text-[#082F6B] transition">
                      {category.name}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </Link>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {preview.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={categoryHref(category.slug, sub.slug)}
                        className="inline-flex rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#1F2937] hover:border-[#082F6B] hover:text-[#082F6B] transition"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                  {remaining > 0 && (
                    <li>
                      <Link
                        href={categoryHref(category.slug)}
                        className="inline-flex rounded-full bg-[#082F6B]/5 px-3 py-1 text-xs font-semibold text-[#082F6B] hover:bg-[#082F6B]/10 transition"
                      >
                        +{remaining} more
                      </Link>
                    </li>
                  )}
                </ul>

                <Link
                  href={categoryHref(category.slug)}
                  className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B00] hover:text-[#082F6B] transition"
                >
                  Shop {category.subcategories.length} subcategories
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </section>
      </main>
    </PageLayout>
  );
}
