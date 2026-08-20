"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Check, TriangleAlert, X } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { useCompare } from "@/lib/compare-context";
import { MAX_COMPARE } from "@/lib/products";
import { categoryLabel, type Product } from "@/lib/data";

type CompareResult = { products: Product[] };

const fetcher = async (url: string): Promise<CompareResult> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

// Rows that come from fixed product fields (not the free-form spec table).
const CORE_ROWS: {
  label: string;
  render: (p: Product) => React.ReactNode;
}[] = [
  { label: "Category", render: (p) => categoryLabel(p.category) },
  {
    label: "Indicative price",
    render: (p) => `${formatPrice(p.price)} ${p.unit}`,
  },
  { label: "Fire rating", render: (p) => p.fireRating },
  {
    label: "R-value",
    render: (p) => (p.rValue !== null ? `${p.rValue.toFixed(2)} m²K/W` : "—"),
  },
  {
    label: "Application areas",
    render: (p) => p.applicationAreas.join(", "),
  },
  {
    label: "EPD available",
    render: (p) => <BoolCell value={p.compliance.epd} />,
  },
  {
    label: "HPD available",
    render: (p) => <BoolCell value={p.compliance.hpd} />,
  },
  {
    label: "Fire certification",
    render: (p) => <BoolCell value={p.compliance.fireCertification} />,
  },
  {
    label: "CE marked",
    render: (p) => <BoolCell value={p.compliance.ceMarked} />,
  },
];

function BoolCell({ value }: { value: boolean }) {
  return value ? (
    <span className="inline-flex items-center gap-1 text-foreground">
      <Check className="size-3.5 text-brand" aria-hidden="true" /> Yes
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-muted-foreground">
      <X className="size-3.5" aria-hidden="true" /> No
    </span>
  );
}

export function CompareView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { remove } = useCompare();

  const idsParam = searchParams.get("ids") ?? "";
  const ids = idsParam
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean)
    .slice(0, MAX_COMPARE);

  const { data, error, isLoading } = useSWR(
    ids.length > 0 ? `/api/products/compare?ids=${ids.join(",")}` : null,
    fetcher,
  );

  function removeFromUrl(id: string) {
    remove(id);
    const remaining = ids.filter((i) => i !== id);
    if (remaining.length > 0) {
      router.push(`/products/compare?ids=${remaining.join(",")}`);
    } else {
      router.push("/products/compare");
    }
  }

  if (ids.length === 0) {
    return <EmptyState />;
  }

  if (isLoading) {
    return <CompareSkeleton count={ids.length} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-16 text-center">
        <TriangleAlert
          className="size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="font-medium text-foreground">
          Couldn&apos;t load comparison
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Something went wrong loading these products. Try again.
        </p>
      </div>
    );
  }

  const products = data?.products ?? [];

  if (products.length === 0) {
    return <EmptyState />;
  }

  if (products.length === 1) {
    return (
      <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card py-16 text-center">
        <p className="font-medium text-foreground">
          Add one more product to compare
        </p>
        <p className="max-w-sm text-sm text-muted-foreground">
          You&apos;ve selected one product. Comparison needs at least two.
        </p>
        <div className="w-full max-w-xs">
          <ProductCard
            product={{
              ...products[0],
              categoryLabel: categoryLabel(products[0].category),
            }}
          />
        </div>
        <Link
          href="/products"
          className="text-sm font-medium text-brand hover:underline"
        >
          Browse the catalog
        </Link>
      </div>
    );
  }

  // Union of every spec label present across the selected products, in
  // first-seen order — different categories have different spec sheets, so
  // a row is left blank ("—") for products that don't define it, rather
  // than only showing specs common to all of them.
  const specLabels: string[] = [];
  for (const product of products) {
    for (const spec of product.specifications) {
      if (!specLabels.includes(spec.label)) specLabels.push(spec.label);
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-separate border-spacing-0">
        <caption className="sr-only">
          Side-by-side comparison of {products.length} products
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-40" />
            {products.map((p) => (
              <th
                key={p.id}
                scope="col"
                className="border-b border-border px-3 pb-4 text-left align-top font-normal"
              >
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/products/${p.id}`}
                    className="group flex flex-col gap-2"
                  >
                    <div className="relative aspect-square w-full max-w-32 overflow-hidden rounded-lg border border-border bg-muted">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform group-hover:scale-[1.03]"
                      />
                    </div>
                    <span className="text-sm font-semibold leading-snug text-foreground group-hover:underline">
                      {p.name}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeFromUrl(p.id)}
                    aria-label={`Remove ${p.name} from comparison`}
                    className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CORE_ROWS.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}
            >
              <th
                scope="row"
                className="px-3 py-3 text-left text-sm font-medium text-muted-foreground"
              >
                {row.label}
              </th>
              {products.map((p) => (
                <td key={p.id} className="px-3 py-3 text-sm text-foreground">
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}

          <tr>
            <th
              colSpan={products.length + 1}
              scope="colgroup"
              className="border-t border-border px-3 pb-2 pt-6 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"
            >
              Full technical specifications
            </th>
          </tr>
          {specLabels.map((label, i) => (
            <tr key={label} className={i % 2 === 0 ? "bg-card" : "bg-muted/40"}>
              <th
                scope="row"
                className="px-3 py-3 text-left text-sm font-medium text-muted-foreground"
              >
                {label}
              </th>
              {products.map((p) => {
                const spec = p.specifications.find((s) => s.label === label);
                return (
                  <td key={p.id} className="px-3 py-3 text-sm text-foreground">
                    {spec ? (
                      spec.value
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card py-16 text-center">
      <p className="font-medium text-foreground">Nothing to compare yet</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Select two or three products from the catalog using the scale icon on
        each product card, then come back here.
      </p>
      <Link
        href="/products"
        className="mt-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
      >
        Browse the catalog
      </Link>
    </div>
  );
}

function CompareSkeleton({ count }: { count: number }) {
  return (
    <div className="flex gap-4 overflow-x-auto">
      {Array.from({ length: Math.max(count, 2) }).map((_, i) => (
        <div
          key={i}
          className="h-96 w-48 shrink-0 animate-pulse rounded-xl bg-muted"
        />
      ))}
    </div>
  );
}
