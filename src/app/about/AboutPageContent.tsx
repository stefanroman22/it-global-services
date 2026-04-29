"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";

// Simple building/team icon path
const aboutIcon =
  "M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z";

export default function AboutPageContent() {
  return (
    <div className="page-about">
      <PageBanner
        title="About Us"
        subtitle="Building long-term technology partnerships since day one."
        iconPath={aboutIcon}
      />

      <section className="pb-8">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10 flex flex-col items-center gap-8 rounded-2xl bg-white/60 p-8 shadow-sm md:flex-row"
          >
            <img
              src="/company-logo.png"
              alt="IT Global Services logo"
              className="h-32 w-32 shrink-0 object-contain drop-shadow-md md:h-40 md:w-40"
            />
            <div>
              <h2 className="mb-2 text-xl font-bold text-[#074285] md:text-2xl">
                A decade of trusted IT partnerships
              </h2>
              <p className="text-base leading-relaxed text-[#074285]/80">
                From our first client to our 150th, we&apos;ve stayed true to
                the same principle: technology should enable your business, not
                complicate it. That&apos;s why teams across Romania trust us
                with their critical infrastructure.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl space-y-6 text-lg leading-relaxed"
          >
            <p>
              <strong>IT Global Services SRL</strong> is a full-service
              information technology company dedicated to helping businesses
              leverage technology for growth and operational excellence. Founded
              with a vision to bridge the gap between complex technology and
              real-world business needs, we have grown into a trusted partner
              for organizations of all sizes.
            </p>

            <p>
              Our team of certified professionals brings together deep expertise
              across infrastructure, security, software development, and cloud
              technologies. We believe that the right technology strategy,
              implemented effectively, can transform how businesses operate,
              compete, and serve their customers.
            </p>

            <h2 className="pt-4 text-2xl font-bold">Our Mission</h2>
            <p>
              To deliver innovative, reliable, and cost-effective IT solutions
              that empower our clients to focus on what they do best — running
              their business. We measure our success by the success of our
              partners.
            </p>

            <h2 className="pt-4 text-2xl font-bold">Why Choose Us</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Certified Experts",
                  desc: "Our team holds industry-leading certifications across multiple technology domains.",
                  color: "bg-[#2A5088]",
                  iconPath:
                    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                },
                {
                  title: "Proactive Approach",
                  desc: "We prevent problems before they impact your business through continuous monitoring.",
                  color: "bg-[#3e9446]",
                  iconPath:
                    "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                },
                {
                  title: "Scalable Solutions",
                  desc: "Our services grow with your business, from startup to enterprise scale.",
                  color: "bg-[#fc1717]",
                  iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
                },
                {
                  title: "Transparent Pricing",
                  desc: "No hidden fees. Clear, predictable pricing that aligns with your budget.",
                  color: "bg-[#2A5088]",
                  iconPath:
                    "M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex gap-4 rounded-xl bg-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white shadow-md ${item.color}`}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.75}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={item.iconPath}
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold">{item.title}</h3>
                    <p className="text-sm opacity-75">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactForm heading="Let's Start a Conversation" />
    </div>
  );
}
