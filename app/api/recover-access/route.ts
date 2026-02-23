import { NextResponse } from "next/server";
import Stripe from "stripe";

function getOrigin(request: Request): string {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    new URL(request.url).host;
  const proto = request.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export async function POST(request: Request) {
  const origin = getOrigin(request);

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json(
      { message: "Please provide an email address." },
      { status: 400 }
    );
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY not configured for access recovery");
    return NextResponse.json(
      {
        message:
          "We're still setting things up. Please try again in a few minutes or contact support@arlobuilds.com.",
      },
      { status: 503 }
    );
  }

  try {
    const stripe = new Stripe(stripeKey);

    const sessions = await stripe.checkout.sessions.list({
      customer_details: { email },
      status: "complete",
      limit: 1,
    });

    if (sessions.data.length > 0) {
      const session = sessions.data[0];

      console.log("ACCESS_RECOVERED", {
        session_id: session.id,
        customer_email: email,
        timestamp: new Date().toISOString(),
      });

      const response = NextResponse.json({ redirect: "/agent-playbook/guide" });
      response.cookies.set("playbook_access", session.id, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60,
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      {
        message:
          "No purchase found for this email. If you just paid, it may take a few minutes to process. Try again shortly or contact support@arlobuilds.com.",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error("Recovery error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please contact support@arlobuilds.com." },
      { status: 500 }
    );
  }
}
