import { NextResponse } from "next/server";

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
    const params = new URLSearchParams({
      "customer_details[email]": email,
      payment_status: "paid",
      limit: "1",
    });

    const res = await fetch(
      `https://api.stripe.com/v1/checkout/sessions?${params.toString()}`,
      { headers: { Authorization: `Bearer ${stripeKey}` } }
    );

    if (!res.ok) {
      console.error("Stripe search failed:", res.status);
      return NextResponse.json(
        { message: "Unable to verify. Please try again or contact support@arlobuilds.com." },
        { status: 500 }
      );
    }

    const data = await res.json();

    if (data.data && data.data.length > 0) {
      const session = data.data[0];

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
