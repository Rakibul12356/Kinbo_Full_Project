"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Package,
  Inbox,
} from "lucide-react";

const emptySubscribe = () => () => {};

interface NavbarProps {
  onSearchChange?: (query: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export default function Navbar({
  onSearchChange,
  selectedCategory = "All",
  onSelectCategory,
}: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [searchInput, setSearchInput] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const categories = ["All", "Electronics", "Accessories", "Footwear", "Lifestyle"];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchInput);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md transition-all">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-36 sm:w-44 h-11 sm:h-12 overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Kinbo"
                width={260}
                height={260}
                className="w-auto h-30 object-contain"
                priority
              />
            </div>
          </Link>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg items-center relative"
          >
            <div className="absolute left-3.5 text-zinc-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search premium electronics, gadgets, essentials..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full bg-[#F3F7FC] text-[#1F2937] placeholder:text-zinc-400 text-sm pl-10 pr-4 py-2.5 rounded-full border border-[#E5E7EB] focus:outline-none focus:border-[#082F6B] focus:ring-2 focus:ring-[#082F6B]/20 transition-all shadow-2xs"
            />
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Account */}
            <Link
              href="/account"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2937] hover:text-[#082F6B] transition px-2.5 py-2 rounded-lg hover:bg-[#F3F7FC]"
            >
              <User className="w-4 h-4 text-[#082F6B]" />
              <span>Account</span>
            </Link>

            {/* Orders */}
            <Link
              href="/orders"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2937] hover:text-[#082F6B] transition px-2.5 py-2 rounded-lg hover:bg-[#F3F7FC]"
            >
              <Package className="w-4 h-4 text-[#082F6B]" />
              <span>Orders</span>
            </Link>

            {/* Inbox */}
            <Link
              href="/inbox"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F2937] hover:text-[#082F6B] transition px-2.5 py-2 rounded-lg hover:bg-[#F3F7FC]"
            >
              <Inbox className="w-4 h-4 text-[#082F6B]" />
              <span>Inbox</span>
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="group flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl hover:bg-[#F3F7FC] transition-all cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <div className="relative flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-[#082F6B] transition-transform duration-200 group-hover:scale-105" strokeWidth={2} />
                {isClient && (
                  <span className="absolute -top-1.5 -right-2 bg-[#FF6B00] text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden text-[#1F2937] hover:bg-[#F3F7FC] rounded-lg transition"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="absolute left-3.5 top-3 text-zinc-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              className="w-full bg-[#F3F7FC] text-[#1F2937] placeholder:text-zinc-400 text-sm pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#082F6B]"
            />
          </form>
        </div>

        {/* Mobile Categories Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E5E7EB] space-y-2 animate-in slide-in-from-top-2">
            <div className="text-xs font-bold uppercase text-zinc-400 px-2 tracking-wider">
              Browse Categories
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    if (onSelectCategory) onSelectCategory(category);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                    selectedCategory === category
                      ? "bg-[#082F6B] text-white"
                      : "bg-[#F3F7FC] text-[#1F2937]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="pt-2 border-t border-[#E5E7EB] flex flex-col gap-1">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F3F7FC] rounded-lg"
              >
                <User className="w-4 h-4 text-[#082F6B]" />
                <span>Account</span>
              </Link>
              <Link
                href="/orders"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F3F7FC] rounded-lg"
              >
                <Package className="w-4 h-4 text-[#082F6B]" />
                <span>Orders</span>
              </Link>
              <Link
                href="/inbox"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F3F7FC] rounded-lg"
              >
                <Inbox className="w-4 h-4 text-[#082F6B]" />
                <span>Inbox</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#1F2937] hover:bg-[#F3F7FC] rounded-lg"
              >
                <ShoppingCart className="w-4 h-4 text-[#082F6B]" />
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
