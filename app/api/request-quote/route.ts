import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getProductById } from "@/lib/products";

const sender = "knauf@pratikgaikwad.tech";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { productId?: string; email?: string; message?: string };
    const email = body.email?.trim();
    const product = body.productId ? getProductById(body.productId) : null;
    if (!product || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid quote request" }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: sender,
      to: email,
      subject: `Your quote request for ${product.name}`,
      text: `Thanks for requesting a quote for ${product.name}. Our team will be in touch shortly.${body.message?.trim() ? `\n\nYour request:\n${body.message.trim()}` : ""}`,
      html: `<p>Thanks for requesting a quote for <strong>${product.name}</strong>.</p><p>Our team will be in touch shortly.</p>${body.message?.trim() ? `<p><strong>Your request:</strong><br />${body.message.trim().replaceAll("\n", "<br />")}</p>` : ""}`,
    });
    if (result.error) return NextResponse.json({ error: "Email could not be sent" }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to process quote request" }, { status: 500 });
  }
}
