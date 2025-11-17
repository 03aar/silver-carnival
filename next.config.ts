import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/silver-carnival',
  assetPrefix: '/silver-carnival',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
