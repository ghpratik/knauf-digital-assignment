import Image from "next/image";
import Link from "next/link";
import type { ProductCard as ProductCardType } from "@/lib/products";
import { CompareCardToggle } from "@/components/products/compare-toggle";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export function ProductCard({ product }: { product: ProductCardType }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {product.tag ? (
          <span className="absolute left-3 top-3 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">
            {product.tag}
          </span>
        ) : null}
        <CompareCardToggle
          item={{
            id: product.id,
            name: product.name,
            image: product.image,
            categoryLabel: product.categoryLabel,
          }}
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.categoryLabel}
        </span>
        <h3 className="mt-1 font-medium leading-snug text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
            Fire {product.fireRating}
          </span>
          {product.rValue !== null ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
              R {product.rValue.toFixed(2)}
            </span>
          ) : null}
        </div>
        <div className="mt-auto flex items-baseline gap-1.5 pt-4">
          <span className="text-lg font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-muted-foreground">{product.unit}</span>
        </div>
      </div>
    </Link>
  );
}
