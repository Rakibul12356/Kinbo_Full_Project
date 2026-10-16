"use client";

import React from "react";
import { formatPrice } from "@/lib/utils";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export default function PriceRangeSlider({ min, max, step = 10, value, onChange }: PriceRangeSliderProps) {
  const [low, high] = value;
  const span = Math.max(max - min, 1);
  const lowPct = ((low - min) / span) * 100;
  const highPct = ((high - min) / span) * 100;

  return (
    <div className="space-y-2">
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-zinc-200" />
        <div
          className="absolute h-1.5 rounded-full bg-[#082F6B]"
          style={{ left: `${lowPct}%`, right: `${100 - highPct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => onChange([Math.min(Number(e.target.value), high - step), high])}
          aria-label="Minimum price"
          className="dual-range"
          style={{ zIndex: low > max - span * 0.1 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => onChange([low, Math.max(Number(e.target.value), low + step)])}
          aria-label="Maximum price"
          className="dual-range"
          style={{ zIndex: 4 }}
        />
      </div>
      <div className="flex justify-between text-xs font-medium text-zinc-500">
        <span>{formatPrice(low)}</span>
        <span>{formatPrice(high)}</span>
      </div>
    </div>
  );
}
