"use client";

import React, { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import Link from "next/link";
import CartItemRow from "./CartItemRow";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();

  // Prevent background page scrolling when cart drawer is open
  useEffect(() => {
    if (isCartOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.0;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#082F6B]" />
              <h2 className="text-lg font-bold text-[#1F2937]">
                Shopping Cart ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-500 hover:text-zinc-800 rounded-full hover:bg-zinc-100 transition cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#082F6B]/10 flex items-center justify-center mb-4">
                  <ShoppingCart className="w-10 h-10 text-[#082F6B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F2937] mb-1">
                  Your cart is empty
                </h3>
                <p className="text-sm text-zinc-500 max-w-xs mb-6">
                  Explore our curated products and find something you love.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#082F6B] text-white text-sm font-semibold hover:bg-[#062452] transition cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E5E7EB] bg-[#F3F7FC]/50 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1F2937]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1F2937] pt-2 border-t border-[#E5E7EB]">
                  <span>Total</span>
                  <span className="text-[#082F6B]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FF6B00] hover:bg-[#E85D00] text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 transition"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between pt-1">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs text-[#082F6B] font-semibold hover:underline"
                  >
                    View Full Cart
                  </Link>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-500 hover:text-rose-700 transition cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
