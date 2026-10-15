"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductFilters from "@/components/modules/product/ProductFilters";
import ProductGrid from "@/components/modules/product/ProductGrid";
import { useProducts, useCategories } from "@/hooks/use-products";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const { data: categories = ["All", "Electronics", "Accessories", "Footwear", "Lifestyle"] } =
    useCategories();

  const { data: products = [], isLoading } = useProducts({
    category: selectedCategory === "All" ? undefined : selectedCategory,
    search: searchQuery,
  });

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
          <Link href="/" className="hover:text-[#082F6B] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#1F2937]">Products Catalog</span>
        </div>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#082F6B] text-xs font-bold uppercase tracking-wider mb-1">
              <ShoppingBag className="w-4 h-4 text-[#FF6B00]" />
              <span>Catalog</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#1F2937]">
              All Products
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Explore our complete selection of premium items
            </p>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Product Grid */}
        <div className="pt-8">
          <ProductGrid products={sortedProducts} isLoading={isLoading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
