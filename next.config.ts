import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo>/ — the deploy workflow sets
// NEXT_PUBLIC_BASE_PATH=/traffic-tech-site. Local dev/build stays at /.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // emit about/index.html instead of about.html so GitHub Pages serves clean URLs
  trailingSlash: true,
  images: {
    // next/image optimization needs a server; Pages is static-only
    unoptimized: true,
  },
};

export default nextConfig;
