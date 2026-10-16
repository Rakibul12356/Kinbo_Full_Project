"use client";

import React from "react";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.0;
  const tax = subtotal * 0.05; // 5% standard tax
  const total = subtotal + shipping + tax;

  return (
    <PageLayout>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-[#082F6B]">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#1F2937]">Shopping Cart</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1F2937]">
              Shopping Cart
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              You have {cart.length} unique item{cart.length === 1 ? "" : "s"} in your cart
            </p>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-[#082F6B]/10 flex items-center justify-center mx-auto mb-4 text-[#082F6B]">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-2">
              Your cart is currently empty
            </h2>
            <p className="text-sm text-zinc-500 mb-6">
              Looks like you haven&apos;t added anything to your cart yet. Browse our products and pick something special!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#082F6B] hover:bg-[#062452] text-white font-semibold text-sm transition shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Products</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-[#E5E7EB] shadow-2xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-zinc-100 overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-bold text-[#1F2937] text-base hover:text-[#082F6B] line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <span className="text-xs text-zinc-400 block mt-0.5">
                        {item.product.category}
                      </span>
                      <span className="text-sm font-semibold text-[#082F6B] block mt-1">
                        {formatPrice(item.product.price)} each
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                    <div className="flex items-center border border-[#E5E7EB] rounded-xl bg-zinc-50">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="p-2 hover:bg-zinc-200 text-zinc-600 transition rounded-l-xl cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-sm font-bold text-[#1F2937]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-zinc-200 text-zinc-600 transition rounded-r-xl cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-[#082F6B]">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 mt-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs h-fit space-y-4">
              <h2 className="text-lg font-bold text-[#1F2937]">Order Summary</h2>

              <div className="space-y-3 text-sm border-b border-[#E5E7EB] pb-4">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1F2937]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Estimated Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Estimated Tax (5%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-extrabold text-[#1F2937]">
                <span>Total</span>
                <span className="text-[#082F6B]">{formatPrice(total)}</span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-3.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E85D00] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center gap-2 text-xs text-zinc-400 justify-center pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </PageLayout>
  );
}
