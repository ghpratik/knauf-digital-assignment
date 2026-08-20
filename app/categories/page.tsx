import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS, categoryLabel } from "@/lib/data";

const categoryImages = {
  plasterboard: "/images/product-plasterboard.png",
  insulation: "/images/product-insulation.png",
  "drywall-systems": "/images/product-profile.png",
  ceilings: "/images/product-ceiling.png",
  "fire-protection": "/images/product-fireboard.png",
  plasters: "/images/product-plaster.png",
} as const;
const categoryDescriptions = {
  plasterboard: "Boards for walls, ceilings and specialist interior linings.",
  insulation: "Thermal, acoustic and fire performance for every envelope.",
  "drywall-systems":
    "Complete framing and lining systems that install with confidence.",
  ceilings: "Acoustic and visual ceiling systems for working interiors.",
  "fire-protection":
    "Passive protection that helps keep people and buildings safe.",
  plasters: "Base coats, finishes and compounds for smooth, durable surfaces.",
} as const;

export default function CategoriesPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto flex max-w-350 flex-col gap-6 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
            <Badge variant="outline" className="w-fit">
              Browse the range
            </Badge>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
              Materials for the way buildings are built now.
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">
              Explore the Nordkern catalogue by material family, performance
              requirement or the work happening on site.
            </p>
            <Button
              nativeButton={false}
              className="w-fit"
              render={<Link href="/products" />}
            >
              View full catalogue <ArrowUpRight data-icon="inline-end" />
            </Button>
          </div>
        </section>
        <section className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ slug }) => {
              const count = PRODUCTS.filter(
                (product) => product.category === slug,
              ).length;
              return (
                <Link
                  key={slug}
                  href={`/products?category=${slug}`}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-foreground/25 hover:shadow-lg"
                >
                  <div className="relative aspect-[1.6] overflow-hidden bg-muted">
                    <Image
                      src={categoryImages[slug]}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-card/90 text-foreground shadow-sm">
                      <ArrowUpRight
                        className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-sm text-muted-foreground">
                      {String(count).padStart(2, "0")} products
                    </p>
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {categoryLabel(slug)}
                    </h2>
                    <p className="mt-3 max-w-xs leading-6 text-muted-foreground">
                      {categoryDescriptions[slug]}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
