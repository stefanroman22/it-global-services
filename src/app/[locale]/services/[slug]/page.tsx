import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { localeAlternates } from "@/lib/site";
import {
  getCmsData,
  servicesCatalog,
  contactInfo,
  type ServiceCatalogItem,
} from "@/lib/cms";
import { toService } from "@/data/services";
import { SetRouteAlternates } from "@/components/providers/RouteAlternatesProvider";
import ServicePageContent from "./ServicePageContent";

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const cms = await getCmsData(params.locale);
  return servicesCatalog(cms).map((s) => ({ slug: s.slug }));
}

/** The CMS translates slugs per locale; find the equivalent item in another
 *  locale's catalog by stable _id first, then slug, then position. */
function matchItem(
  item: ServiceCatalogItem,
  index: number,
  catalog: ServiceCatalogItem[],
): ServiceCatalogItem | undefined {
  if (item._id) {
    const byId = catalog.find((c) => c._id === item._id);
    if (byId) return byId;
  }
  const bySlug = catalog.find((c) => c.slug === item.slug);
  if (bySlug) return bySlug;
  return catalog[index];
}

async function serviceAlternates(
  locale: Locale,
  item: ServiceCatalogItem,
  index: number,
): Promise<Partial<Record<Locale, string>>> {
  const paths: Partial<Record<Locale, string>> = {
    [locale]: `/services/${item.slug}`,
  };
  for (const loc of routing.locales) {
    if (loc === locale) continue;
    try {
      const other = await getCmsData(loc);
      const match = matchItem(item, index, servicesCatalog(other));
      if (match) paths[loc] = `/services/${match.slug}`;
    } catch {
      // Locale manifest unavailable — the switcher falls back to the same slug.
    }
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const cms = await getCmsData(locale);
  const catalog = servicesCatalog(cms);
  const index = catalog.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const item = catalog[index];
  const paths = await serviceAlternates(locale as Locale, item, index);
  return {
    title: item.title,
    description: item.short_description,
    alternates: localeAlternates(locale as Locale, `/services/${slug}`, paths),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const cms = await getCmsData(locale);
  const catalog = servicesCatalog(cms);
  const index = catalog.findIndex((s) => s.slug === slug);
  if (index === -1) notFound();
  const item = catalog[index];
  const alternates = await serviceAlternates(locale as Locale, item, index);

  return (
    <>
      <SetRouteAlternates alternates={alternates} />
      <ServicePageContent
        service={toService(item)}
        allServices={catalog.map(toService)}
        contact={contactInfo(cms)}
      />
    </>
  );
}
