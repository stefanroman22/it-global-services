"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";
import type { ContactInfo, KeyFeature } from "@/lib/cms";

const aboutIcon =
  "M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z";

const PILLAR_ICONS = [
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z",
];
const PILLAR_COLORS = ["bg-[#2A5088]", "bg-[#3e9446]", "bg-[#fc1717]", "bg-[#2A5088]"];

interface AboutPageContentProps {
  bannerTitle: string;
  bannerSubtitle: string;
  introHeading: string;
  introBody: string;
  mainBody: string;
  pillarsHeader: string;
  formHeading: string;
  logoUrl: string;
  logoAlt: string;
  features: KeyFeature[];
  contact: ContactInfo;
}

/** Render markdown-ish body text: paragraphs separated by blank lines, "##"
 *  lines become H2, **bold** spans converted. Keeps the editor friendly while
 *  matching the original layout's visual hierarchy. */
function RichBody({ text }: { text: string }) {
  const blocks = text.split(/\n\s*\n/);
  return (
    <>
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (!trimmed) return null;
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 text-2xl font-bold">
              {trimmed.slice(3).trim()}
            </h2>
          );
        }
        // Replace **bold** segments
        const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i}>
            {parts.map((p, j) =>
              p.startsWith("**") && p.endsWith("**") ? (
                <strong key={j}>{p.slice(2, -2)}</strong>
              ) : (
                <span key={j}>{p}</span>
              ),
            )}
          </p>
        );
      })}
    </>
  );
}

export default function AboutPageContent({
  bannerTitle,
  bannerSubtitle,
  introHeading,
  introBody,
  mainBody,
  pillarsHeader,
  formHeading,
  logoUrl,
  logoAlt,
  features,
  contact,
}: AboutPageContentProps) {
  // About page renders 4 pillars (slice from shared key_features)
  const pillars = features.slice(0, 4);

  return (
    <div className="page-about">
      <PageBanner title={bannerTitle} subtitle={bannerSubtitle} iconPath={aboutIcon} />

      <section className="pb-8">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 flex flex-col items-center gap-8 rounded-2xl bg-white/60 p-8 shadow-sm md:flex-row"
          >
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-32 w-32 shrink-0 object-contain drop-shadow-md md:h-40 md:w-40"
            />
            <div>
              <h2 className="mb-2 text-xl font-bold text-[#074285] md:text-2xl">
                {introHeading}
              </h2>
              <p className="text-base leading-relaxed text-[#074285]/80">
                {introBody}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl space-y-6 text-lg leading-relaxed"
          >
            <RichBody text={mainBody} />

            <h2 className="pt-4 text-2xl font-bold">{pillarsHeader}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 rounded-xl bg-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white shadow-md ${PILLAR_COLORS[i % PILLAR_COLORS.length]}`}
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
                        d={PILLAR_ICONS[i % PILLAR_ICONS.length]}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{p.title}</h3>
                    <p className="text-sm opacity-75">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactForm heading={formHeading} contact={contact} />
    </div>
  );
}
