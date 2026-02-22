import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best MCP Servers 2026: 25 Tested & Ranked (With Setup Guides)",
  description:
    "The definitive guide to MCP servers in 2026. 25 servers tested and ranked across 6 categories with copy-paste setup commands for Claude Code, Cursor, and VS Code. Updated monthly.",
  openGraph: {
    title: "Best MCP Servers 2026: Tested & Ranked",
    description:
      "The definitive guide to MCP servers in 2026. 25 servers tested and ranked across 6 categories with copy-paste setup commands for Claude Code, Cursor, and VS Code.",
    type: "article",
    locale: "en_US",
  },
};

const servers = [
  "Filesystem", "Fetch", "Memory", "Git", "Sequential Thinking",
  "GitHub", "GitLab", "Sentry", "Puppeteer", "PostgreSQL",
  "Slack", "Google Drive", "Notion", "Linear", "Atlassian",
  "Brave Search", "Exa", "SQLite", "Redis", "Apify",
  "AWS", "Cloudflare", "Supabase", "Vercel", "EverArt",
];

export default function McpServersLayout({
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
              "Best MCP Servers 2026: 25 Tested & Ranked (With Setup Guides)",
            datePublished: "2026-02-22",
            dateModified: "2026-02-22",
            author: { "@type": "Organization", name: "ArloBuilds" },
            description:
              "The definitive guide to MCP servers in 2026. 25 servers tested and ranked across 6 categories with copy-paste setup commands.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Best MCP Servers 2026",
            numberOfItems: 25,
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
                name: "What are MCP servers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MCP (Model Context Protocol) servers are lightweight programs that give AI assistants like Claude, Cursor, and GitHub Copilot access to external tools and data sources. They act as bridges between AI and the outside world.",
                },
              },
              {
                "@type": "Question",
                name: "Are MCP servers free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most MCP servers are free and open source. Some connect to paid APIs (like Brave Search or cloud providers) that require API keys, but the servers themselves cost nothing to run.",
                },
              },
              {
                "@type": "Question",
                name: "How many MCP servers can I use at once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "There's no hard limit. Claude Desktop and Cursor can run multiple MCP servers simultaneously. Most users run 3-8 servers. Performance may vary if you run too many — start with 2-3 essential ones and add more as needed.",
                },
              },
              {
                "@type": "Question",
                name: "Do MCP servers work with ChatGPT?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. OpenAI has adopted MCP support for ChatGPT and the Agents SDK. MCP is also natively supported by Claude Desktop, Claude Code, Cursor, VS Code (GitHub Copilot), Windsurf, and more.",
                },
              },
              {
                "@type": "Question",
                name: "Are MCP servers safe?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MCP servers run locally on your machine with the permissions you grant. The Filesystem server, for example, only accesses directories you explicitly allow. Always review server permissions and only install servers from trusted sources.",
                },
              },
              {
                "@type": "Question",
                name: "What's the difference between MCP and API integrations?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "APIs require custom code for each integration. MCP is a universal protocol — any MCP-compatible AI client can use any MCP server without custom code. Think of MCP as USB for AI: one standard, many devices.",
                },
              },
              {
                "@type": "Question",
                name: "How do I create my own MCP server?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can build MCP servers in TypeScript, Python, or any language. The official SDK (@modelcontextprotocol/sdk) provides the TypeScript framework. A basic server can be built in under 100 lines of code.",
                },
              },
              {
                "@type": "Question",
                name: "Which MCP servers does Claude Code support?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Claude Code supports all MCP servers. It uses the same configuration format as Claude Desktop (claude_desktop_config.json). Claude Code also has several built-in capabilities that overlap with some MCP servers like file access and web fetch.",
                },
              },
              {
                "@type": "Question",
                name: "Why are MCP servers slow sometimes?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "MCP servers run locally and communicate via stdio. Slowness usually comes from first-run npx install downloading packages, the external service being slow such as large database queries, or running too many servers simultaneously. The servers themselves add minimal overhead.",
                },
              },
              {
                "@type": "Question",
                name: "How often are new MCP servers released?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The ecosystem is growing rapidly. New community servers appear daily on npm and GitHub. The official MCP repository focuses on a small set of reference implementations, while the broader ecosystem at mcpservers.org lists 3,000+ servers.",
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
