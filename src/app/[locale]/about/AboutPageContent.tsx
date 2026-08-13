"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";
import ServiceScene from "@/components/ui/ServiceScene";
import { SecureWorkspaceIllustration } from "@/components/ui/Illustrations";
import { featureScene } from "@/data/scenes";
import type { ContactInfo, KeyFeature } from "@/lib/cms";

interface AboutPageContentProps {
  bannerTitle: string;
  bannerSubtitle: string;
  introHeading: string;
  introBody: string;
  mainBody: string;
  pillarsHeader: string;
  formHeading: string;
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
  features,
  contact,
}: AboutPageContentProps) {
  // About page renders 4 pillars (slice from shared key_features)
  const pillars = features.slice(0, 4);

  return (
    <div className="page-about">
      <PageBanner title={bannerTitle} subtitle={bannerSubtitle} />

      <section className="pb-8">
        <div className="container-main">
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
              <SecureWorkspaceIllustration className="h-auto w-full" />
            </motion.div>
            <div>
              <h2 className="mb-2 text-xl font-bold text-ink md:text-2xl">
                {introHeading}
              </h2>
              <p className="text-base leading-relaxed text-ink opacity-80">
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

            <h2 className="pt-6 text-2xl font-bold">{pillarsHeader}</h2>
            <div className="grid gap-x-12 gap-y-8 pt-2 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 text-ink">
                    <ServiceScene
                      scene={featureScene(p.animation, p.title, i)}
                      size={44}
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{p.title}</h3>
                    <p className="text-sm leading-relaxed opacity-75">
                      {p.description}
                    </p>
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
