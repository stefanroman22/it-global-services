"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ServicesDropdown from "./ServicesDropdown";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import type { Service } from "@/data/services";

interface HeaderProps {
  services: Service[];
  logoUrl: string;
  logoAlt: string;
  brandName: string;
}

/** Splits the CMS brand name into a wordmark: last word gets the cyan
 *  accent; a trailing legal suffix (SRL) is dropped from the display. */
function wordmarkParts(brandName: string): { base: string; accent: string } {
  const display = brandName.replace(/\s+S\.?R\.?L\.?\s*$/i, "").trim();
  const words = display.split(/\s+/);
  if (words.length < 2) return { base: display, accent: "" };
  return {
    base: words.slice(0, -1).join(" "),
    accent: words[words.length - 1],
  };
}

export default function Header({
  services,
  logoUrl,
  logoAlt,
  brandName,
}: HeaderProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Close menus when the route changes (state adjustment during render —
  // avoids a cascading effect re-render).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setDropdownOpen(false);
    setMobileOpen(false);
  }

  // Subtle elevation once the page scrolls under the sticky bar.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string) =>
    `relative px-3 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "text-[#fc1717] after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-[#fc1717]"
        : "text-white hover:text-[#49d4fc]"
    }`;

  const isServicePage = pathname.startsWith("/services");
  const { base, accent } = wordmarkParts(brandName);

  return (
    <header
      className={`sticky top-0 z-40 bg-header-bar transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_rgba(0,0,0,0.25)]" : ""
      }`}
    >
      <div className="container-main flex h-20 items-center justify-between gap-4">
        {/* Logo — left, larger */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 whitespace-nowrap"
        >
          <img
            src={logoUrl}
            alt={logoAlt}
            width={64}
            height={64}
            className="h-16 w-16 object-contain drop-shadow-md"
          />
          <span className="hidden text-lg font-bold uppercase tracking-wide text-white sm:inline md:text-xl">
            {base}
            {accent && <span className="text-[#49d4fc]"> {accent}</span>}
          </span>
        </Link>

        {/* Navigation — right */}
        <nav
          aria-label={t("home")}
          className="hidden items-center gap-1 md:flex"
        >
          <Link
            href="/"
            aria-current={pathname === "/" ? "page" : undefined}
            className={linkClass("/")}
          >
            {t("home")}
          </Link>

          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              className={`flex cursor-pointer items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                isServicePage
                  ? "text-[#fc1717]"
                  : "text-white hover:text-[#49d4fc]"
              }`}
            >
              {t("services")}
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
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
              variant="header"
              services={services}
            />
          </div>

          <Link
            href="/about"
            aria-current={pathname === "/about" ? "page" : undefined}
            className={linkClass("/about")}
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={linkClass("/contact")}
          >
            {t("contact")}
          </Link>

          <span
            aria-hidden="true"
            className="mx-2 h-6 w-px bg-white/20"
          />

          <LanguageSwitcher />
          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10"
            aria-label={tCommon("openMenu")}
            aria-expanded={mobileOpen}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <MobileMenu
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          services={services}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          brandName={brandName}
        />
      </div>
    </header>
  );
}
