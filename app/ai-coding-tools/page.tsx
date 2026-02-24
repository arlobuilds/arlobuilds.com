"use client";

import { useState, useMemo } from "react";

/* ── Types ──────────────────────────────────────────────────── */

type UsageLevel = "light" | "medium" | "heavy" | "power";
type UseCase = "autocomplete" | "chat" | "agentic" | "prototyping";
type BudgetCap = "free" | "20" | "30" | "50" | "enterprise";

interface Tier {
  name: string;
  price: number;
  perUser: boolean;
  limits: string;
}

interface Tool {
  name: string;
  slug: string;
  type: "IDE" | "Extension" | "Terminal" | "Browser";
  tiers: Record<UsageLevel, Tier>;
  bestUseCases: UseCase[];
  features: string[];
}

interface CalcResult {
  tool: Tool;
  tier: Tier;
  pricePerUser: number;
  totalMonthly: number;
  fitsBudget: boolean;
  matchesUseCase: boolean;
  isBestValue: boolean;
}

/* ── Tool Pricing Data ──────────────────────────────────────── */

const tools: Tool[] = [
  {
    name: "Cursor",
    slug: "cursor",
    type: "IDE",
    tiers: {
      light: { name: "Free", price: 0, perUser: false, limits: "2K completions, 50 premium requests/mo" },
      medium: { name: "Pro", price: 20, perUser: false, limits: "Unlimited completions, 500 fast requests/mo" },
      heavy: { name: "Pro", price: 20, perUser: false, limits: "Unlimited completions, 500 fast requests/mo" },
      power: { name: "Business", price: 40, perUser: true, limits: "Unlimited, admin controls, privacy mode" },
    },
    bestUseCases: ["autocomplete", "chat", "agentic"],
    features: ["Multi-file editing", "Agent mode", "Codebase indexing", "VS Code fork"],
  },
  {
    name: "GitHub Copilot",
    slug: "copilot",
    type: "Extension",
    tiers: {
      light: { name: "Free", price: 0, perUser: false, limits: "2K completions, 50 chat messages/mo" },
      medium: { name: "Individual", price: 10, perUser: false, limits: "Unlimited completions, unlimited chat" },
      heavy: { name: "Business", price: 19, perUser: true, limits: "Org policies, file exclusions, audit logs" },
      power: { name: "Enterprise", price: 39, perUser: true, limits: "Custom models, fine-tuning, enterprise SSO" },
    },
    bestUseCases: ["autocomplete", "chat", "agentic"],
    features: ["Agent mode", "Multi-file edits", "VS Code + JetBrains", "GitHub integration"],
  },
  {
    name: "Windsurf",
    slug: "windsurf",
    type: "IDE",
    tiers: {
      light: { name: "Free", price: 0, perUser: false, limits: "Limited completions and chat" },
      medium: { name: "Pro", price: 15, perUser: false, limits: "Unlimited completions, fast requests" },
      heavy: { name: "Pro", price: 15, perUser: false, limits: "Unlimited completions, fast requests" },
      power: { name: "Team", price: 30, perUser: true, limits: "Parallel agents, Git worktrees, team billing" },
    },
    bestUseCases: ["autocomplete", "chat", "agentic"],
    features: ["Cascade (multi-file agent)", "Preview before accept", "SWE-1.5 model", "VS Code fork"],
  },
  {
    name: "Claude Code",
    slug: "claude-code",
    type: "Terminal",
    tiers: {
      light: { name: "Free", price: 0, perUser: false, limits: "Limited CLI usage" },
      medium: { name: "Pro", price: 20, perUser: false, limits: "200K context, standard rate limits" },
      heavy: { name: "Max 5x", price: 100, perUser: false, limits: "5x higher usage, extended thinking" },
      power: { name: "Max 20x", price: 200, perUser: false, limits: "20x usage, highest rate limits" },
    },
    bestUseCases: ["agentic", "chat"],
    features: ["80.9% SWE-bench", "200K context window", "5.5x fewer tokens", "Git-native workflow"],
  },
  {
    name: "Bolt.new",
    slug: "bolt",
    type: "Browser",
    tiers: {
      light: { name: "Free", price: 0, perUser: false, limits: "Limited tokens" },
      medium: { name: "Pro", price: 20, perUser: false, limits: "10M tokens/mo" },
      heavy: { name: "Team", price: 50, perUser: false, limits: "26M tokens/mo, team features" },
      power: { name: "Enterprise", price: 200, perUser: false, limits: "65M tokens/mo, custom integrations" },
    },
    bestUseCases: ["prototyping"],
    features: ["Full-stack in browser", "One-click deploy", "AI scaffolding", "No local setup"],
  },
  {
    name: "Replit",
    slug: "replit",
    type: "Browser",
    tiers: {
      light: { name: "Free", price: 0, perUser: false, limits: "Basic compute, limited AI" },
      medium: { name: "Core", price: 25, perUser: false, limits: "Full AI agent, faster compute" },
      heavy: { name: "Core", price: 25, perUser: false, limits: "Full AI agent, faster compute" },
      power: { name: "Teams", price: 40, perUser: true, limits: "Team collaboration, higher compute" },
    },
    bestUseCases: ["prototyping"],
    features: ["Browser IDE", "Replit Agent", "Instant deploy", "Built-in hosting"],
  },
  {
    name: "Amazon Q Developer",
    slug: "amazon-q",
    type: "Extension",
    tiers: {
      light: { name: "Free", price: 0, perUser: false, limits: "Limited suggestions, basic chat" },
      medium: { name: "Pro", price: 19, perUser: true, limits: "Unlimited, security scans, custom models" },
      heavy: { name: "Pro", price: 19, perUser: true, limits: "Unlimited, security scans, custom models" },
      power: { name: "Pro", price: 19, perUser: true, limits: "Unlimited, security scans, custom models" },
    },
    bestUseCases: ["autocomplete", "chat"],
    features: ["AWS integration", "Security scanning", "Code transformation", "VS Code + JetBrains"],
  },
  {
    name: "Gemini Code Assist",
    slug: "gemini",
    type: "Extension",
    tiers: {
      light: { name: "Free", price: 0, perUser: false, limits: "Gemini CLI, limited requests" },
      medium: { name: "Standard", price: 19, perUser: true, limits: "Full code assist, Gemini 2.0" },
      heavy: { name: "Standard", price: 19, perUser: true, limits: "Full code assist, Gemini 2.0" },
      power: { name: "Standard", price: 19, perUser: true, limits: "Full code assist, Gemini 2.0" },
    },
    bestUseCases: ["autocomplete", "chat"],
    features: ["Google Cloud integration", "Gemini 2.0 Flash", "Multi-repo context", "VS Code + JetBrains"],
  },
];

