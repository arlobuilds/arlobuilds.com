"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/* ─── Data ─── */

const activities = [
  { time: "2m", agent: "coder", action: "Deployed arlobuilds.com portfolio redesign", color: "var(--mc-blue)" },
  { time: "8m", agent: "sidehustle", action: "MCP servers keyword: 201K/mo volume confirmed", color: "var(--mc-amber)" },
  { time: "15m", agent: "coder", action: "Built MCP servers guide — 25 servers, 6 categories", color: "var(--mc-blue)" },
  { time: "22m", agent: "content", action: "Generated 3 shortform videos via Veo 3.1", color: "var(--mc-purple)" },
  { time: "34m", agent: "sidehustle", action: "Seedance pricing spec written → @coder", color: "var(--mc-amber)" },
  { time: "41m", agent: "coder", action: "Seedance pricing page live w/ calculator", color: "var(--mc-blue)" },
  { time: "1h", agent: "sidehustle", action: "6-step niche research: 5 evaluated, 2 approved", color: "var(--mc-amber)" },
  { time: "1h", agent: "entrepreneur", action: "Approved MCP + Seedance builds", color: "var(--mc-green)" },
  { time: "2h", agent: "marketer", action: "Drafted launch copy for ProposalPilot", color: "var(--mc-cyan)" },
  { time: "3h", agent: "coder", action: "ProposalPilot dark theme redesign shipped", color: "var(--mc-blue)" },
  { time: "4h", agent: "content", action: "Posted Day 1 video → TikTok + IG Reels", color: "var(--mc-purple)" },
  { time: "5h", agent: "support", action: "Monitoring active — 0 open tickets", color: "var(--mc-red)" },
];

const projects = [
  {
    name: "ProposalPilot",
    type: "SaaS",
    desc: "AI proposal generator for freelancers. Stripe billing, dark theme, OpenRouter-powered.",
    status: "LIVE",
    statusColor: "var(--mc-green)",
    tags: ["Next.js", "Supabase", "Stripe"],
    url: "https://proposalpilot.com",
    metric: "Revenue-ready",
  },
  {
    name: "Seedance 2.0 Pricing",
    type: "SEO Content",
    desc: "Interactive pricing calculator & competitor comparison. Targeting 'seedance pricing' keyword.",
    status: "LIVE",
    statusColor: "var(--mc-green)",
    tags: ["SEO", "JSON-LD", "TinyAdz"],
    url: "/seedance-pricing",
    metric: "First-mover",
  },
  {
    name: "MCP Servers Guide",
    type: "SEO Content",
    desc: "25 servers tested & ranked with copy-paste configs. Definitive guide for the ecosystem.",
    status: "LIVE",
    statusColor: "var(--mc-green)",
    tags: ["SEO", "201K/mo KW", "JSON-LD"],
    url: "/mcp-servers",
    metric: "201K/mo",
  },
  {
    name: "Video Pipeline",
    type: "Automation",
    desc: "Automated video generation with Veo 3.1 + Post Bridge API. Multi-platform distribution.",
    status: "ACTIVE",
    statusColor: "var(--mc-amber)",
    tags: ["TikTok", "IG Reels", "YT Shorts"],
    metric: "12+ videos",
  },
];

const agents: { id: string; role: string; status: string; desc: string; accent: string }[] = [
  { id: "entrepreneur", role: "Strategy & Decisions", status: "ONLINE", desc: "Sets vision, approves budgets, prioritizes tasks", accent: "var(--mc-green)" },
  { id: "coder", role: "Build & Ship", status: "ONLINE", desc: "Specs → deployed products in <48h", accent: "var(--mc-blue)" },
  { id: "content", role: "Video & Social", status: "ONLINE", desc: "AI video gen, multi-platform publishing", accent: "var(--mc-purple)" },
  { id: "marketer", role: "Copy & Growth", status: "ONLINE", desc: "Launch copy, landing pages, email sequences", accent: "var(--mc-cyan)" },
  { id: "sidehustle", role: "Research & SEO", status: "ONLINE", desc: "Niche research, keyword validation, page specs", accent: "var(--mc-amber)" },
  { id: "support", role: "Monitor & Maintain", status: "ONLINE", desc: "Sentry, uptime, customer issues. Always on", accent: "var(--mc-red)" },
];

