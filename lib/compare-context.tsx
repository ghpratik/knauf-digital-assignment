"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MAX_COMPARE } from "@/lib/products";

// Lightweight enough to store directly (and persist), so the floating
// compare bar can render thumbnails without an extra fetch. The compare
// page itself still fetches full product records from the API — this is
// just what's needed to show a chip/thumbnail while browsing.
export type CompareItem = {
  id: string;
  name: string;
  image: string;
  categoryLabel: string;
};

type CompareContextValue = {
  items: CompareItem[];
  isSelected: (id: string) => boolean;
  toggle: (item: CompareItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  atLimit: boolean;
};

const CompareContext = createContext<CompareContextValue | null>(null);

const STORAGE_KEY = "nordkern:compare";

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount only, so server and first client
  // render match (avoids a hydration mismatch warning).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // One-time sync from an external store (localStorage) on mount —
        // this is the documented exception to "don't setState in an
        // effect": we can't read localStorage during SSR, so the first
        // client render is intentionally empty and corrected here.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setItems(parsed.slice(0, MAX_COMPARE));
      }
    } catch {
      // Corrupt or inaccessible storage — start empty rather than crash.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage full or unavailable (private browsing) — selection just
      // won't persist across a reload, which is a fine degradation.
    }
  }, [items, hydrated]);

  const isSelected = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items],
  );

  const toggle = useCallback((item: CompareItem) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) return prev.filter((p) => p.id !== item.id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      isSelected,
      toggle,
      remove,
      clear,
      atLimit: items.length >= MAX_COMPARE,
    }),
    [items, isSelected, toggle, remove, clear],
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return ctx;
}
