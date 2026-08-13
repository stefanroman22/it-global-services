"use client";

import { motion } from "framer-motion";
import ServiceScene from "@/components/ui/ServiceScene";
import { featureScene } from "@/data/scenes";
import type { KeyFeature } from "@/lib/cms";

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
            {eyebrow}
          </span>
          <h2 className="section-title text-ink">{header}</h2>
          <p className="section-subtitle mx-auto text-ink opacity-70">
            {subhead}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 200px 0px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="card-surface group relative overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Large animated line-icon scene (no chip box) */}
              <div className="mb-4 text-ink transition-transform duration-300 group-hover:scale-105">
                <ServiceScene
                  scene={featureScene(f.animation, f.title, i)}
                  size={60}
                />
              </div>
              <h3 className="mb-2 text-lg font-bold text-ink">{f.title}</h3>
              <p className="text-sm leading-relaxed text-ink opacity-75">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
