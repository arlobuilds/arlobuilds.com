import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seedance 2.0 Pricing 2026: Real Costs, Plans & Comparison vs Sora",
  description:
    "Complete Seedance 2.0 pricing breakdown for 2026. Free tier, Pro plans, credit costs, and honest comparison vs Sora 2, Kling 3.0, and Runway. Updated February 2026.",
  openGraph: {
    title: "Seedance 2.0 Pricing 2026: Plans, Credits & Cost Comparison",
    description:
      "Complete Seedance 2.0 pricing breakdown for 2026. Free tier, Pro plans, credit costs, and honest comparison vs Sora 2, Kling 3.0, and Runway. Updated February 2026.",
    type: "article",
    locale: "en_US",
    images: [{ url: "/og/seedance-pricing.png", width: 1200, height: 630, alt: "Seedance 2.0 Pricing Guide" }],
  },
};

export default function SeedancePricingLayout({
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
              "Seedance 2.0 Pricing 2026: Real Costs, Plans & Comparison vs Sora",
            datePublished: "2026-02-22",
            dateModified: "2026-02-22",
            author: { "@type": "Organization", name: "ArloBuilds" },
            description:
              "Complete Seedance 2.0 pricing breakdown for 2026. Free tier, Pro plans, credit costs, and honest comparison vs Sora 2, Kling 3.0, and Runway.",
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
                name: "How much does Seedance 2.0 cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seedance 2.0 offers a free tier with 60+ daily credits. Paid plans start at ~$9.60/month via Jimeng (China) or $18/month via Dreamina internationally. The most expensive plan is $84/month for teams and agencies.",
                },
              },
              {
                "@type": "Question",
                name: "Is Seedance 2.0 free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Seedance 2.0 has a free tier through Xiaoyunque that gives you 60-120 daily credits plus a 1,200 credit signup bonus. This is enough for roughly 1 video per day.",
                },
              },
              {
                "@type": "Question",
                name: "Is Seedance cheaper than Sora?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, significantly. Seedance Pro starts at ~$9.60/month compared to Sora 2's cheapest plan at $20/month (ChatGPT Plus). Per video, Seedance costs roughly $0.50-$1.00 per 10 seconds vs Sora's $2-$10.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use Seedance commercially?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, paid Seedance plans include commercial usage rights. Free tier usage may have restrictions.",
                },
              },
              {
                "@type": "Question",
                name: "Is Seedance available in the US?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seedance is accessible internationally through Dreamina (dreamina.com), ByteDance's global creative platform.",
                },
              },
              {
                "@type": "Question",
                name: "What's the difference between Seedance and Kling?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seedance (by ByteDance) and Kling (by Kuaishou) are both Chinese AI video generators. Seedance 2.0 offers built-in audio generation and a generous free tier. Kling 3.0 supports longer videos (up to 15s) and has API access.",
                },
              },
              {
                "@type": "Question",
                name: "How many credits does a Seedance video cost?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "A basic 6-second video without audio costs 60 credits. Adding audio doubles the cost to 120 credits. A 12-second video costs 120 credits without audio or 240 credits with audio.",
                },
              },
              {
                "@type": "Question",
                name: "Is Seedance safe to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Seedance is developed by ByteDance, the same company behind TikTok. Like any cloud-based AI tool, your prompts and generated content are processed on their servers.",
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
