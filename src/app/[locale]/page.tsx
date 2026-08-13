import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import SectionMarquee from "@/components/sections/SectionMarquee";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CtaBand from "@/components/sections/CtaBand";
import { routing, type Locale } from "@/i18n/routing";
import { localeAlternates } from "@/lib/site";
import {
  getCmsData,
  textBlock,
  image,
  servicesCatalog,
  keyFeatures,
  contactInfo,
} from "@/lib/cms";
import { toService } from "@/data/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return { alternates: localeAlternates(locale as Locale, "/") };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [cms, t] = await Promise.all([
    getCmsData(locale),
    getTranslations({ locale, namespace: "fallbacks" }),
  ]);
  const tagline = textBlock(cms, "general_tagline").title || t("tagline");
  const heroSubhead = textBlock(cms, "home_hero_subhead").body ?? "";
  const logo = image(cms, "general_logo");
  const services = servicesCatalog(cms).map(toService);
  const features = keyFeatures(cms);
  const contact = contactInfo(cms);
  const phone = Object.values(contact).find((v) =>
    /^\+?[\d\s().-]{6,}$/.test(v.trim()),
  );

  // Tagline split: take last word as the accent, rest as base
  let baseTagline = tagline;
  let accent: string | undefined;
  const words = tagline.split(/\s+/);
  if (words.length > 1) {
    accent = words.slice(-2).join(" ");
    baseTagline = words.slice(0, -2).join(" ");
  }

  return (
    <div className="page-home">
      <Hero
        tagline={baseTagline}
        taglineAccent={accent}
        subhead={heroSubhead}
        logoUrl={logo.url ?? "/company-logo.png"}
        logoAlt={logo.alt ?? t("brandName")}
      />
      <ServicesGrid
        services={services}
        header={textBlock(cms, "home_services_header").title || t("servicesHeader")}
        subhead={textBlock(cms, "home_services_subhead").body ?? ""}
      />
      {/* Moving category strip — services → why choose us */}
      <SectionMarquee
        items={features.map((f) => f.title)}
        direction="right"
        className="text-ink opacity-30"
      />
      <WhyChooseUs
        eyebrow={textBlock(cms, "home_why_eyebrow").title || t("whyEyebrow")}
        header={textBlock(cms, "home_why_header").title || t("whyHeader")}
        subhead={textBlock(cms, "home_why_subhead").body ?? ""}
        features={features}
      />
      <CtaBand
        heading={textBlock(cms, "home_cta_heading").title || t("ctaHeading")}
        phone={phone}
      />
    </div>
  );
}
