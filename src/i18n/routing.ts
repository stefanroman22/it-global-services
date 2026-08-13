import { defineRouting } from "next-intl/routing";

/**
 * Site locales. Romanian is the default and lives at the bare path (`/`);
 * English and Hungarian are prefixed (`/en`, `/hu`).
 *
 * These MUST mirror the locales enabled for the project in the Roman
 * Technologies CMS (`projects.locales`, managed in the dashboard Languages
 * panel) — the CMS serves per-locale content at /content/<slug>/<locale>.
 * If a locale here is not enabled in the CMS yet, `getCmsData()` falls back
 * to the default-locale manifest so the site never breaks.
 */
export const routing = defineRouting({
  locales: ["ro", "en", "hu"],
  defaultLocale: "ro",
  localePrefix: "as-needed",
  // `/` is ALWAYS Romanian (the site's required default) — no Accept-Language
  // or cookie redirects; visitors switch language explicitly via the header
  // toggle, and prefixed URLs (/en, /hu) carry the choice.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
