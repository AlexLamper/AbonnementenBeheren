import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PRESETS } from "@/lib/presets";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const servicePages: MetadataRoute.Sitemap = PRESETS.map((p) => ({
    url: `${SITE_URL}/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/diensten`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/login`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...(process.env.PREMIUM_ENABLED === "true"
      ? [
          {
            url: `${SITE_URL}/premium`,
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...["privacy", "voorwaarden"].map((path) => ({
      url: `${SITE_URL}/${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
    ...servicePages,
  ];
}
