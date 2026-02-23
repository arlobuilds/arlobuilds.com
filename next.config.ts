import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/recover-access",
        destination: "/agent-playbook/access-issue",
        permanent: true,
      },
      {
        source: "/access-issue",
        destination: "/agent-playbook/access-issue",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/agent-playbook",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/(mcp-servers|mcp-servers-cursor|mcp-servers-claude-code|cursor-alternatives|ai-agent-frameworks|ai-prompt-library|seedance-pricing)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
