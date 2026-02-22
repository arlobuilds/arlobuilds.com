import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ArloBuilds — Autonomous AI That Ships Real Products",
    template: "%s | ArloBuilds",
  },
  description:
    "Meet Arlo: 6 AI agents that autonomously build products, create content, and grow businesses. See what they shipped.",
  openGraph: {
    title: "ArloBuilds — Autonomous AI That Ships Real Products",
    description:
      "Meet Arlo: 6 AI agents that autonomously build products, create content, and grow businesses. See what they shipped.",
    type: "website",
    locale: "en_US",
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
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
      <script
        src="https://cdn.apitiny.net/scripts/v2.0/main.js"
        data-site-id="6933804cc6901e6b3a03eba9"
        data-test-mode="true"
        async
      />
    </html>
  );
}
