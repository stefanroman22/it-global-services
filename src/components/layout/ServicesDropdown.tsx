"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";

interface ServicesDropdownProps {
  open: boolean;
  onClose: () => void;
  variant: "header" | "footer";
  /** Background color of the dropdown panel */
  bgColor?: string;
  /** Background color on link hover */
  hoverBgColor?: string;
  /** Text color for links */
  textColor?: string;
}

export default function ServicesDropdown({
  open,
  onClose,
  variant,
  bgColor,
  hoverBgColor,
  textColor,
}: ServicesDropdownProps) {
  // Defaults per variant
  const bg = bgColor ?? (variant === "header" ? "#3e9446" : "#3e6bad");
  const hoverBg = hoverBgColor ?? "rgba(255,255,255,0.1)";
  const text = textColor ?? "#ffffff";

  // Footer dropdown opens upward, header opens downward
  const originY = variant === "header" ? -8 : 8;

  const positionClasses =
    variant === "header"
      ? "absolute left-0 top-full z-50"
      : "absolute bottom-full left-0 z-50 mb-2";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`${positionClasses} w-[min(90vw,520px)] rounded-lg p-3 shadow-[0_4px_16px_rgba(255,255,255,0.15)]`}
          style={{ backgroundColor: bg }}
          initial={{ opacity: 0, y: originY, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: originY, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                onClick={onClose}
                className="block rounded-md px-3 py-2 text-sm leading-snug transition-colors duration-150"
                style={
                  {
                    color: text,
                    "--hover-bg": hoverBg,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                {s.title}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
