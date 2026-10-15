"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/ecommerce";
import { useCart } from "@/hooks/use-cart";
import { Star, Rocket } from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  // Determine badge type: if explicitly set use it, otherwise alternate based on id hash
  const isLightning =
    product.discountType === "lightning" ||
    (!product.discountType &&
      product.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2 === 1);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[#E2E8F0] bg-white p-3.5 sm:p-4 shadow-2xs hover:shadow-lg transition-all duration-300">
      {/* Top Discount Badges (2 Types as in design) */}
      {discountPercent > 0 && (
        <>
          {isLightning ? (
            /* Type 2: Red Lightning Ribbon Tag (at top center) */
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
              <div
                className="bg-[#E53E3E] text-white px-3 py-1 text-xs font-black tracking-wide flex items-center gap-1 shadow-xs"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 95% 100%, 50% 88%, 5% 100%)",
                }}
              >
                <span className="text-amber-300 text-xs">⚡</span>
                <span className="text-[11px] uppercase font-black">
                  {discountPercent}% OFF
                </span>
              </div>
            </div>
          ) : (
            /* Type 1: Blue Ribbon Bookmark Tag with sawtooth notch (at top left) */
            <div
              className="absolute top-0 left-3 z-20 w-9 bg-[#1865F2] text-white pt-1.5 pb-2.5 px-1 text-center shadow-xs"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 86%, 87.5% 100%, 75% 86%, 62.5% 100%, 50% 86%, 37.5% 100%, 25% 86%, 12.5% 100%, 0 86%)",
              }}
            >
              <div className="text-[11px] font-black leading-tight tracking-tighter">
                {discountPercent}%
              </div>
              <div className="text-[9px] font-black tracking-wider leading-none mt-0.5">
                OFF
              </div>
            </div>
          )}
        </>
      )}

      {/* Product Image Section */}
      <Link
        href={`/products/${product.id}`}
        className="relative aspect-square w-full bg-white flex items-center justify-center p-2 overflow-hidden mb-3"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      {/* Info Content */}
      <div className="flex-1 flex flex-col justify-between space-y-2.5">
        <div className="space-y-2">
          {/* Delivery Badge (Rocket 12-24 Hours) */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#ECEFF3] text-[#1E293B] text-[11px] font-bold tracking-wide">
              <div className="w-4 h-4 rounded-full bg-[#1E293B] flex items-center justify-center text-amber-400 flex-shrink-0">
                <Rocket className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              </div>
              <span>{product.deliveryTime || "12-24 HOURS"}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-[#1E293B] text-sm sm:text-[15px] leading-snug line-clamp-2 hover:text-[#082F6B] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating Stars & Count */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(product.rating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-zinc-200 fill-zinc-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-zinc-400 font-medium">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & ADD Action Button */}
        <div className="flex items-end justify-between pt-2">
          <div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-zinc-400 line-through font-medium">
                {formatPrice(product.originalPrice)}
              </div>
            )}
            <div className="text-lg sm:text-xl font-black text-[#1E293B] leading-tight">
              {formatPrice(product.price)}
            </div>
          </div>

          {/* Action Button: Always ADD Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="px-4 py-1.5 rounded-lg border-2 border-[#009688] text-[#00897B] hover:bg-[#009688]/10 font-bold text-xs sm:text-sm tracking-wider uppercase transition active:scale-95 cursor-pointer shadow-2xs"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
