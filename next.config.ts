import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/smiski",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
