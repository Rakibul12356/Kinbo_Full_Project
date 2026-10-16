"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Search, Star } from "lucide-react";
import type { Product } from "@/types/ecommerce";
import PriceRangeSlider from "./PriceRangeSlider";
import {
  AVAILABILITY_OPTIONS,
  DEFAULT_DISCOUNT_OPTIONS,
  DEFAULT_PRICE_PRESETS,
  DEFAULT_RATING_OPTIONS,
  EMPTY_FILTER_STATE,
  buildFacetOptions,
  pricePresetLabel,
  type FilterSectionConfig,
  type FilterState,
  type PriceRange,
} from "./filter-config";

interface FilterSidebarProps {
  sections: FilterSectionConfig[];
  /** Unfiltered products, used for facet counts and the price slider bounds. */
  products: Product[];
  state: FilterState;
  onChange: (state: FilterState) => void;
  className?: string;
}

function Section({
  title,
  onClear,
  children,
}: {
  title: string;
  onClear?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB]">
        <h3 className="text-sm font-bold text-[#1F2937]">{title}</h3>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-zinc-500 hover:text-[#082F6B] transition cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
      <div className="px-4 py-3">{children}</div>
    </section>
  );
}

function RadioRow({
  checked,
  onSelect,
  children,
}: {
  checked: boolean;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className="w-full flex items-center gap-2.5 py-1.5 text-sm text-[#1F2937] hover:text-[#082F6B] transition cursor-pointer"
    >
      <span
        className={`w-[18px] h-[18px] shrink-0 rounded-full border-2 flex items-center justify-center transition ${
          checked ? "border-[#082F6B]" : "border-zinc-300"
        }`}
      >
        {checked && <span className="w-2 h-2 rounded-full bg-[#082F6B]" />}
      </span>
      {children}
    </button>
  );
}

function CheckboxRow({
  checked,
  onToggle,
  label,
  count,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  count?: number;
}) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 text-sm text-[#1F2937] cursor-pointer hover:text-[#082F6B]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="w-4 h-4 shrink-0 rounded accent-[#082F6B] cursor-pointer"
      />
      <span className="flex-1 leading-snug">{label}</span>
      {count !== undefined && <span className="text-xs text-zinc-400">{count}</span>}
    </label>
  );
}

function PriceSection({
  config,
  products,
  price,
  onChange,
}: {
  config: Extract<FilterSectionConfig, { type: "price" }>;
  products: Product[];
  price: PriceRange;
  onChange: (price: PriceRange) => void;
}) {
  const presets = config.presets ?? DEFAULT_PRICE_PRESETS;
  const step = config.step ?? 10;
  const highestPrice = products.reduce((max, p) => Math.max(max, p.price), 0);
  const bounds = { min: 0, max: Math.max(Math.ceil(highestPrice / 100) * 100, 1000) };

  const [draftMin, setDraftMin] = useState(price.min?.toString() ?? "");
  const [draftMax, setDraftMax] = useState(price.max?.toString() ?? "");
  const [syncedPrice, setSyncedPrice] = useState(price);
  if (syncedPrice !== price) {
    setSyncedPrice(price);
    setDraftMin(price.min?.toString() ?? "");
    setDraftMax(price.max?.toString() ?? "");
  }

  const applyDraft = () => {
    const min = draftMin === "" ? undefined : Number(draftMin);
    const max = draftMax === "" ? undefined : Number(draftMax);
    onChange(min !== undefined && max !== undefined && min > max ? { min: max, max: min } : { min, max });
  };

  const hasValue = price.min !== undefined || price.max !== undefined;

  return (
    <Section title={config.title ?? "Price"} onClear={hasValue ? () => onChange({}) : undefined}>
      <div role="radiogroup" aria-label="Price range">
        {presets.map((preset) => (
          <RadioRow
            key={pricePresetLabel(preset)}
            checked={price.min === preset.min && price.max === preset.max && hasValue}
            onSelect={() => onChange({ min: preset.min, max: preset.max })}
          >
            {pricePresetLabel(preset)}
          </RadioRow>
        ))}
      </div>

      <div className="mt-4">
        <PriceRangeSlider
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={[
            Math.max(bounds.min, Math.min(price.min ?? bounds.min, bounds.max)),
            Math.min(bounds.max, Math.max(price.max ?? bounds.max, bounds.min)),
          ]}
          onChange={([low, high]) =>
            onChange({
              min: low <= bounds.min ? undefined : low,
              max: high >= bounds.max ? undefined : high,
            })
          }
        />
      </div>

      <form
        className="mt-3 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          applyDraft();
        }}
      >
        <input
          type="number"
          min={0}
          inputMode="numeric"
          placeholder="Min"
          value={draftMin}
          onChange={(e) => setDraftMin(e.target.value)}
          className="w-full min-w-0 rounded-lg border border-[#E5E7EB] px-3 py-2 text-sm outline-none focus:border-[#082F6B]"
        />
        <span className="text-xs font-semibold text-zinc-500">to</span>
        <input
          type="number"
          min={0}
          inputMode="numeric"
          placeholder="Max"
          value={draftMax}
          onChange={(e) => setDraftMax(e.target.value)}
          className="w-full min-w-0 rounded-lg border border-[#E5E7EB] px-3 py-2 text-sm outline-none focus:border-[#082F6B]"
        />
        <button
          type="submit"
          aria-label="Apply price range"
          className="w-9 h-9 shrink-0 rounded-full border border-[#E5E7EB] flex items-center justify-center text-[#1F2937] hover:border-[#082F6B] hover:text-[#082F6B] transition cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </form>
    </Section>
  );
}

