import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductsCatalog } from "@/components/products/products-catalog";

export const metadata: Metadata = {
  title: "Products — Nordkern catalog",
  description:
    "Search and filter the full Nordkern catalog of plasterboard, insulation, drywall systems, ceilings, fire protection and finishing products.",
};

export default function ProductsPage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-6 lg:px-10">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Products
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              The full Nordkern catalog. Search, filter by system, fire rating
              and sustainability, and open any product for full technical
              specifications.
            </p>
          </header>
          <Suspense fallback={<CatalogFallback />}>
            <ProductsCatalog />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function CatalogFallback() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-14 w-full animate-pulse rounded-xl bg-muted" />
      <div className="h-10 w-full max-w-lg animate-pulse rounded-lg bg-muted" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
