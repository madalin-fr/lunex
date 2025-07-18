import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If deploying to username.github.io/lunex, uncomment and update:
  // basePath: '/lunex',
  // assetPrefix: '/lunex',
  trailingSlash: true,
};

export default nextConfig;
