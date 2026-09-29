"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";
import ServiceScene from "@/components/ui/ServiceScene";
import { SecureWorkspaceIllustration } from "@/components/ui/Illustrations";
import { featureScene } from "@/data/scenes";
import type { ContactInfo, KeyFeature } from "@/lib/cms";
import { RichText, plainText } from "@/lib/cms-rich-text";

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
                <RichText value={introHeading} format="inline" />
              </h2>
              <RichText
                value={introBody}
                format="rich"
                headingOffset={1}
                className="text-base leading-relaxed text-ink opacity-80"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl space-y-6 text-lg leading-relaxed"
          >
            <RichText
              value={mainBody}
              format="rich"
              className="about-rich"
            />

            <h2 className="pt-6 text-2xl font-bold">
              <RichText value={pillarsHeader} format="inline" />
            </h2>
            <div className="grid gap-x-12 gap-y-8 pt-2 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <motion.div
                  key={plainText(p.title) || i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px 200px 0px" }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="shrink-0 text-ink">
                    <ServiceScene
                      scene={featureScene(p.animation, plainText(p.title), i)}
                      size={44}
                    />
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">
                      <RichText value={p.title} format="inline" />
                    </h3>
                    <RichText
                      value={p.description}
                      format="rich"
                      headingOffset={1}
                      className="text-sm leading-relaxed opacity-75"
                    />
                  </div>
                </motion.div>
              ))}
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
