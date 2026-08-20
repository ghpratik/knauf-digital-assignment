"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { useCompare } from "@/lib/compare-context";

export function CompareIndicator() {
  const { items } = useCompare();

  return (
    <Link
      href={
        items.length > 0
          ? `/products/compare?ids=${items.map((i) => i.id).join(",")}`
          : "/products/compare"
      }
      aria-label={`Compare products${items.length > 0 ? ` (${items.length} selected)` : ""}`}
      className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      <Scale className="size-4.5" aria-hidden="true" />
      {items.length > 0 ? (
        <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-brand-foreground">
          {items.length}
        </span>
      ) : null}
    </Link>
  );
}
