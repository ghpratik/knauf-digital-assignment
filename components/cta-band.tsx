import Link from "next/link";
import { ArrowRight, ShieldCheck, Truck, Ruler } from "lucide-react";

const features = [
  {
    Icon: Ruler,
    title: "Real specifications",
    body: "Datasheets, dimensions and fire ratings on every product page.",
  },
  {
    Icon: Truck,
    title: "Regional delivery",
    body: "Order by 2pm for dispatch across the region within 48 hours.",
  },
  {
    Icon: ShieldCheck,
    title: "Trade-verified stock",
    body: "Availability checked daily so you order what actually ships.",
  },
];

export function CtaBand() {
  return (
    <section className="w-full border-b border-border">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {features.map(({ Icon, title, body }) => (
            <div key={title} className="flex flex-col gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-muted text-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl bg-foreground px-6 py-12 text-background sm:px-12 sm:py-16">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Start with the full catalog.
              </h2>
              <p className="mt-3 text-pretty text-background/70">
                Filter by system, spec or availability and get to the exact
                product you need in a few clicks.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              Explore products
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
