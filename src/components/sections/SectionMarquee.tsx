"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionMarqueeProps {
  /** Labels to scroll — typically the service titles from the CMS. */
  items: string[];
  /** Scroll direction. Alternate between sections for rhythm. */
  direction?: "left" | "right";
  /** Extra classes for the wrapper (text color is inherited). */
  className?: string;
}

/**
 * Infinite marquee strip shown between home sections — the "moving
 * category" divider. Purely decorative (the same titles appear in the
 * services grid), so it is hidden from assistive tech; under reduced
 * motion it renders as a static row.
 */
export default function SectionMarquee({
  items,
  direction = "left",
  className = "",
}: SectionMarqueeProps) {
  const reduced = useReducedMotion();
  if (items.length === 0) return null;

  // Repeat the base list until it is comfortably wider than any viewport —
  // with only 1-2 short items the strip would otherwise fill half the screen
  // and loop with a visible gap.
  const repeats = Math.max(1, Math.ceil(10 / items.length));
  const base = Array.from({ length: repeats }, () => items).flat();
  // Duplicate the row twice; animating to -50% loops seamlessly.
  const row = [...base, ...base];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden py-5 ${className}`}
    >
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={reduced ? undefined : { x: [from, to] }}
        transition={{
          duration: Math.max(18, base.length * 4.5),
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em]"
          >
            {item}
            <svg
              className="h-2 w-2 opacity-60"
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
