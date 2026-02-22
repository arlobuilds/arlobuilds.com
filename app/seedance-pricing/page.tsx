"use client";

import { useState } from "react";

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

function SectionNav() {
  const sections = [
    { id: "pricing-plans", label: "Pricing Plans" },
    { id: "credit-costs", label: "Credit Costs" },
    { id: "comparison", label: "vs Competitors" },
    { id: "who-should-use", label: "Who Should Use" },
    { id: "honest-take", label: "Honest Take" },
    { id: "hollywood", label: "Hollywood Factor" },
    { id: "faq", label: "FAQ" },
  ];
  return (
    <nav className="flex flex-wrap gap-2 justify-center">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="px-3 py-1.5 text-sm rounded-full bg-[var(--accent-bg)] text-[var(--accent)] no-underline hover:bg-[var(--accent)] hover:text-white transition-colors"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}

function PricingCalculator() {
  const [videos, setVideos] = useState(10);
  const creditsPerVideo = 120;
  const totalCredits = videos * creditsPerVideo;

  const plans = [
    { name: "Free (Xiaoyunque)", monthly: 0, credits: 2400, note: "~80/day avg" },
    { name: "Jimeng Pro", monthly: 9.6, credits: 5000, note: "est." },
    { name: "Dreamina Starter", monthly: 18, credits: 3000, note: "" },
    { name: "Dreamina Pro", monthly: 48, credits: 10000, note: "" },
    { name: "Dreamina Business", monthly: 84, credits: 25000, note: "" },
  ];

  return (
    <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-6 mt-6">
      <h3 className="text-lg font-bold mb-4">Cost Calculator</h3>
      <label className="block text-sm font-medium text-[var(--muted)] mb-2">
        How many videos do you need per month?
      </label>
      <div className="flex items-center gap-4 mb-4">
        <input
          type="range"
          min={1}
          max={100}
          value={videos}
          onChange={(e) => setVideos(Number(e.target.value))}
          className="flex-1"
          style={{ accentColor: "var(--accent)" }}
        />
        <span className="text-2xl font-bold text-[var(--accent)] w-16 text-right">{videos}</span>
      </div>
      <p className="text-sm text-[var(--muted)] mb-4">
        ~{totalCredits.toLocaleString()} credits needed ({creditsPerVideo} credits/video avg)
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {plans.map((plan) => {
          const enough = plan.credits >= totalCredits;
          const costPerVideo =
            plan.monthly > 0
              ? (plan.monthly / Math.min(videos, Math.floor(plan.credits / creditsPerVideo))).toFixed(2)
              : "Free";
          return (
            <div
              key={plan.name}
              className={`p-4 rounded-lg border ${
                enough
                  ? "border-[var(--success)]/40 bg-white"
                  : "border-[var(--danger)]/30 bg-red-50"
              }`}
            >
              <div className="font-semibold text-sm">{plan.name}</div>
              <div className="text-xs text-[var(--muted)]">
                {plan.credits.toLocaleString()} credits/mo {plan.note}
              </div>
              <div className="mt-2 text-lg font-bold">
                {enough ? (
                  <span className="text-[var(--success)]">
                    {plan.monthly === 0 ? "$0" : `$${plan.monthly}/mo`}
                  </span>
                ) : (
                  <span className="text-[var(--danger)]">Not enough</span>
                )}
              </div>
              {enough && (
                <div className="text-xs text-[var(--muted)] mt-1">
                  ~${costPerVideo}/video
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
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
        <span className="text-[var(--accent)] text-xl shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="pb-4 text-[var(--muted)] leading-relaxed">{a}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero */}
      <header className="text-center mb-12">
        <p className="text-sm font-medium text-[var(--accent)] mb-3 uppercase tracking-wide">
          Updated February 2026
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
          Seedance 2.0 Pricing:{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            What It Actually Costs in 2026
          </span>
        </h1>
        <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto mb-6">
          Free tier, Pro plans, credit breakdowns, and how it stacks up against
          Sora 2, Kling 3.0, and Runway.
        </p>

        {/* TL;DR Box */}
        <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-5 text-left max-w-2xl mx-auto mb-8">
          <div className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2">
            TL;DR
          </div>
          <p className="text-sm leading-relaxed">
            Seedance Pro starts at <strong>~$9.60/mo</strong> via Jimeng.
            International pricing via Dreamina starts at{" "}
            <strong>$18/mo</strong>. Free tier gives you 60+ daily credits
            (enough for ~1 video/day). It&apos;s{" "}
            <strong>10-20x cheaper than Sora 2</strong>.
          </p>
        </div>

        <SectionNav />
      </header>

      {/* Section 2: Pricing Plans */}
      <section id="pricing-plans" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Seedance 2.0 Pricing Plans
        </h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Price</th>
                <th>Credits</th>
                <th>Videos/mo (est.)</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold">Free (Xiaoyunque)</td>
                <td className="font-bold text-[var(--success)]">$0</td>
                <td>60-120/day + 1,200 signup bonus</td>
                <td>~30-60</td>
                <td>Trying it out</td>
              </tr>
              <tr>
                <td className="font-semibold">Jimeng Pro (China)</td>
                <td>~$9.60/mo (69 RMB)</td>
                <td>Expanded limits</td>
                <td>~50-100</td>
                <td>Budget users</td>
              </tr>
              <tr>
                <td className="font-semibold">Dreamina Starter</td>
                <td>$18/mo</td>
                <td>3,000+</td>
                <td>~25-50</td>
                <td>Light use</td>
              </tr>
              <tr>
                <td className="font-semibold">Dreamina Pro</td>
                <td className="font-bold text-[var(--accent)]">$48/mo</td>
                <td>10,000+</td>
                <td>~80-160</td>
                <td>Regular creators</td>
              </tr>
              <tr>
                <td className="font-semibold">Dreamina Business</td>
                <td>$84/mo</td>
                <td>25,000+</td>
                <td>~200-400</td>
                <td>Teams &amp; agencies</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--muted)] mt-3 italic">
          Pricing verified February 2026. Credit amounts are approximate and may
          vary. Check{" "}
          <a href="https://dreamina.com" target="_blank" rel="noopener noreferrer">
            dreamina.com
          </a>{" "}
          for the latest pricing.
        </p>
      </section>

      {/* Section 3: Credit Cost Breakdown */}
      <section id="credit-costs" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          How Seedance Credits Work (And What Videos Actually Cost)
        </h2>
        <p className="text-[var(--muted)] mb-6">
          Seedance uses a credit system. The cost per video depends on length
          and whether you enable AI audio generation. Here&apos;s the breakdown:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Setting</th>
                <th>Credits</th>
                <th>Approx. Cost (Pro)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>6-second, no audio</td>
                <td>60</td>
                <td>~$0.30</td>
              </tr>
              <tr>
                <td>6-second, with audio</td>
                <td>120</td>
                <td>~$0.60</td>
              </tr>
              <tr>
                <td>12-second, no audio</td>
                <td>120</td>
                <td>~$0.60</td>
              </tr>
              <tr>
                <td>12-second, with audio</td>
                <td>240</td>
                <td>~$1.20</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PricingCalculator />
      </section>

      {/* TinyAdz inlined ad placement #1 */}
      <div className="my-12 min-h-[90px] flex items-center justify-center">
        <div id="tinyadz-inline-1" className="w-full" />
      </div>

      {/* Section 4: Competitor Comparison */}
      <section id="comparison" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Seedance vs Sora 2 vs Kling 3.0 vs Runway: Price Comparison
        </h2>
        <p className="text-[var(--muted)] mb-6">
          How does Seedance 2.0 stack up against the competition? Here&apos;s an
          honest side-by-side comparison of every major AI video generator in
          2026.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Seedance 2.0</th>
                <th>Sora 2</th>
                <th>Kling 3.0</th>
                <th>Runway Gen-4</th>
                <th>Veo 3.1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-semibold">Cheapest plan</td>
                <td className="font-bold text-[var(--success)]">~$9.60/mo</td>
                <td>$20/mo (Plus)</td>
                <td>~$0.50/10s</td>
                <td>$15/mo</td>
                <td>$249.99/mo</td>
              </tr>
              <tr>
                <td className="font-semibold">Free tier</td>
                <td className="text-[var(--success)] font-semibold">Yes (60+ credits/day)</td>
                <td className="text-[var(--danger)]">No (removed Jan 2026)</td>
                <td className="text-[var(--warning)]">Limited</td>
                <td className="text-[var(--warning)]">Limited</td>
                <td className="text-[var(--danger)]">No</td>
              </tr>
              <tr>
                <td className="font-semibold">Max video length</td>
                <td>12s</td>
                <td className="font-semibold">20s</td>
                <td>15s</td>
                <td>10s</td>
                <td>8s</td>
              </tr>
              <tr>
                <td className="font-semibold">Audio generation</td>
                <td className="text-[var(--success)]">Yes</td>
                <td className="text-[var(--success)]">Yes</td>
                <td className="text-[var(--success)]">Yes</td>
                <td className="text-[var(--danger)]">No</td>
                <td className="text-[var(--success)]">Yes</td>
              </tr>
              <tr>
                <td className="font-semibold">Best quality mode</td>
                <td>$84/mo</td>
                <td>$200/mo (Pro)</td>
                <td>~$0.10/s</td>
                <td>$95/mo</td>
                <td>API only</td>
              </tr>
              <tr>
                <td className="font-semibold">API available</td>
                <td className="text-[var(--warning)]">TBD</td>
                <td className="text-[var(--danger)]">No</td>
                <td className="text-[var(--success)]">Yes</td>
                <td className="text-[var(--success)]">Yes</td>
                <td className="text-[var(--success)]">Yes</td>
              </tr>
              <tr>
                <td className="font-semibold">Cost per 10s video</td>
                <td className="font-bold text-[var(--success)]">~$0.50-$1.00</td>
                <td>~$2-$10</td>
                <td>~$0.50</td>
                <td>~$1-$3</td>
                <td>~$1.50-$4.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-[var(--muted)] mt-3 italic">
          Prices as of February 2026. Sora pricing via{" "}
          <a href="https://openai.com/sora" target="_blank" rel="noopener noreferrer">
            openai.com/sora
          </a>
          . Kling via{" "}
          <a href="https://kling.ai" target="_blank" rel="noopener noreferrer">
            kling.ai
          </a>
          . Runway via{" "}
          <a href="https://runway.com" target="_blank" rel="noopener noreferrer">
            runway.com
          </a>
          .
        </p>
      </section>

      {/* Section 5: Who Should Use */}
      <section id="who-should-use" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Which AI Video Generator Is Right for You?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <div className="text-2xl mb-2">🎬</div>
            <h3 className="font-bold text-lg mb-2">Social Media Creators</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Need quick, cheap videos for TikTok, Reels, or Shorts? Seedance&apos;s
              free tier and low prices make it the obvious choice.
            </p>
            <span className="inline-block px-3 py-1 bg-[var(--accent-bg)] text-[var(--accent)] text-sm font-semibold rounded-full">
              → Seedance 2.0
            </span>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <div className="text-2xl mb-2">🎥</div>
            <h3 className="font-bold text-lg mb-2">Filmmakers &amp; Professionals</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Need the highest realism and longest clips? Sora 2 leads on quality,
              and Kling 3.0 is best for multi-shot scenes.
            </p>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
              → Sora 2 or Kling 3.0
            </span>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-bold text-lg mb-2">High-Volume Production</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Generating 100+ videos per month? Kling&apos;s per-second pricing
              ($0.50/10s) is the most cost-effective at scale.
            </p>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
              → Kling 3.0
            </span>
          </div>

          <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
            <div className="text-2xl mb-2">🔧</div>
            <h3 className="font-bold text-lg mb-2">Developers &amp; API Users</h3>
            <p className="text-sm text-[var(--muted)] mb-3">
              Building video generation into your app? Kling and Veo have the
              most mature APIs. Seedance API access is TBD.
            </p>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
              → Kling or Veo 3.1
            </span>
          </div>
        </div>
      </section>

      {/* Section 6: Honest Assessment */}
      <section id="honest-take" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Is Seedance 2.0 Worth It? The Honest Take
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <h3 className="font-bold text-[var(--success)] mb-3">Pros</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-[var(--success)] shrink-0">✓</span>
                <span>Cheapest entry point of any major AI video tool</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--success)] shrink-0">✓</span>
                <span>Generous free tier (60+ daily credits, 1,200 signup bonus)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--success)] shrink-0">✓</span>
                <span>Built by ByteDance — massive engineering resources</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--success)] shrink-0">✓</span>
                <span>Audio generation included (most competitors charge extra or don&apos;t offer it)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--success)] shrink-0">✓</span>
                <span>Rapid improvement pace — 2.0 was a massive jump from 1.0</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <h3 className="font-bold text-[var(--danger)] mb-3">Cons</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-[var(--danger)] shrink-0">✗</span>
                <span>ByteDance ownership means potential US restrictions (TikTok precedent)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--danger)] shrink-0">✗</span>
                <span>Quality doesn&apos;t match Sora 2 at the highest tier (yet)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--danger)] shrink-0">✗</span>
                <span>Limited customization compared to Runway or Kling</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--danger)] shrink-0">✗</span>
                <span>Newer tool — less community support and tutorials</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[var(--danger)] shrink-0">✗</span>
                <span>No public API yet (limiting for developers)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[var(--accent-bg)] border border-[var(--accent)]/20 rounded-xl p-6">
          <h3 className="font-bold text-[var(--accent)] mb-2">Bottom Line</h3>
          <p className="text-sm leading-relaxed">
            Seedance 2.0 is the best value in AI video generation right now. The
            free tier alone makes it worth trying — you can generate a video per
            day without spending anything. For social media creators and anyone
            who needs &quot;good enough&quot; AI video at the lowest cost, Seedance is the
            clear winner. If you need Hollywood-level realism or API access,
            look at Sora 2 or Kling 3.0 respectively.
          </p>
        </div>
      </section>

      {/* Section 7: Hollywood Controversy */}
      <section id="hollywood" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          The Hollywood Factor: Why Seedance Is Making Headlines
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-6">
          <p className="mb-4">
            Seedance 2.0&apos;s launch in February 2026 didn&apos;t just make waves in the
            AI community — it sparked a significant reaction from Hollywood.
            TechCrunch and other outlets reported on the growing tension between
            AI video generators and the entertainment industry, with
            Seedance&apos;s quality level crossing a threshold that has studios and
            unions paying close attention.
          </p>
          <p className="mb-4">
            The concern centers on Seedance&apos;s ability to generate realistic human
            motion and scenes that could replace certain types of stock footage,
            B-roll, and even simple VFX shots. Combined with ByteDance&apos;s scale
            and aggressive pricing, this has accelerated conversations about AI
            regulation in creative industries.
          </p>
          <p className="text-[var(--muted)] text-sm">
            <strong>What this means for users:</strong> Keep an eye on potential
            content policies and regional availability changes. ByteDance tools
            have faced regulatory scrutiny before (TikTok), and the AI video
            space is likely to see more regulation in 2026. For now, Seedance
            remains fully accessible and functional.
          </p>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section id="faq" className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-6">
          <FAQItem
            q="How much does Seedance 2.0 cost?"
            a="Seedance 2.0 offers a free tier with 60+ daily credits. Paid plans start at ~$9.60/month via Jimeng (China) or $18/month via Dreamina internationally. The most expensive plan is $84/month for teams and agencies."
          />
          <FAQItem
            q="Is Seedance 2.0 free?"
            a="Yes, Seedance 2.0 has a free tier through Xiaoyunque that gives you 60-120 daily credits plus a 1,200 credit signup bonus. This is enough for roughly 1 video per day."
          />
          <FAQItem
            q="Is Seedance cheaper than Sora?"
            a="Yes, significantly. Seedance Pro starts at ~$9.60/month compared to Sora 2's cheapest plan at $20/month (ChatGPT Plus). Seedance also offers a free tier while Sora removed its free access in January 2026. Per video, Seedance costs roughly $0.50-$1.00 per 10 seconds vs Sora's $2-$10."
          />
          <FAQItem
            q="Can I use Seedance commercially?"
            a="Yes, paid Seedance plans include commercial usage rights. Free tier usage may have restrictions. Always check the latest terms of service on the official Seedance/Dreamina website."
          />
          <FAQItem
            q="Is Seedance available in the US?"
            a="Seedance is accessible internationally through Dreamina (dreamina.com), ByteDance's global creative platform. The Chinese version is available through Jimeng at lower prices. Some features may vary by region."
          />
          <FAQItem
            q="What's the difference between Seedance and Kling?"
            a="Seedance (by ByteDance) and Kling (by Kuaishou) are both Chinese AI video generators. Seedance 2.0 offers built-in audio generation and a generous free tier. Kling 3.0 supports longer videos (up to 15s) and has API access. Seedance is generally cheaper for casual use, while Kling is more cost-effective at high volumes."
          />
          <FAQItem
            q="How many credits does a Seedance video cost?"
            a="A basic 6-second video without audio costs 60 credits. Adding audio doubles the cost to 120 credits. A 12-second video costs 120 credits without audio or 240 credits with audio."
          />
          <FAQItem
            q="Is Seedance safe to use? (ByteDance concerns)"
            a="Seedance is developed by ByteDance, the same company behind TikTok. Like any cloud-based AI tool, your prompts and generated content are processed on their servers. If data privacy is a concern, review their privacy policy and consider whether your use case involves sensitive content."
          />
        </div>
      </section>

      {/* ── More from ArloBuilds ───────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">More from ArloBuilds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/mcp-servers" className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-[var(--accent)] transition-colors group">
            <p className="font-semibold group-hover:text-[var(--accent)] transition-colors">Best MCP Servers 2026</p>
            <p className="text-sm text-[var(--muted)] mt-1">25 servers tested and ranked for every AI client.</p>
          </a>
          <a href="/cursor-alternatives" className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-[var(--accent)] transition-colors group">
            <p className="font-semibold group-hover:text-[var(--accent)] transition-colors">Best Cursor Alternatives 2026</p>
            <p className="text-sm text-[var(--muted)] mt-1">10 AI code editors compared with pricing and features.</p>
          </a>
          <a href="/ai-prompt-library" className="block bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-5 no-underline hover:border-[var(--accent)] transition-colors group">
            <p className="font-semibold group-hover:text-[var(--accent)] transition-colors">AI Prompt Library</p>
            <p className="text-sm text-[var(--muted)] mt-1">470+ tested prompts across 8 categories. Copy, paste, get results.</p>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] pt-8 pb-12 text-center text-sm text-[var(--muted)]">
        <p className="mb-2">
          <strong>Last updated:</strong> February 2026
        </p>
        <p className="mb-4">
          This page contains ads. We independently research pricing. This site
          is not affiliated with ByteDance, Seedance, or any AI video tool.
        </p>
        <p className="text-xs">
          Pricing data sourced from official websites. Subject to change.{" "}
          <a href="https://seedance.ai" target="_blank" rel="noopener noreferrer">
            seedance.ai
          </a>{" "}
          ·{" "}
          <a href="https://dreamina.com" target="_blank" rel="noopener noreferrer">
            dreamina.com
          </a>{" "}
          ·{" "}
          <a href="https://openai.com/sora" target="_blank" rel="noopener noreferrer">
            openai.com/sora
          </a>{" "}
          ·{" "}
          <a href="https://kling.ai" target="_blank" rel="noopener noreferrer">
            kling.ai
          </a>{" "}
          ·{" "}
          <a href="https://runway.com" target="_blank" rel="noopener noreferrer">
            runway.com
          </a>
        </p>
      </footer>
    </div>
  );
}
