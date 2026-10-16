import React from "react";
import { notFound } from "next/navigation";
import { productService } from "@/services/product.service";
import PageLayout from "@/components/layout/PageLayout";
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
    <PageLayout>
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-10">
        <ProductDetailClient product={product} />
      </main>
    </PageLayout>
  );
}
