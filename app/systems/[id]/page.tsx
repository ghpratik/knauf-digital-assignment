import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Mail, ShieldAlert } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/products/product-card";
import { toCard } from "@/lib/products";
import {
  SYSTEMS,
  getSystemById,
  getSystemProducts,
} from "@/lib/systems";

export function generateStaticParams() {
  return SYSTEMS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const system = getSystemById(id);
  if (!system) return { title: "System not found — Nordkern" };
  return {
    title: `${system.name} — Nordkern`,
    description: system.tagline,
  };
}

export default async function SystemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const system = getSystemById(id);

  if (!system) notFound();

  const products = getSystemProducts(system);
  const cards = products.map(toCard);

  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <div className="mx-auto w-full max-w-350 px-4 py-8 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/systems" className="hover:text-foreground">
                  Systems &amp; solutions
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">
                {system.name}
              </li>
            </ol>
          </nav>

          <Link
            href="/systems"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All systems
          </Link>

          {/* Overview */}
          <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-muted lg:order-2">
              <Image
                src={system.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="lg:order-1">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Building system · {products.length} products
              </span>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {system.name}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {system.description}
              </p>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <a
                  href={`mailto:knauf@pratikgaikwad.tech?subject=${encodeURIComponent(
                    `Enquiry: ${system.name}`,
                  )}&body=${encodeURIComponent(
                    `Hi Nordkern,\n\nI'd like more information on the ${system.name}.\n\n`,
                  )}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  Enquire about this system
                </a>
              </div>
            </div>
          </section>

          {/* Use cases + fire rating note */}
          <section className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Typical use cases
              </h2>
              <ul className="flex flex-col gap-2.5">
                {system.useCases.map((useCase) => (
                  <li
                    key={useCase}
                    className="flex items-start gap-2.5 text-sm text-foreground"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-brand"
                      aria-hidden="true"
                    />
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>

            {system.fireRatingNote ? (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <ShieldAlert className="size-4" aria-hidden="true" />
                  Fire performance
                </h2>
                <p className="text-sm leading-relaxed text-foreground">
                  {system.fireRatingNote}
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border p-5 text-sm leading-relaxed text-muted-foreground">
                Component-level fire ratings are listed on each product
                below. This system has not been tested as a rated assembly.
              </div>
            )}
          </section>

          {/* What's in this system */}
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              What&apos;s in this system
            </h2>
            <p className="mt-2 text-muted-foreground">
              {products.length} components, specified and ordered together.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <ProductCard key={card.id} product={card} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
