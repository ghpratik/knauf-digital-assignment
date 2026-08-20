import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Check,
  Download,
  FileText,
  Leaf,
  ShieldCheck,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/products/product-card";
import { CompareButtonToggle } from "@/components/products/compare-toggle";
import {
  PRODUCTS,
  categoryLabel,
  getProductById,
  getRelatedProducts,
} from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product not found — Nordkern" };
  return {
    title: `${product.name} — Nordkern`,
    description: product.shortDescription,
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const related = getRelatedProducts(id);
  const compliance = [
    { label: "EPD available", value: product.compliance.epd },
    { label: "HPD available", value: product.compliance.hpd },
    { label: "Fire certification", value: product.compliance.fireCertification },
    { label: "CE marked", value: product.compliance.ceMarked },
  ];

  return (
    <>
      <SiteHeader />
      <main className="w-full">
        <div className="mx-auto w-full max-w-350 px-4 py-8 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-foreground">
                  Products
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/products?category=${product.category}`}
                  className="hover:text-foreground"
                >
                  {categoryLabel(product.category)}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground">{product.name}</li>
            </ol>
          </nav>

          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to catalog
          </Link>

          {/* Overview */}
          <section aria-labelledby="product-overview" className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.tag ? (
                <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                  {product.tag}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col">
              <h2 id="product-overview" className="sr-only">
                Overview
              </h2>
              <span className="text-sm font-medium uppercase tracking-wide text-brand">
                {categoryLabel(product.category)}
              </span>
              <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {product.overview}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-sm font-medium text-foreground">
                  Fire rating: {product.fireRating}
                </span>
                {product.rValue !== null ? (
                  <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-sm font-medium text-foreground">
                    R-value: {product.rValue.toFixed(2)} m²K/W
                  </span>
                ) : null}
              </div>

              <div className="mt-8 flex items-end justify-between gap-4 rounded-xl border border-border bg-card p-5">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-semibold text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.unit}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Excl. VAT · Trade pricing on request
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  <CompareButtonToggle
                    item={{
                      id: product.id,
                      name: product.name,
                      image: product.image,
                      categoryLabel: categoryLabel(product.category),
                    }}
                  />
                  <button
                    type="button"
                    className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    Request quote
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Detail sections */}
          <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col gap-12">
              {/* Technical specifications */}
              <Section title="Technical specifications">
                <dl className="overflow-hidden rounded-xl border border-border">
                  {product.specifications.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex items-center justify-between gap-4 px-4 py-3 ${
                        i % 2 === 0 ? "bg-card" : "bg-muted/40"
                      }`}
                    >
                      <dt className="text-sm text-muted-foreground">
                        {spec.label}
                      </dt>
                      <dd className="text-sm font-medium text-foreground">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Section>

              {/* Applications */}
              <Section title="Applications & installation">
                <ul className="flex flex-col gap-3">
                  {product.applications.map((app) => (
                    <li key={app} className="flex items-start gap-3">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                        <Check className="size-3.5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground">
                        {app}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Install in accordance with the Nordkern system specification
                  and local building regulations. Refer to the documents below
                  for detailed fixing centres and system build-ups.
                </p>
              </Section>
            </div>

            <div className="flex flex-col gap-12">
              {/* Compliance & sustainability */}
              <Section title="Compliance & sustainability">
                <ul className="flex flex-col gap-2.5">
                  {compliance.map((item) => (
                    <li
                      key={item.label}
                      className="flex items-center gap-3 text-sm"
                    >
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full ${
                          item.value
                            ? "bg-brand/10 text-brand"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.value ? (
                          <Check className="size-3.5" aria-hidden="true" />
                        ) : (
                          <X className="size-3.5" aria-hidden="true" />
                        )}
                      </span>
                      <span
                        className={
                          item.value
                            ? "text-foreground"
                            : "text-muted-foreground line-through"
                        }
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Leaf className="size-4 text-brand" aria-hidden="true" />
                    Sustainability
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {product.sustainability.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ShieldCheck
                          className="mt-0.5 size-4 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>

              {/* Documents */}
              <Section title="Documents">
                <ul className="flex flex-col gap-2">
                  {product.documents.map((doc) => (
                    <li key={doc.name}>
                      <a
                        href="#"
                        className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-foreground/30"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-foreground">
                          <FileText className="size-4" aria-hidden="true" />
                        </span>
                        <span className="flex-1">
                          <span className="block text-sm font-medium text-foreground">
                            {doc.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {doc.type} · {doc.size}
                          </span>
                        </span>
                        <Download
                          className="size-4 text-muted-foreground transition-colors group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </Section>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 ? (
            <section className="mt-16 border-t border-border pt-12">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Related products
              </h2>
              <p className="mt-2 text-muted-foreground">
                More from {categoryLabel(product.category)}.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 border-b border-border pb-3 text-lg font-semibold text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
