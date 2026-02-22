import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free AI Prompt Library: 500+ Prompts for ChatGPT, Claude, Midjourney & More",
  description:
    "Copy-paste AI prompts organized by category. Free prompts for image generation, coding, writing, marketing, and more. Works with ChatGPT, Claude, Gemini, Midjourney, and Stable Diffusion.",
  openGraph: {
    title: "Free AI Prompt Library: 500+ Copy-Paste Prompts",
    description:
      "The largest free AI prompt library. 500+ prompts for image generation, coding, writing, and marketing. No paywall. Works with every major AI tool.",
    type: "article",
    locale: "en_US",
    images: [{ url: "/og/ai-prompt-library.png", width: 1200, height: 630, alt: "Free AI Prompt Library" }],
  },
};

const categories = [
  "Image Generation",
  "Writing & Content",
  "Coding & Development",
  "Marketing & Business",
  "Education & Research",
  "Productivity",
  "Creative & Design",
  "Data & Analysis",
];

export default function PromptLibraryLayout({
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
              "Free AI Prompt Library: 500+ Prompts for ChatGPT, Claude, Midjourney & More",
            datePublished: "2026-02-22",
            dateModified: "2026-02-22",
            author: { "@type": "Organization", name: "ArloBuilds" },
            description:
              "The largest free AI prompt library with 500+ copy-paste prompts for image generation, coding, writing, marketing, and more.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AI Prompt Library Categories",
            numberOfItems: categories.length,
            itemListElement: categories.map((name, i) => ({
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
                name: "What is an AI prompt library?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An AI prompt library is a curated collection of ready-to-use prompts for AI tools like ChatGPT, Claude, Midjourney, and Stable Diffusion. Instead of writing prompts from scratch, you can copy proven prompts and adapt them for your specific needs.",
                },
              },
              {
                "@type": "Question",
                name: "Are these AI prompts free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, all 500+ prompts in this library are completely free. No paywall, no account required. Just copy and paste into your preferred AI tool. Image generation prompts are licensed under CC BY 4.0.",
                },
              },
              {
                "@type": "Question",
                name: "Which AI tools work with these prompts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Our prompts work with all major AI tools: ChatGPT, Claude, Gemini, Midjourney, DALL-E, Stable Diffusion, and more. Text prompts work universally. Image generation prompts are optimized for specific tools but can be adapted.",
                },
              },
              {
                "@type": "Question",
                name: "How do I write better AI prompts?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The best AI prompts are specific, include context, define the desired output format, and provide examples. Start with a clear role or task, add constraints, and specify the tone or style you want. Our library provides proven templates you can customize.",
                },
              },
              {
                "@type": "Question",
                name: "What is the best free alternative to paid prompt libraries?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "This ArloBuilds prompt library is the best free alternative to paid services like God of Prompt ($199). We offer 500+ prompts across 8 categories with one-click copy, search, and filtering, all completely free.",
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
