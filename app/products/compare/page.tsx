import { Suspense } from "react";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CompareView } from "@/components/products/compare-view";

export const metadata: Metadata = {
  title: "Compare products — Nordkern",
  description:
    "Compare technical specifications, fire ratings and sustainability documentation across two or three Nordkern products side by side.",
};

export default function ComparePage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <div className="mx-auto w-full max-w-350 px-4 py-10 sm:px-6 lg:px-10">
          <header className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Compare products
            </h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Specifications, fire ratings and sustainability documentation,
              side by side.
            </p>
          </header>
          <Suspense fallback={<CompareFallback />}>
            <CompareView />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function CompareFallback() {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="h-96 w-48 shrink-0 animate-pulse rounded-xl bg-muted" />
      ))}
    </div>
  );
}
