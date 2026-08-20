import { describe, expect, it } from "vitest";
import { PRODUCTS, categoryLabel } from "@/lib/data";
import {
  MAX_COMPARE,
  PRICE_BOUNDS,
  getProductById,
  getProductsByIds,
  getRelatedProducts,
  queryProducts,
  toCard,
} from "@/lib/products";

describe("product query layer", () => {
  it("projects a product into a catalogue card", () => {
    const product = PRODUCTS[0];
    const card = toCard(product);

    expect(card).toEqual({
      id: product.id,
      name: product.name,
      category: product.category,
      categoryLabel: categoryLabel(product.category),
      applicationAreas: product.applicationAreas,
      fireRating: product.fireRating,
      rValue: product.rValue,
      price: product.price,
      unit: product.unit,
      image: product.image,
      tag: product.tag,
      shortDescription: product.shortDescription,
    });
    expect(card).not.toHaveProperty("overview");
  });

  it("searches product text, category labels, and applications case-insensitively", () => {
    const categoryResult = queryProducts({
      search: "PLASTERBOARD",
      limit: 100,
    });
    const applicationResult = queryProducts({ search: "ceilings", limit: 100 });

    expect(categoryResult.products.length).toBeGreaterThan(0);
    expect(
      categoryResult.products.every(
        (product) =>
          `${product.name} ${product.categoryLabel}`
            .toLowerCase()
            .includes("plasterboard") ||
          product.applicationAreas.some((area) =>
            area.toLowerCase().includes("plasterboard"),
          ),
      ),
    ).toBe(true);
    expect(applicationResult.products.length).toBeGreaterThan(0);
  });

  it("combines category, application, fire, sustainability, and price filters", () => {
    const product = PRODUCTS.find((item) => item.compliance.hpd) ?? PRODUCTS[0];
    const result = queryProducts({
      category: product.category,
      applicationArea: product.applicationAreas[0],
      fireRating: product.fireRating,
      hasEPD: true,
      hasHPD: product.compliance.hpd ? true : undefined,
      minPrice: product.price,
      maxPrice: product.price,
      limit: 100,
    });

    expect(result.products.map((item) => item.id)).toContain(product.id);
    expect(
      result.products.every(
        (item) =>
          item.category === product.category &&
          item.fireRating === product.fireRating &&
          item.price === product.price,
      ),
    ).toBe(true);
  });

  it("sorts by price and name and paginates with safe bounds", () => {
    const ascending = queryProducts({ sort: "price-asc", limit: 4 });
    const descending = queryProducts({ sort: "price-desc", limit: 4 });
    const names = queryProducts({ sort: "name-asc", limit: 100 });
    const lastPage = queryProducts({ page: 999, limit: 4 });

    expect(ascending.products.map((item) => item.price)).toEqual(
      [...ascending.products.map((item) => item.price)].sort((a, b) => a - b),
    );
    expect(descending.products.map((item) => item.price)).toEqual(
      [...descending.products.map((item) => item.price)].sort((a, b) => b - a),
    );
    expect(names.products.map((item) => item.name)).toEqual(
      [...names.products.map((item) => item.name)].sort((a, b) =>
        a.localeCompare(b),
      ),
    );
    expect(lastPage.pagination.page).toBe(lastPage.pagination.totalPages);
    expect(lastPage.pagination.limit).toBe(4);
  });

  it("handles empty results and invalid pagination inputs", () => {
    const empty = queryProducts({ search: "no such nordkern product" });
    const invalid = queryProducts({ page: 0, limit: 0 });

    expect(empty.products).toEqual([]);
    expect(empty.pagination.total).toBe(0);
    expect(empty.pagination.totalPages).toBe(1);
    expect(invalid.pagination.page).toBe(1);
    expect(invalid.pagination.limit).toBe(1);
  });
});

describe("product and comparison helpers", () => {
  it("finds products and returns no result for an unknown id", () => {
    expect(getProductById(PRODUCTS[0].id)).toEqual(PRODUCTS[0]);
    expect(getProductById("missing-product")).toBeUndefined();
  });

  it("returns related products from the same category without the source product", () => {
    const source = PRODUCTS[0];
    const related = getRelatedProducts(source.id, 2);

    expect(related).toHaveLength(
      Math.min(
        2,
        PRODUCTS.filter((item) => item.category === source.category).length - 1,
      ),
    );
    expect(
      related.every(
        (item) => item.category === source.category && item.id !== source.id,
      ),
    ).toBe(true);
    expect(getRelatedProducts("missing-product")).toEqual([]);
  });

  it("preserves comparison order, drops unknown ids, and supports the three-item cap", () => {
    const ids = [
      PRODUCTS[2].id,
      "missing-product",
      PRODUCTS[0].id,
      PRODUCTS[1].id,
      PRODUCTS[3].id,
    ];
    const result = getProductsByIds(ids.slice(0, MAX_COMPARE));

    expect(result.map((item) => item.id)).toEqual([
      PRODUCTS[2].id,
      PRODUCTS[0].id,
    ]);
    expect(MAX_COMPARE).toBe(3);
    expect(PRICE_BOUNDS.min).toBe(
      Math.floor(Math.min(...PRODUCTS.map((item) => item.price))),
    );
    expect(PRICE_BOUNDS.max).toBe(
      Math.ceil(Math.max(...PRODUCTS.map((item) => item.price))),
    );
  });
});
