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

  if (!sessionId) {
    return NextResponse.redirect(new URL("/agent-playbook", origin));
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.error("STRIPE_SECRET_KEY not configured — buyer cannot get access");
    const errorUrl = new URL("/agent-playbook/access-issue", origin);
    errorUrl.searchParams.set("reason", "config");
    return NextResponse.redirect(errorUrl);
  }

  try {
    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    );

    if (!res.ok) {
      console.error("Stripe verification failed:", res.status);
      const errorUrl = new URL("/agent-playbook/access-issue", origin);
      errorUrl.searchParams.set("reason", "verification");
      errorUrl.searchParams.set("session_id", sessionId);
      return NextResponse.redirect(errorUrl);
    }

    const session = await res.json();

    if (session.payment_status !== "paid") {
      console.error("Payment not completed:", session.payment_status);
      const errorUrl = new URL("/agent-playbook/access-issue", origin);
      errorUrl.searchParams.set("reason", "unpaid");
      return NextResponse.redirect(errorUrl);
    }

    console.log("PURCHASE_REDIRECT_VERIFIED", {
      session_id: session.id,
      customer_email: session.customer_details?.email,
      timestamp: new Date().toISOString(),
    });

    const response = NextResponse.redirect(
      new URL("/agent-playbook/guide", origin)
    );
    response.cookies.set("playbook_access", sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error("Stripe verification error:", error);
    const errorUrl = new URL("/agent-playbook/access-issue", origin);
    errorUrl.searchParams.set("reason", "error");
    return NextResponse.redirect(errorUrl);
  }
}
