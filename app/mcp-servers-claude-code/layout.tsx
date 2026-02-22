import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best MCP Servers for Claude Code 2026: 15 Tested & Ranked",
  description:
    "The best MCP servers for Claude Code in 2026. 15 servers tested specifically for Claude Code workflows with copy-paste setup commands, config examples, and tips on what's built-in vs what needs MCP.",
  openGraph: {
    title: "Best MCP Servers for Claude Code 2026: Tested & Ranked",
    description:
      "15 MCP servers tested specifically for Claude Code. Setup commands, config examples, and what's built-in vs what needs MCP.",
    type: "article",
    locale: "en_US",
  },
};

const servers = [
  "GitHub",
  "Playwright",
  "PostgreSQL",
  "Supabase",
  "Stripe",
  "Sentry",
  "Brave Search",
  "Exa",
  "Slack",
  "Linear",
  "Notion",
  "SQLite",
  "Docker",
  "Cloudflare",
  "Redis",
];

export default function McpServersClaudeCodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Best MCP Servers for Claude Code 2026: 15 Tested & Ranked",
            datePublished: "2026-02-22",
            dateModified: "2026-02-22",
            author: { "@type": "Organization", name: "ArloBuilds" },
            description:
              "The best MCP servers for Claude Code in 2026. 15 servers tested with setup commands and config examples.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Best MCP Servers for Claude Code 2026",
            numberOfItems: 15,
            itemListElement: servers.map((name, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "How do I add MCP servers to Claude Code?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Add MCP servers to Claude Code by editing your settings file. For project-level config, create .mcp.json in your project root. For global config, edit ~/.claude/settings.json. Add your server under the mcpServers key with the command and args fields. Claude Code will auto-install and connect on next start.",
                },
              },
              {
                "@type": "Question",
                name: "What does Claude Code have built-in without MCP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Claude Code has built-in file system access (read, write, edit, glob, grep), bash/terminal execution, web fetch for URLs, and code editing tools. You don't need MCP servers for basic file operations, git commands, or fetching web pages. MCP adds value for structured API access like GitHub PRs, databases, browser automation, and third-party integrations.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between .mcp.json and settings.json for Claude Code?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The .mcp.json file is project-level configuration that lives in your project root and gets shared with your team via git. The ~/.claude/settings.json file is your global personal configuration. Use .mcp.json for project-specific servers (like a project's database) and settings.json for servers you want everywhere (like GitHub or Brave Search).",
                },
              },
              {
                "@type": "Question",
                name: "Do I need the Filesystem MCP server with Claude Code?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Claude Code has built-in file system access that's actually more capable than the MCP Filesystem server. Claude Code can read, write, edit, glob search, and grep files natively. The Filesystem MCP server is mainly needed for Claude Desktop, not Claude Code.",
                },
              },
              {
                "@type": "Question",
                name: "How many MCP servers can Claude Code run at once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Claude Code can run many MCP servers simultaneously. There's no hard limit. Most power users run 4-8 servers. Each server runs as a separate process, so running too many (15+) may use noticeable memory. Start with 3-5 essential ones for your workflow.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use MCP servers with Claude Code on Windows?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Claude Code works on macOS, Linux, and Windows (via WSL). MCP servers that use npx or uvx commands work on all platforms. Some servers may need slight config adjustments for Windows paths. The .mcp.json and settings.json format is the same across platforms.",
                },
              },
              {
                "@type": "Question",
                name: "Which MCP server should I install first for Claude Code?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GitHub is the most impactful first MCP server for Claude Code developers. While Claude Code can run git commands via bash, the GitHub MCP server adds structured access to PRs, issues, code search, and repo management that bash alone can't match efficiently. Brave Search or Playwright are strong second picks depending on your workflow.",
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}