const teamSizeOptions = [
  { label: "Solo", value: 1 },
  { label: "2-5", value: 3 },
  { label: "6-20", value: 10 },
  { label: "21-50", value: 30 },
  { label: "50+", value: 50 },
];

const usageLevels: { label: string; value: UsageLevel; desc: string }[] = [
  { label: "Light", value: "light", desc: "1-2 hrs/day" },
  { label: "Medium", value: "medium", desc: "3-5 hrs/day" },
  { label: "Heavy", value: "heavy", desc: "6-8 hrs/day" },
  { label: "Power", value: "power", desc: "8+ hrs/day" },
];

const useCaseOptions: { label: string; value: UseCase }[] = [
  { label: "Autocomplete", value: "autocomplete" },
  { label: "Chat / Q&A", value: "chat" },
  { label: "Agentic Multi-file", value: "agentic" },
  { label: "Prototyping", value: "prototyping" },
];

const budgetOptions: { label: string; value: BudgetCap }[] = [
  { label: "Free only", value: "free" },
  { label: "Under $20/mo", value: "20" },
  { label: "Under $30/mo", value: "30" },
  { label: "Under $50/mo", value: "50" },
  { label: "Any budget", value: "enterprise" },
];

/* ── FAQ Data ───────────────────────────────────────────────── */

