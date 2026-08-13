"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ServicesDropdown from "./ServicesDropdown";
import { resolveContactCards } from "@/lib/contactFields";
import type { ContactInfo } from "@/lib/cms";
import type { Service } from "@/data/services";

interface FooterProps {
  description: string;
  contact: ContactInfo;
  services: Service[];
  brandName: string;
  logoUrl: string;
  logoAlt: string;
}

export default function Footer({
  description,
  contact,
  services,
  brandName,
  logoUrl,
  logoAlt,
}: FooterProps) {
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href ? "text-[#fc1717]" : "text-white hover:text-[#49d4fc]"
    }`;

  const displayBrand = brandName.replace(/\s+S\.?R\.?L\.?\s*$/i, "").trim();
  const brandWords = displayBrand.split(/\s+/);
  const brandBase = brandWords.slice(0, -1).join(" ");
  const brandAccent = brandWords.length > 1 ? brandWords[brandWords.length - 1] : "";

  const cards = resolveContactCards(contact);

  return (
    <footer className="bg-footer-bar py-12">
      <div className="container-main">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src={logoUrl}
                alt={logoAlt}
                width={64}
                height={64}
                className="h-16 w-16 object-contain drop-shadow-md"
              />
              <span className="text-xl font-bold uppercase tracking-wide text-white">
                {brandBase || displayBrand}
                {brandAccent && (
                  <span className="text-[#49d4fc]"> {brandAccent}</span>
                )}
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              {description}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              {tFooter("navigation")}
            </h4>
            <nav className="flex flex-col gap-3" aria-label={tFooter("navigation")}>
              <Link href="/" className={linkClass("/")}>
                {t("home")}
              </Link>

              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                  className={`flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors ${
                    pathname.startsWith("/services")
                      ? "text-[#fc1717]"
                      : "text-white hover:text-[#49d4fc]"
                  }`}
                >
                  {t("services")}
                  <svg
                    className={`h-3.5 w-3.5 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ServicesDropdown
                  open={dropdownOpen}
                  onClose={() => setDropdownOpen(false)}
                  variant="footer"
                  services={services}
                />
              </div>

              <Link href="/about" className={linkClass("/about")}>
                {t("about")}
              </Link>
              <Link href="/contact" className={linkClass("/contact")}>
                {t("contact")}
              </Link>
            </nav>
          </div>

          {/* Contact info — driven by CMS contact_info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              {tFooter("contact")}
            </h4>
            <div className="space-y-2 text-sm text-white/80">
              {cards.map((card) =>
                card.href ? (
                  <a
                    key={card.key}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      card.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block transition-colors duration-200 hover:text-white"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p key={card.key} className="block">
                    {card.value}
                  </p>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {brandName}. {tFooter("rights")}
        </div>
      </div>
    </footer>
  );
}
