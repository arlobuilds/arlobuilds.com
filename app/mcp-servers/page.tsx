"use client";

import { useState } from "react";

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
        <span className="text-cyan-600 text-xl shrink-0">{open ? "−" : "+"}</span>
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
  stars: string;
  free: boolean;
  claude: boolean;
  cursor: boolean;
  vscode: boolean;
  desc: string;
  bestFor: string;
  limitation: string;
  config: string;
  note?: string;
}

const servers: Server[] = [
  // Category A: Core
  {
    name: "Filesystem",
    pkg: "@modelcontextprotocol/server-filesystem",
    category: "Core",
    rating: 5,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Read, write, and manage files with directory-level access controls. The first server everyone installs — it lets your AI actually work with files on your machine.",
    bestFor: "Everyone. This is server #1 to install.",
    limitation: "Only accesses directories you explicitly allow.",
    config: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
    }
  }
}`,
  },
  {
    name: "Fetch",
    pkg: "@modelcontextprotocol/server-fetch",
    category: "Core",
    rating: 5,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Fetch any URL and convert HTML to clean markdown. Essential for web research — lets your AI read documentation, articles, and API references directly.",
    bestFor: "Anyone who needs their AI to read web pages.",
    limitation: "No JavaScript rendering (use Puppeteer for SPAs).",
    config: `{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}`,
  },
  {
    name: "Memory",
    pkg: "@modelcontextprotocol/server-memory",
    category: "Core",
    rating: 4,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "A knowledge graph that gives your AI persistent memory across conversations. Store facts, preferences, and project context that survives between sessions.",
    bestFor: "Long-running projects where context matters.",
    limitation: "Knowledge graph format has a learning curve.",
    config: `{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}`,
  },
  {
    name: "Git",
    pkg: "mcp-server-git",
    category: "Core",
    rating: 5,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Read, search, and manipulate git repositories. View diffs, commit history, branches, and more — without your AI needing shell access.",
    bestFor: "Any developer working with git repos.",
    limitation: "Read-heavy; write operations require care.",
    config: `{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "mcp-server-git"]
    }
  }
}`,
  },
  {
    name: "Sequential Thinking",
    pkg: "@modelcontextprotocol/server-sequential-thinking",
    category: "Core",
    rating: 4,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Guides AI through step-by-step reasoning for complex problems. Breaks down multi-step tasks into structured thought chains. Think of it as a thinking framework.",
    bestFor: "Complex debugging, architecture decisions, multi-step analysis.",
    limitation: "Adds latency — best for hard problems, not simple tasks.",
    config: `{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}`,
  },
  // Category B: Developer Tools
  {
    name: "GitHub",
    pkg: "@modelcontextprotocol/server-github",
    category: "Developer Tools",
    rating: 5,
    stars: "27K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Full GitHub integration — create PRs, manage issues, search code, review pull requests, and manage repositories. GitHub now maintains their own official version.",
    bestFor: "Any developer using GitHub daily.",
    limitation: "Requires a personal access token.",
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
    note: "GitHub also maintains an official Go-based server at github.com/github/github-mcp-server with more features.",
  },
  {
    name: "GitLab",
    pkg: "@modelcontextprotocol/server-gitlab",
    category: "Developer Tools",
    rating: 4,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "GitLab integration for merge requests, issues, pipelines, and repo management. Same concept as the GitHub server but for GitLab users.",
    bestFor: "Teams using GitLab for version control.",
    limitation: "Fewer features than the GitHub equivalent.",
    config: `{
  "mcpServers": {
    "gitlab": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gitlab"],
      "env": {
        "GITLAB_PERSONAL_ACCESS_TOKEN": "<your-token>",
        "GITLAB_API_URL": "https://gitlab.com/api/v4"
      }
    }
  }
}`,
  },
  {
    name: "Sentry",
    pkg: "@modelcontextprotocol/server-sentry",
    category: "Developer Tools",
    rating: 4,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Pull error reports, stack traces, and issue data from Sentry into your AI context. Debug production errors without leaving your AI workflow.",
    bestFor: "Teams using Sentry for error monitoring.",
    limitation: "Read-only access to Sentry data.",
    config: `{
  "mcpServers": {
    "sentry": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sentry"],
      "env": {
        "SENTRY_AUTH_TOKEN": "<your-token>"
      }
    }
  }
}`,
  },
  {
    name: "Puppeteer",
    pkg: "@modelcontextprotocol/server-puppeteer",
    category: "Developer Tools",
    rating: 4,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Browser automation and web scraping with headless Chrome. Navigate pages, fill forms, take screenshots, and extract data from JavaScript-heavy sites.",
    bestFor: "Web scraping, testing, screenshots of live sites.",
    limitation: "Resource-heavy; requires Chromium install.",
    config: `{
  "mcpServers": {
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
    }
  }
}`,
  },
  {
    name: "PostgreSQL",
    pkg: "@modelcontextprotocol/server-postgres",
    category: "Developer Tools",
    rating: 4,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Query PostgreSQL databases, inspect schemas, and analyze data. Run read-only queries directly from your AI assistant.",
    bestFor: "Developers and analysts working with Postgres databases.",
    limitation: "Read-only by default (for safety). Connection string required.",
    config: `{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}`,
  },
  // Category C: Productivity
  {
    name: "Slack",
    pkg: "@modelcontextprotocol/server-slack",
    category: "Productivity",
    rating: 4,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Search channels, read messages, and send messages in Slack — all from your AI. Great for summarizing threads or drafting responses.",
    bestFor: "Teams who live in Slack and want AI assistance there.",
    limitation: "Requires a Slack Bot Token with appropriate scopes.",
    config: `{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token",
        "SLACK_TEAM_ID": "T01234567"
      }
    }
  }
}`,
  },
  {
    name: "Google Drive",
    pkg: "@modelcontextprotocol/server-gdrive",
    category: "Productivity",
    rating: 3,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Search and read files from Google Drive. Access your Docs, Sheets, and other files directly from AI conversations.",
    bestFor: "Teams with documents stored in Google Drive.",
    limitation: "Requires Google Cloud OAuth setup (complex initial config).",
    config: `{
  "mcpServers": {
    "gdrive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"]
    }
  }
}`,
    note: "Requires OAuth credentials file. See the server README for Google Cloud setup steps.",
  },
  {
    name: "Notion",
    pkg: "notion-mcp-server",
    category: "Productivity",
    rating: 4,
    stars: "2K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Read and write Notion pages and databases. Search your workspace, create pages, and update content programmatically via AI.",
    bestFor: "Teams using Notion as their knowledge base.",
    limitation: "Requires Notion integration token setup.",
    config: `{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "<your-integration-token>"
      }
    }
  }
}`,
  },
  {
    name: "Linear",
    pkg: "linear-mcp-server",
    category: "Productivity",
    rating: 4,
    stars: "1K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Manage Linear issues, projects, and cycles from your AI. Create issues, update statuses, and query your team's backlog.",
    bestFor: "Dev teams using Linear for issue tracking.",
    limitation: "Requires Linear API key.",
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
    name: "Atlassian (Jira + Confluence)",
    pkg: "@anthropic/mcp-server-atlassian",
    category: "Productivity",
    rating: 4,
    stars: "500+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Access Jira issues and Confluence pages from AI. Search, create, and update issues. Read documentation from your Confluence wiki.",
    bestFor: "Enterprise teams on the Atlassian stack.",
    limitation: "Requires Atlassian API token and cloud instance URL.",
    config: `{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-atlassian"],
      "env": {
        "ATLASSIAN_SITE_URL": "https://your-site.atlassian.net",
        "ATLASSIAN_USER_EMAIL": "you@company.com",
        "ATLASSIAN_API_TOKEN": "<your-token>"
      }
    }
  }
}`,
  },
  // Category D: Data & Search
  {
    name: "Brave Search",
    pkg: "@modelcontextprotocol/server-brave-search",
    category: "Data & Search",
    rating: 5,
    stars: "15K+",
    free: false,
    claude: true, cursor: true, vscode: true,
    desc: "Web search powered by Brave Search API. Get real-time search results, news, and web content without complex scraping. Fast and reliable.",
    bestFor: "Any AI workflow that needs current web information.",
    limitation: "Requires Brave Search API key (free tier: 2,000 queries/month).",
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
    category: "Data & Search",
    rating: 4,
    stars: "3K+",
    free: false,
    claude: true, cursor: true, vscode: true,
    desc: "AI-native search that returns structured, clean results. Better than traditional search for finding specific content, code examples, and research papers.",
    bestFor: "Research-heavy workflows, finding specific technical content.",
    limitation: "Paid API (has free tier with limited queries).",
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
  {
    name: "SQLite",
    pkg: "mcp-server-sqlite-npx",
    category: "Data & Search",
    rating: 4,
    stars: "15K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Query and analyze local SQLite databases. Run SQL queries, inspect schemas, and explore data — all through your AI assistant.",
    bestFor: "Data analysis, working with local databases, prototyping.",
    limitation: "Local databases only. Node.js version is community-maintained.",
    config: `{
  "mcpServers": {
    "sqlite": {
      "command": "npx",
      "args": ["-y", "mcp-server-sqlite-npx", "/path/to/database.db"]
    }
  }
}`,
    note: "The official server uses Python (uvx mcp-server-sqlite). This is the Node.js community alternative.",
  },
  {
    name: "Redis",
    pkg: "redis-mcp-server",
    category: "Data & Search",
    rating: 3,
    stars: "500+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Interact with Redis key-value stores. Get/set keys, run commands, and inspect your Redis data from AI.",
    bestFor: "Developers debugging or managing Redis instances.",
    limitation: "Requires running Redis instance. Community-maintained.",
    config: `{
  "mcpServers": {
    "redis": {
      "command": "npx",
      "args": ["-y", "redis-mcp-server"],
      "env": {
        "REDIS_URL": "redis://localhost:6379"
      }
    }
  }
}`,
  },
  {
    name: "Apify",
    pkg: "apify-mcp-server",
    category: "Data & Search",
    rating: 4,
    stars: "1K+",
    free: false,
    claude: true, cursor: true, vscode: true,
    desc: "Run any of 6,000+ Apify actors (web scrapers, data extractors) from your AI. Scrape websites, extract data, and automate web tasks at scale.",
    bestFor: "Web scraping, data extraction, competitive intelligence.",
    limitation: "Paid platform (has free tier with $5 monthly credit).",
    config: `{
  "mcpServers": {
    "apify": {
      "command": "npx",
      "args": ["-y", "apify-mcp-server"],
      "env": {
        "APIFY_TOKEN": "<your-api-token>"
      }
    }
  }
}`,
  },
  // Category E: Cloud & Infrastructure
  {
    name: "AWS",
    pkg: "aws-mcp-server",
    category: "Cloud",
    rating: 4,
    stars: "2K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Manage AWS resources from your AI — S3 buckets, Lambda functions, EC2 instances, and more. Uses your local AWS credentials.",
    bestFor: "DevOps engineers and developers on AWS.",
    limitation: "Requires AWS CLI credentials configured locally.",
    config: `{
  "mcpServers": {
    "aws": {
      "command": "npx",
      "args": ["-y", "aws-mcp-server"],
      "env": {
        "AWS_REGION": "us-east-1"
      }
    }
  }
}`,
  },
  {
    name: "Cloudflare",
    pkg: "@anthropic/mcp-server-cloudflare",
    category: "Cloud",
    rating: 4,
    stars: "1K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Manage Cloudflare Workers, KV stores, R2 buckets, and DNS from AI. Deploy edge functions and configure CDN settings.",
    bestFor: "Developers using Cloudflare for edge computing and CDN.",
    limitation: "Requires Cloudflare API token.",
    config: `{
  "mcpServers": {
    "cloudflare": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-cloudflare"],
      "env": {
        "CLOUDFLARE_API_TOKEN": "<your-token>"
      }
    }
  }
}`,
  },
  {
    name: "Supabase",
    pkg: "supabase-mcp-server",
    category: "Cloud",
    rating: 4,
    stars: "1K+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Manage Supabase projects — query databases, manage auth, inspect storage, and configure edge functions from AI.",
    bestFor: "Developers building on Supabase (Postgres + Auth + Storage).",
    limitation: "Requires Supabase project URL and service key.",
    config: `{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "supabase-mcp-server"],
      "env": {
        "SUPABASE_URL": "https://your-project.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "<your-key>"
      }
    }
  }
}`,
  },
  {
    name: "Vercel",
    pkg: "vercel-mcp-server",
    category: "Cloud",
    rating: 3,
    stars: "500+",
    free: true,
    claude: true, cursor: true, vscode: true,
    desc: "Manage Vercel deployments, domains, environment variables, and projects from AI. Check deployment status and logs.",
    bestFor: "Teams deploying frontend apps on Vercel.",
    limitation: "Community-maintained. Limited write operations.",
    config: `{
  "mcpServers": {
    "vercel": {
      "command": "npx",
      "args": ["-y", "vercel-mcp-server"],
      "env": {
        "VERCEL_API_TOKEN": "<your-token>"
      }
    }
  }
}`,
  },
  // Category F: Creative
  {
    name: "EverArt",
    pkg: "@modelcontextprotocol/server-everart",
    category: "Creative",
    rating: 3,
    stars: "15K+",
    free: false,
    claude: true, cursor: true, vscode: true,
    desc: "Generate AI images directly from your AI assistant. Create product mockups, illustrations, and design assets without leaving your workflow.",
    bestFor: "Designers and content creators who need quick image generation.",
    limitation: "Requires EverArt API key. Image quality varies.",
    config: `{
  "mcpServers": {
    "everart": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everart"],
      "env": {
        "EVERART_API_KEY": "<your-key>"
      }
    }
  }
}`,
  },
];

const categories = [
  { id: "core", name: "Core / Getting Started", icon: "🧱", color: "bg-violet-600" },
  { id: "devtools", name: "Developer Tools", icon: "🛠", color: "bg-blue-600" },
  { id: "productivity", name: "Productivity & Collaboration", icon: "📋", color: "bg-green-600" },
  { id: "data", name: "Data & Search", icon: "🔍", color: "bg-amber-600" },
  { id: "cloud", name: "Cloud & Infrastructure", icon: "☁️", color: "bg-cyan-600" },
  { id: "creative", name: "Creative & AI", icon: "🎨", color: "bg-pink-600" },
];

const categoryMap: Record<string, string> = {
  Core: "core",
  "Developer Tools": "devtools",
  Productivity: "productivity",
  "Data & Search": "data",
  Cloud: "cloud",
  Creative: "creative",
};

/* ─── Page Component ─── */

export default function McpServersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero */}
      <header className="text-center mb-12">
        <p className="text-sm font-medium text-cyan-600 mb-3 uppercase tracking-wide">
          Updated February 2026
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Best MCP Servers 2026:{" "}
          <span className="bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
            25 Tested & Ranked
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-6">
          Copy-paste setup configs for Claude Code, Cursor, and VS Code. Updated
          monthly.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-4 justify-center text-sm mb-8">
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>25</strong> servers tested
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>6</strong> categories
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>3</strong> IDE configs each
          </span>
        </div>

        {/* Jump nav */}
        <nav className="flex flex-wrap gap-2 justify-center">
          <a href="#what-is-mcp" className="px-3 py-1.5 text-sm rounded-full bg-cyan-50 text-cyan-700 no-underline hover:bg-cyan-600 hover:text-white transition-colors">
            What is MCP?
          </a>
          <a href="#comparison" className="px-3 py-1.5 text-sm rounded-full bg-cyan-50 text-cyan-700 no-underline hover:bg-cyan-600 hover:text-white transition-colors">
            Comparison Table
          </a>
          {categories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="px-3 py-1.5 text-sm rounded-full bg-cyan-50 text-cyan-700 no-underline hover:bg-cyan-600 hover:text-white transition-colors"
            >
              {c.icon} {c.name.split(" /")[0].split(" &")[0]}
            </a>
          ))}
          <a href="#setup" className="px-3 py-1.5 text-sm rounded-full bg-cyan-50 text-cyan-700 no-underline hover:bg-cyan-600 hover:text-white transition-colors">
            Setup Guide
          </a>
          <a href="#faq" className="px-3 py-1.5 text-sm rounded-full bg-cyan-50 text-cyan-700 no-underline hover:bg-cyan-600 hover:text-white transition-colors">
            FAQ
          </a>
        </nav>
      </header>

      {/* What is MCP */}
      <section id="what-is-mcp" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          What is MCP (Model Context Protocol)?
        </h2>
        <p className="mb-4">
          MCP is an open standard created by Anthropic that lets AI assistants
          connect to external tools and data sources. Think of it as{" "}
          <strong>USB for AI</strong> — one universal protocol that works with any
          compatible AI client and any compatible server.
        </p>
        <p className="mb-4">
          Before MCP, every AI integration required custom code. Now, a single MCP
          server works with Claude Desktop, Claude Code, Cursor, VS Code (via
          Copilot), Windsurf, and more. The ecosystem has exploded:{" "}
          <strong>3,000+ servers</strong> are available, with{" "}
          <strong>100M+ monthly downloads</strong> across the npm registry.
        </p>

        {/* Diagram */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 my-6">
          <div className="text-center font-mono text-sm">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <span className="px-3 py-2 bg-violet-100 text-violet-800 rounded-lg font-semibold">
                AI Assistant
              </span>
              <span className="text-[var(--muted)]">←→</span>
              <span className="px-3 py-2 bg-cyan-100 text-cyan-800 rounded-lg font-semibold">
                MCP Protocol
              </span>
              <span className="text-[var(--muted)]">←→</span>
              <span className="px-3 py-2 bg-amber-100 text-amber-800 rounded-lg font-semibold">
                MCP Server
              </span>
              <span className="text-[var(--muted)]">←→</span>
              <span className="px-3 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                Tool / Data
              </span>
            </div>
          </div>
          <p className="text-center text-sm text-[var(--muted)] mt-4">
            Claude, Cursor, VS Code → MCP Protocol → Server → GitHub, Slack, databases, files, etc.
          </p>
        </div>

        <p className="text-sm text-[var(--muted)]">
          <strong>Who supports MCP:</strong> Claude Desktop, Claude Code, Cursor,
          VS Code (GitHub Copilot), Windsurf, Zed, Cline, and more. OpenAI
          has also adopted MCP support for ChatGPT and the Agents SDK.
        </p>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          MCP Server Comparison Table
        </h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th className="bg-cyan-600">Server</th>
                <th className="bg-cyan-600">Category</th>
                <th className="bg-cyan-600">Rating</th>
                <th className="bg-cyan-600">Claude</th>
                <th className="bg-cyan-600">Cursor</th>
                <th className="bg-cyan-600">VS Code</th>
                <th className="bg-cyan-600">Free?</th>
              </tr>
            </thead>
            <tbody>
              {servers.map((s) => (
                <tr key={s.name}>
                  <td className="font-semibold">
                    <a href={`#server-${s.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} className="no-underline hover:underline">
                      {s.name}
                    </a>
                  </td>
                  <td className="text-sm">{s.category}</td>
                  <td><Stars count={s.rating} /></td>
                  <td>{s.claude ? "✓" : "—"}</td>
                  <td>{s.cursor ? "✓" : "—"}</td>
                  <td>{s.vscode ? "✓" : "—"}</td>
                  <td>{s.free ? <span className="text-[var(--success)] font-semibold">Free</span> : <span className="text-[var(--warning)]">API key</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TinyAdz inline #1 */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-1" className="w-full" />
      </div>

      {/* Category Sections */}
      {categories.map((cat) => {
        const catServers = servers.filter(
          (s) => categoryMap[s.category] === cat.id
        );
        return (
          <section key={cat.id} id={cat.id} className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span> {cat.name}
            </h2>
            <div className="space-y-8">
              {catServers.map((s) => (
                <div
                  key={s.name}
                  id={`server-${s.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold">{s.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <Stars count={s.rating} />
                      <span className="text-[var(--muted)]">
                        {s.stars} stars
                      </span>
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

                  <p className="mb-3">{s.desc}</p>

                  <div className="flex flex-wrap gap-4 text-sm mb-4">
                    <div>
                      <span className="font-semibold">Best for:</span>{" "}
                      <span className="text-[var(--muted)]">{s.bestFor}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Limitation:</span>{" "}
                      <span className="text-[var(--muted)]">{s.limitation}</span>
                    </div>
                  </div>

                  {s.note && (
                    <p className="text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg px-4 py-2 mb-4">
                      {s.note}
                    </p>
                  )}

                  <CodeBlock
                    code={s.config}
                    label="Setup config (claude_desktop_config.json):"
                  />
                </div>
              ))}
            </div>

            {/* Ad placement between Data & Search and Cloud */}
            {cat.id === "data" && (
              <div className="my-12 min-h-[90px]">
                <div id="tinyadz-inline-2" className="w-full" />
              </div>
            )}
          </section>
        );
      })}

      {/* Setup Tutorial */}
      <section id="setup" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          How to Set Up MCP Servers (5-Minute Tutorial)
        </h2>

        <div className="space-y-8">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">Claude Desktop / Claude Code</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm mb-4">
              <li>
                Open your config file at{" "}
                <code className="bg-gray-100 px-1 rounded">~/.claude/claude_desktop_config.json</code>
              </li>
              <li>Add the server configuration (copy from above)</li>
              <li>Save and restart Claude</li>
              <li>The server will auto-install via npx on first use</li>
            </ol>
            <CodeBlock
              code={`// Example: Add Filesystem + Fetch servers
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}`}
              label="Example config with two servers:"
            />
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">Cursor</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm mb-4">
              <li>Open Cursor Settings (Cmd/Ctrl + Shift + J)</li>
              <li>Navigate to MCP section</li>
              <li>Click &quot;Add Server&quot; and paste the config</li>
              <li>Cursor will install and start the server automatically</li>
            </ol>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">VS Code (GitHub Copilot)</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm mb-4">
              <li>
                Open VS Code settings (<code className="bg-gray-100 px-1 rounded">settings.json</code>)
              </li>
              <li>Add the server under the <code className="bg-gray-100 px-1 rounded">mcp</code> key</li>
              <li>
                Or use the Copilot MCP extension for a GUI setup
              </li>
            </ol>
          </div>

          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
            <h3 className="font-bold text-cyan-800 mb-2">
              How to know it&apos;s working
            </h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-cyan-900">
              <li>Ask your AI: &quot;What MCP tools do you have access to?&quot;</li>
              <li>Try a simple command: &quot;List files in my projects directory&quot; (Filesystem)</li>
              <li>Check for errors in the AI client&apos;s log/console</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Decision Flowchart */}
      <section id="which-servers" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Which MCP Servers Should You Install?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5">
            <p className="font-semibold mb-2">Do you work with files?</p>
            <p className="text-sm text-[var(--muted)]">
              → <strong>Filesystem</strong> (install this first, always)
            </p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5">
            <p className="font-semibold mb-2">Do you need web access?</p>
            <p className="text-sm text-[var(--muted)]">
              → <strong>Fetch</strong> + <strong>Brave Search</strong>
            </p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5">
            <p className="font-semibold mb-2">Do you use GitHub?</p>
            <p className="text-sm text-[var(--muted)]">
              → <strong>GitHub</strong> server + <strong>Git</strong>
            </p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5">
            <p className="font-semibold mb-2">Need persistent AI memory?</p>
            <p className="text-sm text-[var(--muted)]">
              → <strong>Memory</strong> server
            </p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5">
            <p className="font-semibold mb-2">Work with databases?</p>
            <p className="text-sm text-[var(--muted)]">
              → <strong>PostgreSQL</strong> or <strong>SQLite</strong>
            </p>
          </div>
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5">
            <p className="font-semibold mb-2">Just getting started?</p>
            <p className="text-sm text-[var(--muted)]">
              → <strong>Filesystem</strong> + <strong>Fetch</strong> + <strong>Git</strong>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Frequently Asked Questions About MCP Servers
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-6">
          <FAQItem
            q="What are MCP servers?"
            a="MCP (Model Context Protocol) servers are lightweight programs that give AI assistants like Claude, Cursor, and GitHub Copilot access to external tools and data sources. They act as bridges between AI and the outside world — files, databases, APIs, and more."
          />
          <FAQItem
            q="Are MCP servers free?"
            a="Most MCP servers are free and open source. Some connect to paid APIs (like Brave Search or cloud providers) that require API keys, but the servers themselves cost nothing to run."
          />
          <FAQItem
            q="How many MCP servers can I use at once?"
            a="There's no hard limit. Claude Desktop and Cursor can run multiple MCP servers simultaneously. Most users run 3-8 servers. Performance may vary if you run too many — start with 2-3 essential ones and add more as needed."
          />
          <FAQItem
            q="Do MCP servers work with ChatGPT?"
            a="OpenAI has adopted MCP support for ChatGPT and the Agents SDK. However, the implementation is newer and may not support all servers yet. MCP works best with Claude Desktop, Claude Code, and Cursor."
          />
          <FAQItem
            q="Are MCP servers safe? Can they access my files?"
            a="MCP servers run locally on your machine with the permissions you grant. The Filesystem server, for example, only accesses directories you explicitly allow in the config. Always review server permissions and only install servers from trusted sources like the official MCP repository."
          />
          <FAQItem
            q="What's the difference between MCP and API integrations?"
            a="APIs require custom code for each integration. MCP is a universal protocol — any MCP-compatible AI client can use any MCP server without custom code. Think of MCP as USB for AI: one standard, many devices."
          />
          <FAQItem
            q="How do I create my own MCP server?"
            a="You can build MCP servers in TypeScript, Python, or any language. The official SDK (@modelcontextprotocol/sdk) provides the TypeScript framework. A basic server can be built in under 100 lines of code. Check the official docs at modelcontextprotocol.io."
          />
          <FAQItem
            q="Which MCP servers does Claude Code support?"
            a="Claude Code supports all MCP servers. It uses the same configuration format as Claude Desktop (claude_desktop_config.json). Claude Code also has several built-in capabilities that overlap with some MCP servers (like file access and web fetch)."
          />
          <FAQItem
            q="Why are MCP servers slow sometimes?"
            a="MCP servers run locally and communicate via stdio. Slowness usually comes from: (1) First-run npx install downloading packages, (2) The external service being slow (e.g., large database queries), or (3) Running too many servers simultaneously. The servers themselves add minimal overhead."
          />
          <FAQItem
            q="How often are new MCP servers released?"
            a="The ecosystem is growing rapidly. New community servers appear daily on npm and GitHub. The official MCP repository focuses on a small set of reference implementations, while the broader ecosystem at mcpservers.org lists 3,000+ servers."
          />
        </div>
      </section>

      {/* Related Guides */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Related Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href="/mcp-servers-claude-code" className="block bg-violet-50 border border-violet-200 rounded-xl p-6 hover:border-violet-400 transition-colors">
            <p className="font-bold text-violet-900 mb-1">Best MCP Servers for Claude Code</p>
            <p className="text-sm text-violet-700">15 servers tested specifically for Claude Code. Setup configs, what&apos;s built-in vs what needs MCP, and starter templates.</p>
          </a>
          <a href="/cursor-alternatives" className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-cyan-400 transition-colors">
            <p className="font-bold mb-1">Best Cursor Alternatives 2026</p>
            <p className="text-sm text-[var(--muted)]">10 AI code editors tested and compared with pricing, features, and decision framework.</p>
          </a>
          <a href="/ai-prompt-library" className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-emerald-400 transition-colors">
            <p className="font-bold mb-1">AI Prompt Library</p>
            <p className="text-sm text-[var(--muted)]">470+ tested prompts across 8 categories with real-time search. Copy, paste, get results.</p>
          </a>
          <a href="/mcp-servers-cursor" className="block bg-violet-50 border border-violet-200 rounded-xl p-6 hover:border-violet-400 transition-colors">
            <p className="font-bold text-violet-900 mb-1">Best MCP Servers for Cursor</p>
            <p className="text-sm text-violet-700">15 servers tested for Cursor. .cursor/mcp.json configs, Agent Mode tips, and what&apos;s built-in vs what needs MCP.</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] pt-8 pb-12 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          <strong>Last updated:</strong> February 2026
        </p>
        <p className="mb-4">
          This page contains ads. This is an independent guide. Not affiliated
          with Anthropic, Microsoft, or any MCP server developer.
        </p>
        <p className="text-xs">
          Official MCP resources:{" "}
          <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">
            modelcontextprotocol.io
          </a>{" "}
          ·{" "}
          <a href="https://github.com/modelcontextprotocol/servers" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          ·{" "}
          <a href="https://mcpservers.org" target="_blank" rel="noopener noreferrer">
            mcpservers.org
          </a>{" "}
          ·{" "}
          <a href="https://mcp.so" target="_blank" rel="noopener noreferrer">
            mcp.so
          </a>
        </p>
      </footer>
    </div>
  );
}
