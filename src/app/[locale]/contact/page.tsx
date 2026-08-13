import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { localeAlternates } from "@/lib/site";
import ContactPageContent from "./ContactPageContent";
import { getCmsData, textBlock, contactInfo } from "@/lib/cms";

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
    title: textBlock(cms, "contact_banner_title").title || t("contactTitle"),
    description:
      textBlock(cms, "contact_banner_subtitle").body ||
      textBlock(cms, "general_meta_description").body ||
      t("metaDescription"),
    alternates: localeAlternates(locale as Locale, "/contact"),
  };
}

export default async function ContactPage({
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
    <ContactPageContent
      bannerTitle={textBlock(cms, "contact_banner_title").title || t("contactTitle")}
      bannerSubtitle={textBlock(cms, "contact_banner_subtitle").body ?? ""}
      formHeading={textBlock(cms, "contact_form_heading").title || t("formHeading")}
      contact={contactInfo(cms)}
    />
  );
}
