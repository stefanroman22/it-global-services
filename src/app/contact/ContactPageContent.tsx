"use client";

import { motion } from "framer-motion";
import PageBanner from "@/components/ui/PageBanner";
import ContactForm from "@/components/ui/ContactForm";
import type { ContactInfo } from "@/lib/cms";

const contactIcon =
  "M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z";

interface ContactPageContentProps {
  bannerTitle: string;
  bannerSubtitle: string;
  formHeading: string;
  contact: ContactInfo;
}

export default function ContactPageContent({
  bannerTitle,
  bannerSubtitle,
  formHeading,
  contact,
}: ContactPageContentProps) {
  const methods = [
    contact.phone && {
      label: "Call Us",
      value: contact.phone,
      href: `tel:${contact.phone.replace(/\s/g, "")}`,
      color: "bg-[#2A5088]",
      iconPath:
        "M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38278L7.96701 10.5114C9.06925 12.9728 11.0272 14.9307 13.4886 16.033L14.6172 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z",
    },
    contact.email && {
      label: "Email Us",
      value: contact.email,
      href: `mailto:${contact.email}`,
      color: "bg-[#3e9446]",
      iconPath:
        "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    },
    contact.address && {
      label: "Visit Us",
      value: contact.address,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`,
      color: "bg-[#fc1717]",
      iconPath:
        "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    },
    contact.hours && {
      label: "Business Hours",
      value: contact.hours,
      href: null,
      color: "bg-[#2A5088]",
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    href: string | null;
    color: string;
    iconPath: string;
  }>;

  return (
    <div className="page-contact">
      <PageBanner title={bannerTitle} subtitle={bannerSubtitle} iconPath={contactIcon} />

      <section className="pb-6 pt-2">
        <div className="container-main">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {methods.map((m, i) => {
              const inner = (
                <>
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-white shadow-md ${m.color}`}
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
                        d={m.iconPath}
                      />
                    </svg>
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#074285]/60">
                    {m.label}
                  </div>
                  <div className="mt-1 text-sm font-medium leading-snug text-[#074285]">
                    {m.value}
                  </div>
                </>
              );

              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="rounded-xl bg-white/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {m.href ? (
                    <a
                      href={m.href}
                      target={m.href.startsWith("http") ? "_blank" : undefined}
                      rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactForm heading={formHeading} contact={contact} />
    </div>
  );
}
