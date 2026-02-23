"use client";

import { useState } from "react";

/* ─── Shared Components ─── */

function Stars({ count }: { count: number }) {
  const full = Math.floor(count);
  const half = count % 1 >= 0.5;
  return (
    <span className="text-amber-400" title={`${count}/5`}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(5 - full - (half ? 1 : 0))}
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
        <span className="text-violet-600 text-xl shrink-0">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-4 text-[var(--muted)] leading-relaxed">{a}</p>
      )}
    </div>
  );
}

/* ─── Tool Data ─── */

interface Tool {
  name: string;
  slug: string;
  price: string;
  freeTier: string;
  platform: string;
  chromeExt: boolean;
  upworkSpecific: boolean;
  coverLetters: boolean;
  rating: number;
  badge?: string;
  badgeColor?: string;
  url: string;
  description: string;
  bestFor: string;
  pricing: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

const tools: Tool[] = [
  {
    name: "ProposalPilot",
    slug: "proposalpilot",
    price: "$19/mo",
    freeTier: "5/mo free",
    platform: "Web app",
    chromeExt: false,
    upworkSpecific: true,
    coverLetters: true,
    rating: 4.5,
    badge: "Best Free Option",
    badgeColor: "bg-violet-100 text-violet-700 border-violet-200",
    url: "https://proposalpilots.com",
    description:
      "AI proposal generator that creates 3 tone variants (Professional, Conversational, Bold) from any job description. Includes cover letter generation and a freelance rate calculator.",
    bestFor: "Upwork freelancers who want the best free tier and all-in-one features",
    pricing:
      "Free: 5 proposals/month. Pro: $19/month (unlimited). Team: $49/month (5 members).",
    pros: [
      "3 tone variants per job — pick the voice that fits the client",
      "Free tier with no credit card required (5/month)",
      "Cover letter mode + rate calculator included",
      "Clean web UI works on any device",
    ],
    cons: [
      "No Chrome extension (copy-paste workflow)",
      "Newer tool — smaller user base than established competitors",
    ],
    verdict:
      "The best free option for freelancers who want to test AI proposals without commitment. The 3-variant approach saves time over single-output tools. Missing a Chrome extension, but the web app works well.",
  },
  {
    name: "Proposal Genie",
    slug: "proposal-genie",
    price: "~$12/mo",
    freeTier: "Limited",
    platform: "Chrome ext",
    chromeExt: true,
    upworkSpecific: true,
    coverLetters: false,
    rating: 4,
    badge: "50K+ Freelancers",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    url: "https://proposalgenie.ai",
    description:
      "Chrome extension for Upwork that generates proposals directly inside the platform. One of the most popular tools with 50,000+ active users.",
    bestFor: "Upwork-only freelancers who want browser integration",
    pricing:
      "Limited free tier. Premium starts around $9-12/month for unlimited proposals.",
    pros: [
      "Works directly inside Upwork — no switching tabs",
      "Large user base (50K+) with proven track record",
      "Fast generation with one-click interface",
      "Learns from your profile and past proposals",
    ],
    cons: [
      "Chrome-only — no web app or mobile option",
      "No cover letter mode for non-Upwork applications",
      "Limited customization of output tone",
    ],
    verdict:
      "The most popular Upwork proposal tool for a reason — it's fast and works where you already are. Best for freelancers who only use Upwork and want minimal friction.",
  },
  {
    name: "BidPilotPro",
    slug: "bidpilotpro",
    price: "~$15/mo",
    freeTier: "Trial",
    platform: "Chrome ext",
    chromeExt: true,
    upworkSpecific: true,
    coverLetters: false,
    rating: 4,
    badge: "Best Chrome Extension",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    url: "https://bidpilotpro.com",
    description:
      "Chrome extension that matches your portfolio and skills to Upwork job descriptions, generating personalized proposals with portfolio references.",
    bestFor: "Freelancers with strong portfolios who want auto-matching",
    pricing:
      "Free trial available. Plans from ~$12-29/month depending on features.",
    pros: [
      "Portfolio auto-matching — references your best work in proposals",
      "Supports both Upwork and Freelancer.com",
      "Job quality scoring helps you skip bad listings",
      "Proposal templates you can customize",
    ],
    cons: [
      "Chrome-only — no standalone web app",
      "Higher price tier than Proposal Genie",
      "Setup takes longer (needs portfolio import)",
    ],
    verdict:
      "The best Chrome extension option thanks to portfolio matching. If your proposals need to reference specific past work, BidPilotPro does this automatically. Worth the setup time.",
  },
  {
    name: "Upwex",
    slug: "upwex",
    price: "~$20/mo",
    freeTier: "Trial",
    platform: "Chrome ext",
    chromeExt: true,
    upworkSpecific: true,
    coverLetters: false,
    rating: 3.5,
    url: "https://upwex.io",
    description:
      "Upwork-focused Chrome extension with CRM integration, analytics, and AI proposal generation. Syncs with Pipedrive for lead management.",
    bestFor: "Freelancers who want Upwork analytics + CRM in one tool",
    pricing:
      "Free trial. Plans from ~$15-25/month. CRM integration on higher tiers.",
    pros: [
      "Built-in analytics — see which proposals get replies",
      "Pipedrive CRM sync for tracking leads",
      "Job rating system filters low-quality postings",
      "Proposal performance tracking over time",
    ],
    cons: [
      "Extension-only — no standalone option",
      "CRM features add complexity for solo freelancers",
      "Pricier than simpler alternatives",
    ],
    verdict:
      "Best for data-driven freelancers who want to track proposal performance over time. The CRM integration is overkill for most solo freelancers but valuable for those managing multiple clients.",
  },
  {
    name: "GigRadar",
    slug: "gigradar",
    price: "~$49/mo",
    freeTier: "No",
    platform: "Automation",
    chromeExt: false,
    upworkSpecific: true,
    coverLetters: false,
    rating: 4,
    badge: "Best for Agencies",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    url: "https://gigradar.io",
    description:
      "Automated proposal platform that sends AI-generated bids within 15 minutes of new Upwork listings. Built for agencies managing multiple freelancers.",
    bestFor: "Agencies and high-volume freelancers who want auto-sending",
    pricing:
      "Starts at ~$49/month. Agency plans up to ~$99/month. No free tier.",
    pros: [
      "Auto-sends proposals within 15 minutes of new jobs",
      "800+ agencies use it for scale",
      "Customizable templates per job category",
      "Saves hours for high-volume applicants",
    ],
    cons: [
      "Expensive — $49+/month minimum",
      "Auto-sending can feel impersonal if not configured well",
      "No free tier — commitment required upfront",
    ],
    verdict:
      "The only tool built for volume. If you or your agency sends 50+ proposals per week, GigRadar's automation pays for itself. Too expensive for individual freelancers sending 5-10 proposals per week.",
  },
  {
    name: "PouncerAI",
    slug: "pouncerAI",
    price: "Free+",
    freeTier: "Yes",
    platform: "Chrome ext",
    chromeExt: true,
    upworkSpecific: true,
    coverLetters: false,
    rating: 3.5,
    badge: "Budget Option",
    badgeColor: "bg-gray-100 text-gray-700 border-gray-200",
    url: "https://pouncer.io",
    description:
      "Budget-friendly Chrome extension for Upwork proposals with a free tier and AI-powered template generation.",
    bestFor: "Budget-conscious freelancers who want a free Chrome extension",
    pricing: "Free tier available. Paid plans for more features.",
    pros: [
      "Free Chrome extension to start",
      "Simple interface — minimal learning curve",
      "Quick proposal generation for Upwork",
    ],
    cons: [
      "More template-based than truly personalized",
      "Limited features compared to premium tools",
      "Smaller community and fewer updates",
    ],
    verdict:
      "A solid budget option if you want a free Chrome extension. Don't expect the polish of Proposal Genie or BidPilotPro, but it gets the job done for basic proposals.",
  },
];

const otherTools = [
  {
    name: "Bookipi",
    price: "Free",
    desc: "All-in-one business tool with proposals, invoicing, and contracts. Not Upwork-specific — better suited for service businesses sending formal proposals to clients directly.",
    url: "https://bookipi.com",
  },
  {
    name: "Proposify",
    price: "Free template",
    desc: "Enterprise proposal software with branded templates, analytics, and e-signatures. Overkill for freelancers — designed for sales teams sending six-figure proposals.",
    url: "https://proposify.com",
  },
  {
    name: "Hubflo",
    price: "Free",
    desc: "Quick business proposal generator. Good for generic proposals but not tailored for Upwork or freelance platforms.",
    url: "https://hubflo.com",
  },
  {
    name: "BrandWell",
    price: "Free",
    desc: "SEO-focused content and proposal tool. Generates generic proposals that need heavy editing. Better as a writing assistant than a dedicated proposal tool.",
    url: "https://brandwell.ai",
  },
];

const faqs = [
  {
    q: "What's the best free AI proposal generator?",
    a: "ProposalPilot offers 5 free proposals per month with no credit card required. It generates 3 tone variants per job and includes cover letter generation and a rate calculator. PouncerAI also has a free Chrome extension tier with basic proposal generation.",
  },
  {
    q: "Do AI proposal tools actually work on Upwork?",
    a: "Yes. Tools like ProposalPilot, Proposal Genie, and BidPilotPro are built specifically for Upwork proposals. They read job descriptions and generate tailored responses. The key is editing the output to add your personal experience — don't submit AI proposals without reviewing them first.",
  },
  {
    q: "Will clients know I used AI to write my proposal?",
    a: "Not if you edit the output. Good AI proposal tools generate a starting point, not a final product. Add your specific experience, reference the client's project details, and adjust the tone. The best tools like ProposalPilot generate multiple variants so you can pick the one closest to your natural voice.",
  },
  {
    q: "What's better — a Chrome extension or a web app?",
    a: "Chrome extensions like Proposal Genie and BidPilotPro work directly inside Upwork, which is convenient. Web apps like ProposalPilot work across any platform and offer more features like cover letters and rate calculators. If you only use Upwork, a Chrome extension is faster. If you freelance across multiple platforms, a web app is more versatile.",
  },
  {
    q: "How much do AI proposal tools cost?",
    a: "Most tools range from free to $49/month. ProposalPilot starts free (5/month) with Pro at $19/month. Proposal Genie and BidPilotPro are $12-29/month. GigRadar is the most expensive at $49-99/month but targets agencies with auto-sending features. For individual freelancers, $19/month or less is the sweet spot.",
  },
  {
    q: "Can I use these tools for Fiverr and Freelancer.com too?",
    a: "Some tools are Upwork-only (Proposal Genie, Upwex). ProposalPilot works for any freelance platform since it's a web app — paste any job description and get proposals. BidPilotPro supports both Upwork and Freelancer.com. For Fiverr buyer requests specifically, most tools work if you paste the request text manually.",
  },
];

/* ─── Page Component ─── */

export default function BestAiProposalToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero */}
      <header className="text-center mb-12">
        <p className="text-sm font-medium text-violet-600 mb-3 uppercase tracking-wide">
          Updated February 2026
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Best AI Proposal Tools for{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Freelancers in 2026
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-6">
          We tested 10+ AI proposal generators and compared them on pricing,
          quality, platform support, and actual output. Here are our honest
          picks.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-4 justify-center text-sm mb-8">
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>10</strong> tools tested
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>6</strong> in-depth reviews
          </span>
          <span className="px-3 py-1.5 bg-[var(--card-bg)] border border-[var(--border)] rounded-full">
            <strong>5</strong> &ldquo;Best for&rdquo; picks
          </span>
        </div>

        {/* Quick picks box */}
        <div className="bg-violet-50 border border-violet-200 rounded-xl p-6 max-w-xl mx-auto text-left mb-8">
          <p className="font-bold text-violet-900 mb-3 text-sm uppercase tracking-wide">
            Quick Picks
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Best overall:</strong>{" "}
              <a
                href="https://proposalpilots.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-700 hover:underline"
              >
                ProposalPilot
              </a>{" "}
              — free tier, 3 tone variants, cover letters + rate calculator
            </p>
            <p>
              <strong>Best Chrome extension:</strong>{" "}
              <a
                href="https://bidpilotpro.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-700 hover:underline"
              >
                BidPilotPro
              </a>{" "}
              — portfolio matching, Upwork + Freelancer.com
            </p>
            <p>
              <strong>Best for agencies:</strong>{" "}
              <a
                href="https://gigradar.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-700 hover:underline"
              >
                GigRadar
              </a>{" "}
              — auto-sends proposals at scale
            </p>
          </div>
        </div>

        {/* Jump nav */}
        <nav className="flex flex-wrap gap-2 justify-center">
          <a
            href="#comparison"
            className="px-3 py-1.5 text-sm rounded-full bg-violet-50 text-violet-700 no-underline hover:bg-violet-600 hover:text-white transition-colors"
          >
            Comparison Table
          </a>
          <a
            href="#reviews"
            className="px-3 py-1.5 text-sm rounded-full bg-violet-50 text-violet-700 no-underline hover:bg-violet-600 hover:text-white transition-colors"
          >
            Reviews
          </a>
          <a
            href="#best-for"
            className="px-3 py-1.5 text-sm rounded-full bg-violet-50 text-violet-700 no-underline hover:bg-violet-600 hover:text-white transition-colors"
          >
            Best For
          </a>
          <a
            href="#how-we-tested"
            className="px-3 py-1.5 text-sm rounded-full bg-violet-50 text-violet-700 no-underline hover:bg-violet-600 hover:text-white transition-colors"
          >
            How We Tested
          </a>
          <a
            href="#faq"
            className="px-3 py-1.5 text-sm rounded-full bg-violet-50 text-violet-700 no-underline hover:bg-violet-600 hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>
      </header>

      {/* Comparison Table */}
      <section id="comparison" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          AI Proposal Tools Comparison Table
        </h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th className="bg-violet-600">Tool</th>
                <th className="bg-violet-600">Price</th>
                <th className="bg-violet-600">Free Tier</th>
                <th className="bg-violet-600">Platform</th>
                <th className="bg-violet-600">Chrome Ext</th>
                <th className="bg-violet-600">Cover Letters</th>
                <th className="bg-violet-600">Rating</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.slug}>
                  <td className="font-semibold">
                    <a
                      href={`#tool-${t.slug}`}
                      className="no-underline hover:underline"
                    >
                      {t.name}
                    </a>
                  </td>
                  <td className="text-sm">{t.price}</td>
                  <td className="text-sm">{t.freeTier}</td>
                  <td className="text-sm">{t.platform}</td>
                  <td>{t.chromeExt ? "✓" : "—"}</td>
                  <td>{t.coverLetters ? "✓" : "—"}</td>
                  <td>
                    <Stars count={t.rating} />
                  </td>
                </tr>
              ))}
              {otherTools.map((t) => (
                <tr key={t.name}>
                  <td className="font-semibold text-[var(--muted)]">
                    {t.name}
                  </td>
                  <td className="text-sm">{t.price}</td>
                  <td className="text-sm">Yes</td>
                  <td className="text-sm">Web</td>
                  <td>—</td>
                  <td>—</td>
                  <td>
                    <Stars count={3} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TinyAdz inline #1 */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-1" className="w-full" />
      </div>

      {/* Individual Reviews */}
      <section id="reviews" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          In-Depth Reviews: Top 6 AI Proposal Tools
        </h2>
        <div className="space-y-8">
          {tools.map((t) => (
            <div
              key={t.slug}
              id={`tool-${t.slug}`}
              className={`bg-white border rounded-xl p-6 shadow-sm ${
                t.slug === "proposalpilot"
                  ? "border-violet-300 ring-1 ring-violet-200"
                  : "border-[var(--border)]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h3 className="text-xl font-bold">{t.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <Stars count={t.rating} />
                  {t.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${t.badgeColor}`}
                    >
                      {t.badge}
                    </span>
                  )}
                </div>
              </div>

              <p className="mb-3">{t.description}</p>

              <div className="flex flex-wrap gap-4 text-sm mb-4">
                <div>
                  <span className="font-semibold">Best for:</span>{" "}
                  <span className="text-[var(--muted)]">{t.bestFor}</span>
                </div>
                <div>
                  <span className="font-semibold">Pricing:</span>{" "}
                  <span className="text-[var(--muted)]">{t.pricing}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="font-semibold text-sm text-green-700 mb-2">
                    Pros
                  </p>
                  <ul className="space-y-1 text-sm">
                    {t.pros.map((p, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-500 shrink-0 mt-0.5">
                          +
                        </span>
                        <span className="text-[var(--muted)]">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-sm text-red-700 mb-2">
                    Cons
                  </p>
                  <ul className="space-y-1 text-sm">
                    {t.cons.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-400 shrink-0 mt-0.5">−</span>
                        <span className="text-[var(--muted)]">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm">
                <span className="font-semibold">Our take:</span>{" "}
                <span className="text-[var(--muted)]">{t.verdict}</span>
              </div>

              {t.slug === "proposalpilot" && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://proposalpilots.com/try"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 rounded-lg bg-violet-600 text-white font-semibold text-sm hover:bg-violet-500 transition-colors no-underline"
                  >
                    Try free — no signup
                  </a>
                  <a
                    href="https://proposalpilots.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 rounded-lg border border-violet-300 text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-colors no-underline"
                  >
                    See all features →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Other Tools */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Other Tools Worth Mentioning
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherTools.map((t) => (
            <div
              key={t.name}
              className="bg-white border border-[var(--border)] rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold">{t.name}</h3>
                <span className="text-sm text-[var(--muted)]">{t.price}</span>
              </div>
              <p className="text-sm text-[var(--muted)]">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TinyAdz inline #2 */}
      <div className="my-12 min-h-[90px]">
        <div id="tinyadz-inline-2" className="w-full" />
      </div>

      {/* Best For Recommendations */}
      <section id="best-for" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Quick Recommendations: Best Tool For&hellip;
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: "Best free option",
              tool: "ProposalPilot",
              detail: "5 free proposals/month, no credit card",
              href: "https://proposalpilots.com/signup",
              highlight: true,
            },
            {
              label: "Best Chrome extension",
              tool: "BidPilotPro",
              detail: "Portfolio auto-matching, Upwork + Freelancer.com",
              href: "https://bidpilotpro.com",
              highlight: false,
            },
            {
              label: "Best for high-volume",
              tool: "GigRadar",
              detail: "Auto-sends proposals within 15 minutes",
              href: "https://gigradar.io",
              highlight: false,
            },
            {
              label: "Best all-in-one",
              tool: "ProposalPilot",
              detail: "Proposals + cover letters + rate calculator",
              href: "https://proposalpilots.com",
              highlight: true,
            },
            {
              label: "Best budget option",
              tool: "PouncerAI",
              detail: "Free Chrome extension tier",
              href: "https://pouncer.io",
              highlight: false,
            },
          ].map((r) => (
            <a
              key={r.label}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`block rounded-xl p-5 transition-colors no-underline ${
                r.highlight
                  ? "bg-violet-50 border-2 border-violet-300 hover:border-violet-500"
                  : "bg-[var(--card-bg)] border border-[var(--border)] hover:border-violet-300"
              }`}
            >
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-1">
                {r.label}
              </p>
              <p className="font-bold text-lg mb-1">{r.tool}</p>
              <p className="text-sm text-[var(--muted)]">{r.detail}</p>
            </a>
          ))}
        </div>
      </section>

      {/* How We Tested */}
      <section id="how-we-tested" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">How We Tested</h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
          <p className="mb-3">
            We signed up for every tool on this list. We pasted the same Upwork
            job description (a mid-range web development project) into each tool
            and compared the output on five criteria:
          </p>
          <ul className="space-y-2 text-sm mb-3">
            <li className="flex items-start gap-2">
              <span className="text-violet-600 font-bold shrink-0">1.</span>
              <span>
                <strong>Speed</strong> — How fast does it generate a usable
                proposal?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 font-bold shrink-0">2.</span>
              <span>
                <strong>Output quality</strong> — Does it sound human? Does it
                address the job requirements?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 font-bold shrink-0">3.</span>
              <span>
                <strong>Personalization</strong> — Does it adapt to the specific
                job or produce generic output?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 font-bold shrink-0">4.</span>
              <span>
                <strong>Pricing</strong> — Is it worth the cost for the average
                freelancer?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-600 font-bold shrink-0">5.</span>
              <span>
                <strong>Platform support</strong> — Does it work beyond Upwork?
                Mobile-friendly?
              </span>
            </li>
          </ul>
          <p className="text-sm text-[var(--muted)]">
            We weighted these equally. No tool paid for placement on this page.
            ProposalPilot is our product — we&apos;ve noted its weaknesses
            honestly (no Chrome extension, newer tool).
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="bg-white border border-[var(--border)] rounded-xl px-6">
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mb-12 bg-violet-600 rounded-xl p-6 sm:p-8 text-center">
        <p className="text-lg font-bold text-white mb-2">
          Ready to write proposals faster?
        </p>
        <p className="text-sm text-violet-200 mb-4 max-w-lg mx-auto">
          Try ProposalPilot free — 5 proposals per month, no credit card
          required. Paste a job description, get 3 tailored proposals in 10
          seconds.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://proposalpilots.com/try"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 rounded-lg bg-white text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-colors no-underline"
          >
            Try it free — no signup
          </a>
          <a
            href="https://proposalpilots.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 rounded-lg border border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-colors no-underline"
          >
            Create free account →
          </a>
        </div>
      </section>

      {/* Related Guides */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Related Guides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="/seedance-pricing"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-violet-400 transition-colors no-underline"
          >
            <p className="font-bold mb-1">Seedance AI Video Pricing</p>
            <p className="text-sm text-[var(--muted)]">
              Compare Seedance video generation pricing with Kling, Sora, and
              other AI video tools.
            </p>
          </a>
          <a
            href="/mcp-servers"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-violet-400 transition-colors no-underline"
          >
            <p className="font-bold mb-1">Best MCP Servers 2026</p>
            <p className="text-sm text-[var(--muted)]">
              25 MCP servers tested and ranked with copy-paste setup configs for
              Claude Code, Cursor, and VS Code.
            </p>
          </a>
          <a
            href="/ai-agent-frameworks"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-violet-400 transition-colors no-underline"
          >
            <p className="font-bold mb-1">AI Agent Frameworks Compared</p>
            <p className="text-sm text-[var(--muted)]">
              10+ AI agent frameworks tested with code examples, pricing, and
              honest reviews.
            </p>
          </a>
          <a
            href="/ai-prompt-library"
            className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6 hover:border-violet-400 transition-colors no-underline"
          >
            <p className="font-bold mb-1">AI Prompt Library</p>
            <p className="text-sm text-[var(--muted)]">
              470+ tested prompts across 8 categories with real-time search.
              Copy, paste, get results.
            </p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] pt-8 pb-12 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          <strong>Last updated:</strong> February 2026
        </p>
        <p className="mb-4">
          This page contains ads. ProposalPilot is our product — we&apos;ve
          noted its strengths and weaknesses honestly alongside independent
          competitors.
        </p>
        <p className="text-xs">
          <a href="/" className="hover:underline">
            ArloBuilds
          </a>{" "}
          ·{" "}
          <a
            href="https://proposalpilots.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            ProposalPilot
          </a>
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