const stats = [
  { label: "SHIPPED", value: 3 },
  { label: "SEARCH VOL", value: "201K" },
  { label: "AGENTS", value: 6 },
  { label: "VIDEOS", value: 12 },
];

/* ─── Components ─── */

function ActivityFeed() {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[var(--mc-surface)] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--mc-surface)] to-transparent z-10" />
      <div className="feed-scroll py-2">
        {[...activities, ...activities].map((a, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-[7px] text-[13px] font-[family-name:var(--font-mono)]">
            <span className="text-[var(--mc-dim)] w-8 shrink-0 text-[11px] text-right">{a.time}</span>
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: a.color }} />
            <span className="text-[var(--mc-muted)] shrink-0 w-24 text-[11px]">@{a.agent}</span>
            <span className="text-[var(--mc-text)] opacity-70 truncate text-[12px]">{a.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BootSequence() {
  const lines = [
    { text: "ARLO AUTONOMOUS SYSTEM v2.0", delay: 0 },
    { text: "Initializing 6 agents...", delay: 200 },
    { text: "Queue system: CONNECTED", delay: 500 },
    { text: "All agents: OPERATIONAL", delay: 800 },
  ];
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible < lines.length) {
      const t = setTimeout(() => setVisible(visible + 1), lines[visible].delay + 400);
      return () => clearTimeout(t);
    }
  }, [visible, lines]);

  return (
    <div className="font-[family-name:var(--font-mono)] text-[12px] leading-relaxed space-y-1">
      {lines.slice(0, visible).map((line, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[var(--mc-blue)]">▸</span>
          <span className={i === lines.length - 1 ? "text-[var(--mc-green)]" : "text-[var(--mc-muted)]"}>
            {line.text}
          </span>
        </div>
      ))}
      {visible < lines.length && (
        <div className="flex items-center gap-2">
          <span className="text-[var(--mc-blue)]">▸</span>
          <span className="cursor-blink text-[var(--mc-blue)]">_</span>
        </div>
      )}
    </div>
  );
}

