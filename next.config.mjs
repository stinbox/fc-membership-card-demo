import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
