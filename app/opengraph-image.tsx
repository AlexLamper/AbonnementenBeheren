import { ImageResponse } from "next/og";

export const alt =
  "AbonnementenBeheren - abonnementen beheren, gratis op één plek";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Donut({ size: s }: { size: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <g transform="rotate(-90 24 24)">
        <circle cx="24" cy="24" r="16" stroke="#2DD4BF" strokeWidth="9" strokeDasharray="42 100.5" />
        <circle cx="24" cy="24" r="16" stroke="#2AA898" strokeWidth="9" strokeDasharray="28 100.5" strokeDashoffset="-45" />
        <circle cx="24" cy="24" r="16" stroke="#7FE3D3" strokeWidth="9" strokeDasharray="15 100.5" strokeDashoffset="-76" />
        <circle cx="24" cy="24" r="16" stroke="#1F5A6E" strokeWidth="9" strokeDasharray="4.5 100.5" strokeDashoffset="-94" />
      </g>
    </svg>
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          background: "#08233B",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            <Donut size={56} />
            <span style={{ display: "flex" }}>
              Abonnementen<span style={{ color: "#7FE3D3" }}>Beheren</span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 80,
              fontWeight: 800,
              lineHeight: 1.04,
              marginTop: 48,
              letterSpacing: "-0.03em",
            }}
          >
            <span>Al je abonnementen.</span>
            <span style={{ color: "#2DD4BF" }}>Eén helder totaal.</span>
          </div>
          <div style={{ display: "flex", fontSize: 34, marginTop: 28, color: "#A9BFD0" }}>
            Gratis bijhouden - per maand én per jaar.
          </div>
        </div>
        <Donut size={300} />
      </div>
    ),
    { ...size }
  );
}
