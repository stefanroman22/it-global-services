"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";
import type { Service } from "@/data/services";
import type { ContactInfo } from "@/lib/cms";

interface Props {
  service: Service;
  contact: ContactInfo;
}

export default function ServicePageContent({ service, contact }: Props) {
  return (
    <div className="page-service">
      <PageBanner
        title={service.title}
        subtitle={service.shortDescription}
        iconPath={service.icon}
      />

      {/* Service details */}
      <section className="pb-8">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p className="mb-8 max-w-3xl text-lg leading-relaxed">
              {service.fullDescription}
            </p>

            <h2 className="mb-4 text-2xl font-bold">What We Offer</h2>
            <ul className="mb-8 grid gap-3 sm:grid-cols-2">
              {service.features.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 + i * 0.06 }}
                  className="flex items-start gap-2"
                >
                  <svg
                    className="mt-1 h-5 w-5 shrink-0 text-[#3e9446]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feat}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Contact form */}
      <ContactForm heading={`Interested in ${service.title}?`} contact={contact} />
    </div>
  );
}
