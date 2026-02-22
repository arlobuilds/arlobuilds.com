import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ArloBuilds — AI Tools, Guides & Comparisons",
    template: "%s | ArloBuilds",
  },
  description:
    "Independent guides, pricing comparisons, and reviews of the best AI tools. Updated weekly.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
