import type { LucideIcon } from "lucide-react";
import {
  Archive,
  Armchair,
  Baby,
  Backpack,
  BatteryCharging,
  Bed,
  BedDouble,
  BookOpen,
  Brush,
  Camera,
  Coffee,
  Cookie,
  CookingPot,
  Droplet,
  Dumbbell,
  Fan,
  Footprints,
  Gamepad2,
  Gem,
  Gift,
  Glasses,
  GraduationCap,
  Headphones,
  HeartPulse,
  Keyboard,
  Lamp,
  Laptop,
  Leaf,
  Lightbulb,
  Luggage,
  Milk,
  Package,
  Palette,
  Paperclip,
  PenTool,
  Puzzle,
  Refrigerator,
  Scissors,
  Shirt,
  ShoppingBag,
  ShoppingBasket,
  Smartphone,
  SmartphoneCharging,
  Sofa,
  Sparkles,
  SprayCan,
  Sun,
  Tent,
  Trophy,
  Wallet,
  Watch,
  Wheat,
} from "lucide-react";

export interface Subcategory {
  name: string;
  slug: string;
  icon: LucideIcon;
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

/** Sub-route that lists every product of a category with the filter sidebar. */
export const ALL_PRODUCTS_SLUG = "all";

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
  subcategories: [string, LucideIcon][]
): CategoryDefinition {
  return {
    name,
    slug: slugify(name),
    description,
    icon,
    accent,
    subcategories: subcategories.map(([subName, subIcon]) => ({
      name: subName,
      slug: slugify(subName),
      icon: subIcon,
    })),
  };
}

export const CATEGORIES: CategoryDefinition[] = [
  defineCategory(
    "Fashion & Clothing",
    "Trendy outfits, footwear, bags and accessories for men, women and kids.",
    Shirt,
    "bg-rose-50 text-rose-600",
    [
      ["Men's Fashion", Shirt],
      ["Women's Fashion", ShoppingBag],
      ["Kids' Clothing", Baby],
      ["Shoes & Footwear", Footprints],
      ["Bags & Luggage", Luggage],
      ["Fashion Accessories", Glasses],
    ]
  ),
  defineCategory(
    "Electronics & Gadgets",
    "Phones, laptops, audio, wearables and smart devices from trusted brands.",
    Smartphone,
    "bg-blue-50 text-blue-600",
    [
      ["Mobile Phones & Tablets", Smartphone],
      ["Mobile Accessories", SmartphoneCharging],
      ["Computers & Laptops", Laptop],
      ["Computer Accessories", Keyboard],
      ["Headphones, Earbuds & Speakers", Headphones],
      ["Smartwatches & Wearables", Watch],
      ["Cameras & Accessories", Camera],
      ["Gaming Accessories", Gamepad2],
      ["Smart Home Devices", Lightbulb],
      ["Chargers, Cables & Power Banks", BatteryCharging],
    ]
  ),
  defineCategory(
    "Beauty & Personal Care",
    "Authentic skincare, makeup, haircare, fragrances and grooming essentials.",
    Sparkles,
    "bg-pink-50 text-pink-600",
    [
      ["Skincare & Sunscreen", Sun],
      ["Makeup & Cosmetics", Palette],
      ["Hair Care", Droplet],
      ["Perfume & Deodorant", SprayCan],
      ["Men's Grooming", Scissors],
    ]
  ),
  defineCategory(
    "Home & Kitchen",
    "Cookware, storage, cleaning and decor to make every home better.",
    CookingPot,
    "bg-amber-50 text-amber-600",
    [
      ["Kitchen Tools & Cookware", CookingPot],
      ["Storage & Organizers", Archive],
      ["Cleaning Supplies", Brush],
      ["Home Decor & Lighting", Lamp],
      ["Bedsheets, Curtains & Towels", BedDouble],
    ]
  ),
  defineCategory(
    "Grocery & Food",
    "Daily groceries, snacks, beverages and organic local products.",
    ShoppingBasket,
    "bg-emerald-50 text-emerald-600",
    [
      ["Rice, Lentils, Oil & Spices", Wheat],
      ["Snacks, Biscuits & Beverages", Cookie],
      ["Packaged Food", Package],
      ["Organic & Local Products", Leaf],
    ]
  ),
  defineCategory(
    "Baby, Kids & Toys",
    "Baby care, feeding, clothing, toys and school accessories for little ones.",
    Baby,
    "bg-sky-50 text-sky-600",
    [
      ["Baby Clothing", Shirt],
      ["Diapers & Baby Care", Baby],
      ["Feeding Accessories", Milk],
      ["Educational Toys & Games", Puzzle],
      ["School Bags & Kids' Accessories", Backpack],
    ]
  ),
  defineCategory(
    "Books, Stationery & Office Supplies",
    "Books, study materials, stationery and everything for school and office.",
    BookOpen,
    "bg-indigo-50 text-indigo-600",
    [
      ["Books & Educational Materials", BookOpen],
      ["Notebooks, Pens & Art Supplies", PenTool],
      ["School & College Supplies", GraduationCap],
      ["Office Accessories", Paperclip],
    ]
  ),
  defineCategory(
    "Sports, Fitness & Outdoor",
    "Gear for cricket, football, gym, yoga and outdoor adventures.",
    Dumbbell,
    "bg-orange-50 text-orange-600",
    [
      ["Football, Cricket & Badminton", Trophy],
      ["Gym Equipment", Dumbbell],
      ["Yoga & Fitness Accessories", HeartPulse],
      ["Camping & Outdoor Products", Tent],
    ]
  ),
  defineCategory(
    "Watches, Jewelry & Accessories",
    "Watches, sunglasses, wallets, jewelry and thoughtful gift items.",
    Watch,
    "bg-violet-50 text-violet-600",
    [
      ["Watches", Watch],
      ["Sunglasses", Glasses],
      ["Wallets & Belts", Wallet],
      ["Fashion Jewelry", Gem],
      ["Gift Items", Gift],
    ]
  ),
  defineCategory(
    "Home Appliances & Furniture",
    "Kitchen appliances, fans, large appliances and furniture for every room.",
    Sofa,
    "bg-teal-50 text-teal-600",
    [
      ["Electric Kettle, Blender & Rice Cooker", Coffee],
      ["Fans & Small Appliances", Fan],
      ["Refrigerators & Washing Machines", Refrigerator],
      ["Chairs, Tables & Shelves", Armchair],
      ["Mattresses & Furniture", Bed],
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

/** Listing page with every product of the category (used by "see all" links). */
export function categoryListingHref(categorySlug: string): string {
  return categoryHref(categorySlug, ALL_PRODUCTS_SLUG);
}
