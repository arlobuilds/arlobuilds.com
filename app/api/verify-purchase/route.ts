import { NextResponse } from "next/server";

function getOrigin(request: Request): string {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    new URL(request.url).host;
  const proto = request.headers.get("x-forwarded-proto") || "https";
  return `${proto}://${host}`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const origin = getOrigin(request);
  const sessionId = url.searchParams.get("session_id");
  const salesPage = new URL("/agent-playbook", origin);

  if (!sessionId) {
    return NextResponse.redirect(salesPage);
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY not configured");
    return NextResponse.redirect(salesPage);
  }

  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    );

    if (!res.ok) {
      return NextResponse.redirect(salesPage);
    }

    const session = await res.json();

    if (session.payment_status !== "paid") {
      return NextResponse.redirect(salesPage);
    }

    // Payment verified — set cookie and redirect to guide
    const response = NextResponse.redirect(
      new URL("/agent-playbook/guide", origin)
    );
    response.cookies.set("playbook_access", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60, // 1 year
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Stripe verification error:", error);
    return NextResponse.redirect(salesPage);
  }
}
