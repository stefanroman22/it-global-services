"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RichText } from "@/lib/cms-rich-text";

interface ContactHeroProps {
  /** Rich inline title (the page's only <h1>). */
  title: string;
  /** Rich subtitle ("" → none). */
  subtitle: string;
  /** CMS `contact_banner_image` URL ("" → the solid navy brand band). */
  imageUrl: string;
  imageAlt: string;
}

/** Full-bleed contact hero: a photo under a dark overlay (white text stays
 *  >= 4.5:1 on any photo) or, without a photo, the header navy, so the band
 *  flows out of the header like the Home hero. It is the page's LCP: text
 *  only slides in, it is never hidden waiting for an animation. */
export default function ContactHero({
  title,
  subtitle,
  imageUrl,
  imageAlt,
}: ContactHeroProps) {
  const reduced = useReducedMotion();

  return (
    <section
      className={`contact-hero relative isolate overflow-hidden ${
        imageUrl ? "bg-[#0b1322]" : "bg-header-bar"
      }`}
    >
      {imageUrl && (
        <>
          <img
            src={imageUrl}
            alt={imageAlt}
            width={1920}
            height={720}
            sizes="100vw"
            fetchPriority="high"
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          {/* #0b1322 at 65% over pure white is still 5.8:1 against white text. */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0b1322]/65" />
        </>
      )}

      <motion.div
        className="container-main flex min-h-[16rem] flex-col items-center justify-center py-16 text-center md:min-h-[22rem] md:py-24"
        initial={{ y: 16 }}
        animate={{ y: 0 }}
        // Reduced motion → no slide (initial stays SSR-stable).
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="max-w-4xl text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          <RichText value={title} format="inline" className="cms-inv" />
        </h1>
        {subtitle && (
          <div className="mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
            <RichText value={subtitle} format="rich" className="cms-inv" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
