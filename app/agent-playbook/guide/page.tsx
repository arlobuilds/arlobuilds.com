import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Agent Playbook — Full Guide",
  description:
    "Complete guide to building autonomous AI agent systems. Architecture, SOUL files, communication protocols, scheduling, memory, and more.",
  robots: { index: false, follow: false },
};

/* ─── code block helper ─── */
function Code({ children, title }: { children: string; title?: string }) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-[var(--mc-border)]">
      {title && (
        <div className="bg-[var(--mc-panel)] px-4 py-2 text-xs font-[family-name:var(--font-mono)] text-[var(--mc-muted)] border-b border-[var(--mc-border)]">
          {title}
        </div>
      )}
      <pre className="bg-[var(--mc-base)] p-4 overflow-x-auto text-sm leading-relaxed font-[family-name:var(--font-mono)] text-[var(--mc-muted)]">
        <code>{children}</code>
      </pre>
    </div>
  );
}

/* ─── section wrapper ─── */
function Chapter({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={`ch-${num}`} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--mc-blue)] font-bold bg-[var(--mc-blue-dim)] px-2.5 py-1 rounded">
          {num}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      </div>
      <div className="space-y-5 text-[15px] text-[var(--mc-muted)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

/* ─── table of contents data ─── */
const toc = [
  { num: "01", title: "Architecture Overview" },
  { num: "02", title: "SOUL Files" },
  { num: "03", title: "Communication Protocol" },
  { num: "04", title: "Scheduling & Triggers" },
  { num: "05", title: "Shared Memory" },
  { num: "06", title: "Watchdog & Recovery" },
  { num: "07", title: "Monetization" },
  { num: "08", title: "Lessons Learned" },
];

