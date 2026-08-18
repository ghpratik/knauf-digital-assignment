import { NextResponse } from "next/server";
import { getProductById, getRelatedProducts } from "@/lib/products";

// GET /api/products/[id]
// Returns the complete product plus related items.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      product,
      relatedProducts: getRelatedProducts(id),
    });
  } catch (error) {
    console.error("[v0] /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to load product." },
      { status: 500 },
    );
  }
}
