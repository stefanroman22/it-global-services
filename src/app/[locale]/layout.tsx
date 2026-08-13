import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { RouteAlternatesProvider } from "@/components/providers/RouteAlternatesProvider";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import {
  getCmsData,
  contactInfo,
  servicesCatalog,
  textBlock,
  image,
} from "@/lib/cms";
import { toService } from "@/data/services";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

/** Applies the persisted / system theme before first paint (no flash). */
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "fallbacks" });
  const cms = await getCmsData(locale);
  const brand = textBlock(cms, "general_brand_name").title || t("brandName");
  const desc =
    textBlock(cms, "general_meta_description").body || t("metaDescription");
  const logoUrl = image(cms, "general_logo").url ?? "/company-logo.png";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: brand,
      template: `%s — ${brand}`,
    },
    description: desc,
    openGraph: {
      type: "website",
      siteName: brand,
      title: brand,
      description: desc,
      locale,
      images: [{ url: logoUrl, alt: brand }],
    },
    twitter: {
      card: "summary",
      title: brand,
      description: desc,
    },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2A5088" },
    { media: "(prefers-color-scheme: dark)", color: "#142845" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const [cms, t, tCommon] = await Promise.all([
    getCmsData(locale),
    getTranslations({ locale, namespace: "fallbacks" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const services = servicesCatalog(cms).map(toService);
  const contact = contactInfo(cms);
  const brandName = textBlock(cms, "general_brand_name").title || t("brandName");
  const footerDescription =
    textBlock(cms, "footer_description").body || t("footerDescription");
  // CMS-managed logo — used by Header (every page), MobileMenu and Footer so a
  // logo change in the dashboard updates all of them (not just Home/About).
  const logo = image(cms, "general_logo");
  const logoUrl = logo.url ?? "/company-logo.png";
  const logoAlt = logo.alt || `${brandName} logo`;

  // LocalBusiness structured data — the company serves Cluj-Napoca on-site
  // and the rest of Romania remotely.
  const phone = Object.values(contact).find((v) =>
    /^\+?[\d\s().-]{6,}$/.test(v.trim()),
  );
  const email = Object.values(contact).find((v) => v.includes("@"));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brandName,
    description: textBlock(cms, "general_meta_description").body || undefined,
    url: SITE_URL,
    image: new URL(logoUrl, SITE_URL).toString(),
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cluj-Napoca",
      addressCountry: "RO",
    },
    areaServed: [
      { "@type": "City", name: "Cluj-Napoca" },
      { "@type": "Country", name: "Romania" },
    ],
  };

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        {/* Without JS, framer-motion's SSR'd initial states (opacity/transform)
            would never animate in — force content visible instead. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <RouteAlternatesProvider>
            <a href="#main-content" className="skip-link">
              {tCommon("skipToContent")}
            </a>
            <ScrollProgress />
            <ScrollToTop />
            <Header
              services={services}
              logoUrl={logoUrl}
              logoAlt={logoAlt}
              brandName={brandName}
            />
            <main id="main-content" className="min-h-[60vh]">
              {children}
            </main>
            <Footer
              description={footerDescription}
              contact={contact}
              services={services}
              brandName={brandName}
              logoUrl={logoUrl}
              logoAlt={logoAlt}
            />
          </RouteAlternatesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
