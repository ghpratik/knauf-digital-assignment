import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/lib/data";
import { GET as getProducts } from "@/app/api/products/route";
import { GET as compareProducts } from "@/app/api/products/compare/route";

async function json(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

describe("GET /api/products", () => {
  it("returns paginated catalogue results", async () => {
    const response = await getProducts(
      new Request(
        "http://localhost/api/products?limit=2&page=2&sort=price-asc",
      ),
    );
    const body = await json(response);
    const pagination = body.pagination as {
      page: number;
      limit: number;
      total: number;
    };
    const products = body.products as unknown[];

    expect(response.status).toBe(200);
    expect(products).toHaveLength(2);
    expect(pagination).toMatchObject({
      page: 2,
      limit: 2,
      total: PRODUCTS.length,
    });
  });

  it("maps filters and boolean flags into the product query", async () => {
    const response = await getProducts(
      new Request(
        "http://localhost/api/products?category=plasterboard&hasEPD=true&minPrice=8&maxPrice=9",
      ),
    );
    const body = await json(response);
    const products = body.products as Array<{
      category: string;
      price: number;
    }>;

    expect(response.status).toBe(200);
    expect(products.length).toBeGreaterThan(0);
    expect(
      products.every(
        (product) =>
          product.category === "plasterboard" &&
          product.price >= 8 &&
          product.price <= 9,
      ),
    ).toBe(true);
  });

  it("ignores malformed numeric query values instead of failing the request", async () => {
    const response = await getProducts(
      new Request(
        "http://localhost/api/products?page=not-a-number&limit=not-a-number",
      ),
    );
    const body = await json(response);
    const pagination = body.pagination as { page: number; limit: number };

    expect(response.status).toBe(200);
    expect(pagination).toMatchObject({ page: 1, limit: 9 });
  });
});

describe("GET /api/products/compare", () => {
  it("returns products in requested order and ignores unknown ids", async () => {
    const response = await compareProducts(
      new Request(
        `http://localhost/api/products/compare?ids=${PRODUCTS[1].id},missing,${PRODUCTS[0].id}`,
      ),
    );
    const body = await json(response);
    const products = body.products as Array<{ id: string }>;

    expect(response.status).toBe(200);
    expect(products.map((product) => product.id)).toEqual([
      PRODUCTS[1].id,
      PRODUCTS[0].id,
    ]);
  });

  it("caps comparison requests at three products", async () => {
    const ids = PRODUCTS.slice(0, 5)
      .map((product) => product.id)
      .join(",");
    const response = await compareProducts(
      new Request(`http://localhost/api/products/compare?ids=${ids}`),
    );
    const body = await json(response);

    expect(response.status).toBe(200);
    expect(body.products as unknown[]).toHaveLength(3);
  });
});
