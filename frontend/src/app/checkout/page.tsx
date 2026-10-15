"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod" | "bkash">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#E5E7EB] shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#1F2937]">Your cart is empty</h2>
            <p className="text-sm text-zinc-500">
              Please add items to your cart before proceeding to checkout.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#082F6B] text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shop</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/cart" className="hover:text-[#082F6B] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cart</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#1F2937]">Checkout</span>
        </div>

        <h1 className="text-3xl font-extrabold text-[#1F2937] mb-8">
          Secure Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-[#1F2937] border-b border-[#E5E7EB] pb-3">
                <Truck className="w-5 h-5 text-[#082F6B]" />
                <span>1. Shipping Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="e.g. John Doe" required />
                <Input label="Phone Number" placeholder="+880 1XXXXXXXXX" required />
                <div className="sm:col-span-2">
                  <Input label="Email Address" type="email" placeholder="john@example.com" required />
                </div>
                <div className="sm:col-span-2">
                  <Input label="Street Address" placeholder="Apartment, suite, street" required />
                </div>
                <Input label="City" placeholder="Dhaka" required />
                <Input label="Postal Code" placeholder="1212" required />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-[#1F2937] border-b border-[#E5E7EB] pb-3">
                <CreditCard className="w-5 h-5 text-[#FF6B00]" />
                <span>2. Payment Method</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label
                  onClick={() => setPaymentMethod("card")}
                  className={`p-4 rounded-xl border flex flex-col gap-2 cursor-pointer transition ${
                    paymentMethod === "card"
                      ? "border-[#082F6B] bg-[#082F6B]/5 text-[#082F6B]"
                      : "border-[#E5E7EB] text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-bold">Credit/Debit Card</span>
                </label>

                <label
                  onClick={() => setPaymentMethod("bkash")}
                  className={`p-4 rounded-xl border flex flex-col gap-2 cursor-pointer transition ${
                    paymentMethod === "bkash"
                      ? "border-[#E2136E] bg-pink-50 text-[#E2136E]"
                      : "border-[#E5E7EB] text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <span className="text-base font-black">bKash / Nagad</span>
                  <span className="text-xs font-bold">Mobile Banking</span>
                </label>

                <label
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 rounded-xl border flex flex-col gap-2 cursor-pointer transition ${
                    paymentMethod === "cod"
                      ? "border-[#0bb07b] bg-emerald-50 text-emerald-700"
                      : "border-[#E5E7EB] text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span className="text-xs font-bold">Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="pt-3 space-y-3">
                  <Input label="Card Number" placeholder="4111 2222 3333 4444" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiration (MM/YY)" placeholder="12/28" required />
                    <Input label="CVC" placeholder="123" required />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-xs h-fit space-y-4">
            <h2 className="text-lg font-bold text-[#1F2937]">Order Summary</h2>

            <div className="divide-y divide-[#E5E7EB] max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="py-2.5 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-10 h-10 object-cover rounded-lg bg-zinc-100"
                    />
                    <div>
                      <p className="font-semibold text-[#1F2937] line-clamp-1">{item.product.name}</p>
                      <p className="text-zinc-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-[#082F6B]">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-[#E5E7EB] pt-4 text-zinc-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1F2937]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#1F2937] pt-2 border-t border-[#E5E7EB]">
                <span>Total Due</span>
                <span className="text-[#082F6B]">{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full mt-4 font-bold"
            >
              Complete Order ({formatPrice(total)})
            </Button>

            <div className="flex items-center gap-2 text-xs text-zinc-400 justify-center pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Encrypted & Guaranteed Delivery</span>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
