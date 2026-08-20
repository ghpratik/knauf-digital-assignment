import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { SystemsTeaser } from "@/components/systems-teaser";
import { FeaturedProducts } from "@/components/featured-products";
import { CtaBand } from "@/components/cta-band";
import { SiteFooter } from "@/components/site-footer";
import { MarketingOverview } from "@/components/marketing-overview";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <CategoryGrid />
        <SystemsTeaser />
        <FeaturedProducts />
        <MarketingOverview />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
