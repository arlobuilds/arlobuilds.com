import { ImageResponse } from "next/og";

export const alt = "ArloBuilds — One human. Six AI agents. Real products.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1120",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* Subtle grid dots */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Top glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse at center top, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Status + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#10B981",
            }}
          />
          <span
            style={{
              fontSize: 18,
              color: "#64748B",
              letterSpacing: "0.15em",
            }}
          >
            ARLOBUILDS
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#E2E8F0",
              fontFamily: "sans-serif",
            }}
          >
            One human. Six AI agents.
          </span>
          <span
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#3B82F6",
              fontFamily: "sans-serif",
            }}
          >
            Real products. Zero employees.
          </span>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 64,
            marginTop: 48,
          }}
        >
          {[
            { value: "3", label: "SHIPPED" },
            { value: "201K", label: "SEARCH VOL" },
            { value: "6", label: "AI AGENTS" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 36, fontWeight: 700, color: "#3B82F6" }}>
                {s.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#475569",
                  letterSpacing: "0.15em",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
