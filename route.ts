import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

export const runtime = "nodejs";

// Starter checkout route. Before production, load product prices from Supabase,
// validate inventory, persist a pending order server-side, and add rate limiting.
export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured. Add STRIPE_SECRET_KEY." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const items = body.items as Array<{ productId: string; quantity: number }>;
    if (!Array.isArray(items) || items.length === 0 || items.length > 30) {
      return NextResponse.json({ error: "Invalid cart." }, { status: 400 });
    }

    const lineItems: Parameters<typeof stripe.checkout.sessions.create>[0]["line_items"] = [];
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return NextResponse.json({ error: "Invalid product or quantity." }, { status: 400 });
      }
      lineItems!.push({
        quantity,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(product.price * 100),
          product_data: { name: product.name, description: product.description }
        }
      });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) return NextResponse.json({ error: "NEXT_PUBLIC_SITE_URL is not configured." }, { status: 503 });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?checkout=cancelled`
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Could not create checkout session." }, { status: 400 });
  }
}