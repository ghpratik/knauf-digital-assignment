"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const popular = ["Plasterboard", "Insulation", "Fire protection", "Screed"];

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function goToSearch(term: string) {
    const q = term.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  }

  return (
    <div className="w-full max-w-2xl">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          goToSearch(query);
        }}
        className="group flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm transition-colors focus-within:border-brand/70"
      >
        <div className="grid size-11 shrink-0 place-items-center text-muted-foreground">
          <Search className="size-5" aria-hidden="true" />
        </div>
        <label htmlFor="hero-search" className="sr-only">
          Search the Nordkern catalog
        </label>
        <input
          id="hero-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, systems or specs…"
          className="h-11 w-full min-w-0 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="h-11 shrink-0 rounded-lg bg-brand px-5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          Search
        </button>
      </form>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-muted-foreground">Popular:</span>
        {popular.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => goToSearch(term)}
            className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
