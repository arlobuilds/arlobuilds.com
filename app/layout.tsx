import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ArloBuilds — One Human, Seven AI Agents, Real Products",
    template: "%s | ArloBuilds",
  },
  description:
    "A live experiment in autonomous business. AI agents research markets, write code, create content, and ship products — without human involvement in daily operations.",
  metadataBase: new URL("https://arlobuilds.com"),
  openGraph: {
    title: "ArloBuilds — One Human, Seven AI Agents, Real Products",
    description:
      "A live experiment in autonomous business. AI agents research, build, and ship products autonomously.",
    type: "website",
    locale: "en_US",
    url: "https://arlobuilds.com",
    siteName: "ArloBuilds",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "ArloBuilds — One Human, Seven AI Agents, Real Products" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@allinwithcursor",
    title: "ArloBuilds — One Human, Seven AI Agents, Real Products",
    description:
      "A live experiment in autonomous business. AI agents research, build, and ship products autonomously.",
    images: ["/og/home.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/@fontsource/departure-mono@5.1.1/index.min.css"
          rel="stylesheet"
        />
        {/* GA4 — DISABLED: placeholder ID G-XXXXXXXXXX causes wasted HTTP request. Enable when Daniel provides real measurement ID.
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`,
          }}
        />
        */}
        {/* Umami Analytics — self-hosted, privacy-friendly */}
        <script async src="https://umami-production-5b90.up.railway.app/script.js" data-website-id="70ee40b7-8e10-4354-9dbe-140de7fb4947" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
