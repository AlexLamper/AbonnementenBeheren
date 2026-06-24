import { ImageResponse } from "next/og";

export const alt =
  "AbonnementenBeheren - abonnementen beheren, gratis op één plek";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: 36,
            fontWeight: 700,
            opacity: 0.95,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255,255,255,0.18)",
              fontSize: 40,
            }}
          >
            €
          </div>
          AbonnementenBeheren
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 48,
            letterSpacing: "-0.02em",
          }}
        >
          Abonnementen beheren op één plek
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 40,
            marginTop: 28,
            opacity: 0.9,
          }}
        >
          Gratis al je abonnementen bijhouden - per maand én per jaar.
        </div>
      </div>
    ),
    { ...size }
  );
}
