import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, localePath } from "@/lib/site";
import { getCmsData, servicesCatalog } from "@/lib/cms";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const staticPaths = ["/", "/about", "/contact"];

  const alternatesFor = (path: string) => ({
    languages: Object.fromEntries(
      routing.locales.map((loc) => [loc, `${SITE_URL}${localePath(loc, path)}`]),
    ),
  });

  for (const path of staticPaths) {
    entries.push({
      url: `${SITE_URL}${localePath(routing.defaultLocale, path)}`,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
      alternates: alternatesFor(path),
    });
  }

  // Per-locale service slugs (the CMS may translate them).
  for (const locale of routing.locales) {
    try {
      const cms = await getCmsData(locale);
      for (const item of servicesCatalog(cms)) {
        entries.push({
          url: `${SITE_URL}${localePath(locale, `/services/${item.slug}`)}`,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    } catch {
      // Locale manifest unavailable — skip its service URLs.
    }
  }

  // De-duplicate (locales sharing a fallback manifest repeat slugs).
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.url)) return false;
    seen.add(e.url);
    return true;
  });
}
