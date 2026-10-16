"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/ecommerce";
import { useCart } from "@/hooks/use-cart";
import { useIsClient } from "@/hooks/use-is-client";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import {
  Star,
  ShoppingCart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, isInCart } = useCart();
  const isClient = useIsClient();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const isAdded = isClient && isInCart(product.id);

  const discountPercent = calculateDiscount(product.price, product.originalPrice);

  const handleAddToCart = () => addToCart(product, quantity);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
        <Link href="/" className="hover:text-[#082F6B]">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#082F6B]">
          Products
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#1F2937] line-clamp-1">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-xs">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl bg-zinc-100 overflow-hidden border border-[#E5E7EB]">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-500 text-white shadow-md">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImage === img
                      ? "border-[#082F6B]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#082F6B]/10 text-[#082F6B]">
                {product.category}
              </span>
              {product.stock > 0 ? (
                <span className="px-2.5 py-0.5 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
                  In Stock ({product.stock})
                </span>
              ) : (
                <span className="px-2.5 py-0.5 text-xs font-medium text-rose-700 bg-rose-50 rounded-full border border-rose-200">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] leading-tight">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <span className="font-bold text-[#1F2937]">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-zinc-400">
                • {product.reviewCount} customer reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-black text-[#082F6B]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-zinc-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-600 leading-relaxed pt-2 border-t border-[#E5E7EB]">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="space-y-4 pt-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#E5E7EB] rounded-xl bg-zinc-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 hover:bg-white rounded-lg transition text-zinc-600 cursor-pointer"
                  title="Decrease"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-[#1F2937]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-2 hover:bg-white rounded-lg transition text-zinc-600 cursor-pointer"
                  title="Increase"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex-1 py-3.5 px-6 rounded-xl border-2 border-[#082F6B] disabled:opacity-50 font-semibold text-sm flex items-center justify-center gap-2 transition active:scale-[0.99] cursor-pointer ${
                  isAdded
                    ? "bg-[#082F6B] hover:bg-[#062452] text-white shadow-md"
                    : "bg-white text-[#082F6B] hover:bg-[#082F6B]/5"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" strokeWidth={3} />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart ({formatPrice(product.price * quantity)})</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E5E7EB] text-center text-xs text-zinc-500">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#082F6B]" />
                <span>Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#FF6B00]" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
