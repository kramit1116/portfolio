import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
