"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Service } from "@/data/services";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  services: Service[];
  logoUrl: string;
  logoAlt: string;
}

export default function MobileMenu({ open, onClose, services, logoUrl, logoAlt }: MobileMenuProps) {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);

  const linkClass = (href: string) =>
    `block py-3 text-lg font-medium transition-colors ${pathname === href ? "text-[#fc1717]" : "text-white hover:text-[#fc1717]"
    }`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.nav
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-[#2A5088] px-6 pt-14 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <Link
              href="/"
              onClick={onClose}
              className="absolute left-4 top-4 flex items-center gap-2 whitespace-nowrap"
            >
              <img
                src={logoUrl}
                alt={logoAlt}
                className="h-10 w-10 object-contain"
              />
              <span className="text-base font-bold tracking-wide text-white">
                IT GLOBAL<span className="text-[#49d4fc]"> SERVICES</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              className="absolute right-4 top-5 text-white hover:text-[#fc1717]"
              aria-label="Close menu"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>


            <Link href="/" onClick={onClose} className={linkClass("/")}>
              Home
            </Link>

            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex w-full items-center justify-between py-3 text-lg font-medium text-white transition-colors hover:text-[#fc1717]"
            >
              Services
              <svg
                className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="ml-3 border-l border-white/20 pl-3">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={onClose}
                        className={`block py-2 text-sm ${pathname === `/services/${s.slug}`
                            ? "text-[#fc1717]"
                            : "text-white/80 hover:text-white"
                          }`}
                      >
                        {s.title}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/about"
              onClick={onClose}
              className={linkClass("/about")}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className={linkClass("/contact")}
            >
              Contact
            </Link>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
