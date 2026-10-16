import React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export interface CategoryTile {
  name: string;
  href: string;
  /** Product photo for the tile; falls back to `icon` when omitted. */
  image?: string;
  icon?: LucideIcon;
}

interface ShopByCategoryProps {
  title?: string;
  items: CategoryTile[];
  /** Background for every tile, e.g. "bg-[#FFF7E0]". */
  tileClass?: string;
  /** Icon color when a tile has no image. */
  iconClass?: string;
}

export default function ShopByCategory({
  title = "Shop By Category",
  items,
  tileClass = "bg-[#FFF7E0]",
  iconClass = "text-[#082F6B]",
}: ShopByCategoryProps) {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg sm:text-xl font-bold text-[#1F2937]">{title}</h2>
      <ul className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-1 lg:grid lg:grid-cols-8 lg:overflow-visible">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href} className="w-24 sm:w-28 lg:w-auto shrink-0">
              <Link href={item.href} className="group block text-center">
                <div
                  className={`aspect-square rounded-xl flex items-center justify-center overflow-hidden transition group-hover:shadow-md group-hover:-translate-y-0.5 ${tileClass}`}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : Icon ? (
                    <Icon className={`w-10 h-10 sm:w-12 sm:h-12 ${iconClass}`} strokeWidth={1.5} />
                  ) : null}
                </div>
                <div className="mt-2 text-xs sm:text-[13px] font-medium leading-snug text-[#1F2937] group-hover:text-[#082F6B] line-clamp-2">
                  {item.name}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
