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
        <span className="text-violet-600 text-xl shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="pb-4 text-[var(--muted)] leading-relaxed">{a}</p>}
    </div>
  );
}

/* ─── Framework Data ─── */

interface Framework {
  name: string;
  type: string;
  rating: number;
  stars: string;
  pricing: string;
  learning: string;
  production: string;
  desc: string;
  bestFor: string;
  limitation: string;
  pricingDetail: string;
  install: string;
  example: string;
  github: string;
}

const frameworks: Framework[] = [
  {
    name: "LangGraph",
    type: "Graph-based",
    rating: 5,
    stars: "14K+",
    pricing: "Free + LangSmith $39/mo",
    learning: "Medium",
    production: "Yes",
    desc: "Graph-based agent orchestration from the LangChain team. Define agents as nodes in a graph with conditional edges, cycles, and human-in-the-loop breakpoints. The most flexible framework for complex multi-step workflows. 4.2M+ monthly downloads make it the most widely used agent framework.",
    bestFor: "Complex workflows with conditional branching, loops, and state machines. Production systems that need fine-grained control over agent execution flow.",
    limitation: "Tight coupling to the LangChain ecosystem. The graph abstraction adds complexity for simple use cases. Debugging graph state can be non-trivial.",
    pricingDetail: "Core framework is open source and free. LangSmith (tracing and monitoring) starts at $39/month. LangSmith is optional but recommended for production.",
    install: "pip install langgraph",
    example: `from langgraph.graph import StateGraph, START, END
from langchain_anthropic import ChatAnthropic

model = ChatAnthropic(model="claude-sonnet-4-5-20250514")

def agent(state):
    response = model.invoke(state["messages"])
    return {"messages": [response]}

graph = StateGraph(dict)
graph.add_node("agent", agent)
graph.add_edge(START, "agent")
graph.add_edge("agent", END)

app = graph.compile()
result = app.invoke({"messages": [("user", "What is MCP?")]})`,
    github: "https://github.com/langchain-ai/langgraph",
  },
  {
    name: "CrewAI",
    type: "Role-based",
    rating: 4,
    stars: "32K+",
    pricing: "Free + Enterprise",
    learning: "Low",
    production: "Yes",
    desc: "Role-based multi-agent framework where you define agents with specific roles, goals, and backstories. Agents collaborate on tasks like a human team — a researcher gathers data, a writer drafts content, an editor reviews. The most intuitive mental model for multi-agent systems.",
    bestFor: "Role-playing agent teams where agents have distinct personas. Content generation pipelines, research workflows, and any task that maps naturally to human team roles.",
    limitation: "Can be slow with many agents due to sequential execution by default. Less flexible than LangGraph for complex branching logic.",
    pricingDetail: "Core framework is open source and free. CrewAI Enterprise offers managed hosting and monitoring with custom pricing. Contact sales for enterprise needs.",
    install: "pip install crewai",
    example: `from crewai import Agent, Task, Crew

researcher = Agent(
    role="Senior Researcher",
    goal="Find the latest AI agent trends",
    backstory="Expert in AI with 10 years of experience",
)

task = Task(
    description="Research top AI agent frameworks in 2026",
    expected_output="A summary of the top 5 frameworks",
    agent=researcher,
)

crew = Crew(agents=[researcher], tasks=[task])
result = crew.kickoff()`,
    github: "https://github.com/crewAIInc/crewAI",
  },
  {
    name: "AutoGen",
    type: "Multi-agent",
    rating: 4,
    stars: "40K+",
    pricing: "Free (open source)",
    learning: "High",
    production: "Partial",
    desc: "Microsoft&apos;s multi-agent conversation framework. Agents communicate through structured conversations, making it powerful for code generation, debugging, and collaborative problem-solving. AutoGen 0.4 brought a major rewrite with better modularity.",
    bestFor: "Agent-to-agent conversations, code generation and review workflows, and research tasks that benefit from multiple agents debating and refining answers.",
    limitation: "Steep learning curve, especially after the 0.4 rewrite. Setup can be verbose. Production deployment documentation is limited.",
    pricingDetail: "Completely free and open source under MIT license. No paid tiers. Use any LLM provider (OpenAI, Anthropic, local models).",
    install: "pip install autogen-agentchat",
    example: `from autogen import AssistantAgent, UserProxyAgent

assistant = AssistantAgent(
    name="assistant",
    llm_config={"model": "claude-sonnet-4-5-20250514"},
)

user_proxy = UserProxyAgent(
    name="user",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "coding"},
)

user_proxy.initiate_chat(
    assistant,
    message="Write a Python function to check if a number is prime",
)`,
    github: "https://github.com/microsoft/autogen",
  },
  {
    name: "Semantic Kernel",
    type: "Enterprise SDK",
    rating: 4,
    stars: "25K+",
    pricing: "Free (open source)",
    learning: "Medium",
    production: "Yes",
    desc: "Microsoft&apos;s enterprise-grade SDK for building AI orchestration into applications. Supports Python, C#, and Java — the only major framework with first-class multi-language support. Integrates deeply with Azure AI services.",
    bestFor: "Enterprise teams, especially those in the Microsoft/.NET ecosystem. Applications that need AI orchestration in C# or Java, not just Python.",
    limitation: "Microsoft-centric ecosystem. Python support is solid but the C# experience is more mature. Can feel over-engineered for simple agent tasks.",
    pricingDetail: "Open source under MIT license. Integrates with Azure AI services which have their own pricing. No framework-specific paid tier.",
    install: "pip install semantic-kernel",
    example: `import semantic_kernel as sk
from semantic_kernel.connectors.ai.open_ai import (
    AzureChatCompletion,
)

kernel = sk.Kernel()
kernel.add_service(AzureChatCompletion(
    deployment_name="gpt-4",
    endpoint="https://your-endpoint.openai.azure.com/",
))

result = await kernel.invoke_prompt(
    "Summarize the key trends in AI agents for 2026"
)
print(result)`,
    github: "https://github.com/microsoft/semantic-kernel",
  },
  {
    name: "OpenAI Swarm",
    type: "Experimental",
    rating: 3,
    stars: "20K+",
    pricing: "Free (open source)",
    learning: "Low",
    production: "No",
    desc: "OpenAI&apos;s lightweight, experimental multi-agent framework. Intentionally simple — agents are just functions with instructions and tool access. Great for learning multi-agent patterns, but explicitly not intended for production use.",
    bestFor: "Learning and prototyping multi-agent patterns. Understanding how agent handoffs and tool use work at a fundamental level.",
    limitation: "Experimental and explicitly not production-ready. OpenAI states it is an educational resource. No error recovery, monitoring, or production features.",
    pricingDetail: "Free and open source. Only works with OpenAI models. You pay for OpenAI API usage.",
    install: "pip install git+https://github.com/openai/swarm.git",
    example: `from swarm import Swarm, Agent

client = Swarm()

agent = Agent(
    name="Agent",
    instructions="You are a helpful agent.",
)

messages = [{"role": "user", "content": "Hello!"}]
response = client.run(agent=agent, messages=messages)
print(response.messages[-1]["content"])`,
    github: "https://github.com/openai/swarm",
  },
  {
    name: "LangFlow",
    type: "Visual builder",
    rating: 3,
    stars: "45K+",
    pricing: "Free + Cloud",
    learning: "Very Low",
    production: "Partial",
    desc: "Visual drag-and-drop agent builder from DataStax. Build agent workflows by connecting nodes in a browser UI — no code required for basic flows. Exports to Python for customization. 45K+ GitHub stars make it one of the most popular visual AI tools.",
    bestFor: "Non-coders and rapid prototyping. Teams that want to visualize their agent workflows. Quick demos and proof-of-concepts.",
    limitation: "Limited customization compared to code-first frameworks. Visual-only editing can become unwieldy for complex flows. Production deployment requires DataStax Cloud or self-hosting.",
    pricingDetail: "Open source for self-hosting. DataStax Cloud hosting has usage-based pricing. Free tier available for experimentation.",
    install: "pip install langflow",
    example: `# LangFlow is primarily visual — run the UI:
# langflow run
#
# Then open http://localhost:7860 in your browser
# Drag and drop components to build your agent flow
# Export to Python when you need code customization

# For API access to a deployed flow:
import requests

response = requests.post(
    "http://localhost:7860/api/v1/run/your-flow-id",
    json={"input_value": "What are the best AI frameworks?"},
)
print(response.json())`,
    github: "https://github.com/langflow-ai/langflow",
  },
  {
    name: "MetaGPT",
    type: "Multi-agent SOP",
    rating: 3,
    stars: "48K+",
    pricing: "Free (open source)",
    learning: "High",
    production: "Partial",
    desc: "Multi-agent framework that simulates a software company with Standard Operating Procedures (SOPs). Automatically assigns roles like Product Manager, Architect, and Engineer to agents that collaborate on software development tasks. Novel approach but opinionated.",
    bestFor: "Software development automation — generating full applications from requirements. Research teams exploring agent-based software engineering.",
    limitation: "Very opinionated workflow. Complex setup. The SOP approach doesn&apos;t generalize well beyond software development tasks.",
    pricingDetail: "Free and open source under MIT license. Data interpreter features may require additional configuration.",
    install: "pip install metagpt",
    example: `import asyncio
from metagpt.software_company import generate_repo

async def main():
    await generate_repo(
        idea="Create a CLI tool that converts CSV to JSON",
    )

asyncio.run(main())`,
    github: "https://github.com/geekan/MetaGPT",
  },
  {
    name: "Haystack",
    type: "Pipeline-based",
    rating: 4,
    stars: "18K+",
    pricing: "Free + Cloud",
    learning: "Medium",
    production: "Yes",
    desc: "Pipeline-based framework from deepset, primarily known for RAG (Retrieval-Augmented Generation) but increasingly capable for agent workflows. Strong focus on search, document processing, and knowledge-intensive tasks. Production-tested at enterprise scale.",
    bestFor: "Search and RAG-heavy applications. Knowledge bases, document Q&A, and any workflow where retrieving and reasoning over documents is the core task.",
    limitation: "More RAG-focused than agent-focused. Agent capabilities are newer and less mature than dedicated agent frameworks like LangGraph or CrewAI.",
    pricingDetail: "Core framework is open source. deepset Cloud offers managed hosting and monitoring with enterprise pricing.",
    install: "pip install haystack-ai",
    example: `from haystack import Pipeline
from haystack.components.generators.chat import OpenAIChatGenerator
from haystack.dataclasses import ChatMessage

pipeline = Pipeline()
pipeline.add_component("llm", OpenAIChatGenerator(model="gpt-4o"))

messages = [
    ChatMessage.from_user("What are the best practices for RAG?")
]
result = pipeline.run({"llm": {"messages": messages}})
print(result["llm"]["replies"][0].text)`,
    github: "https://github.com/deepset-ai/haystack",
  },
  {
    name: "Phidata",
    type: "Agent toolkit",
    rating: 4,
    stars: "15K+",
    pricing: "Free + Cloud",
    learning: "Low",
    production: "Yes",
    desc: "Lightweight agent toolkit focused on building agentic RAG applications quickly. Clean API, minimal boilerplate, and built-in support for tools, memory, and structured output. Growing fast as a simpler alternative to LangChain for agent development.",
    bestFor: "Building agentic RAG apps quickly. Developers who want a clean, Pythonic API without LangChain&apos;s complexity.",
    limitation: "Smaller ecosystem and community compared to LangChain/CrewAI. Fewer integrations and plugins available.",
    pricingDetail: "Core framework is open source. Phidata Cloud provides monitoring and deployment with usage-based pricing.",
    install: "pip install phidata",
    example: `from phi.agent import Agent
from phi.model.openai import OpenAIChat
from phi.tools.duckduckgo import DuckDuckGo

agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    tools=[DuckDuckGo()],
    show_tool_calls=True,
    markdown=True,
)

agent.print_response(
    "What are the latest trends in AI agents?",
    stream=True,
)`,
    github: "https://github.com/phidatahq/phidata",
  },
  {
    name: "Dify",
    type: "LLM platform",
    rating: 3,
    stars: "55K+",
    pricing: "Free (self-host) + Cloud $59/mo",
    learning: "Low",
    production: "Yes",
    desc: "Open-source LLM application development platform with visual workflow building, RAG pipelines, and agent capabilities. More of a complete platform than a framework — includes UI for non-technical users, API endpoints, and built-in monitoring. 55K+ GitHub stars.",
    bestFor: "Teams that want a complete platform for building AI applications. Visual workflow building with RAG and agent features. Non-technical stakeholders who need to configure AI workflows.",
    limitation: "More platform than framework — less flexible for developers who want full code control. Self-hosting requires more infrastructure. Can feel heavy for simple agent tasks.",
    pricingDetail: "Free to self-host (open source). Dify Cloud starts at $59/month for the Team plan. Enterprise pricing available for larger organizations.",
    install: `# Self-host with Docker:
docker compose up -d`,
    example: `# Dify is primarily a web platform
# Access at http://localhost/install after Docker setup
#
# For API access to a deployed agent:
import requests

response = requests.post(
    "http://localhost/v1/chat-messages",
    headers={"Authorization": "Bearer app-your-api-key"},
    json={
        "inputs": {},
        "query": "What are the best AI agent frameworks?",
        "user": "user-123",
    },
)
print(response.json()["answer"])`,
    github: "https://github.com/langgenius/dify",
  },
];

