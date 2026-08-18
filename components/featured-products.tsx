import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    name: "CoreBoard 12.5 Standard",
    category: "Plasterboard",
    price: "€8.40",
    unit: "per sheet",
    image: "/images/product-plasterboard.png",
    href: "/products",
    tag: "Best seller",
  },
  {
    name: "ThermRoll Mineral Wool 100mm",
    category: "Insulation",
    price: "€24.90",
    unit: "per roll",
    image: "/images/product-insulation.png",
    href: "/products",
    tag: null,
  },
  {
    name: "SetPro Finishing Plaster 25kg",
    category: "Plasters & finishes",
    price: "€12.10",
    unit: "per bag",
    image: "/images/product-plaster.png",
    href: "/products",
    tag: null,
  },
  {
    name: "Acoustic Ceiling Tile 600×600",
    category: "Ceilings",
    price: "€6.75",
    unit: "per tile",
    image: "/images/product-ceiling.png",
    href: "/products",
    tag: "New",
  },
];

export function FeaturedProducts() {
  return (
    <section className="w-full border-b border-border">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Featured products
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              A small sample of what the trade is ordering this week.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
          >
            See all products
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                {product.tag ? (
                  <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">
                    {product.tag}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col p-4">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {product.category}
                </span>
                <h3 className="mt-1 font-medium leading-snug text-foreground">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-baseline gap-1.5 pt-4">
                  <span className="text-lg font-semibold text-foreground">
                    {product.price}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {product.unit}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
