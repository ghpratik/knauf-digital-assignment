import Link from "next/link";
import { ArrowUpRight, Blocks, Flame, Layers, PaintRoller, PanelTop, ThermometerSnowflake } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS, categoryLabel } from "@/lib/data";

const categoryIcons = { plasterboard: Layers, insulation: ThermometerSnowflake, "drywall-systems": Blocks, ceilings: PanelTop, "fire-protection": Flame, plasters: PaintRoller } as const;
const categoryDescriptions = { plasterboard: "Boards for walls, ceilings and specialist interior linings.", insulation: "Thermal, acoustic and fire performance for every envelope.", "drywall-systems": "Complete framing and lining systems that install with confidence.", ceilings: "Acoustic and visual ceiling systems for working interiors.", "fire-protection": "Passive protection that helps keep people and buildings safe.", plasters: "Base coats, finishes and compounds for smooth, durable surfaces." } as const;

export default function CategoriesPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto flex max-w-350 flex-col gap-6 px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
            <Badge variant="outline" className="w-fit">Browse the range</Badge>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">Materials for the way buildings are built now.</h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">Explore the Nordkern catalogue by material family, performance requirement or the work happening on site.</p>
            <Button nativeButton={false} className="w-fit" render={<Link href="/products" />}>View full catalogue <ArrowUpRight data-icon="inline-end" /></Button>
          </div>
        </section>
        <section className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map(({ slug }) => {
              const Icon = categoryIcons[slug];
              const count = PRODUCTS.filter((product) => product.category === slug).length;
              return <Link key={slug} href={`/products?category=${slug}`} className="group flex min-h-72 flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-foreground/25 hover:shadow-lg">
                <div className="flex items-start justify-between"><span className="grid size-12 place-items-center rounded-xl bg-muted text-foreground group-hover:bg-brand group-hover:text-brand-foreground"><Icon aria-hidden="true" /></span><ArrowUpRight className="text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" /></div>
                <div><p className="mb-2 text-sm text-muted-foreground">{String(count).padStart(2, "0")} products</p><h2 className="text-2xl font-semibold tracking-tight">{categoryLabel(slug)}</h2><p className="mt-3 max-w-xs leading-6 text-muted-foreground">{categoryDescriptions[slug]}</p></div>
              </Link>;
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
