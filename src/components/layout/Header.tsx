"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import ServicesDropdown from "./ServicesDropdown";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const linkClass = (href: string) =>
    `relative px-3 py-2 text-sm font-medium transition-colors ${
      pathname === href
        ? "text-[#fc1717]"
        : "text-white hover:text-[#fc1717]"
    }`;

  const isServicePage = pathname.startsWith("/services");

  return (
    <header className="sticky top-0 z-40 bg-[#2A5088]">
      <div className="container-main flex h-20 items-center justify-between">
        {/* Left nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          {/* Services dropdown trigger */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex cursor-pointer items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                isServicePage
                  ? "text-[#fc1717]"
                  : "text-white hover:text-[#fc1717]"
              }`}
            >
              Services
              <svg
                className={`h-3.5 w-3.5 transition-transform ${
                  dropdownOpen ? "" : "rotate-180"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
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
            />
          </div>
        </nav>

        {/* Centered logo */}
        <Link
          href="/"
          className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap text-center"
        >
          <img
            src="/company-logo.png"
            alt="IT Global Services logo"
            className="h-14 w-14 object-contain drop-shadow-md"
          />
          <span className="hidden text-lg font-bold tracking-wide text-white sm:inline md:text-xl">
            IT GLOBAL<span className="text-[#49d4fc]"> SERVICES</span>
          </span>
        </Link>

        {/* Right nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/about" className={linkClass("/about")}>
            About Us
          </Link>
          <Link href="/contact" className={linkClass("/contact")}>
            Contact
          </Link>
        </nav>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMobileOpen(true)}
          className="ml-auto text-white md:hidden"
          aria-label="Open menu"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  );
}
