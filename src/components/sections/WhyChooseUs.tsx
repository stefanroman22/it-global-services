"use client";

import { motion } from "framer-motion";
import ServiceScene from "@/components/ui/ServiceScene";
import { featureScene } from "@/data/scenes";
import type { KeyFeature } from "@/lib/cms";
import { RichText, plainText } from "@/lib/cms-rich-text";

interface WhyChooseUsProps {
  eyebrow: string;
  header: string;
  subhead: string;
  features: KeyFeature[];
}

export default function WhyChooseUs({
  eyebrow,
  header,
  subhead,
  features,
}: WhyChooseUsProps) {
  return (
    <section className="section-block bg-why-section">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 200px 0px" }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-[#2A5088]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#2A5088] dark:bg-[#49d4fc]/10 dark:text-[#49d4fc]">
            <RichText value={eyebrow} format="inline" />
          </span>
          <h2 className="section-title text-ink">
            <RichText value={header} format="inline" />
          </h2>
          <RichText
            value={subhead}
            format="rich"
            className="section-subtitle mx-auto text-ink opacity-70"
          />
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={plainText(f.title) || i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card-surface group relative overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Large animated line-icon scene (no chip box) */}
              <div className="mb-4 text-ink transition-transform duration-300 group-hover:scale-105">
                <ServiceScene
                  scene={featureScene(f.animation, plainText(f.title), i)}
                  size={60}
                />
              </div>
              <h3 className="mb-2 text-lg font-bold text-ink">
                <RichText value={f.title} format="inline" />
              </h3>
              <RichText
                value={f.description}
                format="rich"
                headingOffset={1}
                className="text-sm leading-relaxed text-ink opacity-75"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
