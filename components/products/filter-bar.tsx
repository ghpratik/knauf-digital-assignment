"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { FilterPopover } from "./filter-popover";
import {
  APPLICATION_AREAS,
  CATEGORIES,
  FIRE_RATINGS,
  PRICE_BOUNDS,
  SORT_OPTIONS,
} from "@/lib/products";

export type FilterState = {
  category: string;
  applicationArea: string;
  fireRating: string;
  hasEPD: boolean;
  hasHPD: boolean;
  minPrice: string;
  maxPrice: string;
  sort: string;
};

type FilterBarProps = {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
};

function OptionButton({
  selected,
  label,
  onClick,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition-colors ${
        selected
          ? "bg-brand/10 font-medium text-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <span>{label}</span>
      {selected ? <Check className="size-4 text-brand" aria-hidden="true" /> : null}
    </button>
  );
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const [minInput, setMinInput] = useState(filters.minPrice);
  const [maxInput, setMaxInput] = useState(filters.maxPrice);

  const categoryLabel =
    CATEGORIES.find((c) => c.slug === filters.category)?.label ?? null;
  const priceActive = filters.minPrice !== "" || filters.maxPrice !== "";
  const priceLabel = priceActive
    ? `${filters.minPrice || PRICE_BOUNDS.min}–${filters.maxPrice || PRICE_BOUNDS.max}`
    : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Category */}
      <FilterPopover
        label="Category"
        active={!!filters.category}
        valueLabel={categoryLabel}
      >
        {(close) => (
          <div className="flex flex-col">
            <OptionButton
              selected={filters.category === ""}
              label="All categories"
              onClick={() => {
                onChange({ category: "" });
                close();
              }}
            />
            {CATEGORIES.map((c) => (
              <OptionButton
                key={c.slug}
                selected={filters.category === c.slug}
                label={c.label}
                onClick={() => {
                  onChange({ category: c.slug });
                  close();
                }}
              />
            ))}
          </div>
        )}
      </FilterPopover>

      {/* Application area */}
      <FilterPopover
        label="Application"
        active={!!filters.applicationArea}
        valueLabel={filters.applicationArea}
      >
        {(close) => (
          <div className="flex max-h-64 flex-col overflow-y-auto">
            <OptionButton
              selected={filters.applicationArea === ""}
              label="Any application"
              onClick={() => {
                onChange({ applicationArea: "" });
                close();
              }}
            />
            {APPLICATION_AREAS.map((a) => (
              <OptionButton
                key={a}
                selected={filters.applicationArea === a}
                label={a}
                onClick={() => {
                  onChange({ applicationArea: a });
                  close();
                }}
              />
            ))}
          </div>
        )}
      </FilterPopover>

      {/* Fire rating */}
      <FilterPopover
        label="Fire rating"
        active={!!filters.fireRating}
        valueLabel={filters.fireRating}
      >
        {(close) => (
          <div className="flex flex-col">
            <OptionButton
              selected={filters.fireRating === ""}
              label="Any rating"
              onClick={() => {
                onChange({ fireRating: "" });
                close();
              }}
            />
            {FIRE_RATINGS.map((r) => (
              <OptionButton
                key={r}
                selected={filters.fireRating === r}
                label={r === "None" ? "No rating" : `Euroclass ${r}`}
                onClick={() => {
                  onChange({ fireRating: r });
                  close();
                }}
              />
            ))}
          </div>
        )}
      </FilterPopover>

      {/* EPD toggle */}
      <button
        type="button"
        onClick={() => onChange({ hasEPD: !filters.hasEPD })}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
          filters.hasEPD
            ? "border-brand/60 bg-brand/10 text-foreground"
            : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
        }`}
      >
        {filters.hasEPD ? (
          <Check className="size-4 text-brand" aria-hidden="true" />
        ) : null}
        EPD
      </button>

      {/* HPD toggle */}
      <button
        type="button"
        onClick={() => onChange({ hasHPD: !filters.hasHPD })}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
          filters.hasHPD
            ? "border-brand/60 bg-brand/10 text-foreground"
            : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
        }`}
      >
        {filters.hasHPD ? (
          <Check className="size-4 text-brand" aria-hidden="true" />
        ) : null}
        HPD
      </button>

      {/* Price */}
      <FilterPopover label="Price" active={priceActive} valueLabel={priceLabel}>
        {(close) => (
          <div className="flex flex-col gap-3 p-1">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label
                  htmlFor="min-price"
                  className="mb-1 block text-xs text-muted-foreground"
                >
                  Min €
                </label>
                <input
                  id="min-price"
                  type="number"
                  min={0}
                  value={minInput}
                  onChange={(e) => setMinInput(e.target.value)}
                  placeholder={String(PRICE_BOUNDS.min)}
                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:border-brand"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="max-price"
                  className="mb-1 block text-xs text-muted-foreground"
                >
                  Max €
                </label>
                <input
                  id="max-price"
                  type="number"
                  min={0}
                  value={maxInput}
                  onChange={(e) => setMaxInput(e.target.value)}
                  placeholder={String(PRICE_BOUNDS.max)}
                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-foreground outline-none focus:border-brand"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setMinInput("");
                  setMaxInput("");
                  onChange({ minPrice: "", maxPrice: "" });
                  close();
                }}
                className="flex-1 rounded-md border border-border px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange({ minPrice: minInput, maxPrice: maxInput });
                  close();
                }}
                className="flex-1 rounded-md bg-brand px-2 py-1.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </FilterPopover>

      {/* Sort — pushed to the right */}
      <div className="ml-auto flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-muted-foreground">
          Sort
        </label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none transition-colors hover:border-foreground/30 focus:border-brand"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
