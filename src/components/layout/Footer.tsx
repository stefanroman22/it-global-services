"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import ServicesDropdown from "./ServicesDropdown";

export default function Footer() {
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
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href
        ? "text-[#fc1717]"
        : "text-white hover:text-[#fc1717]"
    }`;

  return (
    <footer className="bg-[#316936] py-12">
      <div className="container-main">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src="/company-logo.png"
                alt="IT Global Services logo"
                className="h-16 w-16 object-contain drop-shadow-md"
              />
              <span className="text-xl font-bold tracking-wide text-white">
                IT GLOBAL<span className="text-[#49d4fc]"> SERVICES</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              Your trusted partner for comprehensive IT solutions. We empower
              businesses through innovative technology and expert support.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>

              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors ${
                    pathname.startsWith("/services")
                      ? "text-[#fc1717]"
                      : "text-white hover:text-[#fc1717]"
                  }`}
                >
                  Services
                  <svg
                    className={`h-3.5 w-3.5 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
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
                  variant="footer"
                />
              </div>

              <Link href="/about" className={linkClass("/about")}>
                About Us
              </Link>
              <Link href="/contact" className={linkClass("/contact")}>
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-white/80">
              <a
                href="tel:+40312345678"
                className="block transition-colors duration-200 hover:text-white"
              >
                +40 312 345 678
              </a>
              <a
                href="mailto:office@itglobalservices.ro"
                className="block transition-colors duration-200 hover:text-white"
              >
                office@itglobalservices.ro
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Strada+Exemplu+Nr.+10%2C+Sector+1%2C+Bucharest%2C+Romania"
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-200 hover:text-white"
              >
                Strada Exemplu Nr. 10, Sector 1
                <br />
                Bucharest, Romania
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} IT Global Services SRL. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
