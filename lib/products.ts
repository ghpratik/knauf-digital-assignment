// -----------------------------------------------------------------------------
// Nordkern product catalog — query layer.
// This module is the single source of truth for the API route handlers.
// I am using dummy data from data.ts, but in a real app this would be the place to query a database or call an external API.
// -----------------------------------------------------------------------------

import {
  categoryLabel,
  Product,
  ProductCard,
  PRODUCTS,
  SortOption,
} from "./data";

// ---------------------------------------------------------------------------
// Query layer
// ---------------------------------------------------------------------------

export type ProductQuery = {
  search?: string;
  category?: string;
  applicationArea?: string;
  fireRating?: string;
  hasEPD?: boolean;
  hasHPD?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  page?: number;
  limit?: number;
};

export type ProductListResult = {
  products: ProductCard[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export function toCard(p: Product): ProductCard {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    categoryLabel: categoryLabel(p.category),
    applicationAreas: p.applicationAreas,
    fireRating: p.fireRating,
    rValue: p.rValue,
    price: p.price,
    unit: p.unit,
    image: p.image,
    tag: p.tag,
    shortDescription: p.shortDescription,
  };
}

export function queryProducts(query: ProductQuery): ProductListResult {
  const {
    search,
    category,
    applicationArea,
    fireRating,
    hasEPD,
    hasHPD,
    minPrice,
    maxPrice,
    sort = "relevance",
    page = 1,
    limit = 9,
  } = query;

  let result = [...PRODUCTS];

  if (search) {
    const term = search.trim().toLowerCase();
    result = result.filter((p) =>
      [
        p.name,
        p.shortDescription,
        categoryLabel(p.category),
        ...p.applicationAreas,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }

  if (category) {
    result = result.filter((p) => p.category === category);
  }

  if (applicationArea) {
    result = result.filter((p) =>
      p.applicationAreas.some(
        (a) => a.toLowerCase() === applicationArea.toLowerCase(),
      ),
    );
  }

  if (fireRating) {
    result = result.filter((p) => p.fireRating === fireRating);
  }

  if (hasEPD) {
    result = result.filter((p) => p.compliance.epd);
  }

  if (hasHPD) {
    result = result.filter((p) => p.compliance.hpd);
  }

  if (typeof minPrice === "number" && !Number.isNaN(minPrice)) {
    result = result.filter((p) => p.price >= minPrice);
  }

  if (typeof maxPrice === "number" && !Number.isNaN(maxPrice)) {
    result = result.filter((p) => p.price <= maxPrice);
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  const total = result.length;
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safeLimit;
  const paginated = result.slice(start, start + safeLimit);

  return {
    products: paginated.map(toCard),
    pagination: { page: safePage, limit: safeLimit, total, totalPages },
  };
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// Compare feature — capped at 3 so the comparison table stays readable on
// a laptop screen without horizontal scrolling.
export const MAX_COMPARE = 3;

// Returns full products (not card projections) for the given ids, in the
// order the ids were supplied, silently dropping unknown ids rather than
// throwing — a stale localStorage id or an edited URL shouldn't break the
// compare page.
export function getProductsByIds(ids: string[]): Product[] {
  const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
  return ids
    .map((id) => byId.get(id))
    .filter((p): p is Product => p !== undefined);
}

export function getRelatedProducts(id: string, count = 3): ProductCard[] {
  const product = getProductById(id);
  if (!product) return [];
  return PRODUCTS.filter((p) => p.id !== id && p.category === product.category)
    .slice(0, count)
    .map(toCard);
}

export const PRICE_BOUNDS = {
  min: Math.floor(Math.min(...PRODUCTS.map((p) => p.price))),
  max: Math.ceil(Math.max(...PRODUCTS.map((p) => p.price))),
};
