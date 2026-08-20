import { NextResponse } from "next/server";
import { getProductsByIds, MAX_COMPARE } from "@/lib/products";

// GET /api/products/compare?ids=a,b,c
// Returns full product records (not card projections) for a set of ids, in
// the order supplied. Unknown ids are silently dropped — a stale
// localStorage entry or a hand-edited URL shouldn't error the page out.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const raw = searchParams.get("ids") ?? "";

    const ids = raw
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean)
      .slice(0, MAX_COMPARE);

    const products = getProductsByIds(ids);
    return NextResponse.json({ products });
  } catch (error) {
    console.error("[v0] /api/products/compare error:", error);
    return NextResponse.json(
      { error: "Failed to load comparison." },
      { status: 500 },
    );
  }
}
