import type { LucideIcon } from "lucide-react";
import {
  Shirt,
  Smartphone,
  Sparkles,
  CookingPot,
  ShoppingBasket,
  Baby,
  BookOpen,
  Dumbbell,
  Watch,
  Sofa,
} from "lucide-react";

export interface Subcategory {
  name: string;
  slug: string;
}

export interface CategoryDefinition {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  /** Tailwind classes for the icon tile: background + text color. */
  accent: string;
  subcategories: Subcategory[];
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function defineCategory(
  name: string,
  description: string,
  icon: LucideIcon,
  accent: string,
  subcategories: string[]
): CategoryDefinition {
  return {
    name,
    slug: slugify(name),
    description,
    icon,
    accent,
    subcategories: subcategories.map((sub) => ({ name: sub, slug: slugify(sub) })),
  };
}

export const CATEGORIES: CategoryDefinition[] = [
  defineCategory(
    "Fashion & Clothing",
    "Trendy outfits, footwear, bags and accessories for men, women and kids.",
    Shirt,
    "bg-rose-50 text-rose-600",
    [
      "Men's Fashion",
      "Women's Fashion",
      "Kids' Clothing",
      "Shoes & Footwear",
      "Bags & Luggage",
      "Fashion Accessories",
    ]
  ),
  defineCategory(
    "Electronics & Gadgets",
    "Phones, laptops, audio, wearables and smart devices from trusted brands.",
    Smartphone,
    "bg-blue-50 text-blue-600",
    [
      "Mobile Phones & Tablets",
      "Mobile Accessories",
      "Computers & Laptops",
      "Computer Accessories",
      "Headphones, Earbuds & Speakers",
      "Smartwatches & Wearables",
      "Cameras & Accessories",
      "Gaming Accessories",
      "Smart Home Devices",
      "Chargers, Cables & Power Banks",
    ]
  ),
  defineCategory(
    "Beauty & Personal Care",
    "Authentic skincare, makeup, haircare, fragrances and grooming essentials.",
    Sparkles,
    "bg-pink-50 text-pink-600",
    [
      "Skincare & Sunscreen",
      "Makeup & Cosmetics",
      "Hair Care",
      "Perfume & Deodorant",
      "Men's Grooming",
    ]
  ),
  defineCategory(
    "Home & Kitchen",
    "Cookware, storage, cleaning and decor to make every home better.",
    CookingPot,
    "bg-amber-50 text-amber-600",
    [
      "Kitchen Tools & Cookware",
      "Storage & Organizers",
      "Cleaning Supplies",
      "Home Decor & Lighting",
      "Bedsheets, Curtains & Towels",
    ]
  ),
  defineCategory(
    "Grocery & Food",
    "Daily groceries, snacks, beverages and organic local products.",
    ShoppingBasket,
    "bg-emerald-50 text-emerald-600",
    [
      "Rice, Lentils, Oil & Spices",
      "Snacks, Biscuits & Beverages",
      "Packaged Food",
      "Organic & Local Products",
    ]
  ),
  defineCategory(
    "Baby, Kids & Toys",
    "Baby care, feeding, clothing, toys and school accessories for little ones.",
    Baby,
    "bg-sky-50 text-sky-600",
    [
      "Baby Clothing",
      "Diapers & Baby Care",
      "Feeding Accessories",
      "Educational Toys & Games",
      "School Bags & Kids' Accessories",
    ]
  ),
  defineCategory(
    "Books, Stationery & Office Supplies",
    "Books, study materials, stationery and everything for school and office.",
    BookOpen,
    "bg-indigo-50 text-indigo-600",
    [
      "Books & Educational Materials",
      "Notebooks, Pens & Art Supplies",
      "School & College Supplies",
      "Office Accessories",
    ]
  ),
  defineCategory(
    "Sports, Fitness & Outdoor",
    "Gear for cricket, football, gym, yoga and outdoor adventures.",
    Dumbbell,
    "bg-orange-50 text-orange-600",
    [
      "Football, Cricket & Badminton",
      "Gym Equipment",
      "Yoga & Fitness Accessories",
      "Camping & Outdoor Products",
    ]
  ),
  defineCategory(
    "Watches, Jewelry & Accessories",
    "Watches, sunglasses, wallets, jewelry and thoughtful gift items.",
    Watch,
    "bg-violet-50 text-violet-600",
    ["Watches", "Sunglasses", "Wallets & Belts", "Fashion Jewelry", "Gift Items"]
  ),
  defineCategory(
    "Home Appliances & Furniture",
    "Kitchen appliances, fans, large appliances and furniture for every room.",
    Sofa,
    "bg-teal-50 text-teal-600",
    [
      "Electric Kettle, Blender & Rice Cooker",
      "Fans & Small Appliances",
      "Refrigerators & Washing Machines",
      "Chairs, Tables & Shelves",
      "Mattresses & Furniture",
    ]
  ),
];

export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getSubcategory(
  category: CategoryDefinition,
  subSlug: string
): Subcategory | undefined {
  return category.subcategories.find((s) => s.slug === subSlug);
}

export function categoryHref(categorySlug: string, subSlug?: string): string {
  return subSlug ? `/category/${categorySlug}/${subSlug}` : `/category/${categorySlug}`;
}
