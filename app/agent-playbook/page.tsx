import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-static";

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
        <p className="text-[var(--mc-dim)] text-xs mt-1.5">
          30-day money-back guarantee. Not happy? Full refund, no questions asked.
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
        <p className="text-[var(--mc-muted)] text-center text-sm mb-2">
          8 chapters. Real code. Real architecture. No filler.
        </p>
        <p className="text-[var(--mc-dim)] text-center text-xs mb-10">
          Delivered as a web-based guide. ~15,000 words covering architecture, code samples, and operational patterns.
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

      {/* PREVIEW */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold mb-6 text-center">
          Preview: Chapter 01
        </h2>
        <div className="panel p-6 border-[var(--mc-border-bright)]">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--mc-blue)] mb-3">
            ARCHITECTURE OVERVIEW
          </p>
          <div className="text-sm text-[var(--mc-muted)] leading-relaxed space-y-3">
            <p>
              The system uses 7 specialized agents, each with a SOUL file that
              defines identity, decision authority, communication rules, and hard
              guardrails. No agent has full-stack authority — each owns a domain
              and communicates through a shared queue.
            </p>
            <p>
              The Entrepreneur agent sits at the top. It reads the north star
              metric, reviews all agent outputs, assigns tasks, and makes
              resource allocation decisions. It doesn&apos;t build anything — it
              coordinates. The Coder, Content, Marketer, Sidehustle, QA, and
              Support agents each have specific mandates and autonomy rules...
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--mc-border)] text-center">
            <p className="text-xs text-[var(--mc-dim)]">
              This is a small excerpt. The full chapter covers agent roles, communication topology, session lifecycle, and failure modes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold mb-6 text-center">
          Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "What format is the playbook?",
              a: "A web-based guide you access instantly after purchase. No PDF downloads or email drip — just open and read.",
            },
            {
              q: "Is this just ChatGPT wrapper content?",
              a: "No. This documents a real production system running right now. Every pattern, protocol, and architecture decision comes from building and operating a 7-agent system that ships real products.",
            },
            {
              q: "Do I get updates?",
              a: "Yes. As the system evolves, the guide updates. You get lifetime access to all future revisions.",
            },
            {
              q: "What if I want a refund?",
              a: "30-day money-back guarantee, no questions asked. Email support@arlobuilds.com and you'll get a full refund.",
            },
            {
              q: "Can I share it with my team?",
              a: "The purchase is a single-user license. Need team access? Email support@arlobuilds.com for team pricing.",
            },
          ].map((faq) => (
            <div key={faq.q} className="panel p-5">
              <h3 className="font-semibold text-sm text-[var(--mc-text)] mb-2">
                {faq.q}
              </h3>
              <p className="text-sm text-[var(--mc-muted)]">{faq.a}</p>
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
          <p className="text-[var(--mc-dim)] text-xs mt-1.5">
            30-day money-back guarantee. Not happy? Full refund, no questions asked.
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
