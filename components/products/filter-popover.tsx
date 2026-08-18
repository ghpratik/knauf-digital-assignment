"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type FilterPopoverProps = {
  label: string;
  active?: boolean;
  valueLabel?: string | null;
  children: (close: () => void) => ReactNode;
};

export function FilterPopover({
  label,
  active = false,
  valueLabel,
  children,
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
          active
            ? "border-brand/60 bg-brand/10 text-foreground"
            : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground"
        }`}
      >
        <span>{label}</span>
        {active && valueLabel ? (
          <span className="max-w-[120px] truncate font-semibold text-foreground">
            · {valueLabel}
          </span>
        ) : null}
        <ChevronDown
          className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <div className="absolute left-0 top-[calc(100%+0.5rem)] z-40 w-60 rounded-xl border border-border bg-popover p-2 shadow-lg">
          {children(() => setOpen(false))}
        </div>
      ) : null}
    </div>
  );
}
