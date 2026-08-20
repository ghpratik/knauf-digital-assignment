import { ArrowRight } from "lucide-react";
import { SystemCard } from "@/components/systems/system-card";
import { SYSTEMS } from "@/lib/systems";
import Link from "next/link";

export function SystemsTeaser() {
  const featured = SYSTEMS.slice(0, 3);

  return (
    <section className="w-full border-b border-border bg-muted/40">
      <div className="mx-auto w-full max-w-350 px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Systems & solutions
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Pre-specified build-ups — not just individual products — for
              the walls, ceilings, and fire seals you actually build.
            </p>
          </div>
          <Link
            href="/systems"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
          >
            View all systems
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((system) => (
            <SystemCard key={system.id} system={system} />
          ))}
        </div>
      </div>
    </section>
  );
}
