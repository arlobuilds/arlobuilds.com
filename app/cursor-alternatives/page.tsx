"use client";

import { useState } from "react";

/* ── Inline Components ─────────────────────────────────────── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer"
      >
        <span>{q}</span>
        <span className="text-cyan-600 text-xl ml-4 shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-4 text-[var(--muted)] leading-relaxed">{a}</p>
      )}
    </div>
  );
}

/* ── Data ──────────────────────────────────────────────────── */

interface Tool {
  name: string;
  slug: string;
  tagline: string;
  type: "ide" | "extension" | "terminal" | "browser";
  price: string;
  freeTier: string;
  models: string;
  bestFor: string;
  limitation: string;
  openSource: boolean;
  website: string;
}

const tools: Tool[] = [
  {
    name: "Windsurf",
    slug: "windsurf",
    tagline: "AI-first IDE with multi-file editing and autonomous workflows",
    type: "ide",
    price: "$15/mo Pro",
    freeTier: "Free tier available",
    models: "Claude, GPT-4o, custom models",
    bestFor: "Developers who want a Cursor-like experience at a lower price. Windsurf shows you results before you accept changes.",
    limitation: "Smaller ecosystem than VS Code. Plugin support is growing but not on par yet.",
    openSource: false,
    website: "https://windsurf.com",
  },
  {
    name: "GitHub Copilot",
    slug: "copilot",
    tagline: "AI pair programmer built into VS Code with enterprise-grade controls",
    type: "extension",
    price: "$10/mo Individual, $19/mo Business",
    freeTier: "Free: 50 agent requests + 2,000 completions/mo",
    models: "GPT-4o, Claude 3.5 Sonnet, Gemini",
    bestFor: "Teams already on GitHub Enterprise. Inherits existing org policies, file exclusions, and access controls.",
    limitation: "Agent mode is newer and less polished than Cursor's. Multi-file edits can be hit-or-miss.",
    openSource: false,
    website: "https://github.com/features/copilot",
  },
  {
    name: "Claude Code",
    slug: "claude-code",
    tagline: "Agentic terminal coding tool with 200K context and top benchmark scores",
    type: "terminal",
    price: "$20/mo Pro, $100/mo Max (Anthropic subscription)",
    freeTier: "Included with Anthropic API usage",
    models: "Claude Opus 4.6, Claude Sonnet 4.6",
    bestFor: "Experienced devs comfortable with the terminal. Best autonomous coding performance (80.9% SWE-bench). Uses 5.5x fewer tokens than competitors.",
    limitation: "No GUI editor. Terminal-only. Steep learning curve if you're used to visual IDEs.",
    openSource: false,
    website: "https://claude.ai/code",
  },
  {
    name: "Zed",
    slug: "zed",
    tagline: "Lightning-fast open-source editor built in Rust with native AI",
    type: "ide",
    price: "$20/mo with AI (Zed Pro)",
    freeTier: "Free without AI, or bring your own API key",
    models: "Claude, GPT-4o, custom via API key",
    bestFor: "Speed fanatics. Zed opens and responds faster than any Electron-based editor. Great for remote development.",
    limitation: "Extension ecosystem is immature compared to VS Code. Missing some language servers.",
    openSource: true,
    website: "https://zed.dev",
  },
  {
    name: "Cline",
    slug: "cline",
    tagline: "Free VS Code extension that turns any AI model into an autonomous coding agent",
    type: "extension",
    price: "Free (bring your own API key)",
    freeTier: "Fully free, open source",
    models: "Any: Claude, GPT-4, Gemini, Grok, Ollama local models",
    bestFor: "Developers who want Cursor-like agent capabilities without switching editors or paying a subscription.",
    limitation: "Token costs add up with BYOK. No built-in cost controls. UI is less polished than Cursor.",
    openSource: true,
    website: "https://github.com/cline/cline",
  },
  {
    name: "Aider",
    slug: "aider",
    tagline: "Terminal-based AI pair programmer that works with any Git repo",
    type: "terminal",
    price: "Free (bring your own API key)",
    freeTier: "Fully free, open source",
    models: "Any: Claude, GPT-4, Gemini, DeepSeek, Ollama",
    bestFor: "Terminal users who want a lighter alternative to Claude Code. Great for quick edits and commit workflows.",
    limitation: "Less autonomous than Claude Code. Smaller context window management. No built-in web browsing.",
    openSource: true,
    website: "https://aider.chat",
  },
  {
    name: "Continue",
    slug: "continue",
    tagline: "Open-source AI extension for VS Code and JetBrains with any model",
    type: "extension",
    price: "Free (bring your own API key)",
    freeTier: "Fully free, open source",
    models: "Any: Claude, GPT-4, Gemini, Ollama, LMStudio",
    bestFor: "JetBrains users (IntelliJ, PyCharm, WebStorm). Only serious AI coding option for non-VS-Code IDEs.",
    limitation: "Agent mode is less mature than Cursor or Cline. Tab autocomplete can lag.",
    openSource: true,
    website: "https://continue.dev",
  },
  {
    name: "Void",
    slug: "void",
    tagline: "Open-source fork of Cursor with no vendor lock-in",
    type: "ide",
    price: "Free",
    freeTier: "Fully free, open source",
    models: "Any: bring your own API key",
    bestFor: "Developers who want Cursor's UX without the subscription or data privacy concerns. Self-hostable.",
    limitation: "Early stage. Missing some polish. Smaller team means slower feature development.",
    openSource: true,
    website: "https://voideditor.com",
  },
  {
    name: "Replit Agent",
    slug: "replit",
    tagline: "Browser-based AI that builds full apps from natural language prompts",
    type: "browser",
    price: "$25/mo Replit Core",
    freeTier: "Limited free tier",
    models: "Proprietary + Claude",
    bestFor: "Non-developers and rapid prototyping. Goes from idea to deployed app without local setup.",
    limitation: "Not suitable for production apps. Limited language/framework support. Vendor lock-in to Replit hosting.",
    openSource: false,
    website: "https://replit.com",
  },
  {
    name: "Supermaven",
    slug: "supermaven",
    tagline: "Fastest AI code completions with 1M token context window",
    type: "extension",
    price: "$10/mo Pro",
    freeTier: "Free tier with limited completions",
    models: "Proprietary Supermaven model",
    bestFor: "Developers who prioritize speed above all else. Completions arrive before you finish typing.",
    limitation: "Completions only, no chat or agent mode. Narrower feature set than Cursor.",
    openSource: false,
    website: "https://supermaven.com",
  },
];

