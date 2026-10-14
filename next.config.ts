import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // acesso ao dev server por outros hosts (túnel/proxy); sem isso o JS não hidrata
  allowedDevOrigins: ["cdpema.kntap.com.br", "*.kntap.com.br"],
  cacheComponents: true,
  partialPrefetching: true,
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
