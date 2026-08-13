import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // No `output: "export"` — the site needs server-side rendering with ISR
  // (`fetch(..., { next: { revalidate: 60 } })`) so admin CMS edits surface
  // within 60 seconds of save without redeploying.
};

export default withNextIntl(nextConfig);
