// Next 16 removed `next lint`; eslint-config-next v16 ships flat configs.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [".next/**", "node_modules/**", "out/**"],
  },
  {
    rules: {
      // The logo URL is CMS-managed and may point at any host (Supabase
      // storage, external CDN); next/image would need every host declared
      // in images.remotePatterns and throws on unknown ones. Plain <img>
      // with explicit width/height is the robust choice here.
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
