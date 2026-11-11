"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";
import ContactHero from "@/components/ui/ContactHero";
import { SupportDeskIllustration } from "@/components/ui/Illustrations";
import type { ContactInfo } from "@/lib/cms";
import {
  findAddressCard,
  mapEmbedUrl,
  resolveContactCards,
} from "@/lib/contactFields";
import { RichText } from "@/lib/cms-rich-text";
import {
  contentContainerClass,
  pageSurface,
  type ContactPageOptions,
} from "@/lib/pageOptions";

interface ContactPageContentProps {
  bannerTitle: string;
  bannerSubtitle: string;
  formHeading: string;
  /** CMS `contact_image` URL ("" → the animated illustration). Stacked layout only. */
  imageUrl: string;
  imageAlt: string;
  /** CMS `contact_banner_image` URL ("" → solid brand band). Split layout only. */
  bannerImageUrl: string;
  bannerImageAlt: string;
  /** Rich paragraph above the form (split layout). */
  formIntro: string;
  contact: ContactInfo;
  /** `contact_page_options` (ADR-0013), defaults applied. */
  options: ContactPageOptions;
}

export default function ContactPageContent({
  bannerTitle,
  bannerSubtitle,
  formHeading,
  imageUrl,
  imageAlt,
  bannerImageUrl,
  bannerImageAlt,
  formIntro,
  contact,
  options,
}: ContactPageContentProps) {
  const t = useTranslations("contactCards");
  const tForm = useTranslations("form");
  const tPage = useTranslations("contactPage");
  const reduced = useReducedMotion();
  const surface = pageSurface(options);
  const wrapperClass = `page-contact ${surface.className}`.trim();
  // Render every entry the CMS holds — no hardcoded key list. Order
  // is preserved from the CMS object/array iteration order, which is
  // the order the operator typed them.
  const methods = resolveContactCards(contact);

  if (options.layout === "stacked") {
    /* Mirrors the About page structure: tight banner, then one soft intro
       card grouping the animated scene with the contact methods. */
    return (
      <div
        className={wrapperClass}
        style={surface.style}
      >
        <PageBanner title={bannerTitle} subtitle={bannerSubtitle} />

        <section className="pb-8">
          <div className="container-main">
            {/* Intro card — support-desk scene grouped with the contact methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="page-card mb-10 flex flex-col items-center gap-8 rounded-2xl bg-surface-card-softer p-8 shadow-sm md:flex-row"
            >
              <motion.div
                className="w-56 shrink-0 md:w-72"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    width={640}
                    height={520}
                    className="aspect-[640/520] h-full w-full object-contain"
                  />
                ) : (
                  <SupportDeskIllustration className="h-auto w-full" />
                )}
              </motion.div>

              <div className="w-full">
                <div className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
                  {methods.map((m, i) => {
                    const label = m.labelKey ? t(m.labelKey) : m.label;
                    const inner = (
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-white shadow-md ${m.color}`}
                        >
                          <svg
                            className="h-5.5 w-5.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={m.iconPath}
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="mb-0.5 font-bold text-ink">{label}</h3>
                          <p className="text-sm leading-relaxed text-ink opacity-75">
                            {m.value}
                          </p>
                        </div>
                      </div>
                    );

                    return (
                      <motion.div
                        key={m.key}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                      >
                        {m.href ? (
                          <a
                            href={m.href}
                            target={m.href.startsWith("http") ? "_blank" : undefined}
                            rel={
                              m.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block rounded-lg transition-transform duration-200 hover:-translate-y-0.5"
                          >
                            {inner}
                          </a>
                        ) : (
                          inner
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <ContactForm
          heading={<RichText value={formHeading} format="inline" />}
          contact={contact}
        />
      </div>
    );
  }

  /* Split (default): hero band, then map + details on the left and the
     form on the right. Mobile reads details → form → map: the tap-to-call
     and email links come first, the map is supporting information. */
  const address = findAddressCard(methods);
  const showMap = options.show_map && address !== null;
  // The address heads the details (it belongs with the map), the rest
  // keep the operator's order.
  const groups = address
    ? [address, ...methods.filter((m) => m !== address)]
    : methods;
  const slide = (delay: number) => ({
    initial: { y: 16 },
    animate: { y: 0 },
    // Reduced motion → no slide (initial stays SSR-stable).
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div
      className={wrapperClass}
      style={surface.style}
    >
      <ContactHero
        title={bannerTitle}
        subtitle={bannerSubtitle}
        imageUrl={bannerImageUrl}
        imageAlt={bannerImageAlt}
      />

      <section className="py-12 md:py-16">
        <div className={contentContainerClass(options.content_width)}>
          <div
            className={`grid gap-10 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-8 ${
              showMap ? "lg:grid-rows-[auto_1fr]" : ""
            }`}
          >
            {/* Contact details */}
            {groups.length > 0 && (
              <motion.div
                {...slide(0.1)}
                className={`page-card self-start rounded-2xl bg-surface-card-softer p-6 shadow-sm sm:p-8 lg:col-start-1 ${
                  showMap ? "lg:row-start-2" : "lg:row-start-1"
                }`}
              >
                <h2 className="sr-only">{tForm("contactInfoHeading")}</h2>
                <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {groups.map((m) => {
                    const label = m.labelKey ? t(m.labelKey) : m.label;
                    const external = m.href?.startsWith("http") ?? false;
                    return (
                      <div
                        key={m.key}
                        className={`flex items-start gap-3 ${
                          m === address ? "sm:col-span-2" : ""
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-sm ${m.color}`}
                        >
                          <svg
                            className="h-4.5 w-4.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.75}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={m.iconPath}
                            />
                          </svg>
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-ink">{label}</h3>
                          <p className="mt-0.5 whitespace-pre-line break-words text-sm leading-relaxed text-ink opacity-80">
                            {m.href ? (
                              <a
                                href={m.href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                className="underline-offset-4 hover:underline"
                              >
                                {m.value}
                              </a>
                            ) : (
                              m.value
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Form column */}
            <motion.div
              {...slide(0.15)}
              className={`lg:col-start-2 lg:row-start-1 ${
                showMap ? "lg:row-span-2" : ""
              }`}
            >
              <h2 className="section-title">
                <RichText value={formHeading} format="inline" />
              </h2>
              <RichText
                value={formIntro}
                format="rich"
                className="mb-8 text-base leading-relaxed text-ink-80 md:text-lg"
              />
              <ContactForm variant="bare" showCompany />
            </motion.div>

            {/* Map */}
            {showMap && address && (
              <motion.div
                {...slide(0.05)}
                className="lg:col-start-1 lg:row-start-1"
              >
                <div className="page-card overflow-hidden rounded-2xl bg-surface-card-softer shadow-sm">
                  <iframe
                    src={mapEmbedUrl(address.value)}
                    title={tPage("mapTitle")}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block aspect-[4/3] w-full border-0 sm:aspect-[16/10]"
                  />
                </div>
                <a
                  href={address.href ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {tPage("openInMaps")}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5h5v5M19 5l-8 8M10 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-4"
                    />
                  </svg>
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
