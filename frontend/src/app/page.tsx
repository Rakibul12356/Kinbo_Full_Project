"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroBanner from "@/components/modules/home/HeroBanner";
import FeaturedSection from "@/components/modules/home/FeaturedSection";
import ProductFilters from "@/components/modules/product/ProductFilters";
import ProductGrid from "@/components/modules/product/ProductGrid";
import Footer from "@/components/layout/Footer";
import { useProducts, useCategories } from "@/hooks/use-products";
import { Layers } from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const { data: categories = ["All", "Electronics", "Accessories", "Footwear", "Lifestyle"] } =
    useCategories();

  const { data: products = [], isLoading } = useProducts({
    category: selectedCategory === "All" ? undefined : selectedCategory,
    search: searchQuery,
  });

  const handleExploreClick = () => {
    const catalogElement = document.getElementById("catalog-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Sort products
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

      <main className="flex-1">
        <HeroBanner onExploreClick={handleExploreClick} />

        {/* Featured Section */}
        {products.length > 0 && <FeaturedSection products={products} />}

        {/* Main Catalog Section */}
        <section id="catalog-section" className="py-12 container mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-[#082F6B] text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4 text-[#FF6B00]" />
              <span>Catalog Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
              {selectedCategory === "All" ? "Explore All Products" : `${selectedCategory} Collection`}
            </h2>
          </div>

          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="pt-8">
            <ProductGrid products={sortedProducts} isLoading={isLoading} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
