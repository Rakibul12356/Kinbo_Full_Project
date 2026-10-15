import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "outline" | "discount";
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[#082F6B]/10 text-[#082F6B] border border-[#082F6B]/20",
    secondary: "bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20",
    discount: "bg-rose-500 text-white font-bold",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-200",
    outline: "border border-[#E5E7EB] text-[#1F2937] bg-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
