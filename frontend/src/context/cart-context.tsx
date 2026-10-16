"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CartItem, Product } from "@/types/ecommerce";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  isInCart: (productId: string) => boolean;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartToast({
  productName,
  message,
  onViewCart,
}: {
  productName: string;
  message: string;
  onViewCart: () => void;
}) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-[#082F6B]">{message}</p>
        <p className="text-xs text-zinc-500 truncate">{productName}</p>
      </div>
      <button
        type="button"
        onClick={onViewCart}
        className="shrink-0 rounded-lg bg-[#082F6B] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#062452] transition cursor-pointer"
      >
        View Cart
      </button>
    </div>
  );
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("shopping_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("shopping_cart", JSON.stringify(cart));
    } catch {
      // Ignore localStorage save error
    }
  }, [cart]);

  const isInCart = (productId: string) =>
    cart.some((item) => item.product.id === productId);

  const addToCart = (product: Product, quantity = 1) => {
    const alreadyInCart = isInCart(product.id);
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    const toastId = `cart-${product.id}`;
    const content = (
      <CartToast
        productName={product.name}
        message={alreadyInCart ? "Quantity updated in cart" : "Added to cart"}
        onViewCart={() => {
          toast.dismiss(toastId);
          setIsCartOpen(true);
        }}
      />
    );
    if (toast.isActive(toastId)) {
      toast.update(toastId, { render: content, autoClose: 2500 });
    } else {
      toast.success(content, { toastId });
    }
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        isInCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
