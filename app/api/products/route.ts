import { NextResponse } from "next/server";
import { queryProducts, type ProductQuery, type SortOption } from "@/lib/products";

// GET /api/products
// Handles search, filtering, sorting and pagination in the data layer.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const num = (key: string): number | undefined => {
      const raw = searchParams.get(key);
      if (raw === null || raw.trim() === "") return undefined;
      const parsed = Number(raw);
      return Number.isNaN(parsed) ? undefined : parsed;
    };

    const query: ProductQuery = {
      search: searchParams.get("search") ?? undefined,
      category: searchParams.get("category") ?? undefined,
      applicationArea: searchParams.get("applicationArea") ?? undefined,
      fireRating: searchParams.get("fireRating") ?? undefined,
      hasEPD: searchParams.get("hasEPD") === "true" ? true : undefined,
      hasHPD: searchParams.get("hasHPD") === "true" ? true : undefined,
      minPrice: num("minPrice"),
      maxPrice: num("maxPrice"),
      sort: (searchParams.get("sort") as SortOption | null) ?? undefined,
      page: num("page"),
      limit: num("limit"),
    };

    const result = queryProducts(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[v0] /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to load products." },
      { status: 500 },
    );
  }
}
