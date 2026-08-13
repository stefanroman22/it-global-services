"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { useRouteAlternates } from "@/components/providers/RouteAlternatesProvider";

/** Language dropdown (RO default / EN / HU). Options are real links so
 *  crawlers can follow them; service pages register per-locale slugs via
 *  RouteAlternatesProvider so switching lands on the translated URL. */
export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("lang");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const alternates = useRouteAlternates();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close when navigation happens (state adjustment during render).
  const [prevRoute, setPrevRoute] = useState(`${locale}:${pathname}`);
  if (prevRoute !== `${locale}:${pathname}`) {
    setPrevRoute(`${locale}:${pathname}`);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("label")}
        className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold uppercase text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49d4fc]"
      >
        <svg
          className="h-4.5 w-4.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18" />
        </svg>
        {locale}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={t("label")}
            className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-lg bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)] dark:bg-[#13233f]"
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {routing.locales.map((loc) => (
              <Link
                key={loc}
                role="menuitem"
                href={alternates?.[loc] ?? pathname}
                locale={loc}
                aria-current={loc === locale ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2 text-sm font-medium transition-colors ${
                  loc === locale
                    ? "text-[#2A5088] dark:text-[#49d4fc]"
                    : "text-[#074285]/80 hover:bg-[#2A5088]/8 hover:text-[#074285] dark:text-white/75 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                {t(loc)}
                {loc === locale && (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
