import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

/** Canonical site origin — override with NEXT_PUBLIC_SITE_URL on Vercel. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://it-global-services.vercel.app";

/** Absolute path for a route in a locale ("/en/about", "/about" for ro). */
export function localePath(locale: Locale, path: string): string {
  if (locale === routing.defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/**
 * `alternates` metadata (canonical + hreflang) for a route. Per-locale
 * paths default to the same path; pass `paths` when they differ (service
 * slugs are translated per locale by the CMS).
 */
export function localeAlternates(
  locale: Locale,
  path: string,
  paths?: Partial<Record<Locale, string>>,
) {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = localePath(loc, paths?.[loc] ?? path);
  }
  languages["x-default"] = localePath(
    routing.defaultLocale,
    paths?.[routing.defaultLocale] ?? path,
  );
  return {
    canonical: localePath(locale, paths?.[locale] ?? path),
    languages,
  };
}
