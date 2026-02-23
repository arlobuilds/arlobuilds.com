import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check for access cookie
  if (request.cookies.has("playbook_access")) {
    return NextResponse.next();
  }

  // Check for session_id (post-checkout redirect from Stripe)
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (sessionId) {
    // Redirect to verify API which will validate with Stripe and set cookie
    const verifyUrl = new URL("/api/verify-purchase", request.url);
    verifyUrl.searchParams.set("session_id", sessionId);
    return NextResponse.redirect(verifyUrl);
  }

  // No cookie, no session_id → redirect to sales page
  return NextResponse.redirect(new URL("/agent-playbook", request.url));
}

export const config = {
  matcher: "/agent-playbook/guide/:path*",
};