const faqs = [
  {
    q: "How much does Cursor cost in 2026?",
    a: "Cursor has a free tier with 2,000 completions and 50 premium requests per month. Cursor Pro costs $20/month with unlimited completions and 500 fast premium requests. Cursor for Business is $40/user/month with admin controls, privacy mode, and centralized billing.",
  },
  {
    q: "What is the cheapest AI coding tool?",
    a: "GitHub Copilot Individual at $10/month and Windsurf Pro at $15/month are the cheapest paid AI coding tools with full features. For free options, GitHub Copilot, Cursor, and Windsurf all offer limited free tiers. Amazon Q Developer and Gemini Code Assist also have free tiers.",
  },
  {
    q: "Is GitHub Copilot free in 2026?",
    a: "Yes. GitHub Copilot has a free tier offering 2,000 code completions and 50 chat messages per month. For unlimited usage, Copilot Individual costs $10/month, Business costs $19/user/month, and Enterprise costs $39/user/month.",
  },
  {
    q: "Which is better, Cursor or Windsurf?",
    a: "Cursor is better for autonomous agentic coding with more mature multi-file editing. Windsurf is $5/month cheaper at $15/month and previews results before you accept changes. Both are VS Code-based editors. Choose Cursor for maximum power and Windsurf for better value.",
  },
  {
    q: "Is Claude Code worth $20 per month?",
    a: "Claude Code scores 80.9% on SWE-bench, the highest of any coding tool. It uses 5.5x fewer tokens than competitors and has a 200K context window. However, it is terminal-only. It is best for experienced developers comfortable with the command line who want the most capable autonomous coding agent.",
  },
  {
    q: "What is the best AI coding tool for teams?",
    a: "GitHub Copilot Business at $19/user/month is the best value for teams, especially those already on GitHub Enterprise. Cursor Business at $40/user/month has stronger agentic features. Windsurf Team at $30/user/month falls in between. All three offer centralized billing and admin controls.",
  },
  {
    q: "Can I use AI coding tools for free?",
    a: "Yes. GitHub Copilot, Cursor, Windsurf, Amazon Q Developer, and Gemini Code Assist all have free tiers with limited usage. Bolt.new and Replit also offer free plans for prototyping. Free tiers typically limit monthly completions, chat requests, or token usage.",
  },
];

/* ── Inline Components ──────────────────────────────────────── */

