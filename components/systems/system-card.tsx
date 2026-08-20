import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers } from "lucide-react";
import type { BuildingSystem } from "@/lib/systems";
import { getSystemProducts, getSystemCategoryLabels } from "@/lib/systems";

export function SystemCard({ system }: { system: BuildingSystem }) {
  const componentCount = getSystemProducts(system).length;
  const categories = getSystemCategoryLabels(system);

  return (
    <Link
      href={`/systems/${system.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src={system.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
          <Layers className="size-3" aria-hidden="true" />
          {componentCount} products
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug text-foreground">
            {system.name}
          </h3>
          <ArrowUpRight
            className="mt-1 size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {system.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {categories.map((label) => (
            <span
              key={label}
              className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
