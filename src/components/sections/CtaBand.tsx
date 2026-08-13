"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SupportDeskIllustration } from "@/components/ui/Illustrations";

interface CtaBandProps {
  heading: string;
  /** Optional phone number (from CMS contact_info) shown as secondary action. */
  phone?: string;
}

/** Full-bleed contact band closing the page — animated support-desk scene
 *  beside a single strong call to action. */
export default function CtaBand({ heading, phone }: CtaBandProps) {
  const t = useTranslations("cta");
  return (
    <section className="section-block bg-header-bar">
      <div className="container-main">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px 200px 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto w-full max-w-md"
          >
            <SupportDeskIllustration className="h-auto w-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px 200px 0px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <h2 className="mb-8 text-3xl font-bold text-white md:text-4xl">
              {heading}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/contact" className="btn-primary">
                  {t("button")}
                </Link>
              </motion.span>
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <svg
                    className="h-4.5 w-4.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 5C3 3.9 3.9 3 5 3h2.3l1.5 4.5-1.9 1a10.4 10.4 0 004.6 4.6l1-1.9L17 12.7v2.3c0 1.1-.9 2-2 2h-.3C8.6 17 3 11.4 3 5.3V5z" />
                  </svg>
                  {phone}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
