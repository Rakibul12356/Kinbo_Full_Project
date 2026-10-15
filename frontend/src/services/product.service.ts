import apiClient from "@/lib/axios";
import { Product } from "@/types/ecommerce";

// Fallback demo products for initial UI presentation if backend is not yet running
export const DEMO_PRODUCTS: Product[] = [
  {
    id: "prod-pasta-1",
    name: "Farmer's Gold Pasta (পাস্তা) 400g",
    slug: "farmers-gold-pasta-400g",
    description: "High quality durum wheat pasta, enriched with natural nutrients and perfect for authentic family meals.",
    price: 160,
    originalPrice: 180,
    category: "Groceries",
    rating: 5.0,
    reviewCount: 6,
    images: [
      "https://images.unsplash.com/photo-1621996346565-e3d5d6281724?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 45,
    isFeatured: true,
    discountType: "ribbon",
    deliveryTime: "12-24 HOURS",
    tags: ["Pasta", "Grocery", "Italian"],
  },
  {
    id: "prod-pasta-2",
    name: "Barilla Linguine N.13 Pasta 500g",
    slug: "barilla-linguine-n13-500g",
    description: "Imported authentic Italian linguine crafted from selected non-GMO durum wheat for the best al dente texture.",
    price: 399,
    originalPrice: 449,
    category: "Groceries",
    rating: 0,
    reviewCount: 0,
    images: [
      "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 30,
    isFeatured: true,
    discountType: "lightning",
    deliveryTime: "12-24 HOURS",
    tags: ["Barilla", "Linguine", "Imported"],
  },
  {
    id: "prod-1",
    name: "Aura Noise-Canceling Wireless Headphones",
    slug: "aura-wireless-headphones",
    description: "Premium spatial audio, active noise cancellation with 40-hour battery life and ultra-comfortable memory foam ear cushions.",
    price: 2490,
    originalPrice: 3290,
    category: "Electronics",
    rating: 4.9,
    reviewCount: 342,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 24,
    isFeatured: true,
    isNewArrival: true,
    discountType: "ribbon",
    deliveryTime: "12-24 HOURS",
    tags: ["Audio", "Wireless", "ANC"],
  },
  {
    id: "prod-2",
    name: "Chronos Minimalist Chronograph Watch",
    slug: "chronos-minimalist-watch",
    description: "Swiss movement, sapphire crystal glass with genuine Italian leather strap. Water-resistant up to 50 meters.",
    price: 1890,
    originalPrice: 2400,
    category: "Accessories",
    rating: 4.8,
    reviewCount: 128,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 15,
    isFeatured: true,
    discountType: "lightning",
    deliveryTime: "12-24 HOURS",
    tags: ["Luxury", "Watches"],
  },
  {
    id: "prod-3",
    name: "Nomad Matte Black Thermal Tumbler (750ml)",
    slug: "nomad-thermal-tumbler",
    description: "Double-walled vacuum insulated stainless steel tumbler. Keeps drinks cold for 24 hours or piping hot for 12 hours.",
    price: 34.5,
    originalPrice: 45.0,
    category: "Lifestyle",
    rating: 4.7,
    reviewCount: 95,
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 50,
    isFeatured: false,
    tags: ["Eco-friendly", "Drinkware"],
  },
  {
    id: "prod-4",
    name: "Stellar Mechanical Keyboard - RGB Backlit",
    slug: "stellar-mechanical-keyboard",
    description: "Hot-swappable tactile switches, aircraft-grade aluminum frame, PBT keycaps, and customizable per-key dynamic RGB lighting.",
    price: 139.99,
    originalPrice: 179.99,
    category: "Electronics",
    rating: 4.9,
    reviewCount: 512,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 30,
    isFeatured: true,
    tags: ["Gaming", "Peripherals"],
  },
  {
    id: "prod-5",
    name: "Apex Ultra-Light Running Shoes",
    slug: "apex-running-shoes",
    description: "Breathable engineered mesh upper, responsive energy-return foam cushioning, and high-traction rubber outsole.",
    price: 119.0,
    originalPrice: 149.0,
    category: "Footwear",
    rating: 4.6,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 42,
    isFeatured: true,
    tags: ["Sports", "Footwear"],
  },
  {
    id: "prod-6",
    name: "Urban Carry Premium Commuter Backpack",
    slug: "urban-carry-commuter-backpack",
    description: "Waterproof ballistic nylon, padded 16-inch laptop compartment, hidden anti-theft pockets, and ergonomic airflow back panel.",
    price: 89.99,
    originalPrice: 115.0,
    category: "Accessories",
    rating: 4.8,
    reviewCount: 184,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    ],
    stock: 18,
    isFeatured: false,
    tags: ["Travel", "Gear"],
  },
];

export const productService = {
  // Fetch all products with fallback to demo data
  async getProducts(params?: { category?: string; search?: string }): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>("/products", { params });
      return response.data;
    } catch {
      // Graceful fallback to demo products when backend is offline
      let products = [...DEMO_PRODUCTS];
      if (params?.category && params.category !== "All") {
        products = products.filter(
          (p) => p.category.toLowerCase() === params.category?.toLowerCase()
        );
      }
      if (params?.search) {
        const query = params.search.toLowerCase();
        products = products.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.tags?.some((t) => t.toLowerCase().includes(query))
        );
      }
      return products;
    }
  },

  // Fetch product by ID or slug
  async getProductById(idOrSlug: string): Promise<Product | null> {
    try {
      const response = await apiClient.get<Product>(`/products/${idOrSlug}`);
      return response.data;
    } catch {
      const found = DEMO_PRODUCTS.find(
        (p) => p.id === idOrSlug || p.slug === idOrSlug
      );
      return found || null;
    }
  },

  // Fetch categories
  async getCategories(): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>("/categories");
      return response.data;
    } catch {
      return ["All", "Electronics", "Accessories", "Footwear", "Lifestyle"];
    }
  },
};
