"use client";

import { Scale, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCompare, type CompareItem } from "@/lib/compare-context";

// Overlay checkbox for a product card. Sits on top of the image; the card
// itself is a <Link>, so clicks here must stop propagation or they'd also
// navigate to the detail page.
export function CompareCardToggle({ item }: { item: CompareItem }) {
  const { isSelected, toggle, atLimit } = useCompare();
  const selected = isSelected(item.id);
  const disabled = !selected && atLimit;

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={
        selected
          ? `Remove ${item.name} from comparison`
          : disabled
            ? `Comparison is full — remove a product to add ${item.name}`
            : `Add ${item.name} to comparison`
      }
      title={disabled ? "Comparison list is full (3 max)" : undefined}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      className={cn(
        "absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-md border text-xs font-medium shadow-sm backdrop-blur transition-colors",
        selected
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border bg-background/90 text-muted-foreground hover:text-foreground",
        disabled && "cursor-not-allowed opacity-50 hover:text-muted-foreground",
      )}
    >
      {selected ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <Scale className="size-3.5" aria-hidden="true" />
      )}
    </button>
  );
}

// Full-size button for the product detail page, next to "Request quote".
export function CompareButtonToggle({ item }: { item: CompareItem }) {
  const { isSelected, toggle, atLimit } = useCompare();
  const selected = isSelected(item.id);
  const disabled = !selected && atLimit;

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => toggle(item)}
      title={disabled ? "Comparison list is full (3 max)" : undefined}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors",
        selected
          ? "border-brand bg-brand/10 text-brand"
          : "border-border bg-background text-foreground hover:bg-muted",
        disabled && "cursor-not-allowed opacity-50 hover:bg-background",
      )}
    >
      {selected ? (
        <Check className="size-4" aria-hidden="true" />
      ) : (
        <Scale className="size-4" aria-hidden="true" />
      )}
      {selected ? "Added to compare" : "Add to compare"}
    </button>
  );
}
