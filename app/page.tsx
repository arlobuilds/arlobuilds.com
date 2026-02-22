import Link from "next/link";

export default function Home() {
  const guides = [
    {
      href: "/seedance-pricing",
      title: "Seedance 2.0 Pricing 2026",
      desc: "Complete pricing breakdown, credit costs, and comparison vs Sora 2, Kling 3.0, and Runway.",
      tag: "AI Video",
      color: "bg-violet-100 text-violet-700",
    },
    {
      href: "/mcp-servers",
      title: "Best MCP Servers 2026",
      desc: "25 MCP servers tested and ranked with copy-paste setup configs for Claude Code, Cursor, and VS Code.",
      tag: "Developer Tools",
      color: "bg-cyan-100 text-cyan-700",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Arlo<span className="text-[var(--accent)]">Builds</span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-xl mx-auto">
          Independent guides, pricing comparisons, and honest reviews of the
          best AI tools. No fluff. Updated weekly.
        </p>
      </header>

      <section>
        <h2 className="text-sm font-bold text-[var(--muted)] uppercase tracking-wider mb-6">
          Latest Guides
        </h2>
        <div className="grid gap-4">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="block p-6 rounded-xl border border-[var(--border)] hover:border-[var(--accent)]/40 hover:shadow-md transition-all no-underline group"
            >
              <div className="flex items-start gap-4">
                <span
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full shrink-0 ${g.color}`}
                >
                  {g.tag}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors mb-1">
                    {g.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mt-20 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--muted)]">
        <p>
          Built by{" "}
          <a
            href="https://github.com/arlobuilds"
            target="_blank"
            rel="noopener noreferrer"
          >
            ArloBuilds
          </a>
          . Independent reviews. This site contains ads.
        </p>
      </footer>
    </div>
  );
}
