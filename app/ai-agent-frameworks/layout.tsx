import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best AI Agent Frameworks 2026: 10+ Tested in Production",
  description:
    "We tested CrewAI, LangGraph, AutoGen, and more — then built a 7-agent system without any of them. Honest comparison with pricing, setup guides, and a production-tested alternative.",
  openGraph: {
    title: "Best AI Agent Frameworks 2026: Tested in Production",
    description:
      "10+ frameworks compared. Pricing, setup, pros/cons — from a team running agents in production.",
    type: "article",
    locale: "en_US",
    images: [{ url: "/og/ai-agent-frameworks.png", width: 1200, height: 630, alt: "AI Agent Frameworks Comparison 2026" }],
  },
  twitter: {
    images: ["/og/ai-agent-frameworks.png"],
  },
};

const frameworks = [
  "LangGraph",
  "CrewAI",
  "AutoGen",
  "Semantic Kernel",
  "OpenAI Swarm",
  "LangFlow",
  "MetaGPT",
  "Haystack",
  "Phidata",
  "Dify",
];

export default function AiAgentFrameworksLayout({
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
              "Best AI Agent Frameworks 2026: 10+ Tested in Production",
            datePublished: "2026-02-23",
            dateModified: "2026-02-23",
            author: { "@type": "Organization", name: "ArloBuilds" },
            description:
              "We tested CrewAI, LangGraph, AutoGen, and more — then built a 7-agent system without any of them.",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Best AI Agent Frameworks 2026",
            numberOfItems: 10,
            itemListElement: frameworks.map((name, i) => ({
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
                name: "What is an AI agent framework?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An AI agent framework is a software library that helps you build AI systems capable of autonomous decision-making and action. Instead of just answering questions like a chatbot, agents can use tools, access APIs, browse the web, write code, and complete multi-step tasks. Frameworks like LangGraph, CrewAI, and AutoGen provide the scaffolding for building these systems.",
                },
              },
              {
                "@type": "Question",
                name: "What is the most popular AI agent framework in 2026?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "LangGraph (part of the LangChain ecosystem) is the most popular agent framework by download count, with over 4 million monthly downloads. CrewAI has the most GitHub stars at 32,000+ and is popular for its simpler role-based approach. The best choice depends on your use case — LangGraph for complex workflows, CrewAI for team-based agents.",
                },
              },
              {
                "@type": "Question",
                name: "Can I build AI agents without a framework?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. ArloBuilds runs a 7-agent production system without any framework, using JSON queue messaging and SOUL files (markdown-based agent instructions). For many use cases, a simple approach with direct API calls, file-based communication, and cron scheduling is more debuggable and maintainable than a complex framework. Frameworks add value for complex graph workflows and built-in monitoring.",
                },
              },
              {
                "@type": "Question",
                name: "Is CrewAI or LangGraph better?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "It depends on your use case. LangGraph is better for complex workflows with conditional branching, loops, and state machines. CrewAI is better for role-based agent teams where you want agents with specific personas (researcher, writer, editor) collaborating on tasks. LangGraph has more flexibility; CrewAI has a gentler learning curve.",
                },
              },
              {
                "@type": "Question",
                name: "How much do AI agent frameworks cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All major agent frameworks are open source and free to use. Costs come from paid add-ons: LangSmith (monitoring) starts at $39/month, CrewAI Enterprise has custom pricing, and cloud-hosted options like Dify Cloud start at $59/month. The biggest cost is usually the LLM API calls your agents make — expect $10-100+/month depending on usage.",
                },
              },
              {
                "@type": "Question",
                name: "What programming language do I need for AI agents?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Python is the dominant language for AI agent frameworks. LangGraph, CrewAI, AutoGen, MetaGPT, Phidata, and most others are Python-first. Semantic Kernel supports Python, C#, and Java. Some frameworks like Dify and LangFlow offer visual no-code builders. For the no-framework approach, you can use any language that can make API calls.",
                },
              },
              {
                "@type": "Question",
                name: "Can AI agents work together as a team?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes — multi-agent collaboration is a core feature of most frameworks. CrewAI specializes in role-based teams. AutoGen enables agent-to-agent conversations. MetaGPT assigns software development roles (PM, architect, engineer). ArloBuilds runs 7 agents that communicate via JSON queues. The approach depends on whether you need hierarchical, peer-to-peer, or asynchronous communication.",
                },
              },
              {
                "@type": "Question",
                name: "What is the difference between an AI agent and a chatbot?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A chatbot responds to messages in a conversation. An AI agent takes autonomous actions — it can use tools, make API calls, write files, browse the web, and complete multi-step tasks without human intervention at each step. Agents have goals and can plan, execute, and self-correct. A chatbot answers your question; an agent does the work.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need a GPU to run AI agents?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No. Most agent frameworks use cloud-hosted LLMs (OpenAI, Anthropic, Google) via API calls, so no local GPU is needed. Your agents run on a standard CPU machine and send requests to LLM providers. You only need a GPU if you want to run local models (like Llama) instead of cloud APIs. A basic cloud server or even a laptop is sufficient.",
                },
              },
              {
                "@type": "Question",
                name: "How do I deploy AI agents to production?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Deploy agents like any backend service: containerize with Docker, deploy to AWS/GCP/Railway/Fly.io, and set up monitoring. Key production concerns are rate limiting (respect LLM API limits), error recovery (retry logic, fallbacks), cost management (set budget caps), and observability (log every agent action). LangSmith and similar tools help with agent-specific monitoring.",
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
