"use client";

import React from "react";
import { CartItem } from "@/types/ecommerce";
import { Plus, Minus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  return (
    <div className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#E5E7EB] hover:border-zinc-300 transition-colors">
      <div className="relative w-20 h-20 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.product.images[0]}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <Link
              href={`/products/${item.product.id}`}
              className="text-sm font-semibold text-[#1F2937] hover:text-[#082F6B] line-clamp-1"
            >
              {item.product.name}
            </Link>
            <button
              onClick={() => onRemove(item.product.id)}
              className="text-zinc-400 hover:text-rose-600 transition p-1"
              title="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-zinc-500">{item.product.category}</span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-[#E5E7EB] rounded-lg bg-zinc-50">
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
              className="p-1 hover:bg-zinc-200 text-zinc-600 transition rounded-l-lg cursor-pointer"
              title="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2.5 text-xs font-semibold text-[#1F2937]">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
              className="p-1 hover:bg-zinc-200 text-zinc-600 transition rounded-r-lg cursor-pointer"
              title="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-sm font-bold text-[#082F6B]">
            {formatPrice(item.product.price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
