import Link from "next/link";

const products = [
  {
    name: "The Agent Playbook",
    desc: "Build autonomous AI agent systems. SOUL files, queue messaging, scheduling, and real production architecture. $29.",
    url: "/agent-playbook",
    badge: "$29",
    external: false,
  },
  {
    name: "ProposalPilot",
    desc: "AI proposal generator for freelancers. Live with Stripe billing and dark theme.",
    url: "https://proposalpilots.com",
    badge: "SaaS",
    external: true,
  },
  {
    name: "Best MCP Servers 2026",
    desc: "25 servers tested and ranked with copy-paste configs. Targeting 201K monthly searches.",
    url: "/mcp-servers",
    badge: "201K/mo",
    external: false,
  },
  {
    name: "Seedance 2.0 Pricing",
    desc: "Interactive pricing calculator and competitor comparison. First-mover on this keyword.",
    url: "/seedance-pricing",
    badge: "SEO",
    external: false,
  },
  {
    name: "Cursor Alternatives 2026",
    desc: "10 AI coding tools compared with decision framework. Targeting 9.9K monthly searches.",
    url: "/cursor-alternatives",
    badge: "9.9K/mo",
    external: false,
  },
  {
    name: "AI Prompt Library",
    desc: "470+ free prompts with search, filters, and one-click copy. Targeting long-tail prompt keywords.",
    url: "/ai-prompt-library",
    badge: "FREE TOOL",
    external: false,
  },
  {
    name: "MCP Servers for Claude Code",
    desc: "15 servers tested for Claude Code workflows. Setup commands, configs, and built-in vs MCP comparison.",
    url: "/mcp-servers-claude-code",
    badge: "CLUSTER",
    external: false,
  },
  {
    name: "AI Agent Frameworks 2026",
    desc: "10+ frameworks tested in production. Honest comparison with the no-framework alternative we actually use.",
    url: "/ai-agent-frameworks",
    badge: "NEW",
    external: false,
  },
  {
    name: "MCP Servers for Cursor",
    desc: "15 servers with .cursor/mcp.json configs. Agent Mode tips and what's built-in vs what needs MCP.",
    url: "/mcp-servers-cursor",
    badge: "CLUSTER",
    external: false,
  },
];

export default function Home() {
  return (
    <div className="mission-control dot-grid min-h-screen flex flex-col">
      <div className="top-glow" />

      {/* NAV */}
      <nav className="shrink-0 border-b border-[var(--mc-border)] bg-[var(--mc-base)]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="status-dot" />
            <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[var(--mc-text)] tracking-wide">
              ARLOBUILDS
            </span>
          </div>
          <div className="flex items-center gap-5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-muted)] tracking-wide">
            <a href="https://x.com/allinwithcursor" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mc-text)] transition-colors">X</a>
            <a href="https://tiktok.com/@perfads" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mc-text)] transition-colors">TIKTOK</a>
            <a href="https://instagram.com/setupmyagent" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mc-text)] transition-colors">IG</a>
            <a href="https://github.com/arlobuilds" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--mc-text)] transition-colors">GITHUB</a>
          </div>
        </div>
      </nav>

      {/* CONTENT — vertically centered */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="max-w-4xl w-full space-y-10 fade-in">

          {/* HERO */}
          <div className="text-center space-y-5">
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight">
              <span className="text-[var(--mc-text)]">One human. Seven AI agents.</span>
              <br />
              <span className="text-[var(--mc-blue)]">Real products. Zero employees.</span>
            </h1>
            <p className="text-[15px] sm:text-[16px] text-[var(--mc-muted)] max-w-2xl mx-auto leading-relaxed">
              ArloBuilds is a live experiment in autonomous business. AI agents research markets, write code, create content, and ship products — all without human involvement in daily operations. One human provides direction. Everything else runs on its own.
            </p>
          </div>

          {/* STATS */}
          <div className="flex justify-center gap-12 sm:gap-16">
            {[
              { value: "9", label: "PRODUCTS SHIPPED" },
              { value: "213K+", label: "MONTHLY SEARCH VOL" },
              { value: "7", label: "AI AGENTS" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[var(--mc-blue)] font-[family-name:var(--font-mono)] text-3xl sm:text-4xl font-bold">
                  {s.value}
                </div>
                <div className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--mc-dim)] tracking-widest mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* PRODUCTS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((p) =>
              p.external ? (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel product-card block p-5 group"
                >
                  <ProductCardInner {...p} />
                </a>
              ) : (
                <Link key={p.name} href={p.url} className="panel product-card block p-5 group">
                  <ProductCardInner {...p} />
                </Link>
              )
            )}
          </div>

          {/* CONCEPT — one-liner */}
          <p className="text-center font-[family-name:var(--font-mono)] text-[12px] text-[var(--mc-dim)] tracking-wide max-w-xl mx-auto">
            The human defines strategy. The agents research, build, deploy, and promote — every day, autonomously. Every link above is live.
          </p>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="shrink-0 border-t border-[var(--mc-border)] py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center gap-2">
          <span className="status-dot" />
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-dim)]">
            ARLOBUILDS — Built entirely by AI agents
          </span>
        </div>
      </footer>
    </div>
  );
}

function ProductCardInner({ name, desc, badge }: { name: string; desc: string; badge: string }) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-[family-name:var(--font-display)] text-[15px] font-bold text-[var(--mc-text)] group-hover:text-[var(--mc-blue)] transition-colors">
          {name}
        </h3>
        <span className="tag">{badge}</span>
      </div>
      <p className="text-[13px] text-[var(--mc-muted)] leading-relaxed">{desc}</p>
    </>
  );
}
