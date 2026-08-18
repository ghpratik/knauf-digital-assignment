import Link from "next/link";
import {
  Layers,
  Blocks,
  ThermometerSnowflake,
  PanelTop,
  Flame,
  PaintRoller,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    name: "Plasterboard",
    count: "320 products",
    href: "/products?category=plasterboard",
    Icon: Layers,
  },
  {
    name: "Insulation",
    count: "210 products",
    href: "/products?category=insulation",
    Icon: ThermometerSnowflake,
  },
  {
    name: "Drywall systems",
    count: "180 products",
    href: "/products?category=drywall-systems",
    Icon: Blocks,
  },
  {
    name: "Ceilings",
    count: "140 products",
    href: "/products?category=ceilings",
    Icon: PanelTop,
  },
  {
    name: "Fire protection",
    count: "95 products",
    href: "/products?category=fire-protection",
    Icon: Flame,
  },
  {
    name: "Plasters & finishes",
    count: "260 products",
    href: "/products?category=plasters",
    Icon: PaintRoller,
  },
];

export function CategoryGrid() {
  return (
    <section
      id="categories"
      className="w-full border-b border-border bg-muted/40 scroll-mt-16"
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Shop by category
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Jump straight to the system you&apos;re working with.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-foreground transition-colors hover:text-brand"
          >
            View all categories
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, count, href, Icon }) => (
            <Link
              key={name}
              href={href}
              className="group flex flex-col justify-between gap-8 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-lg bg-muted text-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{count}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
