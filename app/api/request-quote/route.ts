import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getProductById } from "@/lib/products";

const sender = "knauf@pratikgaikwad.tech";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productId?: string;
      email?: string;
      message?: string;
    };
    const email = body.email?.trim();
    const product = body.productId ? getProductById(body.productId) : null;
    if (!product || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid quote request" },
        { status: 400 },
      );
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 503 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: sender,
      to: email,
      subject: `Your quote request for ${product.name}`,
      text: `Thanks for requesting a quote for ${product.name}. Our team will be in touch shortly.${body.message?.trim() ? `\n\nYour request:\n${body.message.trim()}` : ""}`,
      html: `
          <div style="margin:0; padding:40px 20px; background-color:#f6f6f6; font-family:Arial,Helvetica,sans-serif; color:#171717;">
            <div style="max-width:560px; margin:0 auto; background:#ffffff; border:1px solid #e5e5e5; border-radius:8px; overflow:hidden;">
              
              <div style="padding:28px 32px; border-bottom:1px solid #e5e5e5;">
                <h1 style="margin:0; font-size:20px; line-height:1.4; font-weight:600; color:#171717;">
                  Quote Request Received
                </h1>
              </div>

              <div style="padding:28px 32px;">
                <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#404040;">
                  Thanks for requesting a quote for
                  <strong style="color:#171717;">${product.name}</strong>.
                </p>

                <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#404040;">
                  We've received your request and our team will be in touch with you shortly.
                </p>

                ${
                  body.message?.trim()
                    ? `
                      <div style="padding:16px 18px; background:#f7f7f7; border:1px solid #e5e5e5; border-radius:6px;">
                        <p style="margin:0 0 8px; font-size:13px; font-weight:600; color:#171717;">
                          Your request
                        </p>
                        <p style="margin:0; font-size:14px; line-height:1.6; color:#525252; white-space:normal;">
                          ${body.message.trim().replaceAll("\n", "<br />")}
                        </p>
                      </div>
                    `
                    : ""
                }
              </div>

              <div style="padding:20px 32px; background:#fafafa; border-top:1px solid #e5e5e5;">
                <p style="margin:0; font-size:12px; line-height:1.5; color:#737373;">
                  This is an automated confirmation that we've received your quote request.
                </p>
              </div>

            </div>
          </div>
        `,
    });
    if (result.error)
      return NextResponse.json(
        { error: "Email could not be sent" },
        { status: 502 },
      );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to process quote request" },
      { status: 500 },
    );
  }
}
