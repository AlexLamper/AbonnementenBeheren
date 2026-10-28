"use client";

import { useState } from "react";
import { findBrandIcon } from "@/lib/brandIcons";

/**
 * Logo-tegel voor een dienst. Volgorde: echt merkicoon (Simple Icons) →
 * favicon → gekleurde initiaal.
 */
export function ServiceLogo({
  name,
  logoUrl,
  color,
  presetId,
  size = 40,
  rounded = "rounded-xl",
}: {
  name: string;
  logoUrl?: string;
  color?: string;
  presetId?: string;
  size?: number;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);
  const brand = findBrandIcon(presetId, name);
  const glyph = Math.round(size * 0.52);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (brand) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center ${rounded}`}
        style={{ width: size, height: size, backgroundColor: brand.bg }}
      >
        <svg
          width={glyph}
          height={glyph}
          viewBox="0 0 24 24"
          role="img"
          aria-label={name}
        >
          <path d={brand.path} fill={brand.fg} />
        </svg>
      </span>
    );
  }

  if (logoUrl && !failed) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center border border-line bg-white ${rounded}`}
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={name}
          width={glyph}
          height={glyph}
          onError={() => setFailed(true)}
          className="object-contain"
          style={{ width: glyph, height: glyph }}
        />
      </span>
    );
  }

  return (
    <span
      className={`flex shrink-0 items-center justify-center font-display font-bold text-white ${rounded}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.round(size * 0.42),
        backgroundColor: color ?? "#4f6b84",
      }}
    >
      {initial}
    </span>
  );
}
