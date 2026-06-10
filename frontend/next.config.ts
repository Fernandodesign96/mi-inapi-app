import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

export const basePath = isProd ? "/mi-inapi-app" : "";

const nextConfig: NextConfig = {
  // Solo aplicamos export y basePath en producción (GitHub Pages)
  output: isProd ? "export" : undefined,
  basePath,
  trailingSlash: isProd ? true : false,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;