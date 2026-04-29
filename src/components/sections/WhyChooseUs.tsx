"use client";

import { motion } from "framer-motion";
import type { KeyFeature } from "@/lib/cms";

const ICONS = [
  // 24/7 clock
  "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  // Certificate / shield with checkmark
  "M9 12l2 2 4-4M7.835 4.697A3.42 3.42 0 001.946 6.584a3.42 3.42 0 00-.012 2.054 3.42 3.42 0 00-1.879 5.877 3.42 3.42 0 000 2.162 3.42 3.42 0 001.879 5.877 3.42 3.42 0 001.886 1.887 3.42 3.42 0 002.054.012 3.42 3.42 0 005.877 1.879 3.42 3.42 0 002.162 0 3.42 3.42 0 005.877-1.879 3.42 3.42 0 001.887-1.886 3.42 3.42 0 00.012-2.054 3.42 3.42 0 001.879-5.877 3.42 3.42 0 000-2.162 3.42 3.42 0 00-1.879-5.877 3.42 3.42 0 00-1.886-1.887 3.42 3.42 0 00-2.054-.012 3.42 3.42 0 00-5.877-1.879 3.42 3.42 0 00-2.162 0A3.42 3.42 0 007.834 4.697z",
  // Shield with checkmark
  "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  // Currency
  "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z",
  // Lightning
  "M13 10V3L4 14h7v7l9-11h-7z",
  // Trending up
  "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
];

const COLORS = ["bg-[#2A5088]", "bg-[#3e9446]", "bg-[#fc1717]", "bg-[#2A5088]", "bg-[#3e9446]", "bg-[#fc1717]"];

interface WhyChooseUsProps {
  eyebrow: string;
  header: string;
  subhead: string;
  features: KeyFeature[];
}

export default function WhyChooseUs({ eyebrow, header, subhead, features }: WhyChooseUsProps) {
  return (
    <section className="bg-white py-20">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-[#2A5088]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#2A5088]">
            {eyebrow}
          </span>
          <h2 className="section-title text-[#074285]">{header}</h2>
          <p className="section-subtitle mx-auto text-[#074285]/70">{subhead}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-110 ${COLORS[i % COLORS.length]}`}
              >
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[i % ICONS.length]} />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-[#074285]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#074285]/75">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
