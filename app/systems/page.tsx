import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SystemCard } from "@/components/systems/system-card";
import { SYSTEMS } from "@/lib/systems";

export const metadata: Metadata = {
  title: "Systems & solutions — Nordkern",
  description:
    "Pre-specified building systems — fire-rated partitions, acoustic walls, external wall insulation, and suspended ceilings — with every component that goes into the build-up.",
};

export default function SystemsPage() {
  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <div className="mx-auto w-full max-w-350 px-4 py-10 sm:px-6 lg:px-10">
          <header className="max-w-2xl">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Systems & solutions
            </h1>
            <p className="mt-3 text-muted-foreground">
              Products get specified as complete build-ups, not one SKU at a
              time. Each system below groups the products that go into a
              single wall, ceiling, or fire-stopping detail — the same way
              you&apos;d actually order and install them.
            </p>
          </header>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SYSTEMS.map((system) => (
              <SystemCard key={system.id} system={system} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
