import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output: "export"` — the site needs server-side rendering with ISR
  // (`fetch(..., { next: { revalidate: 60 } })`) so admin CMS edits surface
  // within 60 seconds of save without redeploying.
};

export default nextConfig;
