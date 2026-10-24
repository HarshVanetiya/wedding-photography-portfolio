import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export to out/ — no server needed.
  output: "export",
  images: {
    // Serves the responsive files pre-built by `npm run images`.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // Keep in sync with WIDTHS in scripts/prepare-images.mjs.
    imageSizes: [256, 384],
    deviceSizes: [640, 828, 1080, 1440, 1920, 2560],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
