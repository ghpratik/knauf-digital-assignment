import { afterEach, describe, expect, it, vi } from "vitest";
import { PRODUCTS } from "@/lib/data";

const { send } = vi.hoisted(() => ({ send: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send };
  },
}));

import { POST } from "@/app/api/request-quote/route";

afterEach(() => {
  send.mockReset();
  delete process.env.RESEND_API_KEY;
});

function request(body: unknown) {
  return new Request("http://localhost/api/request-quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function json(response: Response) {
  return response.json() as Promise<Record<string, unknown>>;
}

describe("POST /api/request-quote", () => {
  it("rejects an unknown product or invalid email", async () => {
    const response = await POST(
      request({ productId: "missing-product", email: "not-an-email" }),
    );

    expect(response.status).toBe(400);
    expect(await json(response)).toEqual({ error: "Invalid quote request" });
    expect(send).not.toHaveBeenCalled();
  });

  it("reports missing email configuration after validating the request", async () => {
    const response = await POST(
      request({ productId: PRODUCTS[0].id, email: "buyer@example.com" }),
    );

    expect(response.status).toBe(503);
    expect(await json(response)).toEqual({
      error: "Email service is not configured",
    });
    expect(send).not.toHaveBeenCalled();
  });

  it("sends a confirmation email for a valid quote request", async () => {
    process.env.RESEND_API_KEY = "test-key";
    send.mockResolvedValue({ data: { id: "email-id" }, error: null });

    const response = await POST(
      request({
        productId: PRODUCTS[0].id,
        email: " buyer@example.com ",
        message: "Need pricing for 100 sheets",
      }),
    );
    const body = await json(response);

    expect(response.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "buyer@example.com",
        subject: expect.stringContaining(PRODUCTS[0].name),
        text: expect.stringContaining("Need pricing for 100 sheets"),
      }),
    );
  });

  it("returns a gateway error when the email provider rejects the send", async () => {
    process.env.RESEND_API_KEY = "test-key";
    send.mockResolvedValue({
      data: null,
      error: { message: "provider failure" },
    });

    const response = await POST(
      request({ productId: PRODUCTS[0].id, email: "buyer@example.com" }),
    );

    expect(response.status).toBe(502);
    expect(await json(response)).toEqual({ error: "Email could not be sent" });
  });
});
