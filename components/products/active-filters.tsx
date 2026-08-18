"use client";

import { X } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import type { FilterState } from "./filter-bar";

type ActiveFiltersProps = {
  filters: FilterState;
  search: string;
  onRemove: (patch: Partial<FilterState & { search: string }>) => void;
  onClearAll: () => void;
};

type Chip = { key: string; label: string; clear: Partial<FilterState & { search: string }> };

export function ActiveFilters({
  filters,
  search,
  onRemove,
  onClearAll,
}: ActiveFiltersProps) {
  const chips: Chip[] = [];

  if (search) {
    chips.push({ key: "search", label: `“${search}”`, clear: { search: "" } });
  }
  if (filters.category) {
    const label =
      CATEGORIES.find((c) => c.slug === filters.category)?.label ??
      filters.category;
    chips.push({ key: "category", label, clear: { category: "" } });
  }
  if (filters.applicationArea) {
    chips.push({
      key: "applicationArea",
      label: filters.applicationArea,
      clear: { applicationArea: "" },
    });
  }
  if (filters.fireRating) {
    chips.push({
      key: "fireRating",
      label: `Fire ${filters.fireRating}`,
      clear: { fireRating: "" },
    });
  }
  if (filters.hasEPD) {
    chips.push({ key: "epd", label: "EPD available", clear: { hasEPD: false } });
  }
  if (filters.hasHPD) {
    chips.push({ key: "hpd", label: "HPD available", clear: { hasHPD: false } });
  }
  if (filters.minPrice || filters.maxPrice) {
    chips.push({
      key: "price",
      label: `€${filters.minPrice || "0"}–${filters.maxPrice || "∞"}`,
      clear: { minPrice: "", maxPrice: "" },
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => onRemove(chip.clear)}
          className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card py-1 pl-3 pr-2 text-sm text-foreground transition-colors hover:border-foreground/30"
        >
          <span>{chip.label}</span>
          <X
            className="size-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">Remove filter</span>
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
