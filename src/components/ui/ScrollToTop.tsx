"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Smoothly scrolls to the top whenever the route changes */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
