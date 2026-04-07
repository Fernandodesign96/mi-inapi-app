import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/mi-inapi-app",   // ← nombre exacto del repo en GitHub
  assetPrefix: "/mi-inapi-app/",
};

export default nextConfig;
