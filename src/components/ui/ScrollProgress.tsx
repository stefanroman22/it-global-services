"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin scroll-progress bar fixed to the top of the viewport — replaces the
 *  hidden native scrollbar. Scroll-linked through a tight spring so it
 *  tracks the wheel instantly yet grows/shrinks fluidly in both directions.
 *  The motion value updates outside the React render loop and animates
 *  `transform` only (GPU-composited), so it stays smooth even while the
 *  page is busy. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // High-stiffness spring: close-to-direct tracking (no visible lag at the
  // top of the page) with just enough smoothing to glide between steps.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.3,
    restDelta: 0.0005,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left"
      style={{
        scaleX,
        backgroundColor: "var(--accent-cyan)",
        willChange: "transform",
      }}
    />
  );
}
