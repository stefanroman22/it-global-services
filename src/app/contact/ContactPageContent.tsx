"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";
import type { ContactInfo } from "@/lib/cms";
import { resolveContactCards } from "@/lib/contactFields";

const contactIcon =
  "M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z";

interface ContactPageContentProps {
  bannerTitle: string;
  bannerSubtitle: string;
  formHeading: string;
  contact: ContactInfo;
}

export default function ContactPageContent({
  bannerTitle,
  bannerSubtitle,
  formHeading,
  contact,
}: ContactPageContentProps) {
  // Render every entry the CMS holds — no hardcoded key list. Order
  // is preserved from the CMS object/array iteration order, which is
  // the order the operator typed them.
  const methods = resolveContactCards(contact);

  return (
    <div className="page-contact">
      <PageBanner title={bannerTitle} subtitle={bannerSubtitle} iconPath={contactIcon} />

      <section className="pb-6 pt-2">
        <div className="container-main">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {methods.map((m, i) => {
              const inner = (
                <>
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-md ${m.color}`}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={m.iconPath}
                      />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#074285]/60">
                    {m.label}
                  </div>
                  <div className="mt-1 text-sm font-medium leading-snug text-[#074285]">
                    {m.value}
                  </div>
                </>
              );

              return (
                <motion.div
                  key={m.key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="rounded-xl bg-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {m.href ? (
                    <a
                      href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block"
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
      </section>

      <ContactForm heading={formHeading} contact={contact} />
    </div>
  );
}
