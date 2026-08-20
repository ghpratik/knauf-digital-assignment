"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Search, PackageOpen, TriangleAlert } from "lucide-react";
import { ProductCard } from "./product-card";
import { FilterBar, type FilterState } from "./filter-bar";
import { ActiveFilters } from "./active-filters";
import { Pagination } from "./pagination";
import type { ProductListResult } from "@/lib/products";

const PAGE_SIZE = 9;

const fetcher = async (url: string): Promise<ProductListResult> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
};

// A field is a filter (resets pagination) unless it's the page itself.
type ParamPatch = Partial<FilterState & { search: string; page: number }>;

export function ProductsCatalog() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL is the single source of truth.
  const search = searchParams.get("search") ?? "";
  const filters: FilterState = useMemo(
    () => ({
      category: searchParams.get("category") ?? "",
      applicationArea: searchParams.get("applicationArea") ?? "",
      fireRating: searchParams.get("fireRating") ?? "",
      hasEPD: searchParams.get("hasEPD") === "true",
      hasHPD: searchParams.get("hasHPD") === "true",
      minPrice: searchParams.get("minPrice") ?? "",
      maxPrice: searchParams.get("maxPrice") ?? "",
      sort: searchParams.get("sort") ?? "relevance",
    }),
    [searchParams],
  );
  const page = Number(searchParams.get("page") ?? "1") || 1;

  const setParams = useCallback(
    (patch: ParamPatch) => {
      const params = new URLSearchParams(searchParams.toString());
      let touchedFilter = false;

      for (const [key, value] of Object.entries(patch)) {
        if (key !== "page") touchedFilter = true;
        if (value === "" || value === false || value === undefined) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      }
      // Any filter change resets to page 1.
      if (touchedFilter && patch.page === undefined) {
        params.delete("page");
      }
      const qs = params.toString();
      router.replace(qs ? `/products?${qs}` : "/products", { scroll: false });
    },
    [router, searchParams],
  );

  // Debounced search input synced to the URL.
  const [searchInput, setSearchInput] = useState(search);
  useEffect(() => {
    // URL navigation can update the controlled search field.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchInput(search);
  }, [search]);
  useEffect(() => {
    if (searchInput === search) return;
    const t = setTimeout(() => setParams({ search: searchInput }), 350);
    return () => clearTimeout(t);
  }, [searchInput, search, setParams]);

  // Build the API query from the current URL state.
  const apiQuery = useMemo(() => {
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    if (filters.category) p.set("category", filters.category);
    if (filters.applicationArea) p.set("applicationArea", filters.applicationArea);
    if (filters.fireRating) p.set("fireRating", filters.fireRating);
    if (filters.hasEPD) p.set("hasEPD", "true");
    if (filters.hasHPD) p.set("hasHPD", "true");
    if (filters.minPrice) p.set("minPrice", filters.minPrice);
    if (filters.maxPrice) p.set("maxPrice", filters.maxPrice);
    if (filters.sort && filters.sort !== "relevance") p.set("sort", filters.sort);
    p.set("page", String(page));
    p.set("limit", String(PAGE_SIZE));
    return p.toString();
  }, [search, filters, page]);

  const { data, error, isLoading } = useSWR(
    `/api/products?${apiQuery}`,
    fetcher,
    { keepPreviousData: true },
  );

  const total = data?.pagination.total ?? 0;
  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm focus-within:border-brand/70"
      >
        <div className="grid size-10 shrink-0 place-items-center text-muted-foreground">
          <Search className="size-5" aria-hidden="true" />
        </div>
        <label htmlFor="catalog-search" className="sr-only">
          Search products
        </label>
        <input
          id="catalog-search"
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          className="h-10 w-full min-w-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
      </form>

      {/* Filters */}
      <FilterBar filters={filters} onChange={(patch) => setParams(patch)} />

      {/* Active chips */}
      <ActiveFilters
        filters={filters}
        search={search}
        onRemove={(patch) => setParams(patch)}
        onClearAll={() => router.replace("/products", { scroll: false })}
      />

      {/* Result count */}
      <p className="text-sm text-muted-foreground" aria-live="polite">
        {isLoading && !data
          ? "Loading products…"
          : error
            ? "Something went wrong"
            : `${total} product${total === 1 ? "" : "s"} found`}
      </p>

      {/* States */}
      {error ? (
        <ErrorState />
      ) : isLoading && !data ? (
        <SkeletonGrid />
      ) : data && data.products.length === 0 ? (
        <EmptyState onClear={() => router.replace("/products", { scroll: false })} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              setParams({ page: p });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-border bg-card"
        >
          <div className="aspect-square w-full animate-pulse bg-muted" />
          <div className="flex flex-col gap-3 p-4">
            <div className="h-3 w-20 animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-3 w-full animate-pulse rounded bg-muted" />
            <div className="mt-2 h-5 w-24 animate-pulse rounded bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-card py-20 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-muted text-muted-foreground">
        <PackageOpen className="size-6" aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          No products match your filters
        </h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          Try removing a filter or searching for a different term.
        </p>
      </div>
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
      >
        Clear all filters
      </button>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-destructive/40 bg-destructive/5 py-20 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <TriangleAlert className="size-6" aria-hidden="true" />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          We couldn&apos;t load the catalog
        </h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          There was a problem fetching products. Please try again in a moment.
        </p>
      </div>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30"
      >
        Retry
      </button>
    </div>
  );
}
