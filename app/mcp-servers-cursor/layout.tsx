import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best MCP Servers for Cursor 2026: 15 Tested & Ranked",
  description:
    "The best MCP servers for Cursor in 2026. 15 servers tested specifically for Cursor workflows with copy-paste .cursor/mcp.json configs, Agent Mode tips, and what's built-in vs what needs MCP.",
  openGraph: {
    title: "Best MCP Servers for Cursor 2026: Tested & Ranked",
    description:
      "15 MCP servers tested for Cursor. Config examples, Agent Mode tips, and what's built-in vs what needs MCP.",
    type: "article",
    locale: "en_US",
    images: [{ url: "/og/mcp-servers-cursor.png", width: 1200, height: 630, alt: "Best MCP Servers for Cursor" }],
  },
  twitter: {
    images: ["/og/mcp-servers-cursor.png"],
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

export default function McpServersCursorLayout({
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
              "Best MCP Servers for Cursor 2026: 15 Tested & Ranked",
            datePublished: "2026-02-23",
            dateModified: "2026-02-23",
            author: { "@type": "Organization", name: "ArloBuilds" },
            description:
              "The best MCP servers for Cursor in 2026. 15 servers tested with .cursor/mcp.json configs and Agent Mode tips.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Best MCP Servers for Cursor 2026",
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
                name: "How do I add MCP servers to Cursor?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Add MCP servers to Cursor by creating a .cursor/mcp.json file in your project root, or by going to Cursor Settings > MCP. Add your server under the mcpServers key with command, args, and env fields. Restart Cursor to connect.",
                },
              },
              {
                "@type": "Question",
                name: "What does Cursor have built-in without MCP?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cursor has built-in file editing, code generation, multi-file editing, terminal commands, codebase indexing, web search (with Cursor Pro), and @-mentions for context. You don't need MCP for these. MCP adds value for structured API access like GitHub PRs, databases, browser automation, and third-party integrations.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between .cursor/mcp.json and Cursor Settings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The .cursor/mcp.json file is project-level configuration that you can commit to git and share with your team. Cursor Settings > MCP is your personal global configuration. Use .cursor/mcp.json for project-specific servers and Settings for servers you want in every project.",
                },
              },
              {
                "@type": "Question",
                name: "Does Cursor support all MCP servers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cursor supports MCP servers that use the stdio transport. Most popular MCP servers work with Cursor including GitHub, Playwright, PostgreSQL, Stripe, and more. Some servers using only SSE transport may need additional configuration.",
                },
              },
              {
                "@type": "Question",
                name: "How many MCP servers can Cursor run at once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Cursor can run multiple MCP servers simultaneously. Most users run 4-8 servers comfortably. Each server runs as a separate process, so running too many may impact Cursor's performance. Start with 3-5 essential ones for your workflow.",
                },
              },
              {
                "@type": "Question",
                name: "Do MCP servers work with Cursor Agent Mode?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. MCP servers are especially powerful in Cursor's Agent Mode (Composer). Agent Mode can chain multiple MCP tools together — for example, reading a GitHub issue, writing code, running tests with Playwright, and creating a PR, all in one workflow.",
                },
              },
              {
                "@type": "Question",
                name: "Which MCP server should I install first for Cursor?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "GitHub is the most impactful first MCP server for Cursor. While Cursor has great code editing built-in, the GitHub MCP server adds structured access to PRs, issues, and code search. Playwright is a strong second pick for testing workflows in Agent Mode.",
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
