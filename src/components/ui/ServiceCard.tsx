"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import ServiceScene from "./ServiceScene";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const t = useTranslations("common");
  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <motion.div
        className="card-service group h-full cursor-pointer"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px 200px 0px" }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Large animated line-icon scene (no chip box) */}
        <div className="mb-5 transition-transform duration-300 group-hover:scale-105">
          <ServiceScene
            scene={service.scene}
            size={64}
            className="text-[#49d4fc]"
          />
        </div>

        <h3 className="mb-2 text-lg font-bold leading-snug text-[#49d4fc] transition-colors group-hover:text-white">
          {service.title}
        </h3>

        <p className="text-sm leading-relaxed text-[#f2f8fc]">
          {service.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#49d4fc] opacity-0 transition-all duration-300 group-hover:opacity-100">
          {t("learnMore")}
          <svg
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
}
