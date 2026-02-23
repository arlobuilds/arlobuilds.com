"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AccessIssueContent() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const reasonMessages: Record<string, string> = {
    config:
      "We're setting up your access. This usually resolves within a few minutes.",
    verification:
      "We couldn't verify your purchase right away. This can happen if there's a brief delay with our payment processor.",
    unpaid:
      "It looks like your payment hasn't completed yet. If you just checked out, it may take a moment to process.",
    error:
      "Something went wrong while verifying your purchase. Don't worry — your payment is safe.",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/recover-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.redirect) {
        window.location.href = data.redirect;
        return;
      }

      setStatus("error");
      setMessage(
        data.message ||
          "No purchase found for this email. If you just paid, try again in a minute."
      );
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again or contact support.");
    }
  };

  return (
    <div className="mission-control dot-grid min-h-screen flex flex-col">
      <div className="top-glow" />

      <header className="relative z-10 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-mono)] text-sm text-[var(--mc-muted)] hover:text-[var(--mc-text)]"
        >
          ArloBuilds
        </Link>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="panel p-8 space-y-6">
            <div className="text-center">
              <div className="font-[family-name:var(--font-mono)] text-2xl text-[var(--mc-yellow)] mb-3">
                !
              </div>
              <h1 className="text-xl font-bold mb-2">Access Issue</h1>
              {reason && reasonMessages[reason] && (
                <p className="text-sm text-[var(--mc-muted)]">
                  {reasonMessages[reason]}
                </p>
              )}
            </div>

            <div className="border-t border-[var(--mc-border)] pt-6">
              <h2 className="text-sm font-semibold mb-3">
                Recover your access
              </h2>
              <p className="text-xs text-[var(--mc-muted)] mb-4">
                Enter the email you used at checkout and we&apos;ll look up your
                purchase.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--mc-base)] border border-[var(--mc-border)] text-sm text-[var(--mc-text)] placeholder:text-[var(--mc-dim)] focus:outline-none focus:border-[var(--mc-blue)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-4 py-2.5 rounded-lg bg-[var(--mc-blue)] text-[var(--mc-base)] font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {status === "loading" ? "Looking up..." : "Recover access"}
                </button>
              </form>

              {status === "error" && message && (
                <p className="text-xs text-[var(--mc-red,#ef4444)] mt-3">
                  {message}
                </p>
              )}
            </div>

            <div className="border-t border-[var(--mc-border)] pt-4 text-center">
              <p className="text-xs text-[var(--mc-dim)]">
                Still having trouble?{" "}
                <a
                  href="mailto:support@arlobuilds.com"
                  className="text-[var(--mc-blue)] hover:underline"
                >
                  support@arlobuilds.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AccessIssuePage() {
  return (
    <Suspense
      fallback={
        <div className="mission-control dot-grid min-h-screen flex items-center justify-center">
          <p className="text-[var(--mc-muted)]">Loading...</p>
        </div>
      }
    >
      <AccessIssueContent />
    </Suspense>
  );
}