export default function AgentPlaybookGuide() {
  return (
    <div className="mission-control dot-grid min-h-screen flex flex-col">
      <div className="top-glow" />

      {/* NAV */}
      <nav className="shrink-0 border-b border-[var(--mc-border)] bg-[var(--mc-base)]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-12 flex items-center justify-between">
          <Link href="/agent-playbook" className="flex items-center gap-2.5">
            <span className="status-dot" />
            <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold text-[var(--mc-text)] tracking-wide">
              THE AGENT PLAYBOOK
            </span>
          </Link>
          <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--mc-dim)]">
            ARLOBUILDS
          </span>
        </div>
      </nav>

      {/* GUIDE CONTENT */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        {/* HEADER */}
        <div className="text-center mb-16 fade-in">
          <div className="inline-block mb-4">
            <span className="tag text-[var(--mc-green)]">FULL GUIDE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            The Agent Playbook
          </h1>
          <p className="text-[var(--mc-muted)] max-w-2xl mx-auto">
            How to build an autonomous AI agent system that operates a real
            business. Every architecture decision, protocol, and failure mode —
            documented from a live production system.
          </p>
        </div>

        {/* TABLE OF CONTENTS */}
        <div className="panel p-6 mb-16">
          <h3 className="font-[family-name:var(--font-mono)] text-xs text-[var(--mc-dim)] tracking-widest mb-4">
            TABLE OF CONTENTS
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {toc.map((ch) => (
              <a
                key={ch.num}
                href={`#ch-${ch.num}`}
                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-[var(--mc-panel)] transition-colors"
              >
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--mc-blue)] font-bold">
                  {ch.num}
                </span>
                <span className="text-sm text-[var(--mc-text)]">
                  {ch.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* CHAPTERS */}
        <div className="space-y-20">
          {/* ── CHAPTER 01 ── */}
          <Chapter num="01" title="Architecture Overview">
            <p>
              The system runs on{" "}
              <span className="text-[var(--mc-text)] font-medium">
                7 autonomous AI agents
              </span>
              , each with a defined role, clear authority boundaries, and
              structured communication channels. There is no central
              orchestration server. Agents coordinate through asynchronous
              message queues (JSON files on disk) and shared memory files.
            </p>

            <div className="panel p-6">
              <h4 className="text-[var(--mc-text)] font-semibold mb-4 text-base">
                The 7 Agents
              </h4>
              <div className="space-y-3">
                {[
                  {
                    name: "@entrepreneur",
                    role: "CEO — strategy, delegation, budget, revenue tracking",
                    color: "var(--mc-amber)",
                  },
                  {
                    name: "@coder",
                    role: "Builder — ships products, deploys infrastructure, writes code",
                    color: "var(--mc-blue)",
                  },
                  {
                    name: "@marketer",
                    role: "Growth — SEO, keyword research, conversion optimization, distribution",
                    color: "var(--mc-green)",
                  },
                  {
                    name: "@content",
                    role: "Brand — social media, video, newsletters, personal brand voice",
                    color: "var(--mc-purple)",
                  },
                  {
                    name: "@qa",
                    role: "Sentinel — product testing, content monitoring, deployment verification",
                    color: "var(--mc-red)",
                  },
                  {
                    name: "@support",
                    role: "Customer ops — ticket resolution, refunds, churn prevention",
                    color: "var(--mc-cyan)",
                  },
                  {
                    name: "@sidehustle",
                    role: "Revenue scout — builds organic traffic pages, monetizes with ads",
                    color: "var(--mc-amber)",
                  },
                ].map((a) => (
                  <div key={a.name} className="flex gap-3 items-start">
                    <span
                      className="font-[family-name:var(--font-mono)] text-xs font-bold shrink-0 mt-0.5"
                      style={{ color: a.color }}
                    >
                      {a.name}
                    </span>
                    <span className="text-sm text-[var(--mc-muted)]">
                      {a.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p>
              Each agent runs in discrete time-boxed sessions triggered by cron
              schedules. They don&apos;t run 24/7 — they wake up, read their
              queue, do their work, write their output, and go back to sleep.
              This keeps costs predictable and prevents runaway loops.
            </p>

            <p className="text-[var(--mc-text)]">
              The human (Daniel) provides strategic direction, resolves
              bottlenecks that require external access (DNS, OAuth, billing
              accounts), and reviews high-stakes decisions. Everything else — the
              daily research, building, deploying, writing, posting, testing — is
              autonomous.
            </p>

            <div className="panel p-6">
              <h4 className="text-[var(--mc-text)] font-semibold mb-3 text-base">
                Why This Structure Works
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-[var(--mc-blue)]">Separation of concerns.</span>{" "}
                  Each agent has a narrow scope. @coder never writes social posts.
                  @content never touches production code. This prevents conflicting
                  actions and makes debugging easy.
                </li>
                <li>
                  <span className="text-[var(--mc-blue)]">Async by default.</span>{" "}
                  Agents don&apos;t need to be online simultaneously. @entrepreneur
                  queues a task at 6 AM, @coder picks it up at 9 AM. No blocking.
                </li>
                <li>
                  <span className="text-[var(--mc-blue)]">Flat hierarchy with one coordinator.</span>{" "}
                  @entrepreneur delegates and reviews. Everyone else executes
                  within their authority. No committee decisions.
                </li>
                <li>
                  <span className="text-[var(--mc-blue)]">Designed for failure.</span>{" "}
                  Tasks have TTLs. Queues have dead letter handling. The watchdog
                  catches silent failures. Nothing depends on a single agent
                  running perfectly.
                </li>
              </ul>
            </div>
          </Chapter>

          {/* ── CHAPTER 02 ── */}
          <Chapter num="02" title="SOUL Files">
            <p>
              Every agent has a{" "}
              <span className="text-[var(--mc-text)] font-medium">
                SOUL.md file
              </span>{" "}
              — a structured identity document that defines who the agent is,
              what it can do, what it must never do, and how it operates. This is
              the single most important pattern in the system. Without SOUL
              files, agents drift, hallucinate permissions, and make decisions
              outside their authority.
            </p>

            <div className="panel p-6">
              <h4 className="text-[var(--mc-text)] font-semibold mb-3 text-base">
                Anatomy of a SOUL File
              </h4>
              <div className="space-y-3 text-sm">
                {[
                  {
                    section: "Identity",
                    desc: "Who are you? One paragraph. Clear role, clear scope. \"You are @coder, the builder agent for ArloBuilds.\"",
                  },
                  {
                    section: "Operating Loop",
                    desc: "The exact sequence of steps for every session: read queue → check state → plan → execute → report. No ambiguity.",
                  },
                  {
                    section: "Responsibilities",
                    desc: "Explicit list of what this agent owns. @marketer owns SEO, keyword research, conversion optimization. Not content creation — that's @content.",
                  },
                  {
                    section: "Decision Authority",
                    desc: "What can the agent decide autonomously vs. what requires escalation. \"Can create Stripe products <$299. Must escalate pricing >$299 to Daniel.\"",
                  },
                  {
                    section: "Guardrails",
                    desc: "Hard rules that cannot be overridden. Max 3 retries. Never use the Anthropic subscription key in products. Never force push to main. 30-minute stuck rule.",
                  },
                  {
                    section: "Tools & Services",
                    desc: "What APIs, keys, and tools the agent has access to. Prevents guessing and unauthorized access attempts.",
                  },
                  {
                    section: "Communication Style",
                    desc: "How the agent writes and speaks. @content has banned words (\"leverage\", \"streamline\", \"delve\"). @support is direct and never blames the customer.",
                  },
                ].map((s) => (
                  <div key={s.section}>
                    <span className="text-[var(--mc-text)] font-medium">
                      {s.section}:
                    </span>{" "}
                    {s.desc}
                  </div>
                ))}
              </div>
            </div>

            <Code title="Example: @coder SOUL.md (abbreviated)">{`# SOUL — @coder

You are @coder, the builder agent for ArloBuilds.
You ship products, deploy infrastructure, and write code.
Bias toward speed over perfection. A landing page takes
10 minutes, not 2 days.

## Operating Loop
1. Read queue: agents/shared/queue/coder/incoming/
2. Parse highest-priority task
3. Write task_update: in_progress
4. Gather context from shared memory
5. Plan implementation (max 5 min)
6. Build and deploy
7. Verify (hit the URL, check health, test flows)
8. Write task_update: done
9. Report to @entrepreneur

## Decision Authority
AUTONOMOUS:
- Bug fixes, performance improvements
- Create repos, Supabase projects, Railway deploys
- Create Stripe products/prices (<$299)
- Minor UI changes, dependency updates

ESCALATE:
- Architecture changes affecting multiple products
- Pricing decisions >$299
- New paid service signups
- Security-sensitive changes

## Guardrails
- Max 3 retries on any task, then escalate
- Never use Anthropic subscription key in products
- Never force push to main
- Never store secrets in code
- 30-minute stuck rule: if blocked >30min, escalate
- Always verify deployment before reporting done`}</Code>

            <p>
              SOUL files are{" "}
              <span className="text-[var(--mc-text)]">living documents</span>.
              When an agent makes a mistake, you update the SOUL file to prevent
              recurrence. When you grant new permissions (like Stripe API
              access), you add it to the SOUL file. The agent reads its SOUL.md
              at the start of every session — it&apos;s the first instruction it
              sees.
            </p>

            <div className="panel p-6 border-[var(--mc-amber-dim)]">
              <h4 className="text-[var(--mc-amber)] font-semibold mb-2 text-sm font-[family-name:var(--font-mono)]">
                KEY INSIGHT
              </h4>
              <p className="text-sm">
                The SOUL file is not a system prompt — it&apos;s a{" "}
                <span className="text-[var(--mc-text)]">contract</span>. When an
                agent violates its SOUL file, you catch it in review and tighten
                the guardrails. Over time, the SOUL file becomes a precise
                specification of what the agent can and cannot do, learned from
                real failures.
              </p>
            </div>
          </Chapter>

          {/* ── CHAPTER 03 ── */}
          <Chapter num="03" title="Communication Protocol">
            <p>
              Agents communicate through{" "}
              <span className="text-[var(--mc-text)] font-medium">
                asynchronous JSON messages
              </span>{" "}
              written to shared queue directories. No WebSockets, no database, no
              message broker. Just files on disk with a clear naming convention
              and lifecycle.
            </p>

            <Code title="Message Format">{`{
  "id": "msg-20260222-042",
  "from": "@entrepreneur",
  "to": "@coder",
  "type": "task",
  "priority": "critical",
  "subject": "Ship Agent Playbook landing page",
  "body": "Build landing page at /agent-playbook with...",
  "deadline": "2026-02-23T12:00:00Z",
  "ttl_minutes": 120,
  "expects": "deployed URL with working Stripe checkout",
  "blocked_by": [],
  "created": "2026-02-22T23:00:00Z"
}`}</Code>

            <div className="panel p-6">
              <h4 className="text-[var(--mc-text)] font-semibold mb-3 text-base">
                Message Types
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-[var(--mc-blue)] font-[family-name:var(--font-mono)]">
                    task
                  </span>{" "}
                  — Work assignment with deadline, priority, and expected
                  deliverable.
                </div>
                <div>
                  <span className="text-[var(--mc-blue)] font-[family-name:var(--font-mono)]">
                    task_update
                  </span>{" "}
                  — Status change: in_progress, blocked, done. Includes
                  deliverable location when complete.
                </div>
                <div>
                  <span className="text-[var(--mc-blue)] font-[family-name:var(--font-mono)]">
                    escalation
                  </span>{" "}
                  — Something is broken or blocked. Requires immediate attention
                  from @entrepreneur or Daniel.
                </div>
                <div>
                  <span className="text-[var(--mc-blue)] font-[family-name:var(--font-mono)]">
                    info
                  </span>{" "}
                  — Context sharing. &quot;I found this during research, might be
                  useful for your task.&quot;
                </div>
                <div>
                  <span className="text-[var(--mc-blue)] font-[family-name:var(--font-mono)]">
                    sync_memo
                  </span>{" "}
                  — Strategic debate. Multiple agents write positions on a major
                  decision.
                </div>
              </div>
            </div>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              Queue Directory Structure
            </h3>
            <Code>{`agents/shared/queue/
├── entrepreneur/
│   ├── incoming/      # New messages waiting to be read
│   └── processed/     # Messages that have been handled
├── coder/
│   ├── incoming/
│   ├── processed/
│   └── failed/        # Messages that expired (TTL exceeded)
├── marketer/
│   ├── incoming/
│   └── processed/
├── content/
│   ├── incoming/
│   └── processed/
└── ... (one per agent)`}</Code>

            <p>
              When an agent starts a session, it reads all files in its{" "}
              <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1.5 py-0.5 rounded text-sm">
                incoming/
              </code>{" "}
              directory, processes them in priority order, then moves each file
              to{" "}
              <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1.5 py-0.5 rounded text-sm">
                processed/
              </code>
              . If a message&apos;s TTL expires before it&apos;s read, the
              watchdog moves it to{" "}
              <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1.5 py-0.5 rounded text-sm">
                failed/
              </code>
              .
            </p>

            <div className="panel p-6">
              <h4 className="text-[var(--mc-text)] font-semibold mb-3 text-base">
                Task Lifecycle
              </h4>
              <div className="font-[family-name:var(--font-mono)] text-xs text-[var(--mc-muted)] space-y-1">
                <div>
                  <span className="text-[var(--mc-dim)]">1.</span>{" "}
                  <span className="text-[var(--mc-amber)]">ASSIGNED</span> →
                  Task written to agent&apos;s incoming/ queue
                </div>
                <div>
                  <span className="text-[var(--mc-dim)]">2.</span>{" "}
                  <span className="text-[var(--mc-blue)]">ACKNOWLEDGED</span> →
                  Agent reads and moves to processed/
                </div>
                <div>
                  <span className="text-[var(--mc-dim)]">3.</span>{" "}
                  <span className="text-[var(--mc-cyan)]">IN_PROGRESS</span> →
                  Agent sends task_update with status
                </div>
                <div>
                  <span className="text-[var(--mc-dim)]">4.</span>{" "}
                  <span className="text-[var(--mc-red)]">BLOCKED</span> →
                  Agent hits a wall, escalates with reason
                </div>
                <div>
                  <span className="text-[var(--mc-dim)]">5.</span>{" "}
                  <span className="text-[var(--mc-green)]">DONE</span> →
                  Deliverable written, task_update sent
                </div>
                <div>
                  <span className="text-[var(--mc-dim)]">6.</span>{" "}
                  <span className="text-[var(--mc-purple)]">VERIFIED</span> →
                  @qa or @entrepreneur confirms the output
                </div>
              </div>
            </div>

            <div className="panel p-6 border-[var(--mc-amber-dim)]">
              <h4 className="text-[var(--mc-amber)] font-semibold mb-2 text-sm font-[family-name:var(--font-mono)]">
                KEY INSIGHT
              </h4>
              <p className="text-sm">
                Using the filesystem as a message queue sounds primitive, but
                it&apos;s intentional. Files are inspectable (you can{" "}
                <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1 rounded">
                  ls
                </code>{" "}
                and{" "}
                <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1 rounded">
                  cat
                </code>{" "}
                your message queue), they persist across crashes, they work with
                git for history, and they require zero infrastructure. When your
                agents run as CLI sessions on a single machine, you don&apos;t
                need Kafka.
              </p>
            </div>
          </Chapter>

          {/* ── CHAPTER 04 ── */}
          <Chapter num="04" title="Scheduling & Triggers">
            <p>
              Agents don&apos;t run continuously. Each agent has scheduled
              sessions triggered by cron (or launchd on macOS), and the system
              dynamically adjusts which sessions fire based on{" "}
              <span className="text-[var(--mc-text)] font-medium">
                API usage tiers
              </span>
              .
            </p>

            <div className="panel p-6">
              <h4 className="text-[var(--mc-text)] font-semibold mb-3 text-base">
                Usage-Based Pacing Tiers
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 items-start">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--mc-green)] shrink-0 mt-0.5">
                    FULL
                  </span>
                  <span>
                    5-hour usage &lt;60% AND 7-day &lt;70%. All sessions fire.
                    Maximum throughput.
                  </span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--mc-blue)] shrink-0 mt-0.5">
                    CORE
                  </span>
                  <span>
                    5-hour 60-80% OR 7-day 70-85%. Only critical and core
                    sessions fire. Research and nice-to-haves paused.
                  </span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--mc-amber)] shrink-0 mt-0.5">
                    ESSENTIAL
                  </span>
                  <span>
                    5-hour &gt;80% OR 7-day &gt;85%. Only critical sessions (CEO
                    morning, critical bug fixes). Everything else paused.
                  </span>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="font-[family-name:var(--font-mono)] text-xs font-bold text-[var(--mc-red)] shrink-0 mt-0.5">
                    BLOCKED
                  </span>
                  <span>
                    5-hour &gt;95% OR 7-day &gt;95%. Nothing fires. Wait for
                    quota reset.
                  </span>
                </div>
              </div>
            </div>

            <Code title="schedule-trigger.sh (core logic)">{`#!/bin/bash
# Check subscription usage before firing agent sessions

USAGE_5H=$(check_usage "5h")
USAGE_7D=$(check_usage "7d")

if [ "$USAGE_5H" -gt 95 ] || [ "$USAGE_7D" -gt 95 ]; then
  TIER="BLOCKED"
elif [ "$USAGE_5H" -gt 80 ] || [ "$USAGE_7D" -gt 85 ]; then
  TIER="ESSENTIAL"
elif [ "$USAGE_5H" -gt 60 ] || [ "$USAGE_7D" -gt 70 ]; then
  TIER="CORE"
else
  TIER="FULL"
fi

# Session priorities determine which fire per tier
# critical → always fires (unless BLOCKED)
# core     → fires in FULL + CORE
# standard → fires in FULL only

case "$SESSION_PRIORITY" in
  critical) [ "$TIER" != "BLOCKED" ] && fire_session ;;
  core)     [ "$TIER" = "FULL" ] || [ "$TIER" = "CORE" ] && fire_session ;;
  standard) [ "$TIER" = "FULL" ] && fire_session ;;
esac`}</Code>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              Daily Schedule
            </h3>
            <p>
              Here&apos;s the actual cron schedule running the system. Each entry
              triggers a specific agent with a specific session type and
              priority.
            </p>

            <div className="panel overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--mc-border)]">
                    <th className="text-left px-4 py-3 text-xs font-[family-name:var(--font-mono)] text-[var(--mc-dim)] bg-transparent">
                      Time
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-[family-name:var(--font-mono)] text-[var(--mc-dim)] bg-transparent">
                      Agent
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-[family-name:var(--font-mono)] text-[var(--mc-dim)] bg-transparent">
                      Session
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-[family-name:var(--font-mono)] text-[var(--mc-dim)] bg-transparent">
                      Priority
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--mc-muted)]">
                  {[
                    ["6:00 AM", "@entrepreneur", "morning", "critical"],
                    ["6:30 AM", "@content", "morning", "core"],
                    ["7:00 AM", "@coder", "morning", "core"],
                    ["8:00 AM", "@marketer", "morning", "core"],
                    ["8:30 AM", "@sidehustle", "morning", "standard"],
                    ["9:00 AM", "@qa", "morning", "core"],
                    ["12:00 PM", "@entrepreneur", "midday", "critical"],
                    ["12:30 PM", "@content", "midday", "core"],
                    ["1:00 PM", "@coder", "afternoon", "core"],
                    ["2:00 PM", "@marketer", "afternoon", "standard"],
                    ["5:00 PM", "@content", "evening", "core"],
                    ["6:00 PM", "@coder", "evening", "core"],
                    ["7:00 PM", "@qa", "evening", "core"],
                    ["9:00 PM", "@entrepreneur", "evening", "critical"],
                    ["10:00 PM", "@coder", "night-1", "standard"],
                    ["11:00 PM", "@content", "night", "standard"],
                    ["2:00 AM", "@entrepreneur", "consolidation", "critical"],
                  ].map(([time, agent, session, priority]) => (
                    <tr
                      key={`${agent}-${session}`}
                      className="border-b border-[var(--mc-border)] hover:bg-[var(--mc-panel)]"
                    >
                      <td className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs text-[var(--mc-text)]">
                        {time}
                      </td>
                      <td className="px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs">
                        {agent}
                      </td>
                      <td className="px-4 py-2.5">{session}</td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`font-[family-name:var(--font-mono)] text-xs font-bold ${
                            priority === "critical"
                              ? "text-[var(--mc-red)]"
                              : priority === "core"
                                ? "text-[var(--mc-blue)]"
                                : "text-[var(--mc-dim)]"
                          }`}
                        >
                          {priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel p-6 border-[var(--mc-amber-dim)]">
              <h4 className="text-[var(--mc-amber)] font-semibold mb-2 text-sm font-[family-name:var(--font-mono)]">
                KEY INSIGHT
              </h4>
              <p className="text-sm">
                Usage-based pacing is the difference between a system that
                crashes mid-day and one that runs for weeks. When you&apos;re on
                a subscription with rate limits, you have to treat API quota as a
                budget. The tiered system ensures the most important work
                (CEO planning, critical bugs) always gets done, even when
                you&apos;re at 90% usage.
              </p>
            </div>
          </Chapter>

          {/* ── CHAPTER 05 ── */}
          <Chapter num="05" title="Shared Memory">
            <p>
              Agents need shared context to make good decisions. The memory
              system is a structured directory of markdown and JSON files that
              any agent can read and write. It&apos;s the collective brain of the
              organization.
            </p>

            <Code title="Memory Directory Structure">{`agents/shared/memory/
├── active-projects.json    # Current projects + status
├── bottlenecks.md          # What's blocking agents (systematic)
├── budget.json             # Pool balances + transaction log
├── north-star.md           # Single goal everyone aligns to
├── strategy/
│   ├── daily-YYYY-MM-DD.md # Daily plans + evening reviews
│   └── sync-sessions/      # Strategic debates + decisions
├── knowledge/
│   ├── market-research/    # Keyword data, competitor analysis
│   └── technical/          # Architecture decisions, patterns
├── qa/
│   ├── product-qa-*.md     # Daily QA reports
│   └── content-monitor-*.md# Content performance data
├── sidehustle/
│   └── revenue-*.md        # Ad revenue tracking
└── consolidation/
    └── nightly-*.md        # Consolidated memory snapshots`}</Code>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              The North Star Pattern
            </h3>
            <p>
              Every agent reads{" "}
              <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1.5 py-0.5 rounded text-sm">
                north-star.md
              </code>{" "}
              at session start. It contains one metric, one deadline, one goal.
              This prevents agents from optimizing for local maxima (shipping
              more pages when revenue is zero).
            </p>

            <Code title="north-star.md">{`# North Star

**Goal:** $100 MRR from shipped products
**Deadline:** March 15, 2026
**Current:** $0

Every decision should be filtered through:
"Does this get us closer to $100 MRR by March 15?"

If the answer is no, deprioritize it.`}</Code>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              The Bottleneck Log
            </h3>
            <p>
              When an agent gets blocked on something only a human can fix (DNS
              setup, OAuth credentials, payment processor access), they write it
              to{" "}
              <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1.5 py-0.5 rounded text-sm">
                bottlenecks.md
              </code>
              . This creates a systematic log of what&apos;s slowing the system
              down.
            </p>

            <Code title="bottlenecks.md (excerpt)">{`## Active Bottlenecks

| Date       | Agent | Bottleneck                    | Impact                  | Status  |
|------------|-------|-------------------------------|-------------------------|---------|
| 2026-02-22 | ALL   | Google Search Console missing | Zero organic traffic    | PENDING |
| 2026-02-22 | @coder| Stripe key not provisioned    | Can't ship paid products| PENDING |

## Resolved

| Date       | Agent  | Bottleneck                 | Resolution                          | Blocked |
|------------|--------|----------------------------|-------------------------------------|---------|
| 2026-02-22 | @coder | Stripe product creation    | Daniel provided restricted API key  | ~12h    |`}</Code>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              Nightly Consolidation
            </h3>
            <p>
              At 2 AM, @entrepreneur runs a consolidation session that cleans up
              the day&apos;s memory: deduplicates files, archives stale data,
              moves completed projects to archive, and writes a consolidated
              snapshot. This prevents memory bloat and keeps the shared context
              tight.
            </p>

            <div className="panel p-6 border-[var(--mc-amber-dim)]">
              <h4 className="text-[var(--mc-amber)] font-semibold mb-2 text-sm font-[family-name:var(--font-mono)]">
                KEY INSIGHT
              </h4>
              <p className="text-sm">
                Shared memory is where most multi-agent systems fail. Without
                structure, agents write conflicting information, files pile up,
                and nobody can find anything. The fix: strict naming conventions,
                a clear owner for each memory domain, and nightly consolidation.
                Treat shared memory like a codebase — it needs maintenance.
              </p>
            </div>
          </Chapter>

          {/* ── CHAPTER 06 ── */}
          <Chapter num="06" title="Watchdog & Recovery">
            <p>
              The @qa agent doubles as the system&apos;s watchdog. It monitors
              deployed products, catches silent failures, and verifies that
              published content actually works. But the recovery patterns go
              deeper than just one agent.
            </p>

            <div className="panel p-6">
              <h4 className="text-[var(--mc-text)] font-semibold mb-3 text-base">
                Failure Detection Layers
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-[var(--mc-blue)] font-medium">
                    TTL Enforcement.
                  </span>{" "}
                  Every task message has a TTL (time-to-live). If an agent
                  doesn&apos;t acknowledge the message within the TTL window, the
                  message moves to the{" "}
                  <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1 rounded">
                    failed/
                  </code>{" "}
                  directory and @entrepreneur is notified. Default TTLs: 30 min
                  for acknowledgment, 120 min for critical tasks.
                </div>
                <div>
                  <span className="text-[var(--mc-blue)] font-medium">
                    Heartbeat Monitoring.
                  </span>{" "}
                  Agents are expected to report status every 2 hours during active
                  periods. If an agent goes silent, @entrepreneur flags it in the
                  midday or evening review. The watchdog caught a 2-hour silence
                  gap from @support on Day 1.
                </div>
                <div>
                  <span className="text-[var(--mc-blue)] font-medium">
                    Product QA Sweeps.
                  </span>{" "}
                  @qa runs morning and evening product checks: HTTP 200, load time
                  &lt;5s, no console errors, SSL valid, key flows working. Failures
                  become task messages to @coder.
                </div>
                <div>
                  <span className="text-[var(--mc-blue)] font-medium">
                    Content Verification.
                  </span>{" "}
                  @qa verifies that scheduled social posts actually published
                  (checking Post Bridge delivery status), images render correctly,
                  and engagement metrics are within expected ranges.
                </div>
              </div>
            </div>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              Escalation Chain
            </h3>
            <Code>{`Agent detects problem
  → Can self-fix in <5 min?
    → YES: Fix it. Log it. Move on.
    → NO: Write escalation to @entrepreneur queue
      → @entrepreneur can resolve?
        → YES: Delegate to correct agent or fix directly
        → NO: Escalate to Daniel (via queue + Telegram)
          → Daniel resolves + updates SOUL/services
            to prevent recurrence`}</Code>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              The 30-Minute Stuck Rule
            </h3>
            <p>
              Every agent has this in their SOUL file: if you&apos;re blocked on
              something for more than 30 minutes, stop trying and escalate. This
              prevents agents from burning API quota on retry loops and ensures
              problems surface fast.
            </p>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              The 3-Retry Limit
            </h3>
            <p>
              No agent may retry the same action more than 3 times. After 3
              failures, the task is escalated with full context about what was
              tried and why it failed. This forces the system to find different
              solutions instead of brute-forcing the same broken approach.
            </p>

            <div className="panel p-6 border-[var(--mc-amber-dim)]">
              <h4 className="text-[var(--mc-amber)] font-semibold mb-2 text-sm font-[family-name:var(--font-mono)]">
                KEY INSIGHT
              </h4>
              <p className="text-sm">
                The biggest failure mode in autonomous agents isn&apos;t errors
                — it&apos;s{" "}
                <span className="text-[var(--mc-text)]">silent failures</span>.
                A task expires with no notification. A deployment breaks with no
                alert. Content goes out with broken images. Every recovery
                mechanism in this system exists because a silent failure happened
                first and taught us to watch for it.
              </p>
            </div>
          </Chapter>

          {/* ── CHAPTER 07 ── */}
          <Chapter num="07" title="Monetization">
            <p>
              The system manages money through three mechanisms: Stripe for
              customer payments, budget pools for operational spending, and cost
              tracking for every AI and API call.
            </p>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              Stripe Self-Serve
            </h3>
            <p>
              Agents have a Stripe restricted API key with permissions to create
              products, prices, and checkout sessions. This was the single most
              impactful bottleneck removal — before providing the key, every paid
              product was blocked on a human for ~12 hours.
            </p>

            <Code title="Stripe Product Creation Flow">{`// Agent creates product + price autonomously
1. Create Product:
   name: "The Agent Playbook"
   description: "Complete guide to autonomous AI agent systems"

2. Create Price:
   product: prod_xxx
   unit_amount: 2900  (cents)
   currency: "usd"

3. Create Payment Link:
   price: price_xxx
   quantity: 1

4. Embed link in landing page:
   <a href="https://buy.stripe.com/xxx">Buy Now — $29</a>

// Rules:
// - Products <$299: agent creates autonomously
// - Products >$299: escalate to Daniel
// - Always test with Stripe test cards before going live
// - Never create recurring prices without @entrepreneur approval`}</Code>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              Budget Pool System
            </h3>
            <p>
              Operational spending is managed through named budget pools tracked
              in a JSON file. Every agent checks the budget before making API
              calls that cost money.
            </p>

            <Code title="budget.json">{`{
  "pools": {
    "apify": {
      "total": 50.00,
      "spent": 3.30,
      "remaining": 46.70,
      "description": "Web scraping and keyword research"
    },
    "services": {
      "total": 50.00,
      "spent": 0.90,
      "remaining": 49.10,
      "description": "Kie AI, OpenRouter, misc APIs"
    },
    "revenue": {
      "total": 0.00,
      "spent": 0.00,
      "remaining": 0.00,
      "description": "Grows from product sales"
    }
  },
  "rules": {
    "single_transaction_limit": 10.00,
    "daily_limit_per_pool": 15.00,
    "escalate_if_remaining_below": 10.00
  }
}`}</Code>

            <h3 className="text-[var(--mc-text)] font-semibold text-lg !mt-8">
              AI Cost Management in Products
            </h3>
            <p>
              When building products that use AI (like ProposalPilot), agents
              follow strict rules: never use the Anthropic subscription key in
              customer-facing products. Route all product AI calls through
              OpenRouter, defaulting to the cheapest model that meets quality
              requirements (Gemini Flash for most things, Sonnet only when
              quality demands it). Every product must have usage limits and cost
              estimates before building.
            </p>

            <div className="panel p-6 border-[var(--mc-amber-dim)]">
              <h4 className="text-[var(--mc-amber)] font-semibold mb-2 text-sm font-[family-name:var(--font-mono)]">
                KEY INSIGHT
              </h4>
              <p className="text-sm">
                The fastest path to first revenue isn&apos;t SaaS — it&apos;s a
                meta-product. Package what your agents already know (the
                architecture, the patterns, the failures) as a digital product.
                Zero marginal cost, no AI API spend, no auth system, no
                database. Just content + Stripe checkout. Ship in one session.
              </p>
            </div>
          </Chapter>

          {/* ── CHAPTER 08 ── */}
          <Chapter num="08" title="Lessons Learned">
            <p>
              These are the patterns that actually matter after running this
              system in production. Not theory — things that broke, what we
              changed, and what we&apos;d do differently.
            </p>

            <div className="space-y-6">
              <div className="panel p-6">
                <h4 className="text-[var(--mc-text)] font-semibold mb-2">
                  1. &quot;Processed&quot; does not mean &quot;done&quot;
                </h4>
                <p className="text-sm">
                  Our biggest Day 1 failure: agents acknowledged tasks
                  (moved them to processed/) but never delivered output. One agent
                  &quot;processed&quot; the same Reddit distribution task 3 times
                  without ever posting to Reddit. Fix: require a deliverable in
                  shared memory or a task_update with status=done and a link to
                  the output. &quot;Processed&quot; means &quot;I saw it.&quot;
                  &quot;Done&quot; means &quot;here&apos;s the output.&quot;
                </p>
              </div>

              <div className="panel p-6">
                <h4 className="text-[var(--mc-text)] font-semibold mb-2">
                  2. Silent TTL failures kill priority tasks
                </h4>
                <p className="text-sm">
                  Our #1 revenue priority (this playbook) failed because the task
                  TTL expired while no coder session was running. Nobody was
                  alerted. The task sat in failed/ for hours before anyone noticed.
                  Fix: critical tasks get 120+ minute TTLs. The orchestrator must
                  actively alert on failed/ deliveries, not just log them.
                </p>
              </div>

              <div className="panel p-6">
                <h4 className="text-[var(--mc-text)] font-semibold mb-2">
                  3. Agents need extremely explicit instructions
                </h4>
                <p className="text-sm">
                  Vague specs (&quot;build ProposalPilot MVP&quot;) led to the agent asking
                  clarifying questions instead of building. Explicit specs with
                  exact commands, file paths, fallback options, and
                  step-by-step build instructions led to the agent shipping 5
                  pages and 2 redesigns in a single day. Treat task specs like
                  you&apos;re writing for a brilliant but literal engineer.
                </p>
              </div>

              <div className="panel p-6">
                <h4 className="text-[var(--mc-text)] font-semibold mb-2">
                  4. Bottleneck removal beats feature building
                </h4>
                <p className="text-sm">
                  Providing the Stripe restricted API key (10 minutes of human
                  work) unblocked ALL payment paths for ALL agents. That 10
                  minutes of bottleneck removal was worth more than any single
                  feature built that day. When you see a bottleneck blocking
                  multiple agents, drop everything and fix it.
                </p>
              </div>

              <div className="panel p-6">
                <h4 className="text-[var(--mc-text)] font-semibold mb-2">
                  5. Speed-to-revenue was wrong on Day 1
                </h4>
                <p className="text-sm">
                  We spent Day 1 building a SaaS product (auth, database, AI API
                  integration). A $29 digital product (this playbook) would have
                  shipped in one session: just a landing page + Stripe checkout +
                  content. Ship the fastest thing that generates revenue first,
                  then invest those earnings into the bigger bet.
                </p>
              </div>

              <div className="panel p-6">
                <h4 className="text-[var(--mc-text)] font-semibold mb-2">
                  6. QA pays for itself immediately
                </h4>
                <p className="text-sm">
                  The @qa agent caught broken OG images, 404 errors on
                  production JavaScript, and failed social media image
                  attachments — all before users saw them. Without QA monitoring,
                  these bugs would have been live. A dedicated QA agent is not a
                  luxury — it&apos;s insurance.
                </p>
              </div>

              <div className="panel p-6">
                <h4 className="text-[var(--mc-text)] font-semibold mb-2">
                  7. Content pipeline ahead of revenue is a loaded gun
                </h4>
                <p className="text-sm">
                  We scheduled 24 social media posts promoting pages nobody could
                  buy anything from. The moment a paid product ships, that
                  pipeline becomes a distribution engine. But until then,
                  it&apos;s driving traffic to dead ends. Build the checkout
                  first. Then turn on the traffic.
                </p>
              </div>

              <div className="panel p-6">
                <h4 className="text-[var(--mc-text)] font-semibold mb-2">
                  8. The filesystem is your friend
                </h4>
                <p className="text-sm">
                  Every choice to use simple files over a database or message
                  broker paid off. Queue messages are inspectable with{" "}
                  <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1 rounded">
                    ls
                  </code>{" "}
                  and{" "}
                  <code className="text-[var(--mc-text)] bg-[var(--mc-panel)] px-1 rounded">
                    cat
                  </code>
                  . Memory files work with git. SOUL files are just markdown. No
                  infrastructure means no infrastructure failures. Start simple.
                  Add complexity only when simple breaks.
                </p>
              </div>
            </div>

            <div className="panel p-8 text-center mt-12 border-[var(--mc-green-dim)]">
              <h3 className="text-xl font-bold text-[var(--mc-text)] mb-3">
                That&apos;s the system.
              </h3>
              <p className="text-sm text-[var(--mc-muted)] max-w-lg mx-auto mb-6">
                7 agents. JSON queues. SOUL files. Cron triggers. Shared memory.
                No framework. No orchestration server. Just files, schedules, and
                clear rules. Build yours.
              </p>
              <Link
                href="/agent-playbook"
                className="inline-flex items-center gap-2 text-sm text-[var(--mc-blue)] hover:text-[var(--mc-text)] transition-colors font-medium"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                  className="opacity-70 rotate-180"
                >
                  <path
                    d="M3.33 8h9.34M8.67 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to Agent Playbook
              </Link>
            </div>
          </Chapter>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-[var(--mc-border)] py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--mc-dim)]">
          <span>ArloBuilds 2026</span>
          <span>
            Built by{" "}
            <Link href="/" className="hover:text-[var(--mc-text)]">
              AI agents
            </Link>
          </span>
        </div>
      </footer>
    </div>
  );
}
