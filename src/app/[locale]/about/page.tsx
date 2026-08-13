import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { localeAlternates } from "@/lib/site";
import AboutPageContent from "./AboutPageContent";
import {
  getCmsData,
  textBlock,
  contactInfo,
  keyFeatures,
} from "@/lib/cms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const [cms, t] = await Promise.all([
    getCmsData(locale),
    getTranslations({ locale, namespace: "fallbacks" }),
  ]);
  return {
    title: textBlock(cms, "about_banner_title").title || t("aboutTitle"),
    description:
      textBlock(cms, "about_banner_subtitle").body ||
      textBlock(cms, "general_meta_description").body ||
      t("metaDescription"),
    alternates: localeAlternates(locale as Locale, "/about"),
  };
}

export default async function AboutPage({
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
  return (
    <AboutPageContent
      bannerTitle={textBlock(cms, "about_banner_title").title || t("aboutTitle")}
      bannerSubtitle={textBlock(cms, "about_banner_subtitle").body ?? ""}
      introHeading={textBlock(cms, "about_intro_heading").title ?? ""}
      introBody={textBlock(cms, "about_intro_body").body ?? ""}
      mainBody={textBlock(cms, "about_main_body").body ?? ""}
      pillarsHeader={textBlock(cms, "about_pillars_header").title || t("whyHeader")}
      formHeading={textBlock(cms, "about_form_heading").title || t("formHeading")}
      features={keyFeatures(cms)}
      contact={contactInfo(cms)}
    />
  );
}
