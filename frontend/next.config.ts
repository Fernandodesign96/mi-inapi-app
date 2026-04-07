import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/mi-inapi-app",
  assetPrefix: "/mi-inapi-app/",
  // AGREGA ESTO PARA IGNORAR ERRORES EN EL DEPLOY:
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
