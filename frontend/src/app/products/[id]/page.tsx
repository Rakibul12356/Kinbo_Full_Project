import React from "react";
import { notFound } from "next/navigation";
import { productService } from "@/services/product.service";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetailClient from "./product-detail-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10">
        <ProductDetailClient product={product} />
      </main>
      <Footer />
    </div>
  );
}
