"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import ServiceScene from "@/components/ui/ServiceScene";
import type { Service } from "@/data/services";

interface ServicesDropdownProps {
  open: boolean;
  onClose: () => void;
  variant: "header" | "footer";
  services: Service[];
  /** Horizontal anchor relative to the trigger (header uses right). */
  align?: "left" | "right";
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
  services,
  align = "left",
  bgColor,
  hoverBgColor,
  textColor,
}: ServicesDropdownProps) {
  const bg = bgColor ?? (variant === "header" ? "#3e9446" : "#3e6bad");
  const hoverBg = hoverBgColor ?? "rgba(255,255,255,0.1)";
  const text = textColor ?? "#ffffff";

  const originY = variant === "header" ? -8 : 8;

  // Header: the panel's left border lines up with the "S" of the trigger
  // label (the button has px-3 text inset), and the nav sits close to the
  // viewport's right edge, so the panel stays narrow and single-column.
  const positionClasses =
    variant === "header"
      ? `absolute top-full z-50 mt-1 ${align === "right" ? "right-0" : "left-3"} w-[min(90vw,360px)]`
      : `absolute bottom-full z-50 mb-2 ${align === "right" ? "right-0" : "left-0"} w-[min(90vw,560px)]`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="menu"
          className={`${positionClasses} rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.25)]`}
          style={{ backgroundColor: bg }}
          initial={{ opacity: 0, y: originY, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: originY, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div
            className={`grid gap-0.5 ${
              variant === "header" ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
            }`}
          >
            {services.map((s) => (
              <Link
                key={s.slug}
                role="menuitem"
                href={`/services/${s.slug}`}
                onClick={onClose}
                className="group/item flex items-center gap-2.5 rounded-md px-3 py-2 text-sm leading-snug transition-colors duration-150"
                style={{ color: text } as React.CSSProperties}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <ServiceScene scene={s.scene} size={17} />
                </span>
                {s.title}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
