import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Deze map is de project-root (er staat een lockfile in de bovenliggende map).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
