import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  /** Trail after "Home"; the last item is rendered as the current page. */
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
      <Link href="/" className="inline-flex items-center gap-1 hover:text-[#082F6B] transition">
        <Home className="w-3.5 h-3.5" />
        Home
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-300" />
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-[#082F6B] transition">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#1F2937]" aria-current={isLast ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
