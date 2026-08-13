"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";
import { SupportDeskIllustration } from "@/components/ui/Illustrations";
import type { ContactInfo } from "@/lib/cms";
import { resolveContactCards } from "@/lib/contactFields";

interface ContactPageContentProps {
  bannerTitle: string;
  bannerSubtitle: string;
  formHeading: string;
  contact: ContactInfo;
}

/** Mirrors the About page structure: tight banner, then one soft intro
 *  card grouping the animated scene with the contact methods. */
export default function ContactPageContent({
  bannerTitle,
  bannerSubtitle,
  formHeading,
  contact,
}: ContactPageContentProps) {
  const t = useTranslations("contactCards");
  // Render every entry the CMS holds — no hardcoded key list. Order
  // is preserved from the CMS object/array iteration order, which is
  // the order the operator typed them.
  const methods = resolveContactCards(contact);

  return (
    <div className="page-contact">
      <PageBanner title={bannerTitle} subtitle={bannerSubtitle} />

      <section className="pb-8">
        <div className="container-main">
          {/* Intro card — support-desk scene grouped with the contact methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 flex flex-col items-center gap-8 rounded-2xl bg-surface-card-softer p-8 shadow-sm md:flex-row"
          >
            <motion.div
              className="w-56 shrink-0 md:w-72"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            >
              <SupportDeskIllustration className="h-auto w-full" />
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

      <ContactForm heading={formHeading} contact={contact} />
    </div>
  );
}
