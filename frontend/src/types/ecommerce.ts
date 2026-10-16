export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  rating: number;
  reviewCount: number;
  images: string[];
  stock: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  tags?: string[];
  discountType?: "ribbon" | "lightning";
  deliveryTime?: string;
  unit?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  productCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
