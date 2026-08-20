import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/data";

const categories = [
  {
    name: "Plasterboard",
    href: "/products?category=plasterboard",
    image: "/images/product-plasterboard.png",
    slug: "plasterboard",
  },
  {
    name: "Insulation",
    href: "/products?category=insulation",
    image: "/images/product-insulation.png",
    slug: "insulation",
  },
  {
    name: "Drywall systems",
    href: "/products?category=drywall-systems",
    image: "/images/product-profile.png",
    slug: "drywall-systems",
  },
  {
    name: "Ceilings",
    href: "/products?category=ceilings",
    image: "/images/product-ceiling.png",
    slug: "ceilings",
  },
  {
    name: "Fire protection",
    href: "/products?category=fire-protection",
    image: "/images/product-fireboard.png",
    slug: "fire-protection",
  },
  {
    name: "Plasters & finishes",
    href: "/products?category=plasters",
    image: "/images/product-plaster.png",
    slug: "plasters",
  },
];

export function CategoryGrid() {
  return (
    <section
      id="categories"
      className="w-full border-b border-border bg-muted/40 scroll-mt-16"
    >
      <div className="mx-auto w-full max-w-350 px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Shop by category
          </h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Jump straight to the system you&apos;re working with.
          </p>
        </div>
        <Link
          href="/categories"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-brand hover:text-brand-foreground"
        >
          Explore all categories
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {categories.slice(0, 3).map(({ name, href, image, slug }) => (
            <Link
              key={name}
              href={href}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
            >
              <div className="relative aspect-[1.35] overflow-hidden bg-muted">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-card/90 text-foreground opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-medium text-foreground">{name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {
                    PRODUCTS.filter((product) => product.category === slug)
                      .length
                  }{" "}
                  products
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