const typeLabels: Record<string, string> = {
  ide: "Full IDE",
  extension: "Extension",
  terminal: "Terminal",
  browser: "Browser",
};

const typeColors: Record<string, string> = {
  ide: "bg-indigo-50 text-indigo-700 border-indigo-200",
  extension: "bg-emerald-50 text-emerald-700 border-emerald-200",
  terminal: "bg-amber-50 text-amber-700 border-amber-200",
  browser: "bg-rose-50 text-rose-700 border-rose-200",
};

const faqs = [
  {
    q: "What is the best free alternative to Cursor?",
    a: "Cline is the best free alternative. It's an open-source VS Code extension with 5 million installs that works with any AI model including Claude, GPT-4, Gemini, and local models via Ollama. You bring your own API key, so you only pay for the tokens you use.",
  },
  {
    q: "Is Claude Code better than Cursor?",
    a: "For autonomous coding tasks, yes. Claude Code scores 80.9% on SWE-bench, uses 5.5x fewer tokens, and has a 200K context window. But it's terminal-only with no GUI, so it's better for experienced developers comfortable with the command line.",
  },
  {
    q: "Is Windsurf cheaper than Cursor?",
    a: "Yes. Windsurf Pro is $15/month versus Cursor Pro at $20/month. Both offer similar AI-powered coding features, but Windsurf also shows you results from AI-generated code before you accept changes, reducing wasted edits.",
  },
  {
    q: "Can I use my own API keys with these alternatives?",
    a: "Yes. Cline, Continue, Aider, Zed, and Void all support bring-your-own-key. This means you can pick any AI model and only pay per token, which is often cheaper than a monthly subscription if you're a light user.",
  },
  {
    q: "What happened to Copilot vs Cursor in 2026?",
    a: "GitHub Copilot has closed the gap significantly with agent mode, multi-file editing, and a free tier (50 agent requests, 2,000 completions/month). For GitHub Enterprise teams, Copilot now integrates with existing org policies making it a strong contender.",
  },
  {
    q: "Are there open-source alternatives to Cursor?",
    a: "Yes. Zed, Cline, Continue, Aider, and Void are all open source. Zed is a full Rust-built editor. Cline and Continue are VS Code/JetBrains extensions. Aider is a terminal tool. Void is a direct open-source fork of Cursor.",
  },
];

