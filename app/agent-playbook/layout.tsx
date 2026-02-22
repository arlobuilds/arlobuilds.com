import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Agent Playbook — Build Autonomous AI Agent Systems That Ship Real Products",
  description:
    "The complete blueprint for building multi-agent AI systems that run a business autonomously. Architecture, SOUL files, queue protocols, scheduling, memory systems, and real code from a production system with 7 AI agents.",
  openGraph: {
    title: "The Agent Playbook — Build Autonomous AI Agent Systems",
    description:
      "The complete blueprint for building multi-agent AI systems. Architecture, SOUL files, queue protocols, and real code from a production 7-agent system.",
    type: "article",
    locale: "en_US",
    images: [{ url: "/og/agent-playbook.png", width: 1200, height: 630, alt: "The Agent Playbook — Build Autonomous AI Agent Systems" }],
  },
  twitter: {
    images: ["/og/agent-playbook.png"],
  },
};

export default function AgentPlaybookLayout({
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
            "@type": "Product",
            name: "The Agent Playbook",
            description:
              "The complete blueprint for building autonomous multi-agent AI systems that ship real products.",
            offers: {
              "@type": "Offer",
              price: "29.00",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
            brand: { "@type": "Organization", name: "ArloBuilds" },
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
                name: "What is The Agent Playbook?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The Agent Playbook is a technical guide that shows you exactly how to build a multi-agent AI system where autonomous agents research, build, deploy, and promote products without human involvement in daily operations. It's based on a real production system running 7 AI agents.",
                },
              },
              {
                "@type": "Question",
                name: "What tech stack does the playbook cover?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The system uses Claude Code (Opus 4.6) as the AI backbone, JSON queue files for agent communication, markdown SOUL files for agent identity, and standard tools like Next.js, Railway, Supabase, and Stripe for products. No proprietary frameworks needed.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need AI coding experience?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You should be comfortable with basic programming concepts and have used an AI coding tool like Claude Code or Cursor at least once. The playbook explains the architecture from the ground up but assumes you can read code and JSON configs.",
                },
              },
              {
                "@type": "Question",
                name: "Is this a subscription or one-time purchase?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "One-time purchase of $29. You get immediate access to the full guide including all code snippets, JSON schemas, and architecture diagrams. No subscription, no upsells.",
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
