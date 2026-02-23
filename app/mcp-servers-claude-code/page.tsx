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
    desc: "Full GitHub integration — create and review PRs, manage issues, search code across repositories, and manage releases. Claude Code can run git via bash but can&apos;t efficiently manage PRs, issue comments, or code search without this.",
    bestFor: "Any developer using GitHub daily. Especially valuable for PR review and issue triage workflows.",
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
    desc: "Full browser automation — navigate pages, click elements, fill forms, take screenshots, and run end-to-end tests. Claude Code&apos;s built-in web fetch can fetch HTML but cannot render JavaScript or interact with page elements.",
    bestFor: "E2E testing, web scraping JavaScript-heavy sites, visual regression checks, and UI automation.",
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
    desc: "Pull error reports, stack traces, and issue details from Sentry directly into your Claude Code context. Debug production errors without leaving your coding workflow.",
    bestFor: "Teams using Sentry for error monitoring. Especially useful when debugging production incidents.",
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
    desc: "Query PostgreSQL databases, inspect schemas, check table structures, and run migrations — all from Claude Code. Far more efficient than manually copying SQL output into the conversation.",
    bestFor: "Any project with a Postgres database. Schema exploration and query debugging are especially powerful.",
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
    desc: "Interact with Redis — get/set keys, inspect cache contents, run pub/sub commands, and debug your cache layer from Claude Code.",
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
    desc: "Real-time web search powered by the Brave Search API. Claude Code&apos;s built-in fetch retrieves a specific URL, but cannot search the web. This fills that gap with fast, reliable results.",
    bestFor: "Any workflow requiring current web information: library docs, news, competitive research.",
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
    desc: "Read channel history, search messages, send messages, and manage Slack from Claude Code. Great for keeping team context in sync with your coding workflow.",
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
    desc: "Create and update issues, manage projects, query your team&apos;s backlog, and track cycles in Linear. Turn code changes into Linear issues without leaving Claude Code.",
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
    desc: "Read and search Notion pages and databases. Useful for pulling in documentation, project specs, or knowledge base content into Claude Code context.",
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
    desc: "Full Stripe access — manage customers, products, prices, payment intents, subscriptions, and invoices from Claude Code. Essential for SaaS developers who work with Stripe daily.",
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
    desc: "Manage Docker containers, images, volumes, and compose stacks from Claude Code. Build images, inspect running containers, read logs, and execute commands in containers.",
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
    note: "Requires Docker Desktop to be running. Start Docker Desktop before launching Claude Code.",
  },
  {
    name: "Cloudflare",
    pkg: "@cloudflare/mcp-server-cloudflare",
    category: "Infrastructure & DevOps",
    rating: 3,
    free: true,
    desc: "Manage Cloudflare Workers, KV namespaces, D1 databases, R2 buckets, and DNS records from Claude Code. Deploy edge functions and configure your Cloudflare setup.",
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

export default function McpServersClaudeCodePage() {
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
          CLAUDE CODE GUIDE — FEBRUARY 2026
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Best MCP Servers for{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Claude Code
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-6">
          Claude Code already handles files, bash, and web fetch natively. These are the 15 MCP servers that actually add new capabilities — with copy-paste configs for every one.
        </p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-3 justify-center text-sm mb-8">
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>15 servers</strong> tested
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            Copy-paste configs
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            Claude Code specific
          </span>
        </div>
      </header>

      {/* ── What Claude Code Has Built-In ── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          What Claude Code Already Has Built-In
        </h2>
        <p className="text-[var(--muted)] mb-6">
          Before adding MCP servers, understand what Claude Code gives you out of the box. These are native capabilities — you do NOT need MCP for any of them.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-semibold mb-2 text-violet-700">File System</div>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>Read files</li>
              <li>Write &amp; edit files</li>
              <li>Glob search</li>
              <li>Grep content</li>
              <li>Directory listing</li>
            </ul>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-semibold mb-2 text-violet-700">Bash / Terminal</div>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>Run any shell command</li>
              <li>Git operations</li>
              <li>npm / yarn / pnpm</li>
              <li>Build scripts</li>
              <li>Test runners</li>
            </ul>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-semibold mb-2 text-violet-700">Web Fetch</div>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>Fetch any URL</li>
              <li>Read documentation</li>
              <li>HTML to markdown</li>
              <li>API responses</li>
              <li>Static pages</li>
            </ul>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4">
            <div className="font-semibold mb-2 text-violet-700">Code Editing</div>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>Multi-file edits</li>
              <li>Refactoring</li>
              <li>200K context window</li>
              <li>Extended thinking</li>
              <li>Auto-memory</li>
            </ul>
          </div>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-6">
          <p className="font-semibold text-violet-900 mb-2">So what DOES need MCP?</p>
          <p className="text-sm text-violet-800 leading-relaxed">
            Structured API access (GitHub PRs, Linear issues, Stripe customers), browser automation with JavaScript rendering, direct database connections with schema awareness, and third-party integrations that go beyond simple HTTP requests. If the task requires an authenticated API session, real-time data, or interactive browser behavior — that&apos;s where MCP adds genuine value.
          </p>
        </div>
      </section>

      {/* ── Category Filter + Server Listings ── */}
      <section className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          15 Best MCP Servers for Claude Code
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
          {filteredServers.map((s) => (
            <div
              key={s.name}
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

              <CodeBlock code={s.config} label=".mcp.json config:" />
            </div>
          ))}
        </div>
      </section>

      {/* ── TinyAdz slot 1 ── */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-1" className="w-full" />
      </div>

      {/* ── Claude Code Setup Guide ── */}
      <section id="setup" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          How to Add MCP Servers to Claude Code
        </h2>
        <p className="text-[var(--muted)] mb-8">
          Claude Code uses two config locations. Project-level config is shared with your team; global config is personal. Both use the same JSON format.
        </p>

        <div className="space-y-6">

          {/* Project-level */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-0.5 bg-violet-100 text-violet-800 text-xs font-semibold rounded-full border border-violet-200">Recommended</span>
              <h3 className="font-bold text-lg">Project-level: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.mcp.json</code></h3>
            </div>
            <p className="text-sm text-[var(--muted)] mb-4">
              Place <code className="bg-gray-100 px-1 rounded">.mcp.json</code> in your project root. Commit it to git so the whole team gets the same MCP servers. Best for project-specific servers like your project&apos;s database.
            </p>
            <CodeBlock
              code={`// .mcp.json — project root, commit to git
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
              label=".mcp.json example:"
            />
          </div>

          {/* Global */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">Global: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">~/.claude/settings.json</code></h3>
            <p className="text-sm text-[var(--muted)] mb-4">
              Your personal global config. Servers here are available in every Claude Code session across all projects. Best for tools you always want: GitHub, Brave Search, Slack.
            </p>
            <CodeBlock
              code={`// ~/.claude/settings.json — global, personal
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "your-brave-api-key"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}`}
              label="~/.claude/settings.json example:"
            />
          </div>

          {/* Key differences */}
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold mb-4">Project vs Global: When to Use Which</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-violet-700 mb-2">.mcp.json (Project)</p>
                <ul className="space-y-1 text-[var(--muted)]">
                  <li>Your project&apos;s database connection</li>
                  <li>Project-specific Sentry org</li>
                  <li>Shared with teammates via git</li>
                  <li>Environment-specific settings</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-violet-700 mb-2">settings.json (Global)</p>
                <ul className="space-y-1 text-[var(--muted)]">
                  <li>GitHub (same token everywhere)</li>
                  <li>Brave Search (always useful)</li>
                  <li>Slack (personal workspace)</li>
                  <li>Playwright (general browser use)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tip */}
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-5">
            <p className="text-sm text-violet-900">
              <strong>Tip:</strong> Run <code className="bg-violet-100 px-1.5 py-0.5 rounded">claude mcp list</code> in your terminal to see all active MCP servers in the current session. Run <code className="bg-violet-100 px-1.5 py-0.5 rounded">claude mcp add</code> for an interactive setup wizard.
            </p>
          </div>
        </div>
      </section>

      {/* ── What You Don't Need ── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          MCP Servers You Don&apos;t Need with Claude Code
        </h2>
        <p className="text-[var(--muted)] mb-6">
          These servers are popular on the /mcp-servers list but are redundant with Claude Code&apos;s built-in capabilities. Skip them.
        </p>
        <div className="space-y-3">
          {[
            {
              name: "Filesystem MCP",
              reason: "Claude Code has built-in Read, Write, Edit, Glob, and Grep file tools. Filesystem MCP is designed for Claude Desktop which lacks these.",
            },
            {
              name: "Fetch MCP",
              reason: "Claude Code has a built-in web fetch tool that fetches URLs and converts HTML to markdown. The Fetch MCP server duplicates this.",
            },
            {
              name: "Git MCP",
              reason: "Claude Code runs bash natively. git commands (status, log, diff, commit, push) all work via the bash tool without any MCP setup.",
            },
            {
              name: "Sequential Thinking MCP",
              reason: "Claude Code has extended thinking built in. The sequential thinking server was designed to help models that lack strong reasoning — Claude Code doesn&apos;t need it.",
            },
            {
              name: "Memory MCP",
              reason: "Claude Code has CLAUDE.md for persistent project context and auto-memory features. The Memory knowledge graph adds complexity without much benefit for most workflows.",
            },
          ].map((item) => (
            <div
              key={item.name}
              className="flex gap-4 bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-5 py-4"
            >
              <span className="text-slate-400 font-bold mt-0.5 shrink-0">—</span>
              <div>
                <span className="font-semibold">{item.name}: </span>
                <span className="text-[var(--muted)] text-sm">{item.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Starter Configs ── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Ready-Made Starter Configs
        </h2>
        <p className="text-[var(--muted)] mb-8">
          Copy one of these into your project&apos;s <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm">.mcp.json</code> to get started instantly. Add your API keys and you&apos;re live.
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
            q="How do I add MCP servers to Claude Code?"
            a="Add MCP servers by editing your config files. For project-level config, create .mcp.json in your project root and commit it to git. For global personal config, edit ~/.claude/settings.json. Add your server under the mcpServers key with command and args fields. Claude Code auto-installs via npx on first use — no separate install step needed."
          />
          <FAQItem
            q="What does Claude Code have built-in without MCP?"
            a="Claude Code has built-in file system access (Read, Write, Edit, Glob, Grep), bash/terminal execution for running any shell command, web fetch for fetching URLs and reading pages, and code editing tools with 200K context. You don't need MCP for basic file operations, git commands, or fetching web pages. MCP adds value for structured API access, browser automation, database connections, and third-party integrations."
          />
          <FAQItem
            q="What is the difference between .mcp.json and settings.json?"
            a="The .mcp.json file is project-level configuration that lives in your project root and gets shared with your team via git. It's ideal for project-specific servers like your project's database connection. The ~/.claude/settings.json file is your global personal configuration — servers here are available in every Claude Code session. Use settings.json for tools you always want like GitHub, Brave Search, and Playwright."
          />
          <FAQItem
            q="Do I need the Filesystem MCP server with Claude Code?"
            a="No. Claude Code has built-in file tools that are more capable than the Filesystem MCP server. Claude Code can natively read, write, edit, glob search, and grep files. The Filesystem MCP server was designed for Claude Desktop, which lacks these native capabilities. Installing it with Claude Code is redundant."
          />
          <FAQItem
            q="How many MCP servers can Claude Code run at once?"
            a="There is no hard limit. Most power users run 4 to 8 servers comfortably. Each server runs as a separate process, so running 15 or more may use noticeable memory. Start with 3 to 5 essential ones for your workflow and add more as needed. Use claude mcp list to see what's active."
          />
          <FAQItem
            q="Can I use MCP servers with Claude Code on Windows?"
            a="Yes. Claude Code works on macOS, Linux, and Windows via WSL (Windows Subsystem for Linux). MCP servers using npx commands work on all platforms. Some servers may need slight config adjustments for Windows file paths. The .mcp.json and settings.json format is identical across platforms."
          />
          <FAQItem
            q="Which MCP server should I install first for Claude Code?"
            a="GitHub is the most impactful first MCP server for developers. While Claude Code can run git commands via bash, the GitHub MCP server adds structured access to PRs, issues, code review comments, and repository management that bash alone can't match efficiently. Brave Search or Playwright are strong second picks depending on whether you need web search or browser automation more."
          />
        </div>
      </section>

      {/* ── TinyAdz slot 2 ── */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-2" className="w-full" />
      </div>

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
          <a
            href="/mcp-servers-cursor"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-violet-400 transition-colors group"
          >
            <p className="font-semibold group-hover:text-violet-700 transition-colors">
              Best MCP Servers for Cursor
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">15 servers with .cursor/mcp.json configs</p>
          </a>
        </div>
      </section>

      {/* Agent Playbook CTA */}
      <section className="mb-12 bg-gray-900 border border-gray-700 rounded-xl p-6 sm:p-8 text-center">
        <p className="text-xs font-semibold text-emerald-400 tracking-wider uppercase mb-2">From ArloBuilds</p>
        <p className="text-lg font-bold text-white mb-2">The Agent Playbook</p>
        <p className="text-sm text-gray-400 mb-4 max-w-lg mx-auto">
          Go beyond individual MCP servers. Learn how to orchestrate 7 AI agents with shared memory, queue messaging, and autonomous scheduling.
        </p>
        <a href="/agent-playbook" className="inline-block px-6 py-2.5 rounded-lg bg-emerald-500 text-gray-950 font-semibold text-sm hover:bg-emerald-400 transition-colors">
          Learn more — $29
        </a>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] pt-8 pb-12 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          <strong>Last updated:</strong> February 2026
        </p>
        <p className="mb-4">
          This is an independent guide. Not affiliated with Anthropic or any MCP server developer. This page contains ads.
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
            href="https://docs.anthropic.com/en/docs/claude-code/mcp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude Code MCP docs
          </a>
        </p>
      </footer>
    </div>
  );
}
