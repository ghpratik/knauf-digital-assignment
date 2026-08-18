import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSearch } from "@/components/hero-search";

const stats = [
  { value: "2,400+", label: "Products in catalog" },
  { value: "18", label: "System categories" },
  { value: "48h", label: "Delivery across region" },
];

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-border">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:py-24">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-brand" />
            Building materials, engineered
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Everything your build needs, from the core out.
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Nordkern is the catalog for drywall, insulation, plasters and
            finishing systems. Precise specs, honest availability, and a
            search built for people who work with their hands.
          </p>

          <div className="mt-8 w-full">
            <HeroSearch />
          </div>

          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
          >
            Browse the full catalog
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>

          <dl className="mt-12 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </dd>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-muted sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/hero-materials.png"
              alt="Neatly stacked plasterboard, insulation rolls and plaster in a bright modern warehouse"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur sm:left-6">
            <span className="grid size-9 place-items-center rounded-lg bg-brand/15 text-brand">
              <span className="size-3 rotate-45 rounded-[3px] bg-brand" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                In stock, verified daily
              </p>
              <p className="text-xs text-muted-foreground">
                Live availability on every SKU
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
