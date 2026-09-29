"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { RichText, splitRichWords } from "@/lib/cms-rich-text";

interface HeroProps {
  /** Tagline (the white-then-accent headline) — the last two words are the accent. */
  tagline: string;
  subhead: string;
  /** Hero picture — a distinct CMS image, falling back to the brand logo. */
  imageUrl: string;
  imageAlt: string;
}

/** Decorative drifting network-dot field behind the hero (aria-hidden). */
function DriftField({ anim }: { anim: boolean }) {
  const dots = [
    { cx: 40, cy: 60, r: 2 },
    { cx: 160, cy: 30, r: 1.5 },
    { cx: 300, cy: 90, r: 2.5 },
    { cx: 460, cy: 40, r: 1.5 },
    { cx: 620, cy: 110, r: 2 },
    { cx: 90, cy: 200, r: 1.5 },
    { cx: 250, cy: 240, r: 2 },
    { cx: 420, cy: 190, r: 1.5 },
    { cx: 580, cy: 250, r: 2.5 },
    { cx: 700, cy: 170, r: 1.5 },
  ];
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.svg
        viewBox="0 0 760 300"
        className="absolute -left-10 top-0 h-full w-[130%] opacity-[0.12]"
        preserveAspectRatio="xMidYMid slice"
        animate={anim ? { x: [0, -30, 0], y: [0, 12, 0] } : undefined}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      >
        {dots.map((d, i) => (
          <circle key={i} {...d} fill="#ffffff" />
        ))}
        <path
          d="M40 60L160 30L300 90L460 40L620 110M90 200L250 240L420 190L580 250M160 30L250 240M460 40L420 190M620 110L580 250"
          stroke="#ffffff"
          strokeWidth="0.6"
          fill="none"
        />
      </motion.svg>
    </div>
  );
}

export default function Hero({
  tagline,
  subhead,
  imageUrl,
  imageAlt,
}: HeroProps) {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();
  const anim = !reduced;

  // Last two words take the accent (as one unit), the rest are the white base.
  const allWords = splitRichWords(tagline);
  const words = allWords.length > 1 ? allWords.slice(0, -2) : allWords;
  const accentWords = allWords.length > 1 ? allWords.slice(-2) : [];

  return (
    <section className="relative overflow-hidden pb-10 pt-16 md:pb-14 md:pt-24">
      <DriftField anim={anim} />

      <div className="container-main relative">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="cms-rich cms-rich--inline cms-inv mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {words.map((word, i) => (
                <Fragment key={word.key}>
                  {word.breakBefore && i > 0 && <br />}
                  {/* Space lives OUTSIDE the inline-block span — trailing
                      whitespace inside one gets stripped by CSS. */}
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.08 + i * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word.node}
                  </motion.span>{" "}
                </Fragment>
              ))}
              {accentWords.length > 0 && (
                <motion.span
                  className="inline-block text-[#49d4fc]"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.08 + words.length * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {accentWords.map((word, i) => (
                    <Fragment key={word.key}>
                      {i > 0 && (word.breakBefore ? <br /> : " ")}
                      {word.node}
                    </Fragment>
                  ))}
                </motion.span>
              )}
            </h1>

            <motion.div
              className="mb-8 max-w-lg text-lg leading-relaxed text-white/85"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            >
              <RichText value={subhead} format="rich" className="cms-inv" />
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            >
              <Link href="/contact" className="btn-primary">
                {t("ctaPrimary")}
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                {t("ctaSecondary")}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Purely decorative composition — no pointer interaction at all:
              hovering the image or rings must never affect them. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="pointer-events-none flex select-none justify-center"
            aria-hidden="true"
          >
            <div className="relative h-72 w-72 md:h-96 md:w-96">
              <motion.div
                className="absolute inset-0 rounded-full bg-[#49d4fc]/20 blur-3xl"
                animate={anim ? { scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] } : undefined}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Slow orbiting rings */}
              <motion.div
                className="absolute inset-6 rounded-full border-2 border-dashed border-white/20"
                animate={anim ? { rotate: 360 } : undefined}
                transition={{ duration: 46, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border border-white/15"
                animate={anim ? { rotate: -360 } : undefined}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />

              <motion.img
                src={imageUrl}
                alt={imageAlt}
                width={384}
                height={384}
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
                animate={anim ? { y: [0, -8, 0] } : undefined}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
