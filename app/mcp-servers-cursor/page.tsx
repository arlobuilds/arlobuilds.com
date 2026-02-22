"use client";

import { useState, useMemo } from "react";

/* ─── Shared Components ─── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="absolute top-2 right-2 px-3 py-1 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="relative mt-2">
      {label && (
        <div className="text-xs font-semibold text-[var(--muted)] mb-1">{label}</div>
      )}
      <CopyButton text={code} />
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-amber-400" title={`${count}/5`}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-center justify-between gap-4 cursor-pointer"
      >
        <span className="font-semibold">{q}</span>
        <span className="text-violet-600 text-xl shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="pb-4 text-[var(--muted)] leading-relaxed">{a}</p>}
    </div>
  );
}

/* ─── Server Data ─── */

interface Server {
  name: string;
  pkg: string;
  category: string;
  rating: number;
  free: boolean;
  desc: string;
  bestFor: string;
  limitation: string;
  config: string;
  note?: string;
}

const servers: Server[] = [
  /* ── Developer Tools ── */
  {
    name: "GitHub",
    pkg: "@modelcontextprotocol/server-github",
    category: "Developer Tools",
    rating: 5,
    free: true,
    desc: "Full GitHub integration — create and review PRs, manage issues, search code across repositories, and manage releases. Cursor can edit code but can&apos;t efficiently manage PRs, issue comments, or cross-repo code search without this.",
    bestFor: "Any developer using GitHub daily. Essential for PR creation workflows in Agent Mode.",
    limitation: "Requires a personal access token with appropriate repo scopes.",
    config: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    }
  }
}`,
    note: "GitHub also maintains an official Go-based server at github.com/github/github-mcp-server with expanded features.",
  },
  {
    name: "Playwright",
    pkg: "@playwright/mcp",
    category: "Developer Tools",
    rating: 5,
    free: true,
    desc: "Full browser automation — navigate pages, click elements, fill forms, take screenshots, and run end-to-end tests. Cursor&apos;s Composer can generate UI code but cannot render it or interact with page elements in a real browser.",
    bestFor: "E2E testing, visual regression, UI automation. Pairs perfectly with Cursor Agent Mode for generate → test → fix loops.",
    limitation: "Requires Chromium/Chrome installed. Heavier resource usage than simple fetch.",
    config: `{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}`,
  },
  {
    name: "Sentry",
    pkg: "@modelcontextprotocol/server-sentry",
    category: "Developer Tools",
    rating: 4,
    free: true,
    desc: "Pull error reports, stack traces, and issue details from Sentry directly into your Cursor context. Debug production errors without leaving your editor.",
    bestFor: "Teams using Sentry for error monitoring. Especially useful when debugging production incidents in Agent Mode.",
    limitation: "Read-only access. Requires Sentry auth token.",
    config: `{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sentry"],
      "env": {
        "SENTRY_AUTH_TOKEN": "<your-auth-token>"
      }
    }
  }
}`,
  },
  /* ── Database & Storage ── */
  {
    name: "PostgreSQL",
    pkg: "@modelcontextprotocol/server-postgres",
    category: "Database & Storage",
    rating: 5,
    free: true,
    desc: "Query PostgreSQL databases, inspect schemas, check table structures, and run migrations — all from Cursor. Cursor can generate SQL but can&apos;t execute it or explore schemas without this server.",
    bestFor: "Any project with a Postgres database. Schema exploration and query debugging in Agent Mode.",
    limitation: "Read-only by default for safety. Provide connection string in args.",
    config: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://username:password@localhost:5432/mydb"
      ]
    }
  }
}`,
  },
  {
    name: "SQLite",
    pkg: "@modelcontextprotocol/server-sqlite",
    category: "Database & Storage",
    rating: 4,
    free: true,
    desc: "Query and explore local SQLite databases. Great for prototyping, local dev databases, and analyzing data files without needing a running database server.",
    bestFor: "Local development, prototyping, data analysis on .db files.",
    limitation: "Local files only. Community-maintained Node.js version.",
    config: `{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/database.db"]
    }
  }
}`,
  },
  {
    name: "Supabase",
    pkg: "@supabase/mcp-server-supabase",
    category: "Database & Storage",
    rating: 4,
    free: true,
    desc: "Full Supabase access: query your Postgres database, manage auth users, inspect storage buckets, and call edge functions. Covers everything Supabase exposes through its management API.",
    bestFor: "Projects built on Supabase (Postgres + Auth + Storage + Edge Functions).",
    limitation: "Requires Supabase access token. Some operations need service role key.",
    config: `{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "<your-access-token>"
      }
    }
  }
}`,
  },
  {
    name: "Redis",
    pkg: "@modelcontextprotocol/server-redis",
    category: "Database & Storage",
    rating: 3,
    free: true,
    desc: "Interact with Redis — get/set keys, inspect cache contents, run pub/sub commands, and debug your cache layer from Cursor.",
    bestFor: "Developers debugging Redis instances or working on caching logic.",
    limitation: "Requires a running Redis instance. Community-maintained.",
    config: `{
  "mcpServers": {
    "redis": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-redis"],
      "env": {
        "REDIS_URL": "redis://localhost:6379"
      }
    }
  }
}`,
  },
  /* ── Web & Search ── */
  {
    name: "Brave Search",
    pkg: "@modelcontextprotocol/server-brave-search",
    category: "Web & Search",
    rating: 5,
    free: false,
    desc: "Real-time web search powered by the Brave Search API. Especially valuable for Cursor free-tier users — Cursor Pro includes web search, but the free tier does not. This fills that gap.",
    bestFor: "Any workflow requiring current web information. Essential for Cursor free-tier users who need web search.",
    limitation: "Requires Brave Search API key. Free tier: 2,000 queries/month.",
    config: `{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "<your-api-key>"
      }
    }
  }
}`,
  },
  {
    name: "Exa",
    pkg: "exa-mcp-server",
    category: "Web & Search",
    rating: 4,
    free: false,
    desc: "AI-native search with semantic understanding. Returns structured, clean results optimized for LLM consumption — better than Brave for company research, code examples, and academic content.",
    bestFor: "Research-heavy workflows, finding specific technical content, competitor analysis.",
    limitation: "Paid API with a limited free tier.",
    config: `{
  "mcpServers": {
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": {
        "EXA_API_KEY": "<your-api-key>"
      }
    }
  }
}`,
  },
  /* ── Productivity & Team ── */
  {
    name: "Slack",
    pkg: "@anthropic/slack-mcp",
    category: "Productivity & Team",
    rating: 4,
    free: true,
    desc: "Read channel history, search messages, send messages, and manage Slack from Cursor. Great for keeping team context in sync with your coding workflow.",
    bestFor: "Teams who coordinate in Slack. Useful for posting deploy summaries or reading incident threads.",
    limitation: "Requires a Slack Bot Token with appropriate OAuth scopes.",
    config: `{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@anthropic/slack-mcp"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token"
      }
    }
  }
}`,
  },
  {
    name: "Linear",
    pkg: "linear-mcp-server",
    category: "Productivity & Team",
    rating: 4,
    free: true,
    desc: "Create and update issues, manage projects, query your team&apos;s backlog, and track cycles in Linear. Turn code changes into Linear issues without leaving Cursor.",
    bestFor: "Dev teams using Linear for issue tracking and sprint management.",
    limitation: "Requires Linear API key. Community-maintained.",
    config: `{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "linear-mcp-server"],
      "env": {
        "LINEAR_API_KEY": "<your-api-key>"
      }
    }
  }
}`,
  },
  {
    name: "Notion",
    pkg: "@modelcontextprotocol/server-notion",
    category: "Productivity & Team",
    rating: 3,
    free: true,
    desc: "Read and search Notion pages and databases. Useful for pulling in documentation, project specs, or knowledge base content into Cursor context.",
    bestFor: "Teams using Notion as their knowledge base or project documentation hub.",
    limitation: "Requires Notion integration token. Write capabilities are limited.",
    config: `{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_KEY": "<your-integration-token>"
      }
    }
  }
}`,
  },
  /* ── Infrastructure & DevOps ── */
  {
    name: "Stripe",
    pkg: "@stripe/mcp",
    category: "Infrastructure & DevOps",
    rating: 5,
    free: true,
    desc: "Full Stripe access — manage customers, products, prices, payment intents, subscriptions, and invoices from Cursor. Essential for SaaS developers who work with Stripe daily.",
    bestFor: "SaaS developers building payment flows, subscription logic, or billing integrations.",
    limitation: "Use your test-mode secret key for development. Never commit keys to git.",
    config: `{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp"],
      "env": {
        "STRIPE_SECRET_KEY": "sk_test_<your-key>"
      }
    }
  }
}`,
  },
  {
    name: "Docker",
    pkg: "@docker/mcp",
    category: "Infrastructure & DevOps",
    rating: 4,
    free: true,
    desc: "Manage Docker containers, images, volumes, and compose stacks from Cursor. Build images, inspect running containers, read logs, and execute commands in containers.",
    bestFor: "Developers using Docker for local dev environments or building containerized apps.",
    limitation: "Requires Docker Desktop running locally.",
    config: `{
  "mcpServers": {
    "docker": {
      "command": "npx",
      "args": ["-y", "@docker/mcp"]
    }
  }
}`,
    note: "Requires Docker Desktop to be running. Start Docker Desktop before launching Cursor.",
  },
  {
    name: "Cloudflare",
    pkg: "@cloudflare/mcp-server-cloudflare",
    category: "Infrastructure & DevOps",
    rating: 3,
    free: true,
    desc: "Manage Cloudflare Workers, KV namespaces, D1 databases, R2 buckets, and DNS records from Cursor. Deploy edge functions and configure your Cloudflare setup.",
    bestFor: "Developers building on Cloudflare&apos;s edge platform (Workers, D1, R2).",
    limitation: "Requires Cloudflare API token with appropriate zone/account permissions.",
    config: `{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "<your-api-token>"
      }
    }
  }
}`,
  },
];

