import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Ruler, ShieldCheck, Volume2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const solutions = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Fire-safe construction",
    text: "Build tested compartmentation into walls, ceilings and service zones from the first drawing.",
    image: "/images/product-fireboard.png",
    accent: "A calm, documented route to compliance.",
  },
  {
    icon: Volume2,
    number: "02",
    title: "Acoustic comfort",
    text: "Create calmer homes, workplaces and learning environments with coordinated systems.",
    image: "/images/product-insulation.png",
    accent: "Design for the way a space should feel.",
  },
  {
    icon: Ruler,
    number: "03",
    title: "Faster fit-out",
    text: "Move from specification to installation with compatible products and clear details.",
    image: "/images/product-profile.png",
    accent: "Fewer gaps between the drawing and the build.",
  },
];

export default function SolutionsPage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border bg-muted/30">
          <div className="mx-auto grid max-w-350 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20 lg:px-10 lg:py-24">
            <div>
              <Badge variant="outline">Solutions for better builds</Badge>
              <h1 className="mt-6 max-w-3xl text-balance text-5xl font-semibold tracking-tight sm:text-7xl">
                Performance is a system, not a single product.
              </h1>
            </div>
            <div className="lg:pb-2">
              <p className="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
                From early design intent to the final fix, Nordkern brings
                materials, systems and technical thinking together.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-foreground">
                {[
                  "Tested assemblies",
                  "Practical guidance",
                  "Clear documentation",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="size-4 text-brand" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-350 px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Choose your performance brief
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with the challenge.
              </h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm leading-6 text-muted-foreground md:block">
              Useful routes for the decisions that shape comfort, safety and
              speed on site.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {solutions.map(
              ({ icon: Icon, number, title, text, image, accent }) => (
                <article
                  key={title}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[1.35] overflow-hidden bg-muted">
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background">
                      {number}
                    </span>
                  </div>
                  <div className="p-6">
                    <Icon className="size-6 text-brand" aria-hidden="true" />
                    <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-3 leading-6 text-muted-foreground">
                      {text}
                    </p>
                    <p className="mt-8 border-t border-border pt-4 text-sm font-medium text-foreground">
                      {accent}
                    </p>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>

        <section className="border-y border-border bg-foreground text-background">
          <div className="mx-auto flex max-w-350 flex-col gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
                Start with the right system
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Find a coordinated route from brief to build.
              </h2>
            </div>
            <Button
              nativeButton={false}
              className="w-fit"
              render={<Link href="/categories" />}
            >
              Explore categories <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