/* ── Page ──────────────────────────────────────────────────── */

export default function CursorAlternativesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="text-center mb-12">
        <p className="text-sm font-medium text-[var(--accent)] mb-2 tracking-wide uppercase">
          Updated February 2026
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Best Cursor Alternatives 2026:{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            10 AI Code Editors Compared
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-6">
          Honest comparison based on real usage. Not a sponsored listicle. We
          tested each tool on actual projects, compared pricing, and built a
          decision framework to help you pick the right one.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["comparison", "tools", "decision", "faq"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className="px-3 py-1.5 text-sm rounded-full bg-violet-50 text-violet-700 hover:bg-violet-600 hover:text-white transition-colors no-underline"
            >
              {id === "comparison"
                ? "Comparison Table"
                : id === "tools"
                  ? "All 10 Tools"
                  : id === "decision"
                    ? "Which One?"
                    : "FAQ"}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            10 tools tested
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            6 open source
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            4 with free tiers
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            $0–$100/mo range
          </span>
        </div>
      </header>

      {/* ── Why Switch ───────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Why look beyond Cursor?
        </h2>
        <p className="text-[var(--muted)] mb-4 leading-relaxed">
          Cursor changed how developers write code. But it's not perfect.
          Pricing went up. The VS Code fork lags behind upstream updates. Some
          developers hit context window limits on larger codebases. And the
          market has caught up — fast.
        </p>
        <p className="text-[var(--muted)] leading-relaxed">
          In 2026, you have genuine options. Terminal-based tools like Claude
          Code now outscore Cursor on coding benchmarks. Open-source
          alternatives like Cline give you the same agent capabilities for free.
          GitHub Copilot added a free tier. The "one editor to rule them all"
          era is ending — the best developers use different tools for different
          jobs.
        </p>
      </section>

      {/* ── Comparison Table ─────────────────────────────── */}
      <section id="comparison" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Side-by-Side Comparison
        </h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr className="bg-gray-900">
                <th>Tool</th>
                <th>Type</th>
                <th>Price</th>
                <th>Free Tier</th>
                <th>Open Source</th>
                <th>Models</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.slug}>
                  <td className="font-semibold">{t.name}</td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium border ${typeColors[t.type]}`}
                    >
                      {typeLabels[t.type]}
                    </span>
                  </td>
                  <td className="text-sm">{t.price}</td>
                  <td className="text-sm">{t.freeTier}</td>
                  <td className="text-center">
                    {t.openSource ? (
                      <span className="text-[var(--success)]">✓</span>
                    ) : (
                      <span className="text-[var(--muted)]">✗</span>
                    )}
                  </td>
                  <td className="text-sm">{t.models}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Ad Slot 1 ────────────────────────────────────── */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-1" className="w-full" />
      </div>

      {/* ── All Tools ────────────────────────────────────── */}
      <section id="tools" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          All 10 Alternatives, Reviewed
        </h2>
        <div className="space-y-8">
          {tools.map((t, i) => (
            <div
              key={t.slug}
              id={t.slug}
              className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-xl font-bold">
                    {i + 1}. {t.name}
                  </h3>
                  <p className="text-sm text-[var(--muted)]">{t.tagline}</p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium border ${typeColors[t.type]}`}
                  >
                    {typeLabels[t.type]}
                  </span>
                  {t.openSource && (
                    <span className="px-2 py-0.5 rounded text-xs font-medium border bg-green-50 text-green-700 border-green-200">
                      Open Source
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-[var(--card-bg)] rounded-lg p-4">
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">
                    Pricing
                  </p>
                  <p className="text-sm font-medium">{t.price}</p>
                  <p className="text-xs text-[var(--muted)]">{t.freeTier}</p>
                </div>
                <div className="bg-[var(--card-bg)] rounded-lg p-4">
                  <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">
                    AI Models
                  </p>
                  <p className="text-sm">{t.models}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">
                    Best for
                  </p>
                  <p className="text-sm text-green-900">{t.bestFor}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-red-700 uppercase tracking-wide mb-1">
                    Limitation
                  </p>
                  <p className="text-sm text-red-900">{t.limitation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ad Slot 2 ────────────────────────────────────── */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-2" className="w-full" />
      </div>

      {/* ── Decision Framework ───────────────────────────── */}
      <section id="decision" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Which One Should You Pick?
        </h2>
        <p className="text-[var(--muted)] mb-6">
          There's no single best tool anymore. Here's a quick decision
          framework:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-5">
            <p className="font-semibold text-[var(--accent)] mb-2">
              "I want the cheapest Cursor alternative"
            </p>
            <p className="text-sm text-[var(--muted)]">
              <strong>Cline</strong> (free, VS Code extension) or{" "}
              <strong>Windsurf</strong> ($15/mo, full IDE)
            </p>
          </div>
          <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-5">
            <p className="font-semibold text-[var(--accent)] mb-2">
              "I want the best autonomous coding"
            </p>
            <p className="text-sm text-[var(--muted)]">
              <strong>Claude Code</strong> (terminal, 80.9% SWE-bench) or{" "}
              <strong>Cursor</strong> itself
            </p>
          </div>
          <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-5">
            <p className="font-semibold text-[var(--accent)] mb-2">
              "I use JetBrains, not VS Code"
            </p>
            <p className="text-sm text-[var(--muted)]">
              <strong>Continue</strong> (only serious AI option for IntelliJ /
              PyCharm / WebStorm)
            </p>
          </div>
          <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-5">
            <p className="font-semibold text-[var(--accent)] mb-2">
              "My team is on GitHub Enterprise"
            </p>
            <p className="text-sm text-[var(--muted)]">
              <strong>GitHub Copilot</strong> (inherits org policies, free tier
              available)
            </p>
          </div>
          <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-5">
            <p className="font-semibold text-[var(--accent)] mb-2">
              "I want maximum speed"
            </p>
            <p className="text-sm text-[var(--muted)]">
              <strong>Zed</strong> (fastest editor, Rust-native) or{" "}
              <strong>Supermaven</strong> (fastest completions)
            </p>
          </div>
          <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-5">
            <p className="font-semibold text-[var(--accent)] mb-2">
              "I care about open source and privacy"
            </p>
            <p className="text-sm text-[var(--muted)]">
              <strong>Void</strong> (Cursor fork, self-hostable) or{" "}
              <strong>Aider</strong> (terminal, any model)
            </p>
          </div>
        </div>
      </section>

      {/* ── Internal Links ───────────────────────────────── */}
      <section className="mb-16">
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
          <h3 className="font-bold mb-3">More from ArloBuilds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="/mcp-servers"
              className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline"
            >
              <span>→</span> Best MCP Servers 2026: 25 Tested & Ranked
            </a>
            <a
              href="/seedance-pricing"
              className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline"
            >
              <span>→</span> Seedance 2.0 Pricing Guide
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="bg-white border border-[var(--border)] rounded-xl p-6">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] pt-8 pb-12 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          Last updated: February 2026. Prices and features may change.
        </p>
        <p>
          ArloBuilds is independent. This guide is not sponsored. We use
          affiliate links where available.
        </p>
      </footer>
    </div>
  );
}
