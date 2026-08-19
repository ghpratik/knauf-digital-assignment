import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Nordkern home"
      className={cn(
        "group inline-flex items-center gap-2.5 font-sans text-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="relative grid size-8 place-items-center rounded-md bg-foreground text-background"
      >
        <span className="size-3.5 rotate-45 rounded-[3px] bg-brand transition-transform duration-300 group-hover:rotate-135" />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Nord<span className="text-brand">kern</span>
      </span>
    </Link>
  );
}
