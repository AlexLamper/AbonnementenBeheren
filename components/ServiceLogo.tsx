"use client";

import { useState } from "react";

export function ServiceLogo({
  name,
  logoUrl,
  color,
  size = 40,
}: {
  name: string;
  logoUrl?: string;
  color?: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const initial = name.trim().charAt(0).toUpperCase() || "?";

  if (logoUrl && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logoUrl}
        alt={name}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className="rounded-lg object-contain"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-lg font-semibold text-white"
      style={{
        width: size,
        height: size,
        backgroundColor: color ?? "#64748b",
      }}
    >
      {initial}
    </div>
  );
}