function FacetSection({
  config,
  products,
  selected,
  onChange,
}: {
  config: Extract<FilterSectionConfig, { type: "facet" }>;
  products: Product[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const [query, setQuery] = useState("");
  const options = config.options ?? buildFacetOptions(products, config.field);
  if (options.length === 0) return null;

  const visible = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  const toggle = (value: string) =>
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value]);

  return (
    <Section title={config.title} onClear={selected.length > 0 ? () => onChange([]) : undefined}>
      {config.searchable && (
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={config.searchPlaceholder ?? `Search ${config.title.toLowerCase()}`}
            className="w-full rounded-lg border border-[#E5E7EB] pl-8 pr-3 py-2 text-sm outline-none focus:border-[#082F6B]"
          />
        </div>
      )}
      <div className="max-h-56 overflow-y-auto pr-1 -mr-1">
        {visible.length === 0 ? (
          <p className="py-2 text-xs text-zinc-400">No matches</p>
        ) : (
          visible.map((option) => (
            <CheckboxRow
              key={option.value}
              label={option.label}
              count={option.count}
              checked={selected.includes(option.value)}
              onToggle={() => toggle(option.value)}
            />
          ))
        )}
      </div>
    </Section>
  );
}

export default function FilterSidebar({ sections, products, state, onChange, className = "" }: FilterSidebarProps) {
  const update = (patch: Partial<FilterState>) => onChange({ ...state, ...patch });

  return (
    <div className={`rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E5E7EB]">
        <h2 className="text-base font-bold text-[#1F2937]">Filters</h2>
        <button
          type="button"
          onClick={() => onChange(EMPTY_FILTER_STATE)}
          className="text-sm font-semibold text-[#E53E3E] hover:text-[#C53030] transition cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="divide-y divide-[#E5E7EB]">
      {sections.map((section) => {
        switch (section.type) {
          case "links":
            return (
              <Section key={`links-${section.title}`} title={section.title}>
                <ul className="-mx-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition ${
                          link.active
                            ? "bg-[#F3F7FC] font-semibold text-[#082F6B]"
                            : "text-[#1F2937] hover:bg-[#F3F7FC] hover:text-[#082F6B]"
                        }`}
                      >
                        {link.label}
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 ${link.active ? "text-[#FF6B00]" : "text-zinc-300"}`}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Section>
            );

          case "price":
            return (
              <PriceSection
                key="price"
                config={section}
                products={products}
                price={state.price}
                onChange={(price) => update({ price })}
              />
            );

          case "discount":
            return (
              <Section
                key="discount"
                title={section.title ?? "Discount Range"}
                onClear={state.minDiscount !== undefined ? () => update({ minDiscount: undefined }) : undefined}
              >
                <div role="radiogroup" aria-label="Discount range">
                  {(section.options ?? DEFAULT_DISCOUNT_OPTIONS).map((pct) => (
                    <RadioRow
                      key={pct}
                      checked={state.minDiscount === pct}
                      onSelect={() => update({ minDiscount: pct })}
                    >
                      {pct}% and above
                    </RadioRow>
                  ))}
                </div>
              </Section>
            );

          case "rating":
            return (
              <Section
                key="rating"
                title={section.title ?? "Rating"}
                onClear={state.minRating !== undefined ? () => update({ minRating: undefined }) : undefined}
              >
                <div role="radiogroup" aria-label="Minimum rating">
                  {(section.options ?? DEFAULT_RATING_OPTIONS).map((rating) => (
                    <RadioRow
                      key={rating}
                      checked={state.minRating === rating}
                      onSelect={() => update({ minRating: rating })}
                    >
                      <span className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= rating ? "text-amber-400 fill-amber-400" : "text-zinc-200 fill-zinc-200"
                            }`}
                          />
                        ))}
                      </span>
                      <span>& up</span>
                    </RadioRow>
                  ))}
                </div>
              </Section>
            );

          case "facet":
            return (
              <FacetSection
                key={section.id}
                config={section}
                products={products}
                selected={state.facets[section.id] ?? []}
                onChange={(values) => update({ facets: { ...state.facets, [section.id]: values } })}
              />
            );

          case "availability":
            return (
              <Section
                key="availability"
                title={section.title ?? "Availability"}
                onClear={state.availability.length > 0 ? () => update({ availability: [] }) : undefined}
              >
                {AVAILABILITY_OPTIONS.map((option) => {
                  const checked = state.availability.includes(option.value);
                  return (
                    <CheckboxRow
                      key={option.value}
                      label={option.label}
                      checked={checked}
                      onToggle={() =>
                        update({
                          availability: checked
                            ? state.availability.filter((v) => v !== option.value)
                            : [...state.availability, option.value],
                        })
                      }
                    />
                  );
                })}
              </Section>
            );
        }
      })}
      </div>
    </div>
  );
}
