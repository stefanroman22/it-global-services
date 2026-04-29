"use client";

import { motion } from "framer-motion";
import ServiceIcon from "./ServiceIcon";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  iconPath?: string;
}

/** Reusable page banner with title, optional subtitle, and optional icon */
export default function PageBanner({
  title,
  subtitle,
  iconPath,
}: PageBannerProps) {
  return (
    <section className="pb-8 pt-16">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col  text-center md:flex-row md:items-center md:gap-6 md:text-left"
        >
          {iconPath && (
            <div className="mx-auto mb-4 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/40 md:mx-0 md:mb-0">
              <ServiceIcon
                pathData={iconPath}
                size={36}
                className="text-[#074285]"
              />
            </div>
          )}

          <div>
            <h1 className="section-title !mb-0">{title}</h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
