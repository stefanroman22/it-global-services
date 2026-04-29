"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ServiceIcon from "./ServiceIcon";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`} className="block h-full">
      <motion.div
        className="card-service group h-full cursor-pointer"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 ring-1 ring-[#49d4fc]/30 transition-all duration-300 group-hover:bg-[#49d4fc] group-hover:ring-[#49d4fc]">
          <ServiceIcon
            pathData={service.icon}
            size={30}
            className="text-[#49d4fc] transition-colors group-hover:text-[#2A5088]"
          />
        </div>

        <h3 className="mb-2 text-lg font-bold leading-snug text-[#49d4fc] transition-colors group-hover:text-white">
          {service.title}
        </h3>

        <p className="text-sm leading-relaxed text-[#f2f8fc]">
          {service.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#49d4fc] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Learn more
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
}
