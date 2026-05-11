import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "recharts"]
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
