"use client";

import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { CATEGORIES, categoryHref } from "@/lib/categories";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  User,
  Package,
  Inbox,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";

// Hysteresis prevents flicker: collapsing the bar shrinks the sticky header,
// which shifts scrollY back toward the threshold.
const HIDE_AFTER_PX = 80;
const SHOW_BEFORE_PX = 10;
const MEGA_MENU_CLOSE_DELAY_MS = 150;
const DROPDOWN_WIDTH_PX = 300;

const emptySubscribe = () => () => {};

interface NavbarProps {
  onSearchChange?: (query: string) => void;
}

export default function Navbar({ onSearchChange }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isCategoryBarHidden, setIsCategoryBarHidden] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const [openCategorySlug, setOpenCategorySlug] = useState<string | null>(null);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openCategory = CATEGORIES.find((c) => c.slug === openCategorySlug);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsCategoryBarHidden((hidden) => {
        if (!hidden && y > HIDE_AFTER_PX) return true;
        if (hidden && y < SHOW_BEFORE_PX) return false;
        return hidden;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updateScrollArrows = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollArrows();
    window.addEventListener("resize", updateScrollArrows);
    return () => window.removeEventListener("resize", updateScrollArrows);
  }, [updateScrollArrows]);

  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const scrollCategories = (direction: 1 | -1) => {
    categoryScrollRef.current?.scrollBy({ left: direction * 240, behavior: "smooth" });
  };

  const cancelMegaMenuClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMegaMenu = (slug: string, anchor: HTMLElement) => {
    cancelMegaMenuClose();
    const header = headerRef.current;
    if (header) {
      const headerRect = header.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();
      const maxLeft = headerRect.width - DROPDOWN_WIDTH_PX - 16;
      setDropdownLeft(Math.max(16, Math.min(anchorRect.left - headerRect.left, maxLeft)));
    }
    setOpenCategorySlug(slug);
  };

  const scheduleMegaMenuClose = () => {
    cancelMegaMenuClose();
    closeTimerRef.current = setTimeout(() => setOpenCategorySlug(null), MEGA_MENU_CLOSE_DELAY_MS);
  };

  const closeMegaMenu = () => {
    cancelMegaMenuClose();
    setOpenCategorySlug(null);
  };

  const isCategoryActive = (slug: string) => pathname?.startsWith(`/category/${slug}`) ?? false;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchInput);
    }
  };

  const isMegaMenuVisible = Boolean(openCategory) && !isCategoryBarHidden;

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md transition-all">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Kinbo home">
            <Image
              src="/images/logo-trimmed.png"
              alt="Kinbo"
              width={131}
              height={36}
              style={{ width: "auto" }}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
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
      </div>

      {/* Category Bar (collapses on scroll) */}
      <div onMouseLeave={scheduleMegaMenuClose}>
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
            isCategoryBarHidden ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
          }`}
          aria-hidden={isCategoryBarHidden}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#E5E7EB]">
              <div className="container mx-auto px-4 sm:px-6 relative">
                {canScrollLeft && (
                  <button
                    type="button"
                    onClick={() => scrollCategories(-1)}
                    tabIndex={isCategoryBarHidden ? -1 : 0}
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[#1F2937] hover:bg-[#F3F7FC] transition cursor-pointer"
                    aria-label="Scroll categories left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                <nav
                  ref={categoryScrollRef}
                  onScroll={() => {
                    updateScrollArrows();
                    closeMegaMenu();
                  }}
                  aria-label="Product categories"
                  className="flex items-center gap-6 sm:gap-7 overflow-x-auto scrollbar-none scroll-smooth"
                >
                  <Link
                    href="/categories"
                    onMouseEnter={closeMegaMenu}
                    tabIndex={isCategoryBarHidden ? -1 : 0}
                    className={`relative shrink-0 inline-flex items-center gap-1.5 py-3.5 text-sm whitespace-nowrap transition ${
                      pathname === "/categories"
                        ? "font-semibold text-[#082F6B]"
                        : "font-medium text-[#1F2937] hover:text-[#082F6B]"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    All Categories
                    {pathname === "/categories" && (
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-[#FF6B00]" />
                    )}
                  </Link>

                  {CATEGORIES.map((category) => {
                    const isActive = isCategoryActive(category.slug);
                    const isOpen = openCategorySlug === category.slug;
                    return (
                      <Link
                        key={category.slug}
                        href={categoryHref(category.slug)}
                        onMouseEnter={(e) => openMegaMenu(category.slug, e.currentTarget)}
                        onFocus={(e) => openMegaMenu(category.slug, e.currentTarget)}
                        onClick={closeMegaMenu}
                        tabIndex={isCategoryBarHidden ? -1 : 0}
                        aria-expanded={isOpen}
                        className={`relative shrink-0 inline-flex items-center gap-1 py-3.5 text-sm whitespace-nowrap transition ${
                          isActive || isOpen
                            ? "font-semibold text-[#082F6B]"
                            : "font-medium text-[#1F2937] hover:text-[#082F6B]"
                        }`}
                      >
                        {category.name}
                        <ChevronDown
                          className={`hidden md:block w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                        {(isActive || isOpen) && (
                          <span className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-[#FF6B00]" />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {canScrollRight && (
                  <button
                    type="button"
                    onClick={() => scrollCategories(1)}
                    tabIndex={isCategoryBarHidden ? -1 : 0}
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-lg bg-white border border-[#E5E7EB] shadow-xs flex items-center justify-center text-[#1F2937] hover:bg-[#F3F7FC] transition cursor-pointer"
                    aria-label="Scroll categories right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subcategory Dropdown (desktop hover), anchored under the hovered category */}
        {isMegaMenuVisible && openCategory && (
          <div
            onMouseEnter={cancelMegaMenuClose}
            style={{ left: dropdownLeft, width: DROPDOWN_WIDTH_PX }}
            className="hidden md:block absolute top-full z-50 pt-1"
          >
            <ul className="max-h-[70vh] overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white py-2 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
              {[
                { name: "All", href: categoryHref(openCategory.slug), isAll: true, icon: LayoutGrid },
                ...openCategory.subcategories.map((sub) => ({
                  name: sub.name,
                  href: categoryHref(openCategory.slug, sub.slug),
                  isAll: false,
                  icon: sub.icon,
                })),
              ].map((item) => {
                const isItemActive = pathname === item.href;
                const ItemIcon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMegaMenu}
                      className={`group flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                        isItemActive
                          ? "bg-[#F3F7FC] font-semibold text-[#082F6B]"
                          : "text-[#1F2937] hover:bg-[#F3F7FC] hover:text-[#082F6B]"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 shrink-0 rounded-md border border-[#E5E7EB] flex items-center justify-center ${
                          item.isAll ? "bg-[#F8FAFC] text-zinc-400" : openCategory.accent
                        }`}
                      >
                        <ItemIcon className="w-4 h-4" />
                      </span>
                      <span className="flex-1 leading-snug">{item.name}</span>
                      {!item.isAll && (
                        <ChevronRight className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-[#FF6B00] transition" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        {/* Mobile Categories Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E5E7EB] space-y-2 animate-in slide-in-from-top-2">
            <div className="text-xs font-bold uppercase text-zinc-400 px-2 tracking-wider">
              Browse Categories
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.slug}
                  href={categoryHref(category.slug)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition ${
                    isCategoryActive(category.slug)
                      ? "bg-[#082F6B] text-white"
                      : "bg-[#F3F7FC] text-[#1F2937]"
                  }`}
                >
                  <category.icon className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">{category.name}</span>
                </Link>
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
