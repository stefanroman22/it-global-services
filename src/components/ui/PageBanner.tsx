"use client";

import { motion } from "framer-motion";
import ServiceScene from "./ServiceScene";
import type { SceneKey } from "@/data/scenes";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  /** Animated scene shown in the banner chip. */
  scene?: SceneKey;
}

/** Reusable page banner with title, optional subtitle, and animated scene */
export default function PageBanner({ title, subtitle, scene }: PageBannerProps) {
  return (
    <section className="pb-8 pt-16">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col text-center md:flex-row md:items-center md:gap-6 md:text-left"
        >
          {scene && (
            <motion.div
              className="mx-auto mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-surface-chip md:mx-0 md:mb-0"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
            >
              <ServiceScene scene={scene} size={36} className="text-ink" />
            </motion.div>
          )}

          <div>
            <h1 className="section-title !mb-0">{title}</h1>
            {subtitle && (
              <motion.p
                className="mt-2 max-w-2xl text-base opacity-75 md:text-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.75, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
