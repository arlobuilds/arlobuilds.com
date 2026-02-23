import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Agent Playbook — Build Autonomous AI Agent Systems",
  description:
    "The exact architecture, communication protocols, and scheduling patterns behind a 7-agent AI system that runs a real business. $29 one-time.",
  openGraph: {
    title: "The Agent Playbook — Build Autonomous AI Agent Systems",
    description:
      "Learn how to build a multi-agent AI system that operates autonomously. SOUL files, queue messaging, scheduling, memory, and more.",
    type: "website",
    url: "https://arlobuilds.com/agent-playbook",
    images: [{ url: "/og/home.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@allinwithcursor",
    title: "The Agent Playbook — Build Autonomous AI Agent Systems",
    description:
      "The exact architecture behind a 7-agent AI system that runs a real business.",
    images: ["/og/home.png"],
  },
};

const chapters = [
  {
    num: "01",
    title: "Architecture Overview",
    desc: "The 7-agent model: who does what, how they coordinate, and why this structure works.",
  },
  {
    num: "02",
    title: "SOUL Files",
    desc: "Give AI agents identity, operating loops, decision authority, and hard guardrails.",
  },
  {
    num: "03",
    title: "Communication Protocol",
    desc: "Queue-based JSON messaging with TTLs, routing rules, and dependency chains.",
  },
  {
    num: "04",
    title: "Scheduling & Triggers",
    desc: "Usage-tiered cron scheduling that throttles agents based on API quota consumption.",
  },
  {
    num: "05",
    title: "Shared Memory",
    desc: "How agents share context, track projects, log bottlenecks, and consolidate knowledge.",
  },
  {
    num: "06",
    title: "Watchdog & Recovery",
    desc: "Heartbeat monitoring, TTL enforcement, crash recovery, and auto-escalation.",
  },
  {
    num: "07",
    title: "Monetization",
    desc: "Stripe integration, budget pools, cost tracking, and the path from $0 to revenue.",
  },
  {
    num: "08",
    title: "Lessons Learned",
    desc: "What broke, what we'd change, and the patterns that actually matter at scale.",
  },
];

const proofPoints = [
  { stat: "7", label: "Autonomous agents" },
  { stat: "195", label: "Messages processed Day 1" },
  { stat: "6", label: "Products shipped in 24h" },
  { stat: "$0", label: "Human labor cost" },
];

export default function AgentPlaybookLanding() {
  return (
    <div className="mission-control dot-grid min-h-screen flex flex-col">
      <div className="top-glow" />

      {/* NAV */}
      <nav className="shrink-0 border-b border-[var(--mc-border)] bg-[var(--mc-base)]/90 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="status-dot" />
            <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[var(--mc-text)] tracking-wide">
              ARLOBUILDS
            </span>
          </Link>
          <a
            href="https://buy.stripe.com/7sY00ldqvfQo2H7fv50RG00"
            className="text-[13px] font-semibold px-4 py-1.5 rounded bg-[var(--mc-green)] text-[var(--mc-base)] hover:brightness-110 transition-all"
          >
            Get the Playbook — $29
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-16 text-center fade-in">
        <div className="inline-block mb-6">
          <span className="tag text-[var(--mc-amber)]">NEW GUIDE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold leading-[1.15] tracking-tight mb-6">
          The Agent Playbook
        </h1>
        <p className="text-lg sm:text-xl text-[var(--mc-muted)] leading-relaxed max-w-2xl mx-auto mb-4">
          The exact architecture, communication protocols, and scheduling
          patterns behind a{" "}
          <span className="text-[var(--mc-text)] font-medium">
            7-agent AI system
          </span>{" "}
          that runs a real business.
        </p>
        <p className="text-[var(--mc-dim)] text-sm mb-10">
          Not theory. Not a framework tutorial. The actual system powering
          ArloBuilds — documented, explained, and ready to replicate.
        </p>
        <a
          href="https://buy.stripe.com/7sY00ldqvfQo2H7fv50RG00"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[var(--mc-green)] text-[var(--mc-base)] font-semibold text-base hover:brightness-110 transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        >
          Get instant access — $29
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
            className="opacity-70"
          >
            <path
              d="M3.33 8h9.34M8.67 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <p className="text-[var(--mc-dim)] text-xs mt-3">
          One-time payment. Instant access. No subscription.
        </p>
      </section>

      {/* PROOF POINTS */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {proofPoints.map((p) => (
            <div key={p.label} className="panel p-4 text-center">
              <div className="text-2xl font-bold text-[var(--mc-text)] font-[family-name:var(--font-mono)]">
                {p.stat}
              </div>
              <div className="text-xs text-[var(--mc-muted)] mt-1">
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold mb-2 text-center">
          What&apos;s inside
        </h2>
        <p className="text-[var(--mc-muted)] text-center text-sm mb-10">
          8 chapters. Real code. Real architecture. No filler.
        </p>
        <div className="space-y-3">
          {chapters.map((ch) => (
            <div
              key={ch.num}
              className="panel p-5 flex gap-4 items-start hover:border-[var(--mc-border-bright)] transition-colors"
            >
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--mc-blue)] font-bold shrink-0 mt-0.5">
                {ch.num}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--mc-text)] text-[15px]">
                  {ch.title}
                </h3>
                <p className="text-sm text-[var(--mc-muted)] mt-1">
                  {ch.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY THIS GUIDE */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <div className="panel p-8">
          <h2 className="text-xl font-bold mb-4">
            Why this guide exists
          </h2>
          <div className="space-y-4 text-sm text-[var(--mc-muted)] leading-relaxed">
            <p>
              Most &quot;AI agent&quot; content is either toy demos or enterprise
              whitepapers. Neither helps you build a real system that runs
              autonomously.
            </p>
            <p>
              ArloBuilds runs on a 7-agent system built with Claude Code. On Day
              1, these agents processed{" "}
              <span className="text-[var(--mc-text)]">195 messages</span>,
              shipped{" "}
              <span className="text-[var(--mc-text)]">
                6 production websites
              </span>
              , scheduled{" "}
              <span className="text-[var(--mc-text)]">
                24 social media posts
              </span>
              , ran keyword research, wrote SEO content, caught and fixed
              production bugs — all without a human touching the keyboard.
            </p>
            <p>
              This guide documents every architectural decision, every
              communication protocol, every failure mode and recovery pattern.
              You get the blueprints, not a sales pitch.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold mb-6 text-center">
          Built for builders
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: "{}",
              title: "AI Developers",
              desc: "Want to orchestrate multiple AI agents without a heavy framework.",
            },
            {
              icon: ">>",
              title: "Indie Hackers",
              desc: "Looking to automate business operations with AI agents.",
            },
            {
              icon: "//",
              title: "Technical Founders",
              desc: "Need a proven architecture for production agent systems.",
            },
          ].map((p) => (
            <div key={p.title} className="panel p-5 text-center">
              <div className="font-[family-name:var(--font-mono)] text-lg text-[var(--mc-blue)] mb-2">
                {p.icon}
              </div>
              <h3 className="font-semibold text-sm mb-1">{p.title}</h3>
              <p className="text-xs text-[var(--mc-muted)]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-24 text-center">
        <div className="panel p-10 border-[var(--mc-border-bright)]">
          <h2 className="text-2xl font-bold mb-3">
            Get The Agent Playbook
          </h2>
          <p className="text-[var(--mc-muted)] text-sm mb-6 max-w-lg mx-auto">
            8 chapters of production-tested architecture. The same system
            running ArloBuilds right now. Instant access after purchase.
          </p>
          <div className="mb-4">
            <span className="text-3xl font-bold text-[var(--mc-text)]">
              $29
            </span>
            <span className="text-[var(--mc-dim)] text-sm ml-2">one-time</span>
          </div>
          <a
            href="https://buy.stripe.com/7sY00ldqvfQo2H7fv50RG00"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[var(--mc-green)] text-[var(--mc-base)] font-semibold text-base hover:brightness-110 transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)]"
          >
            Get instant access
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 16 16"
              className="opacity-70"
            >
              <path
                d="M3.33 8h9.34M8.67 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <p className="text-[var(--mc-dim)] text-xs mt-4">
            Powered by Stripe. Secure checkout. Instant delivery.
          </p>
          <p className="text-[var(--mc-dim)] text-xs mt-2">
            Questions?{" "}
            <a
              href="mailto:support@arlobuilds.com"
              className="text-[var(--mc-muted)] hover:text-[var(--mc-text)] underline"
            >
              support@arlobuilds.com
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[var(--mc-border)] py-6">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--mc-dim)]">
          <span>ArloBuilds 2026</span>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-[var(--mc-text)]">
              Home
            </Link>
            <Link
              href="/mcp-servers"
              className="hover:text-[var(--mc-text)]"
            >
              MCP Servers
            </Link>
            <Link
              href="/ai-prompt-library"
              className="hover:text-[var(--mc-text)]"
            >
              Prompt Library
            </Link>
            <a
              href="mailto:support@arlobuilds.com"
              className="hover:text-[var(--mc-text)]"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