/* ─── Page Component ─── */

export default function AiAgentFrameworksPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">

      {/* ── Hero ── */}
      <header className="text-center mb-12">
        <p className="text-sm font-medium text-violet-600 mb-3 uppercase tracking-widest">
          UPDATED FEBRUARY 2026
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Best AI Agent Frameworks 2026:{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Tested in Production
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-6">
          We tested CrewAI, LangGraph, AutoGen, and 7 more. Then we built a 7-agent system that runs a real business without any of them. Here&apos;s what actually works.
        </p>

        {/* Nav pills */}
        <div className="flex flex-wrap gap-2 justify-center text-sm mb-6">
          {[
            { label: "Quick Compare", href: "#comparison" },
            { label: "Framework Details", href: "#frameworks" },
            { label: "The No-Framework Way", href: "#no-framework" },
            { label: "Decision Guide", href: "#decision" },
            { label: "FAQ", href: "#faq" },
          ].map((pill) => (
            <a
              key={pill.label}
              href={pill.href}
              className="px-4 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full hover:border-violet-400 hover:text-violet-700 transition-colors no-underline"
            >
              {pill.label}
            </a>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>10+ frameworks</strong> tested
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            Production experience
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            Updated monthly
          </span>
        </div>
      </header>

      {/* ── Quick Comparison Table ── */}
      <section id="comparison" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          AI Agent Framework Comparison Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[var(--border)] rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[var(--card-bg)]">
                <th className="text-left px-4 py-3 font-semibold">Framework</th>
                <th className="text-left px-4 py-3 font-semibold">Type</th>
                <th className="text-center px-4 py-3 font-semibold">Stars</th>
                <th className="text-left px-4 py-3 font-semibold">Pricing</th>
                <th className="text-center px-4 py-3 font-semibold">Learning</th>
                <th className="text-center px-4 py-3 font-semibold">Prod-Ready</th>
                <th className="text-center px-4 py-3 font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {frameworks.map((f) => (
                <tr key={f.name} className="border-t border-[var(--border)] hover:bg-[var(--card-bg)]/50">
                  <td className="px-4 py-3 font-semibold">
                    <a href={`#fw-${f.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`} className="hover:text-violet-700 no-underline">
                      {f.name}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{f.type}</td>
                  <td className="px-4 py-3 text-center">{f.stars}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{f.pricing}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      f.learning === "Low" || f.learning === "Very Low"
                        ? "bg-green-100 text-green-700"
                        : f.learning === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {f.learning}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      f.production === "Yes"
                        ? "bg-green-100 text-green-700"
                        : f.production === "Partial"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {f.production}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center"><Stars count={f.rating} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── TinyAdz slot 1 ── */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-1" className="w-full" />
      </div>

      {/* ── Framework Deep-Dives ── */}
      <section id="frameworks" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          Framework Deep-Dives
        </h2>

        <div className="space-y-10">
          {frameworks.map((f, i) => (
            <div key={f.name}>
              <div
                id={`fw-${f.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm scroll-mt-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold">{f.name}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full border bg-violet-100 text-violet-800 border-violet-200">
                      {f.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <Stars count={f.rating} />
                    <a
                      href={f.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold no-underline hover:bg-gray-200"
                    >
                      {f.stars} stars
                    </a>
                  </div>
                </div>

                <p className="mb-4">{f.desc}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                  <div className="bg-[var(--card-bg)] rounded-lg px-4 py-2">
                    <span className="font-semibold">Best for: </span>
                    <span className="text-[var(--muted)]">{f.bestFor}</span>
                  </div>
                  <div className="bg-[var(--card-bg)] rounded-lg px-4 py-2">
                    <span className="font-semibold">Limitation: </span>
                    <span className="text-[var(--muted)]">{f.limitation}</span>
                  </div>
                </div>

                <div className="bg-[var(--card-bg)] rounded-lg px-4 py-2 text-sm mb-4">
                  <span className="font-semibold">Pricing: </span>
                  <span className="text-[var(--muted)]">{f.pricingDetail}</span>
                </div>

                <CodeBlock code={f.install} label="Quick Start:" />
                <CodeBlock code={f.example} label="Minimal Example:" />
              </div>

              {/* TinyAdz inline slot between framework 5 and 6 */}
              {i === 4 && (
                <div className="my-12 min-h-[90px]">
                  <div id="tinyadz-inline-2" className="w-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── The No-Framework Approach ── */}
      <section id="no-framework" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          The No-Framework Approach: How We Built 7 Production Agents
        </h2>
        <p className="text-[var(--muted)] mb-6">
          We tested most of the frameworks above. Then we built our own 7-agent system that runs a real business — without any of them. Here&apos;s why, and what we use instead.
        </p>

        {/* Architecture overview */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">The ArloBuilds Architecture</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-violet-700 mb-2">7 Agents</p>
              <ul className="space-y-1 text-[var(--muted)]">
                <li>@entrepreneur — strategy &amp; direction</li>
                <li>@coder — builds &amp; deploys</li>
                <li>@content — social media pipeline</li>
                <li>@marketer — distribution &amp; growth</li>
                <li>@sidehustle — market research</li>
                <li>@qa — product testing</li>
                <li>@support — user support</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-violet-700 mb-2">Communication</p>
              <ul className="space-y-1 text-[var(--muted)]">
                <li>JSON queue messaging</li>
                <li>File-based, zero infrastructure</li>
                <li>incoming/ → processed/ → failed/</li>
                <li>Every message is readable</li>
                <li>No vendor lock-in</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-violet-700 mb-2">Agent Identity</p>
              <ul className="space-y-1 text-[var(--muted)]">
                <li>SOUL files (markdown instructions)</li>
                <li>Operating loop per agent</li>
                <li>Decision authority boundaries</li>
                <li>Guardrails &amp; escalation rules</li>
                <li>Not code — plain English</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Why no framework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-green-900 mb-3">Why we didn&apos;t use a framework</h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li><strong>Simplicity:</strong> JSON files are debuggable — you can read them with cat</li>
              <li><strong>No lock-in:</strong> Works with any LLM — Claude, GPT, Gemini. Just change the API call</li>
              <li><strong>Speed:</strong> Built in 48 hours, not 48 days. No abstraction layer to learn</li>
              <li><strong>Control:</strong> Every message, every decision is visible and traceable</li>
              <li><strong>Stability:</strong> No SDK updates to chase. No breaking changes from upstream</li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-amber-900 mb-3">When you SHOULD use a framework</h3>
            <ul className="text-sm text-amber-800 space-y-2">
              <li><strong>Complex branching:</strong> LangGraph for conditional workflows and cycles</li>
              <li><strong>Role-playing teams:</strong> CrewAI when agents need distinct personas</li>
              <li><strong>Enterprise requirements:</strong> Semantic Kernel for .NET/Java shops</li>
              <li><strong>Built-in monitoring:</strong> When you need LangSmith-level observability</li>
              <li><strong>Visual building:</strong> LangFlow or Dify for non-technical stakeholders</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Want the full architecture?</h3>
          <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto">
            The Agent Playbook covers everything: how we designed, built, and run 7 AI agents that operate a real business. SOUL files, queue messaging, scheduling, shared memory, and monetization.
          </p>
          <a
            href="https://buy.stripe.com/7sY00ldqvfQo2H7fv50RG00"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-colors no-underline"
          >
            Get The Agent Playbook — $29
          </a>
        </div>
      </section>

      {/* ── Decision Guide ── */}
      <section id="decision" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Which AI Agent Framework Should You Use?
        </h2>
        <p className="text-[var(--muted)] mb-8">
          Start with your use case. The right framework depends on what you&apos;re building, not which has the most GitHub stars.
        </p>

        <div className="space-y-3">
          {[
            {
              need: "I need agents talking to each other with complex branching logic",
              rec: "LangGraph",
              why: "Graph-based architecture handles conditional paths, cycles, and state machines better than any other framework.",
            },
            {
              need: "I need a team of agents with distinct roles collaborating",
              rec: "CrewAI",
              why: "Role-based mental model (researcher, writer, editor) maps naturally to many business workflows.",
            },
            {
              need: "I need a visual builder for non-technical teammates",
              rec: "LangFlow or Dify",
              why: "Drag-and-drop workflow builders let product managers and non-coders configure AI flows.",
            },
            {
              need: "I am building for an enterprise with .NET or Java",
              rec: "Semantic Kernel",
              why: "The only major framework with first-class C# and Java support. Deep Azure integration.",
            },
            {
              need: "I want the simplest possible setup for learning",
              rec: "OpenAI Swarm",
              why: "Intentionally minimal — great for understanding how agents work before committing to a full framework.",
            },
            {
              need: "I need heavy RAG and document search",
              rec: "Haystack",
              why: "Pipeline-based architecture built specifically for retrieval-augmented generation at scale.",
            },
            {
              need: "I want a clean, lightweight Python API",
              rec: "Phidata",
              why: "Minimal boilerplate, Pythonic API, built-in tools and memory. Growing fast as a LangChain alternative.",
            },
            {
              need: "I want full control with no dependencies",
              rec: "The No-Framework Approach",
              why: "JSON queues + SOUL files. Zero dependencies, works with any LLM, fully debuggable. See our Agent Playbook.",
            },
          ].map((item) => (
            <div
              key={item.need}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5"
            >
              <p className="font-semibold mb-1">&quot;{item.need}&quot;</p>
              <p className="text-sm">
                <span className="text-violet-700 font-semibold">{item.rec}</span>
                {" — "}
                <span className="text-[var(--muted)]">{item.why}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing Comparison ── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          AI Agent Framework Pricing 2026
        </h2>
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-[var(--border)] rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[var(--card-bg)]">
                <th className="text-left px-4 py-3 font-semibold">Framework</th>
                <th className="text-left px-4 py-3 font-semibold">Free Tier</th>
                <th className="text-left px-4 py-3 font-semibold">Paid Tier</th>
                <th className="text-left px-4 py-3 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "LangGraph", free: "Open source", paid: "LangSmith $39/mo", enterprise: "Custom" },
                { name: "CrewAI", free: "Open source", paid: "Enterprise (custom)", enterprise: "Contact sales" },
                { name: "AutoGen", free: "Open source", paid: "N/A", enterprise: "N/A" },
                { name: "Semantic Kernel", free: "Open source", paid: "Azure integration", enterprise: "Azure pricing" },
                { name: "OpenAI Swarm", free: "Open source", paid: "N/A", enterprise: "N/A" },
                { name: "LangFlow", free: "Open source", paid: "DataStax Cloud", enterprise: "Contact sales" },
                { name: "MetaGPT", free: "Open source", paid: "N/A", enterprise: "N/A" },
                { name: "Haystack", free: "Open source", paid: "deepset Cloud", enterprise: "Custom" },
                { name: "Phidata", free: "Open source", paid: "Phidata Cloud", enterprise: "Custom" },
                { name: "Dify", free: "Open source (self-host)", paid: "Cloud from $59/mo", enterprise: "Custom" },
                { name: "No-Framework", free: "$0", paid: "$0", enterprise: "$0" },
              ].map((row) => (
                <tr key={row.name} className="border-t border-[var(--border)]">
                  <td className="px-4 py-3 font-semibold">{row.name}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{row.free}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{row.paid}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--muted)]">
          All frameworks are open source at their core. Paid tiers are for monitoring, hosting, and enterprise features. The biggest cost is usually LLM API calls ($10-100+/month depending on usage).
        </p>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="mb-16 scroll-mt-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Frequently Asked Questions About AI Agent Frameworks
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-6">
          <FAQItem
            q="What is an AI agent framework?"
            a="An AI agent framework is a software library that helps you build AI systems capable of autonomous decision-making and action. Instead of just answering questions like a chatbot, agents can use tools, access APIs, browse the web, write code, and complete multi-step tasks. Frameworks like LangGraph, CrewAI, and AutoGen provide the scaffolding for building these systems — handling tool execution, memory, agent communication, and workflow orchestration."
          />
          <FAQItem
            q="What's the most popular AI agent framework in 2026?"
            a="LangGraph (part of the LangChain ecosystem) leads by download count with 4.2M+ monthly downloads. CrewAI has the most GitHub stars at 32K+ and is popular for its simpler role-based approach. Dify has 55K+ stars but is more of a platform than a framework. The best choice depends on your use case — LangGraph for complex workflows, CrewAI for team-based agents, Phidata for simplicity."
          />
          <FAQItem
            q="Can I build AI agents without a framework?"
            a="Yes. ArloBuilds runs a 7-agent production system without any framework, using JSON queue messaging and SOUL files (markdown-based agent instructions). For many use cases, a simple approach with direct API calls, file-based communication, and cron scheduling is more debuggable and maintainable than a complex framework. Frameworks add value when you need complex graph workflows, built-in monitoring, or visual builders."
          />
          <FAQItem
            q="Is CrewAI or LangGraph better?"
            a="It depends on your use case. LangGraph is better for complex workflows with conditional branching, loops, and state machines — think payment processing flows or multi-step data pipelines. CrewAI is better for role-based agent teams where you want agents with specific personas (researcher, writer, editor) collaborating on tasks. LangGraph has more flexibility; CrewAI has a gentler learning curve and more intuitive API."
          />
          <FAQItem
            q="How much do AI agent frameworks cost?"
            a="All major agent frameworks are open source and free at their core. Costs come from optional paid add-ons: LangSmith (monitoring) starts at $39/month, CrewAI Enterprise has custom pricing, Dify Cloud starts at $59/month. The biggest cost by far is the LLM API calls your agents make — expect $10-100+/month depending on volume and model choice. Claude Sonnet is popular for balancing cost and quality."
          />
          <FAQItem
            q="What programming language do I need for AI agents?"
            a="Python is the dominant language for AI agent frameworks. LangGraph, CrewAI, AutoGen, MetaGPT, Phidata, and Haystack are all Python-first. Semantic Kernel uniquely supports Python, C#, and Java. LangFlow and Dify offer visual no-code builders. For the no-framework approach, you can use any language that can make HTTP API calls — JavaScript/TypeScript, Go, Rust, or anything else."
          />
          <FAQItem
            q="Can AI agents work together as a team?"
            a="Yes — multi-agent collaboration is a core feature of most frameworks. CrewAI specializes in role-based teams. AutoGen enables agent-to-agent conversations. MetaGPT assigns software development roles (PM, architect, engineer). LangGraph lets you define custom communication patterns via graph edges. ArloBuilds runs 7 agents that communicate via asynchronous JSON queues. The approach depends on whether you need synchronous, hierarchical, or asynchronous communication."
          />
          <FAQItem
            q="What's the difference between an AI agent and a chatbot?"
            a="A chatbot responds to messages in a conversation — it's reactive. An AI agent takes autonomous actions — it can use tools, make API calls, write files, browse the web, and complete multi-step tasks without human intervention at each step. Agents have goals and can plan, execute, and self-correct. A chatbot answers 'how do I deploy this?' — an agent actually deploys it."
          />
          <FAQItem
            q="Do I need a GPU to run AI agents?"
            a="No. Most agent frameworks use cloud-hosted LLMs (OpenAI, Anthropic, Google) via API calls, so no local GPU is needed. Your agent code runs on a standard CPU machine and sends requests to LLM providers. You only need a GPU if you want to run local models (like Llama or Mistral) instead of cloud APIs. A $5/month cloud server or even a laptop is sufficient for running agents."
          />
          <FAQItem
            q="How do I deploy AI agents to production?"
            a="Deploy agents like any backend service: containerize with Docker, deploy to AWS/GCP/Railway/Fly.io, and set up monitoring. Key production concerns are: rate limiting (respect LLM API limits), error recovery (retry logic and fallback models), cost management (set budget caps per agent), observability (log every agent action and decision), and human-in-the-loop (escalation paths for edge cases). LangSmith, Helicone, and similar tools help with agent-specific monitoring."
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
            <p className="text-sm text-[var(--muted)] mt-1">25 Tested &amp; Ranked with copy-paste configs</p>
          </a>
          <a
            href="/mcp-servers-claude-code"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-violet-400 transition-colors group"
          >
            <p className="font-semibold group-hover:text-violet-700 transition-colors">
              Best MCP Servers for Claude Code
            </p>
            <p className="text-sm text-[var(--muted)] mt-1">15 servers tested for Claude Code workflows</p>
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
          This is an independent guide. Not affiliated with LangChain, CrewAI, Microsoft, OpenAI, or any framework developer. This page contains ads.
        </p>
      </footer>
    </div>
  );
}
