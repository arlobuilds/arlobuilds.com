import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "AI Coding Tool Pricing Calculator — Compare Cursor, Copilot, Windsurf (2026)",
  description:
    "Free interactive calculator to compare AI coding tool pricing. Cursor vs GitHub Copilot vs Windsurf vs Claude Code. Find the best tool for your team and budget.",
  openGraph: {
    title: "AI Coding Tool Pricing Calculator — Compare Cursor, Copilot, Windsurf (2026)",
    description:
      "Interactive pricing calculator for 8 AI coding tools. Compare Cursor, GitHub Copilot, Windsurf, Claude Code, and more.",
    type: "article",
    locale: "en_US",
    images: [
      {
        url: "/og/ai-coding-tools.png",
        width: 1200,
        height: 630,
        alt: "AI Coding Tool Pricing Calculator 2026",
      },
    ],
  },
  twitter: {
    images: ["/og/ai-coding-tools.png"],
  },
  alternates: {
    canonical: "https://arlobuilds.com/ai-coding-tools",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does Cursor cost in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cursor has a free tier with 2,000 completions and 50 premium requests per month. Cursor Pro costs $20/month with unlimited completions and 500 fast premium requests. Cursor for Business is $40/user/month with admin controls, privacy mode, and centralized billing.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cheapest AI coding tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GitHub Copilot Individual at $10/month and Windsurf Pro at $15/month are the cheapest paid AI coding tools with full features. For free options, GitHub Copilot, Cursor, and Windsurf all offer limited free tiers. Amazon Q Developer and Gemini Code Assist also have free tiers.",
      },
    },
    {
      "@type": "Question",
      name: "Is GitHub Copilot free in 2026?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GitHub Copilot has a free tier offering 2,000 code completions and 50 chat messages per month. For unlimited usage, Copilot Individual costs $10/month, Business costs $19/user/month, and Enterprise costs $39/user/month.",
      },
    },
    {
      "@type": "Question",
      name: "Which is better, Cursor or Windsurf?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cursor is better for autonomous agentic coding with more mature multi-file editing capabilities. Windsurf is $5/month cheaper at $15/month and shows you results before you accept changes. Both are VS Code-based editors with AI built in. Choose Cursor for maximum power and Windsurf for better value.",
      },
    },
    {
      "@type": "Question",
      name: "Is Claude Code worth $20 per month?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude Code scores 80.9% on SWE-bench, the highest of any coding tool. It uses 5.5x fewer tokens than competitors and has a 200K context window. However, it is terminal-only with no GUI. It is best for experienced developers who want the most capable autonomous coding agent and are comfortable with the command line.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best AI coding tool for teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GitHub Copilot Business at $19/user/month is the best value for teams, especially those already on GitHub Enterprise. Cursor Business at $40/user/month offers more powerful agentic features. Windsurf Team at $30/user/month falls in between. All three offer centralized billing and admin controls.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use AI coding tools for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. GitHub Copilot, Cursor, Windsurf, Amazon Q Developer, and Gemini Code Assist all have free tiers with limited usage. Bolt.new and Replit also offer free plans for prototyping. The free tiers typically limit monthly completions, chat requests, or token usage.",
      },
    },
  ],
};

const toolSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cursor",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "20", priceCurrency: "USD", name: "Pro" },
      { "@type": "Offer", price: "40", priceCurrency: "USD", name: "Business" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GitHub Copilot",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "10", priceCurrency: "USD", name: "Individual" },
      { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Business" },
      { "@type": "Offer", price: "39", priceCurrency: "USD", name: "Enterprise" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Windsurf",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "15", priceCurrency: "USD", name: "Pro" },
      { "@type": "Offer", price: "30", priceCurrency: "USD", name: "Team" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Claude Code",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: [
      { "@type": "Offer", price: "20", priceCurrency: "USD", name: "Pro" },
      { "@type": "Offer", price: "100", priceCurrency: "USD", name: "Max 5x" },
      { "@type": "Offer", price: "200", priceCurrency: "USD", name: "Max 20x" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Bolt.new",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "20", priceCurrency: "USD", name: "Pro" },
      { "@type": "Offer", price: "50", priceCurrency: "USD", name: "Team" },
      { "@type": "Offer", price: "200", priceCurrency: "USD", name: "Enterprise" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Replit",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "25", priceCurrency: "USD", name: "Core" },
      { "@type": "Offer", price: "40", priceCurrency: "USD", name: "Teams" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Amazon Q Developer",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Pro" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Gemini Code Assist",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
      { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Standard" },
    ],
  },
];

export default function AICodingToolsLayout({
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
              "AI Coding Tool Pricing Calculator — Compare Cursor, Copilot, Windsurf (2026)",
            datePublished: "2026-02-24",
            dateModified: "2026-02-24",
            author: { "@type": "Organization", name: "ArloBuilds" },
            description:
              "Free interactive calculator to compare AI coding tool pricing. Cursor vs GitHub Copilot vs Windsurf vs Claude Code.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {toolSchemas.map((schema) => (
        <script
          key={schema.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
