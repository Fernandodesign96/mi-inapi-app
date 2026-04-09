import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Eliminamos basePath y output: 'export' para facilitar el desarrollo local
  // Si necesitas desplegar en GitHub Pages, puedes volver a agregarlos o usar variables de entorno
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
