"use client";

import { useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

/** Re-render whenever the html `data-theme` attribute changes. */
function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

/** Sun/moon theme switch. The initial theme is applied before hydration by
 *  the inline script in the root layout (no flash); this button flips the
 *  `data-theme` attribute and persists the choice. */
export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  const t = useTranslations("theme");
  // The server doesn't know the visitor's theme — snapshot it from the DOM
  // attribute set pre-hydration (null on the server render).
  const theme = useSyncExternalStore<Theme | null>(
    subscribeToTheme,
    readTheme,
    () => null,
  );

  function toggle() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode) — theme still applies for the session.
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t("toLight") : t("toDark")}
      className={`relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#49d4fc] ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="moon"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: 60, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -60, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}
