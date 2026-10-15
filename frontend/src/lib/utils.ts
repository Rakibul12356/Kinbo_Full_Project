/**
 * Utility functions for Kinbo E-Commerce
 */

export function cn(
  ...inputs: (string | number | boolean | undefined | null)[]
): string {
  return inputs.filter(Boolean).join(" ");
}

export function formatPrice(price: number): string {
  // Format with Bengali Taka symbol (৳) as in store design
  return `৳${price % 1 === 0 ? price : price.toFixed(2)}`;
}

export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
