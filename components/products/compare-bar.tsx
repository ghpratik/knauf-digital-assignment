"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useCompare } from "@/lib/compare-context";
import { MAX_COMPARE } from "@/lib/products";

export function CompareBar() {
  const { items, remove, clear } = useCompare();
  const pathname = usePathname();

  // The compare page itself already shows the full selection — a floating
  // duplicate of the same list on top of it would just be noise.
  if (pathname === "/products/compare") return null;
  if (items.length === 0) return null;

  const compareHref = `/products/compare?ids=${items.map((i) => i.id).join(",")}`;

  return (
    <div
      role="region"
      aria-label="Product comparison"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-350 flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex flex-1 items-center gap-3 overflow-x-auto">
          <span className="shrink-0 text-sm font-medium text-muted-foreground">
            Compare ({items.length}/{MAX_COMPARE})
          </span>
          <ul className="flex items-center gap-2">
            {items.map((item) => (
              <li
                key={item.id}
                className="group relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted"
                title={item.name}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`Remove ${item.name} from comparison`}
                  className="absolute inset-0 flex items-center justify-center bg-background/80 text-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={clear}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Clear
          </button>
          <Link
            href={compareHref}
            aria-disabled={items.length < 2}
            className={
              items.length < 2
                ? "pointer-events-none rounded-lg bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground"
                : "rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            }
          >
            Compare {items.length >= 2 ? `(${items.length})` : ""}
          </Link>
        </div>
      </div>
      {items.length < 2 ? (
        <p className="mx-auto w-full max-w-350 px-4 pb-3 text-xs text-muted-foreground sm:px-6 lg:px-10">
          Add one more product to compare.
        </p>
      ) : null}
    </div>
  );
}
