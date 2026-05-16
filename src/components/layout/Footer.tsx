"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import ServicesDropdown from "./ServicesDropdown";
import type { ContactInfo } from "@/lib/cms";
import type { Service } from "@/data/services";

interface FooterProps {
  description: string;
  contact: ContactInfo;
  services: Service[];
  brandName: string;
}

export default function Footer({ description, contact, services, brandName }: FooterProps) {
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

  const phoneHref = contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : undefined;
  const emailHref = contact.email ? `mailto:${contact.email}` : undefined;
  const addressHref = contact.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`
    : undefined;

  return (
    <footer className="bg-[#316936] py-12">
      <div className="container-main">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src="/company-logo.png"
                alt={`${brandName} logo`}
                className="h-16 w-16 object-contain drop-shadow-md"
              />
              <span className="text-xl font-bold tracking-wide text-white">
                IT GLOBAL<span className="text-[#49d4fc]"> SERVICES</span>
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              {description}
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
                  services={services}
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

          {/* Contact info — driven by CMS contact_info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-white/80">
              {phoneHref && (
                <a
                  href={phoneHref}
                  className="block transition-colors duration-200 hover:text-white"
                >
                  {contact.phone}
                </a>
              )}
              {emailHref && (
                <a
                  href={emailHref}
                  className="block transition-colors duration-200 hover:text-white"
                >
                  {contact.email}
                </a>
              )}
              {addressHref && contact.address && (
                <a
                  href={addressHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-200 hover:text-white"
                >
                  {contact.address}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
