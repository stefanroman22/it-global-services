"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ContactForm from "@/components/ui/ContactForm";
import ServiceScene from "@/components/ui/ServiceScene";
import type { Service } from "@/data/services";
import type { ContactInfo } from "@/lib/cms";
import { CmsIcon, RichText, plainText } from "@/lib/cms-rich-text";

interface Props {
  service: Service;
  /** Full catalog — the page cross-links the other services. */
  allServices: Service[];
  contact: ContactInfo;
}

/** Mirrors the About page structure: tight banner (optional CMS image +
 *  centred title), one soft full-width intro card with the description,
 *  then a max-w-3xl flow with the offer checklist and other-services links. */
export default function ServicePageContent({
  service,
  allServices,
  contact,
}: Props) {
  const t = useTranslations("service");
  const others = allServices.filter((s) => s.slug !== service.slug);
  const reduced = useReducedMotion();

  return (
    <div className="page-service">
      {/* Banner — back link, CMS image (if set) + title, same metrics as the About banner */}
      <section className="pb-8 pt-16">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 text-sm font-medium opacity-60 transition-opacity hover:opacity-100"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t("backToServices")}
            </Link>
          </motion.div>
          {service.image && (
            <motion.div
              className="mb-8 overflow-hidden rounded-2xl"
              // The LCP image: only a small slide, never server-rendered hidden.
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              // Reduced motion → appear instantly (initial stays SSR-stable).
              transition={{ duration: reduced ? 0 : 0.5 }}
            >
              {/* Decorative: the <h1> right below names the service. */}
              <img
                src={service.image}
                alt=""
                width={1600}
                height={600}
                fetchPriority="high"
                className="aspect-[16/9] w-full object-cover md:aspect-[8/3]"
              />
            </motion.div>
          )}
          <motion.h1
            className="section-title !mb-0 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <RichText value={service.title} format="inline" />
          </motion.h1>
        </div>
      </section>

      <section className="pb-8">
        <div className="container-main">
          {/* Intro card — the single description, full card width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 rounded-2xl bg-surface-card-softer p-8 shadow-sm"
          >
            <RichText
              value={service.fullDescription}
              format="rich"
              className="text-base leading-relaxed text-ink opacity-80 md:text-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl space-y-6 text-lg leading-relaxed"
          >
            <h2 className="pt-4 text-2xl font-bold">{t("whatWeOffer")}</h2>
            <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2">
              {service.features.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.06 }}
                  className="flex items-start gap-3 text-base"
                >
                  <svg
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#3e9446] dark:text-[#57c168]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, delay: 0.35 + i * 0.06, ease: "easeOut" }}
                    />
                  </svg>
                  <span>{feat}</span>
                </motion.li>
              ))}
            </ul>

            {others.length > 0 && (
              <>
                <h2 className="pt-4 text-2xl font-bold">{t("otherServices")}</h2>
                <nav
                  aria-label={t("otherServices")}
                  className="grid gap-x-12 gap-y-3 sm:grid-cols-2"
                >
                  {others.map((s, i) => (
                    <motion.div
                      key={s.slug}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                      transition={{ duration: 0.35, delay: i * 0.05 }}
                    >
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-center gap-3 rounded-lg px-2 py-2 text-base font-medium transition-colors hover:bg-surface-chip"
                      >
                        <span className="text-ink opacity-70 transition-opacity group-hover:opacity-100">
                          <CmsIcon
                            icon={s.icon}
                            size={26}
                            fallback={<ServiceScene scene={s.scene} size={26} />}
                          />
                        </span>
                        <RichText value={s.title} format="inline" links={false} />
                        <svg
                          className="ml-auto h-4 w-4 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact form */}
      <ContactForm
        heading={t("interestedIn", { title: plainText(service.title) })}
        contact={contact}
      />
    </div>
  );
}
