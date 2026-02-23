import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!webhookSecret || !stripeKey || !sig) {
    console.error("Webhook not configured:", {
      hasSecret: !!webhookSecret,
      hasKey: !!stripeKey,
      hasSig: !!sig,
    });
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeKey);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      console.log("PURCHASE_VERIFIED", {
        session_id: session.id,
        customer_email: session.customer_details?.email,
        amount: session.amount_total,
        currency: session.currency,
        timestamp: new Date().toISOString(),
      });
    }
  }

  return NextResponse.json({ received: true });
}
