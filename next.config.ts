import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: 'export' to enable server-side rendering
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  // If deploying to username.github.io/lunex, uncomment and update:
  // basePath: '/lunex',
  // assetPrefix: '/lunex',
  trailingSlash: true,
};

export default nextConfig;
