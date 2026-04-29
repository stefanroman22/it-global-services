"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/ui/ServiceCard";
import type { Service } from "@/data/services";

interface ServicesGridProps {
  services: Service[];
  header: string;
  subhead: string;
}

export default function ServicesGrid({ services, header, subhead }: ServicesGridProps) {
  return (
    <section id="services" className="py-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="section-title text-white">{header}</h2>
          <p className="section-subtitle mx-auto text-white/75">
            {subhead}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