const ALL_CATEGORIES = "All";
const CATEGORY_LIST = [
  ALL_CATEGORIES,
  "Developer Tools",
  "Database & Storage",
  "Web & Search",
  "Productivity & Team",
  "Infrastructure & DevOps",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Developer Tools": "bg-violet-100 text-violet-800 border-violet-200",
  "Database & Storage": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Web & Search": "bg-blue-100 text-blue-800 border-blue-200",
  "Productivity & Team": "bg-amber-100 text-amber-800 border-amber-200",
  "Infrastructure & DevOps": "bg-slate-100 text-slate-700 border-slate-200",
};

/* ─── Page Component ─── */

export default function McpServersCursorPage() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const filteredServers = useMemo(() => {
    if (activeCategory === ALL_CATEGORIES) return servers;
    return servers.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">

      {/* ── Hero ── */}
      <header className="text-center mb-12">
        <p className="text-sm font-medium text-violet-600 mb-3 uppercase tracking-widest">
          CURSOR GUIDE — FEBRUARY 2026
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Best MCP Servers for{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Cursor
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-6">
          Cursor already handles file editing, code generation, and terminal commands natively. These are the 15 MCP servers that actually add new capabilities — with copy-paste <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.cursor/mcp.json</code> configs for every one.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-3 justify-center text-sm mb-8">
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>15 servers</strong> tested
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            .cursor/mcp.json configs
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            Agent Mode tips
          </span>
        </div>
      </header>

      {/* ── What Cursor Has Built-In ── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          What Cursor Already Has Built-In
        </h2>
        <p className="text-[var(--muted)] mb-6">
          Before adding MCP servers, understand what Cursor gives you out of the box. These are native capabilities — you do NOT need MCP for any of them.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-semibold mb-2 text-violet-700">Code Editing</div>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>Multi-file editing</li>
              <li>AI code generation</li>
              <li>Inline completions</li>
              <li>Refactoring</li>
              <li>Codebase-aware context</li>
            </ul>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-semibold mb-2 text-violet-700">Terminal</div>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>Run any shell command</li>
              <li>Git operations</li>
              <li>npm / yarn / pnpm</li>
              <li>Build scripts</li>
              <li>Test runners</li>
            </ul>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-semibold mb-2 text-violet-700">Codebase Index</div>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>Semantic code search</li>
              <li>@-mentions for context</li>
              <li>File references</li>
              <li>Symbol navigation</li>
              <li>Project-wide understanding</li>
            </ul>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-semibold mb-2 text-violet-700">Web Search (Pro)</div>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>@web for live search</li>
              <li>Documentation lookup</li>
              <li>API reference search</li>
              <li>Stack Overflow results</li>
              <li>Pro plan only</li>
            </ul>
          </div>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-6">
          <p className="font-semibold text-violet-900 mb-2">So what DOES need MCP?</p>
          <p className="text-sm text-violet-800 leading-relaxed">
            Structured API access (GitHub PRs, Linear issues, Stripe customers), browser automation with JavaScript rendering, direct database connections with schema awareness, and third-party integrations that go beyond Cursor&apos;s native capabilities. If the task requires an authenticated API session, real-time data, or interactive browser behavior — that&apos;s where MCP adds genuine value.
          </p>
        </div>
      </section>

      {/* ── Built-In vs MCP Comparison Table ── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Cursor Built-In vs MCP: What Needs What
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--border)] rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[var(--card-bg)]">
                <th className="text-left px-4 py-3 font-semibold">Capability</th>
                <th className="text-center px-4 py-3 font-semibold">Built-in to Cursor?</th>
                <th className="text-center px-4 py-3 font-semibold">MCP Server Needed?</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cap: "File read/write/edit", builtIn: true, mcp: false },
                { cap: "Terminal commands", builtIn: true, mcp: false },
                { cap: "Codebase search/index", builtIn: true, mcp: false },
                { cap: "Web search", builtIn: "Pro only", mcp: "Brave Search (free tier)" },
                { cap: "GitHub PRs & issues", builtIn: false, mcp: "GitHub MCP" },
                { cap: "Database queries", builtIn: false, mcp: "PostgreSQL / SQLite MCP" },
                { cap: "Browser automation", builtIn: false, mcp: "Playwright MCP" },
                { cap: "Slack messages", builtIn: false, mcp: "Slack MCP" },
                { cap: "Payment management", builtIn: false, mcp: "Stripe MCP" },
                { cap: "Error monitoring", builtIn: false, mcp: "Sentry MCP" },
              ].map((row) => (
                <tr key={row.cap} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3">{row.cap}</td>
                  <td className="px-4 py-3 text-center">
                    {row.builtIn === true ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : row.builtIn === false ? (
                      <span className="text-red-400">No</span>
                    ) : (
                      <span className="text-amber-600">{row.builtIn}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {row.mcp === false ? (
                      <span className="text-[var(--muted)]">Not needed</span>
                    ) : (
                      <span className="text-violet-700 font-medium">{row.mcp}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Category Filter + Server Listings ── */}
      <section className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          15 Best MCP Servers for Cursor
        </h2>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer border ${
                activeCategory === cat
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-[var(--card-bg)] text-[var(--muted)] border-[var(--border)] hover:border-violet-400 hover:text-violet-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Server cards */}
        <div className="space-y-8">
          {filteredServers.map((s, i) => (
            <div key={s.name}>
              <div
                id={`server-${s.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold">{s.name}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[s.category]}`}
                    >
                      {s.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <Stars count={s.rating} />
                    {s.free ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Free
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                        API key required
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[var(--muted)] font-mono mb-3">{s.pkg}</p>

                <p className="mb-4">{s.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                  <div className="bg-[var(--card-bg)] rounded-lg px-4 py-2">
                    <span className="font-semibold">Best for: </span>
                    <span className="text-[var(--muted)]">{s.bestFor}</span>
                  </div>
                  <div className="bg-[var(--card-bg)] rounded-lg px-4 py-2">
                    <span className="font-semibold">Limitation: </span>
                    <span className="text-[var(--muted)]">{s.limitation}</span>
                  </div>
                </div>

                {s.note && (
                  <p className="text-sm text-violet-700 bg-violet-50 border border-violet-200 rounded-lg px-4 py-2 mb-4">
                    {s.note}
                  </p>
                )}

                <CodeBlock code={s.config} label=".cursor/mcp.json config:" />
              </div>

              {/* TinyAdz inline slot between server 8 and 9 */}
              {i === 7 && (
                <div className="my-12 min-h-[90px]">
                  <div id="tinyadz-inline-1" className="w-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── TinyAdz slot 2 ── */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-2" className="w-full" />
      </div>

      {/* ── Cursor Agent Mode + MCP Tips ── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Cursor Agent Mode + MCP: Power User Tips
        </h2>
        <p className="text-[var(--muted)] mb-8">
          Agent Mode (Composer) is where MCP servers truly shine in Cursor. Agent Mode can chain multiple MCP tools together in a single workflow — here are the most powerful combinations.
        </p>

        <div className="space-y-4">
          {[
            {
              title: "Automated PR creation from issues",
              tools: "GitHub MCP + Agent Mode",
              desc: "Paste a GitHub issue URL into Composer. Agent Mode reads the issue via GitHub MCP, writes the code, runs tests, and creates a PR — all in one shot.",
            },
            {
              title: "Generate → Test → Fix loops",
              tools: "Playwright MCP + Composer",
              desc: "Ask Agent Mode to build a feature, then test it with Playwright. If tests fail, it reads the error and fixes the code. This loop can run multiple times until tests pass.",
            },
            {
              title: "Database-driven development",
              tools: "PostgreSQL MCP + Agent Mode",
              desc: "Agent Mode can inspect your database schema, write migrations, generate type-safe queries, and validate data — all without you manually copying SQL output.",
            },
            {
              title: "Find error → Create fix PR",
              tools: "Sentry MCP + GitHub MCP",
              desc: "Combine Sentry (to read production errors) with GitHub (to create fix PRs). Agent Mode reads the stack trace, finds the bug, and opens a PR with the fix.",
            },
            {
              title: "Share configs with your team",
              tools: ".cursor/mcp.json via git",
              desc: "Put your MCP configs in .cursor/mcp.json at the project root and commit it to git. Every team member gets the same MCP servers when they clone the repo. Use environment variables for secrets.",
            },
          ].map((tip) => (
            <div
              key={tip.title}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5"
            >
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="font-bold">{tip.title}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 bg-violet-100 text-violet-800 rounded-full border border-violet-200">
                  {tip.tools}
                </span>
              </div>
              <p className="text-sm text-[var(--muted)]">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Cursor MCP Setup Guide ── */}
      <section id="setup" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          How to Add MCP Servers to Cursor
        </h2>
        <p className="text-[var(--muted)] mb-8">
          Cursor supports MCP servers via two config methods. Project-level config is shared with your team; Settings UI is personal. Both use the same JSON format.
        </p>

        <div className="space-y-6">

          {/* Project-level */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-0.5 bg-violet-100 text-violet-800 text-xs font-semibold rounded-full border border-violet-200">Recommended</span>
              <h3 className="font-bold text-lg">Project-level: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.cursor/mcp.json</code></h3>
            </div>
            <p className="text-sm text-[var(--muted)] mb-4">
              Create <code className="bg-gray-100 px-1 rounded">.cursor/mcp.json</code> in your project root. Commit it to git so your whole team gets the same MCP servers. Best for project-specific servers like your database.
            </p>
            <CodeBlock
              code={`// .cursor/mcp.json — project root, commit to git
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://localhost:5432/myproject"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}"
      }
    }
  }
}`}
              label=".cursor/mcp.json example:"
            />
          </div>

          {/* Settings UI */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">Cursor Settings: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">Settings &gt; MCP</code></h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              Open Cursor Settings and navigate to the MCP section. Servers configured here are available in every Cursor session across all projects. Best for tools you always want: GitHub, Brave Search, Slack.
            </p>
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-4 text-sm text-violet-800">
              <strong>Steps:</strong> Open Cursor → Settings (Cmd+,) → Search &quot;MCP&quot; → Add server → Paste config → Restart Cursor
            </div>
          </div>

          {/* Key differences */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold mb-4">Project vs Settings: When to Use Which</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-violet-700 mb-2">.cursor/mcp.json (Project)</p>
                <ul className="space-y-1 text-[var(--muted)]">
                  <li>Your project&apos;s database connection</li>
                  <li>Project-specific Sentry org</li>
                  <li>Shared with teammates via git</li>
                  <li>Environment-specific settings</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-violet-700 mb-2">Settings &gt; MCP (Global)</p>
                <ul className="space-y-1 text-[var(--muted)]">
                  <li>GitHub (same token everywhere)</li>
                  <li>Brave Search (always useful)</li>
                  <li>Slack (personal workspace)</li>
                  <li>Playwright (general browser use)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Verification tip */}
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
            <p className="text-sm text-violet-900">
              <strong>Verify it works:</strong> Open Composer (Cmd+I), type <code className="bg-violet-100 px-1.5 py-0.5 rounded">@</code> — you should see MCP tools listed alongside files and symbols. If a server doesn&apos;t appear, restart Cursor and check the MCP logs in Settings.
            </p>
          </div>
        </div>
      </section>

      {/* ── Starter Configs ── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready-Made Starter Configs
        </h2>
        <p className="text-[var(--muted)] mb-8">
          Copy one of these into your project&apos;s <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.cursor/mcp.json</code> to get started instantly. Add your API keys and you&apos;re live.
        </p>

        <div className="space-y-6">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-1">Web Developer</h3>
            <p className="text-sm text-[var(--muted)] mb-3">GitHub + Playwright + PostgreSQL + Brave Search</p>
            <CodeBlock
              code={`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<token>" }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/mydb"]
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": { "BRAVE_API_KEY": "<key>" }
    }
  }
}`}
            />
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-1">Full-Stack SaaS</h3>
            <p className="text-sm text-[var(--muted)] mb-3">GitHub + Playwright + Supabase + Stripe + Sentry</p>
            <CodeBlock
              code={`{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "<token>" }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase"],
      "env": { "SUPABASE_ACCESS_TOKEN": "<token>" }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp"],
      "env": { "STRIPE_SECRET_KEY": "sk_test_<key>" }
    },
    "sentry": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sentry"],
      "env": { "SENTRY_AUTH_TOKEN": "<token>" }
    }
  }
}`}
            />
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-1">Data &amp; Research</h3>
            <p className="text-sm text-[var(--muted)] mb-3">PostgreSQL + SQLite + Brave Search + Exa</p>
            <CodeBlock
              code={`{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost:5432/mydb"]
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/data.db"]
    },
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": { "BRAVE_API_KEY": "<key>" }
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server"],
      "env": { "EXA_API_KEY": "<key>" }
    }
  }
}`}
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-6">
          <FAQItem
            q="How do I add MCP servers to Cursor?"
            a="Create a .cursor/mcp.json file in your project root (recommended for team sharing) or go to Cursor Settings > MCP to add servers globally. Add your server under the mcpServers key with command, args, and env fields. Restart Cursor to connect. Cursor auto-installs npx-based servers on first use."
          />
          <FAQItem
            q="What does Cursor have built-in without MCP?"
            a="Cursor has built-in file editing, AI code generation, multi-file editing, terminal command execution, codebase indexing with semantic search, @-mentions for context, and web search (Cursor Pro only). You don't need MCP for code editing, git commands, or browsing your codebase. MCP adds value for structured API access like GitHub PRs, databases, browser automation, and third-party integrations."
          />
          <FAQItem
            q="What is the difference between .cursor/mcp.json and Cursor Settings?"
            a="The .cursor/mcp.json file is project-level configuration that lives in your project root and gets shared with your team via git. Cursor Settings > MCP is your global personal configuration. Use .cursor/mcp.json for project-specific servers (like your project's database) and Settings for servers you want in every project (like GitHub or Brave Search)."
          />
          <FAQItem
            q="Does Cursor support all MCP servers?"
            a="Cursor supports MCP servers that use the stdio transport, which covers the vast majority of popular servers. Some servers using only SSE (Server-Sent Events) transport may need additional configuration. All 15 servers on this page have been tested and confirmed working with Cursor."
          />
          <FAQItem
            q="How many MCP servers can Cursor run at once?"
            a="Cursor can run many MCP servers simultaneously with no hard limit. Most power users run 4 to 8 servers comfortably. Each server runs as a separate process, so running 15 or more may impact Cursor's performance and memory usage. Start with 3 to 5 essential ones for your workflow and add more as needed."
          />
          <FAQItem
            q="Do MCP servers work with Cursor Agent Mode?"
            a="Yes — Agent Mode (Composer) is where MCP servers truly shine. Agent Mode can chain multiple MCP tools together in a single workflow. For example, it can read a GitHub issue, write code to fix it, test with Playwright, and create a PR — all automatically. MCP servers give Agent Mode superpowers beyond code editing."
          />
          <FAQItem
            q="Which MCP server should I install first for Cursor?"
            a="GitHub is the most impactful first MCP server for Cursor developers. While Cursor has excellent code editing, the GitHub MCP server adds structured access to PRs, issues, code review comments, and repository management. Playwright is a strong second pick for testing workflows, and Brave Search is essential if you're on Cursor's free tier (which doesn't include web search)."
          />
        </div>
      </section>

      {/* ── Internal Links ── */}
      <section className="mb-16">
        <h2 className="text-xl font-bold mb-4">More from ArloBuilds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/mcp-servers"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-violet-400 transition-colors group"
          >
            <p className="font-semibold group-hover:text-violet-700 transition-colors">
              Best MCP Servers 2026
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">25 Tested &amp; Ranked — all AI clients</p>
          </a>
          <a
            href="/mcp-servers-claude-code"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-violet-400 transition-colors group"
          >
            <p className="font-semibold group-hover:text-violet-700 transition-colors">
              Best MCP Servers for Claude Code
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">15 servers with .mcp.json configs</p>
          </a>
          <a
            href="/cursor-alternatives"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-violet-400 transition-colors group"
          >
            <p className="font-semibold group-hover:text-violet-700 transition-colors">
              Best Cursor Alternatives 2026
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">Windsurf, Copilot, Claude Code &amp; more</p>
          </a>
          <a
            href="/ai-prompt-library"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-violet-400 transition-colors group"
          >
            <p className="font-semibold group-hover:text-violet-700 transition-colors">
              Free AI Prompt Library
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">470+ prompts for developers &amp; creators</p>
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] pt-8 pb-12 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          <strong>Last updated:</strong> February 2026
        </p>
        <p className="mb-4">
          This is an independent guide. Not affiliated with Cursor, Anysphere, Anthropic, or any MCP server developer. This page contains ads.
        </p>
        <p className="text-xs">
          Official MCP resources:{" "}
          <a
            href="https://modelcontextprotocol.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            modelcontextprotocol.io
          </a>{" "}
          &middot;{" "}
          <a
            href="https://github.com/modelcontextprotocol/servers"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          &middot;{" "}
          <a
            href="https://docs.cursor.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cursor Docs
          </a>
        </p>
      </footer>
    </div>
  );
}