function PillGroup<T extends string | number>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T; desc?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
            value === opt.value
              ? "bg-violet-600 text-white border-violet-600 shadow-md"
              : "bg-white text-gray-700 border-gray-200 hover:border-violet-300 hover:bg-violet-50"
          }`}
        >
          <span>{opt.label}</span>
          {opt.desc && (
            <span className="block text-[11px] opacity-70 mt-0.5">{opt.desc}</span>
          )}
        </button>
      ))}
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--border)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer"
      >
        <span>{q}</span>
        <span className="text-cyan-600 text-xl ml-4 shrink-0">
          {open ? "\u2212" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-4 text-[var(--muted)] leading-relaxed">{a}</p>
      )}
    </div>
  );
}

function PriceBar({ price, maxPrice, color }: { price: number; maxPrice: number; color: string }) {
  const width = maxPrice > 0 ? Math.max((price / maxPrice) * 100, 2) : 2;
  return (
    <div className="h-6 rounded-full relative" style={{ width: `${width}%`, background: color, minWidth: "8px" }}>
      <span className="absolute right-2 top-0.5 text-[11px] font-semibold text-white whitespace-nowrap">
        {price === 0 ? "Free" : `$${price}`}
      </span>
    </div>
  );
}

/* ── Price Color Helper ─────────────────────────────────────── */

function priceColor(price: number): string {
  if (price === 0) return "#10b981";
  if (price <= 20) return "#10b981";
  if (price <= 40) return "#f59e0b";
  return "#ef4444";
}

function budgetMax(budget: BudgetCap): number {
  if (budget === "free") return 0;
  if (budget === "enterprise") return Infinity;
  return parseInt(budget);
}

/* ── Page ───────────────────────────────────────────────────── */

export default function AICodingToolsPage() {
  const [teamSize, setTeamSize] = useState(1);
  const [usage, setUsage] = useState<UsageLevel>("medium");
  const [useCase, setUseCase] = useState<UseCase>("agentic");
  const [budget, setBudget] = useState<BudgetCap>("50");

  const results: CalcResult[] = useMemo(() => {
    const max = budgetMax(budget);
    const calculated = tools.map((tool) => {
      const tier = tool.tiers[usage];
      const pricePerUser = tier.price;
      const totalMonthly = tier.perUser ? pricePerUser * teamSize : pricePerUser;
      const fitsBudget = pricePerUser <= max;
      const matchesUseCase = tool.bestUseCases.includes(useCase);
      return { tool, tier, pricePerUser, totalMonthly, fitsBudget, matchesUseCase, isBestValue: false };
    });

    calculated.sort((a, b) => a.totalMonthly - b.totalMonthly);

    // Mark best value: cheapest tool that fits budget and matches use case
    const bestValue = calculated.find((r) => r.fitsBudget && r.matchesUseCase && r.totalMonthly >= 0);
    if (bestValue) bestValue.isBestValue = true;

    return calculated;
  }, [teamSize, usage, useCase, budget]);

  const maxTotal = Math.max(...results.map((r) => r.totalMonthly), 1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="text-center mb-10">
        <p className="text-sm font-medium text-[var(--accent)] mb-2 tracking-wide uppercase">
          Updated February 2026
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          AI Coding Tool{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Pricing Calculator
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
          Compare pricing for Cursor, GitHub Copilot, Windsurf, Claude Code, and
          4 more tools. Adjust your team size and usage to find the best fit.
        </p>
      </header>

      {/* ── Calculator ───────────────────────────────────── */}
      <section className="mb-12 bg-white border border-[var(--border)] rounded-2xl p-5 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Configure your needs</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
              Team Size
            </label>
            <PillGroup
              options={teamSizeOptions.map((o) => ({ label: o.label, value: o.value }))}
              value={teamSize}
              onChange={setTeamSize}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
              Daily AI Coding Hours
            </label>
            <PillGroup options={usageLevels} value={usage} onChange={setUsage} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
              Primary Use Case
            </label>
            <PillGroup options={useCaseOptions} value={useCase} onChange={setUseCase} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[var(--foreground)] mb-2">
              Budget (per user/month)
            </label>
            <PillGroup options={budgetOptions} value={budget} onChange={setBudget} />
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-[var(--border)] pt-6">
          <h3 className="text-lg font-bold mb-4">
            Results for {teamSize === 1 ? "1 developer" : `${teamSize} developers`}
          </h3>

          {/* Bar Chart */}
          <div className="space-y-3 mb-8">
            {results.map((r) => (
              <div
                key={r.tool.slug}
                className={`flex items-center gap-3 ${!r.fitsBudget ? "opacity-40" : ""}`}
              >
                <div className="w-28 sm:w-36 text-sm font-medium text-right shrink-0 flex items-center justify-end gap-1.5">
                  {r.isBestValue && (
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                      BEST
                    </span>
                  )}
                  {r.matchesUseCase && !r.isBestValue && r.fitsBudget && (
                    <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-violet-100 text-violet-700 border border-violet-200">
                      FIT
                    </span>
                  )}
                  <span>{r.tool.name}</span>
                </div>
                <div className="flex-1">
                  <PriceBar
                    price={r.totalMonthly}
                    maxPrice={maxTotal}
                    color={r.fitsBudget ? priceColor(r.pricePerUser) : "#9ca3af"}
                  />
                </div>
                <div className="w-20 text-right text-sm text-[var(--muted)] shrink-0">
                  {r.totalMonthly === 0 ? "Free" : `$${r.totalMonthly}/mo`}
                </div>
              </div>
            ))}
          </div>

          {/* Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {results.filter((r) => r.fitsBudget).map((r) => (
              <div
                key={r.tool.slug}
                className={`relative rounded-xl border p-4 ${
                  r.isBestValue
                    ? "border-emerald-400 bg-emerald-50 shadow-md"
                    : r.matchesUseCase
                      ? "border-violet-300 bg-violet-50"
                      : "border-gray-200 bg-white"
                }`}
              >
                {r.isBestValue && (
                  <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                    Best Value
                  </span>
                )}
                {r.matchesUseCase && !r.isBestValue && (
                  <span className="absolute -top-2.5 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500 text-white">
                    Good Fit
                  </span>
                )}
                <p className="font-bold text-sm mb-0.5">{r.tool.name}</p>
                <p className="text-xs text-[var(--muted)] mb-2">
                  {r.tool.type} &middot; {r.tier.name}
                </p>
                <p className="text-2xl font-extrabold mb-1">
                  {r.totalMonthly === 0 ? (
                    <span className="text-emerald-600">Free</span>
                  ) : (
                    <>
                      ${r.totalMonthly}
                      <span className="text-sm font-normal text-[var(--muted)]">/mo</span>
                    </>
                  )}
                </p>
                {teamSize > 1 && r.tier.perUser && (
                  <p className="text-xs text-[var(--muted)]">
                    ${r.pricePerUser}/user &times; {teamSize}
                  </p>
                )}
                <p className="text-xs text-[var(--muted)] mt-2">{r.tier.limits}</p>
              </div>
            ))}
          </div>

          {results.filter((r) => !r.fitsBudget).length > 0 && (
            <p className="text-xs text-[var(--muted)] mt-4">
              {results.filter((r) => !r.fitsBudget).length} tool(s) hidden because they exceed your budget.{" "}
              <button
                onClick={() => setBudget("enterprise")}
                className="text-[var(--accent)] underline cursor-pointer"
              >
                Show all
              </button>
            </p>
          )}
        </div>
      </section>

      {/* ── How To Use ───────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          How to use this calculator
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: "1",
              title: "Set your parameters",
              desc: "Choose your team size, daily AI usage hours, primary use case, and monthly budget per user.",
            },
            {
              step: "2",
              title: "Compare results",
              desc: "The calculator recommends the right pricing tier for each tool and sorts by total monthly cost.",
            },
            {
              step: "3",
              title: "Pick your tool",
              desc: "Look for the \"Best Value\" badge. Tools marked \"Good Fit\" match your use case. Grey tools exceed your budget.",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="bg-white border border-[var(--border)] rounded-xl p-5"
            >
              <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-sm mb-3">
                {s.step}
              </div>
              <p className="font-semibold mb-1">{s.title}</p>
              <p className="text-sm text-[var(--muted)]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ad Slot 1 ────────────────────────────────────── */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-1" className="w-full" />
      </div>

      {/* ── Detailed Tool Profiles ────────────────────────── */}
      <section id="tools" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8">
          AI Coding Tools Compared: Full Profiles
        </h2>

        {/* Top 4: Cursor, Copilot, Windsurf, Claude Code */}
        <div className="space-y-8 mb-8">
          {/* Cursor */}
          <div id="cursor" className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xl font-bold">Cursor</h3>
                <p className="text-sm text-[var(--muted)]">AI-first code editor built on VS Code</p>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-medium border bg-indigo-50 text-indigo-700 border-indigo-200">
                Full IDE
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Free</p>
                <p className="text-sm font-medium">$0/mo</p>
                <p className="text-xs text-[var(--muted)]">2K completions, 50 premium requests</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Pro</p>
                <p className="text-sm font-medium">$20/mo</p>
                <p className="text-xs text-[var(--muted)]">Unlimited completions, 500 fast requests</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Business</p>
                <p className="text-sm font-medium">$40/user/mo</p>
                <p className="text-xs text-[var(--muted)]">Admin controls, privacy mode, SSO</p>
              </div>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              Cursor is a VS Code fork with AI built directly into the editor. It popularized the concept of agentic multi-file editing, where the AI can create, modify, and delete files across your entire codebase in a single operation. The Composer feature lets you describe a change in natural language and the AI implements it across multiple files with full context awareness.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              The free tier is generous enough for evaluation but most active developers will need Pro. At $20/month, Cursor Pro gives you 500 fast premium requests with models like Claude Sonnet 4.6 and GPT-4o. The codebase indexing feature means the AI understands your entire project structure, not just the file you have open.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              The main drawback is that Cursor lags behind upstream VS Code updates by a few weeks. Some extensions can behave differently in the fork. For teams already invested in VS Code settings and extensions, this is worth testing before committing.
            </p>
          </div>

          {/* GitHub Copilot */}
          <div id="copilot" className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xl font-bold">GitHub Copilot</h3>
                <p className="text-sm text-[var(--muted)]">AI pair programmer with enterprise-grade controls</p>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
                Extension
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Free</p>
                <p className="text-sm font-medium">$0/mo</p>
                <p className="text-xs text-[var(--muted)]">2K completions, 50 chat/mo</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Individual</p>
                <p className="text-sm font-medium">$10/mo</p>
                <p className="text-xs text-[var(--muted)]">Unlimited completions and chat</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Business</p>
                <p className="text-sm font-medium">$19/user/mo</p>
                <p className="text-xs text-[var(--muted)]">Org policies, audit logs</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Enterprise</p>
                <p className="text-sm font-medium">$39/user/mo</p>
                <p className="text-xs text-[var(--muted)]">Custom models, fine-tuning, SSO</p>
              </div>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              GitHub Copilot has evolved significantly in 2026. The free tier alone offers 2,000 completions and 50 chat messages per month, making it the easiest way to try AI-assisted coding without paying anything. Agent mode now supports multi-file editing similar to Cursor, though the implementation is less mature.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              The strongest case for Copilot is the ecosystem. It works natively in VS Code, JetBrains, and Neovim. For teams already on GitHub Enterprise, Copilot Business inherits org-level policies, file exclusions, and access controls. The $19/user/month Business tier is the best value for teams of any size.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Copilot supports multiple AI models including Claude 3.5 Sonnet and GPT-4o. The Individual plan at $10/month is the cheapest paid option among the mainstream tools, making it an excellent starting point for solo developers who want unlimited usage without breaking the bank.
            </p>
          </div>

          {/* Windsurf */}
          <div id="windsurf" className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xl font-bold">Windsurf</h3>
                <p className="text-sm text-[var(--muted)]">AI-first IDE with multi-file editing and preview</p>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-medium border bg-indigo-50 text-indigo-700 border-indigo-200">
                Full IDE
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Free</p>
                <p className="text-sm font-medium">$0/mo</p>
                <p className="text-xs text-[var(--muted)]">Limited completions and chat</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Pro</p>
                <p className="text-sm font-medium">$15/mo</p>
                <p className="text-xs text-[var(--muted)]">Unlimited completions, fast requests</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Team</p>
                <p className="text-sm font-medium">$30/user/mo</p>
                <p className="text-xs text-[var(--muted)]">Parallel agents, Git worktrees</p>
              </div>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              Windsurf (formerly Codeium) is the value play in AI coding tools. At $15/month for Pro, it is $5 cheaper than Cursor while offering a similar VS Code-based editing experience. The standout feature is Cascade, an agentic flow that can edit multiple files and shows you the results before you accept changes.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              The Wave 13 release in February 2026 introduced the SWE-1.5 model, which is free for all users through March 2026. It also added parallel agent support and Git worktree integration for the Team tier. Windsurf is actively closing the feature gap with Cursor while maintaining a price advantage.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              The ecosystem is smaller than VS Code proper. Plugin compatibility is good but not perfect. For developers who primarily need fast completions and occasional multi-file edits, Windsurf Pro at $15/month is hard to beat on pure value.
            </p>
          </div>

          {/* Claude Code */}
          <div id="claude-code" className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div>
                <h3 className="text-xl font-bold">Claude Code</h3>
                <p className="text-sm text-[var(--muted)]">Agentic terminal coding tool with top benchmark scores</p>
              </div>
              <span className="px-2 py-0.5 rounded text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200">
                Terminal
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Pro</p>
                <p className="text-sm font-medium">$20/mo</p>
                <p className="text-xs text-[var(--muted)]">200K context, standard rate limits</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Max 5x</p>
                <p className="text-sm font-medium">$100/mo</p>
                <p className="text-xs text-[var(--muted)]">5x higher usage, extended thinking</p>
              </div>
              <div className="bg-[var(--card-bg)] rounded-lg p-4">
                <p className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wide mb-1">Max 20x</p>
                <p className="text-sm font-medium">$200/mo</p>
                <p className="text-xs text-[var(--muted)]">20x usage, highest rate limits</p>
              </div>
            </div>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              Claude Code is the terminal-based coding agent from Anthropic. It scores 80.9% on SWE-bench, the highest of any AI coding tool as of February 2026. It uses 5.5x fewer tokens than competitors on the same tasks, which matters when you are paying for usage on the Max plans.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-3">
              The 200K context window is the largest among coding tools. Claude Code can hold your entire codebase in memory during a session, making it excellent for large refactors, complex debugging, and multi-file changes. It integrates natively with Git, creating commits, managing branches, and even running tests.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              The limitation is clear: no GUI. Claude Code runs entirely in the terminal. There is no syntax highlighting, no file tree sidebar, no click-to-navigate. You type what you want and the AI does it. For developers who already live in the terminal, this is efficient. For those who need visual feedback, it is a non-starter. The Pro plan at $20/month is the entry point, but heavy users will quickly hit rate limits and need Max 5x at $100/month.
            </p>
          </div>
        </div>

        {/* Bottom 4: Bolt.new, Replit, Amazon Q, Gemini */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Bolt.new */}
          <div id="bolt" className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-1">Bolt.new</h3>
            <p className="text-xs text-[var(--muted)] mb-3">Browser &middot; $0 / $20 / $50 / $200/mo</p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-2">
              Bolt.new is a browser-based development environment that generates full-stack applications from natural language prompts. It handles both frontend and backend code, deploys to production with one click, and requires zero local setup.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Best for rapid prototyping and MVPs. Not suitable for existing codebases or production-grade applications. The token-based pricing means costs can vary significantly depending on project complexity.
            </p>
          </div>

          {/* Replit */}
          <div id="replit" className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-1">Replit</h3>
            <p className="text-xs text-[var(--muted)] mb-3">Browser &middot; $0 / $25 / $40/user/mo</p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-2">
              Replit Agent builds complete applications from descriptions. It handles file creation, dependency installation, database setup, and deployment to Replit hosting. The browser IDE runs on any device without configuration.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Ideal for beginners, educators, and rapid prototyping. The Core plan at $25/month gives full AI agent access. Limited language and framework support compared to local development tools. Hosting is tied to Replit infrastructure.
            </p>
          </div>

          {/* Amazon Q */}
          <div id="amazon-q" className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-1">Amazon Q Developer</h3>
            <p className="text-xs text-[var(--muted)] mb-3">Extension &middot; $0 / $19/user/mo</p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-2">
              Amazon Q Developer is AWS's AI coding assistant. It works in VS Code and JetBrains IDEs with deep integration into AWS services. The Pro tier includes automated security scans, code transformation, and custom model support.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              The value proposition is strongest for teams building on AWS. If your stack is Lambda, DynamoDB, and ECS, Amazon Q understands your infrastructure natively. For non-AWS projects, Copilot or Cursor offer broader capabilities.
            </p>
          </div>

          {/* Gemini Code Assist */}
          <div id="gemini" className="bg-white border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-1">Gemini Code Assist</h3>
            <p className="text-xs text-[var(--muted)] mb-3">Extension &middot; $0 / $19/user/mo</p>
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-2">
              Google's AI coding assistant powered by Gemini 2.0 Flash. Works in VS Code and JetBrains with Google Cloud integration. The free Gemini CLI offers terminal-based coding similar to Claude Code but with Gemini's 1M token context.
            </p>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              Best for teams on Google Cloud Platform. Multi-repo context awareness is a standout feature for large codebases. The $19/user/month pricing matches Amazon Q, making it competitive for enterprise teams choosing between cloud providers.
            </p>
          </div>
        </div>
      </section>

      {/* ── Feature Comparison Table ──────────────────────── */}
      <section id="comparison" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Feature Comparison
        </h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr className="bg-gray-900">
                <th>Tool</th>
                <th>Type</th>
                <th>Starting Price</th>
                <th>Team Price</th>
                <th>Agent Mode</th>
                <th>Multi-file Edit</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Cursor", type: "IDE", start: "$0 (free tier)", team: "$40/user/mo", agent: true, multi: true },
                { name: "GitHub Copilot", type: "Extension", start: "$0 (free tier)", team: "$19/user/mo", agent: true, multi: true },
                { name: "Windsurf", type: "IDE", start: "$0 (free tier)", team: "$30/user/mo", agent: true, multi: true },
                { name: "Claude Code", type: "Terminal", start: "$20/mo (Pro)", team: "N/A", agent: true, multi: true },
                { name: "Bolt.new", type: "Browser", start: "$0 (free tier)", team: "$50/mo", agent: true, multi: true },
                { name: "Replit", type: "Browser", start: "$0 (free tier)", team: "$40/user/mo", agent: true, multi: true },
                { name: "Amazon Q", type: "Extension", start: "$0 (free tier)", team: "$19/user/mo", agent: false, multi: false },
                { name: "Gemini Code Assist", type: "Extension", start: "$0 (free tier)", team: "$19/user/mo", agent: false, multi: false },
              ].map((row) => (
                <tr key={row.name}>
                  <td className="font-semibold">{row.name}</td>
                  <td className="text-sm">{row.type}</td>
                  <td className="text-sm">{row.start}</td>
                  <td className="text-sm">{row.team}</td>
                  <td className="text-center">
                    {row.agent ? (
                      <span className="text-[var(--success)]">&#10003;</span>
                    ) : (
                      <span className="text-[var(--muted)]">&#10007;</span>
                    )}
                  </td>
                  <td className="text-center">
                    {row.multi ? (
                      <span className="text-[var(--success)]">&#10003;</span>
                    ) : (
                      <span className="text-[var(--muted)]">&#10007;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Ad Slot 2 ────────────────────────────────────── */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-2" className="w-full" />
      </div>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="bg-white border border-[var(--border)] rounded-xl p-6">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── Internal Links ───────────────────────────────── */}
      <section className="mb-16">
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
          <h3 className="font-bold mb-3">More from ArloBuilds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="/cursor-alternatives" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline">
              <span>&rarr;</span> Best Cursor Alternatives 2026: 10 Tested
            </a>
            <a href="/mcp-servers" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline">
              <span>&rarr;</span> Best MCP Servers 2026: 25 Tested & Ranked
            </a>
            <a href="/mcp-servers-claude-code" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline">
              <span>&rarr;</span> Best MCP Servers for Claude Code
            </a>
            <a href="/mcp-servers-cursor" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline">
              <span>&rarr;</span> Best MCP Servers for Cursor
            </a>
            <a href="/ai-agent-frameworks" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline">
              <span>&rarr;</span> Best AI Agent Frameworks 2026
            </a>
            <a href="/ai-prompt-library" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline">
              <span>&rarr;</span> AI Prompt Library: 470+ Tested Prompts
            </a>
            <a href="/best-ai-proposal-tools" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline">
              <span>&rarr;</span> Best AI Proposal Tools 2026
            </a>
            <a href="/seedance-pricing" className="flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] no-underline">
              <span>&rarr;</span> Seedance 2.0 Pricing Guide
            </a>
          </div>
        </div>
      </section>

      {/* ── ProposalPilot CTA ────────────────────────────── */}
      <section className="mb-12 bg-gray-900 border border-gray-700 rounded-xl p-6 sm:p-8 text-center">
        <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">From ArloBuilds</p>
        <p className="text-lg font-bold text-white mb-2">ProposalPilot</p>
        <p className="text-sm text-gray-400 mb-4 max-w-lg mx-auto">
          AI-powered proposals and cover letters for freelancers. Paste a job description, get 3 tailored variants. Free tier available.
        </p>
        <a
          href="https://proposalpilots.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2.5 rounded-lg bg-amber-500 text-gray-950 font-semibold text-sm hover:bg-amber-400 transition-colors no-underline"
        >
          Try ProposalPilot free
        </a>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)] pt-8 pb-12 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          Last updated: February 2026. Prices and features change frequently. Verify on each tool&apos;s website before purchasing.
        </p>
        <p>
          ArloBuilds is independent. This guide is not sponsored.
        </p>
      </footer>

      {/* TinyAdz Script */}
      <script
        src="https://cdn.apitiny.net/scripts/v2.0/main.js"
        data-site-id="6933804cc6901e6b3a03eba9"
        data-test-mode="false"
        async
      />
    </div>
  );
}