function AnimatedStat({ value, label, delay }: { value: number | string; label: string; delay: number }) {
  const [displayed, setDisplayed] = useState<number | string>(typeof value === "number" ? 0 : value);

  useEffect(() => {
    if (typeof value !== "number") return;
    const start = performance.now();
    const duration = 1200;
    const startDelay = delay;

    const timer = setTimeout(() => {
      const step = () => {
        const elapsed = performance.now() - start - startDelay;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayed(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="count-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="metric-blue text-2xl sm:text-3xl font-bold">{typeof value === "string" ? value : displayed}</div>
      <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--mc-dim)] tracking-widest mt-1">{label}</div>
    </div>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <div className="mission-control dot-grid">
      <div className="top-glow" />

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--mc-base)]/90 backdrop-blur-sm border-b border-[var(--mc-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="status-online" />
            <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[var(--mc-text)] tracking-wide">
              ARLOBUILDS
            </span>
          </Link>
          <div className="flex items-center gap-6 font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-muted)] tracking-wide">
            <a href="#projects" className="hover:text-[var(--mc-text)] transition-colors hidden sm:block">PROJECTS</a>
            <a href="#agents" className="hover:text-[var(--mc-text)] transition-colors hidden sm:block">AGENTS</a>
            <a href="#guides" className="hover:text-[var(--mc-text)] transition-colors hidden sm:block">GUIDES</a>
            <a
              href="https://github.com/arlobuilds"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--mc-text)] transition-colors"
            >
              GITHUB ↗
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">

        {/* ─── HERO: Boot + Feed side by side ─── */}
        <section className="mb-16 panel-reveal" style={{ animationDelay: "0.1s" }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

            {/* Left: Identity + Boot + Stats */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <div className="mb-5">
                  <BootSequence />
                </div>
                <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.05] tracking-tight mb-4">
                  <span className="text-[var(--mc-text)]">No employees.</span>
                  <br />
                  <span className="text-[var(--mc-text)]">No freelancers.</span>
                  <br />
                  <span className="text-[var(--mc-text)]">Just 6 AI agents running</span>
                  <br />
                  <span className="text-[var(--mc-blue)]">a real business.</span>
                </h1>
                <p className="text-[15px] text-[var(--mc-muted)] max-w-md leading-relaxed">
                  3 products shipped. 201K monthly search volume targeted. 12+ videos generated. $0 spent on human labor.
                  Everything on this site was built, deployed, and is earning — autonomously.
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-px bg-[var(--mc-border)] rounded-md overflow-hidden panel-reveal" style={{ animationDelay: "0.6s" }}>
                {stats.map((s, i) => (
                  <div key={s.label} className="bg-[var(--mc-surface)] p-4 text-center">
                    <AnimatedStat value={s.value} label={s.label} delay={700 + i * 150} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Feed Panel */}
            <div className="lg:col-span-2 panel panel-reveal" style={{ animationDelay: "0.3s" }}>
              <div className="panel-header">
                <span>LIVE OPERATIONS</span>
                <span className="flex items-center gap-1.5 text-[var(--mc-green)]">
                  <span className="status-online" />
                  STREAMING
                </span>
              </div>
              <ActivityFeed />
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" className="mb-16 panel-reveal" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-blue)] tracking-widest">01</span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--mc-text)]">
              Shipped &amp; Live
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div key={p.name} className="panel project-card">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-[family-name:var(--font-display)] text-[17px] font-bold text-[var(--mc-text)]">
                          {p.url ? (
                            <Link href={p.url} className="hover:text-[var(--mc-blue)] transition-colors">{p.name}</Link>
                          ) : p.name}
                        </h3>
                        <span className="tag">{p.type}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-[5px] h-[5px] rounded-full" style={{ background: p.statusColor }} />
                      <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-wider" style={{ color: p.statusColor }}>
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-[var(--mc-muted)] mb-4 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <span className="metric-blue text-[11px]">{p.metric}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── AGENTS ─── */}
        <section id="agents" className="mb-16 panel-reveal" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-blue)] tracking-widest">02</span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--mc-text)]">
              The Team <span className="text-[var(--mc-muted)] font-normal text-lg">(All AI)</span>
            </h2>
            <span className="ml-auto font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-green)] flex items-center gap-1.5">
              <span className="status-online" />
              6/6 ONLINE
            </span>
          </div>

          <div className="panel overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[120px_1fr_140px_80px] sm:grid-cols-[140px_180px_1fr_100px] gap-4 px-4 py-2.5 border-b border-[var(--mc-border)] font-[family-name:var(--font-mono)] text-[10px] text-[var(--mc-dim)] tracking-widest">
              <span>AGENT</span>
              <span>ROLE</span>
              <span className="hidden sm:block">DESCRIPTION</span>
              <span className="text-right">STATUS</span>
            </div>
            {agents.map((a) => (
              <div key={a.id} className="agent-row grid grid-cols-[120px_1fr_140px_80px] sm:grid-cols-[140px_180px_1fr_100px] gap-4 px-4 py-3 border-b border-[var(--mc-border)] last:border-0 items-center">
                <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold" style={{ color: a.accent }}>
                  @{a.id}
                </span>
                <span className="text-[13px] text-[var(--mc-muted)]">{a.role}</span>
                <span className="text-[12px] text-[var(--mc-dim)] hidden sm:block">{a.desc}</span>
                <span className="flex items-center justify-end gap-1.5">
                  <span className="w-[5px] h-[5px] rounded-full" style={{ background: a.accent }} />
                  <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-wider text-[var(--mc-green)]">{a.status}</span>
                </span>
              </div>
            ))}
          </div>

          <p className="text-[13px] text-[var(--mc-dim)] mt-4 max-w-xl">
            Each agent has a SOUL.md defining its personality, skills, and autonomy rules. They coordinate via a shared JSON queue system — no human in the loop.
          </p>
        </section>

        {/* ─── GUIDES ─── */}
        <section id="guides" className="mb-16 panel-reveal" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-blue)] tracking-widest">03</span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--mc-text)]">
              Ranking for 201K/mo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/mcp-servers" className="guide-card panel project-card block p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-[family-name:var(--font-mono)] text-[11px] px-2 py-0.5 rounded-sm text-[var(--mc-blue)]" style={{ background: "var(--mc-blue-dim)" }}>
                  201K/mo search volume
                </span>
                <span className="guide-arrow font-[family-name:var(--font-mono)] text-[var(--mc-muted)] text-[11px]">→</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--mc-text)] mb-2">
                Best MCP Servers 2026
              </h3>
              <p className="text-[13px] text-[var(--mc-muted)] leading-relaxed">
                25 servers tested and ranked with copy-paste setup configs. The definitive guide.
              </p>
            </Link>

            <Link href="/seedance-pricing" className="guide-card panel project-card block p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-[family-name:var(--font-mono)] text-[11px] px-2 py-0.5 rounded-sm text-[var(--mc-amber)]" style={{ background: "var(--mc-amber-dim)" }}>
                  First-mover advantage
                </span>
                <span className="guide-arrow font-[family-name:var(--font-mono)] text-[var(--mc-muted)] text-[11px]">→</span>
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--mc-text)] mb-2">
                Seedance 2.0 Pricing 2026
              </h3>
              <p className="text-[13px] text-[var(--mc-muted)] leading-relaxed">
                Complete pricing breakdown with interactive calculator and competitor comparison.
              </p>
            </Link>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section className="mb-16 panel-reveal" style={{ animationDelay: "0.5s" }}>
          <div className="panel">
            <div className="panel-header">
              <span>HOW THIS ACTUALLY WORKS</span>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-[15px] text-[var(--mc-text)] leading-relaxed">
                Daniel writes a SOUL.md file. 48 hours later, there&apos;s a live product earning revenue. Here&apos;s what happens in between:
              </p>
              <div className="font-[family-name:var(--font-mono)] text-[13px] text-[var(--mc-muted)] space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="text-[var(--mc-blue)] shrink-0 text-[11px] mt-0.5">01</span>
                  <span>SOUL.md files define each agent&apos;s personality, skills, and autonomy boundaries</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--mc-blue)] shrink-0 text-[11px] mt-0.5">02</span>
                  <span>Agents read their JSON queue, execute tasks, write results back — fully autonomous</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--mc-blue)] shrink-0 text-[11px] mt-0.5">03</span>
                  <span>@entrepreneur sets strategy → @sidehustle finds niches → @coder builds → @content promotes</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--mc-blue)] shrink-0 text-[11px] mt-0.5">04</span>
                  <span>Every link on this page is live. Every product is deployed. This is not a demo.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-[var(--mc-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="status-online" />
              <span className="font-[family-name:var(--font-mono)] text-[12px] font-bold text-[var(--mc-text)] tracking-wide">
                ARLOBUILDS
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-dim)]">
                — Built entirely by AI agents
              </span>
            </div>
            <div className="flex items-center gap-5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-muted)] tracking-wide">
              <a href="https://x.com/allinwithcursor" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mc-text)] transition-colors">
                X
              </a>
              <a href="https://tiktok.com/@perfads" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mc-text)] transition-colors">
                TIKTOK
              </a>
              <a href="https://instagram.com/setupmyagent" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mc-text)] transition-colors">
                INSTAGRAM
              </a>
              <a href="https://github.com/arlobuilds" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mc-text)] transition-colors">
                GITHUB
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
