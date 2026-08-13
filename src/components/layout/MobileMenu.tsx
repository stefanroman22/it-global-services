"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import type { Service } from "@/data/services";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  services: Service[];
  logoUrl: string;
  logoAlt: string;
  brandName: string;
}

export default function MobileMenu({
  open,
  onClose,
  services,
  logoUrl,
  logoAlt,
  brandName,
}: MobileMenuProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the close button when the drawer opens; close on Escape.
  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const linkClass = (href: string) =>
    `block py-3 text-lg font-medium transition-colors ${
      pathname === href ? "text-[#fc1717]" : "text-white hover:text-[#49d4fc]"
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
            aria-hidden="true"
          />

          <motion.nav
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col overflow-y-auto bg-header-bar px-6 pb-8 pt-16 shadow-2xl"
            aria-label={t("home")}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          >
            <Link
              href="/"
              onClick={onClose}
              className="absolute left-4 right-16 top-4 flex items-center gap-2 whitespace-nowrap"
            >
              <img
                src={logoUrl}
                alt={logoAlt}
                width={44}
                height={44}
                className="h-11 w-11 shrink-0 object-contain"
              />
              <span className="truncate text-base font-bold uppercase tracking-wide text-white">
                {brandName.replace(/\s+S\.?R\.?L\.?\s*$/i, "")}
              </span>
            </Link>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 hover:text-[#49d4fc]"
              aria-label={tCommon("closeMenu")}
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <Link href="/" onClick={onClose} className={linkClass("/")}>
              {t("home")}
            </Link>

            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              aria-expanded={servicesOpen}
              className="flex w-full cursor-pointer items-center justify-between py-3 text-lg font-medium text-white transition-colors hover:text-[#49d4fc]"
            >
              {t("services")}
              <svg
                className={`h-4 w-4 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
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
                        className={`block py-2 text-sm ${
                          pathname === `/services/${s.slug}`
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

            <Link href="/about" onClick={onClose} className={linkClass("/about")}>
              {t("about")}
            </Link>

            <Link
              href="/contact"
              onClick={onClose}
              className={linkClass("/contact")}
            >
              {t("contact")}
            </Link>

            {/* Language selector pinned under the nav */}
            <div className="mt-6 border-t border-white/15 pt-5">
              <LanguageSwitcher />
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
