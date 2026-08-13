"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface HeroProps {
  /** Tagline (the white-then-accent headline) — first segment is the white part, second is accent. */
  tagline: string;
  taglineAccent?: string;
  subhead: string;
  logoUrl: string;
  logoAlt: string;
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
  taglineAccent,
  subhead,
  logoUrl,
  logoAlt,
}: HeroProps) {
  const t = useTranslations("hero");
  const reduced = useReducedMotion();
  const anim = !reduced;

  const words = tagline.split(/\s+/).filter(Boolean);

  return (
    <section className="relative overflow-hidden pb-10 pt-16 md:pb-14 md:pt-24">
      <DriftField anim={anim} />

      <div className="container-main relative">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
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
                    {word}
                  </motion.span>{" "}
                </Fragment>
              ))}
              {taglineAccent && (
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
                  {taglineAccent}
                </motion.span>
              )}
            </h1>

            <motion.p
              className="mb-8 max-w-lg text-lg leading-relaxed text-white/85"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            >
              {subhead}
            </motion.p>

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
              hovering the logo, chips, or rings must never affect them. */}
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
                src={logoUrl}
                alt={logoAlt}
                width={384}
                height={384}
                className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
                animate={anim ? { y: [0, -8, 0] } : undefined}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Cloud — fills up with dark blue, then drains (sync/storage feel) */}
              <motion.div
                className="absolute right-0 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-xl"
                animate={anim ? { y: [0, -10, 0] } : undefined}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="h-7 w-7 text-[#2A5088]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <defs>
                    <clipPath id="hero-cloud-fill">
                      <path
                        d="M4.5 13.5A3.5 3.5 0 016 6.8 5 5 0 0115.6 5 4 4 0 0116 13H6a3.5 3.5 0 01-1.5.5z"
                        transform="translate(1 -1)"
                      />
                    </clipPath>
                  </defs>
                  {/* Liquid level rising and falling inside the cloud */}
                  <g clipPath="url(#hero-cloud-fill)" transform="translate(0 3.5)">
                    <motion.rect
                      x="1"
                      width="22"
                      height="14"
                      fill="#2A5088"
                      stroke="none"
                      initial={{ y: 14 }}
                      animate={anim ? { y: [14, 2, 2, 14] } : { y: 8 }}
                      transition={{
                        duration: 3.6,
                        times: [0, 0.4, 0.65, 1],
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </g>
                  {/* Cloud outline on top */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 13.5A3.5 3.5 0 016 6.8 5 5 0 0115.6 5 4 4 0 0116 13H6a3.5 3.5 0 01-1.5.5z"
                    transform="translate(1 2.5)"
                  />
                </svg>
              </motion.div>

              {/* Padlock — unlocks, swings open, relocks */}
              <motion.div
                className="absolute bottom-8 left-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3e9446] shadow-xl"
                animate={anim ? { y: [0, -8, 0] } : undefined}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              >
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  {/* shackle — lifts and pivots from its fixed left leg */}
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                    style={{ transformOrigin: "8px 11px", transformBox: "view-box" }}
                    animate={
                      anim
                        ? { y: [0, 0, -1.8, -1.8, 0, 0], rotate: [0, 0, -24, -24, 0, 0] }
                        : undefined
                    }
                    transition={{
                      duration: 3.4,
                      times: [0, 0.3, 0.42, 0.68, 0.8, 1],
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
                  />
                  {/* keyhole blinks when unlocked */}
                  <motion.path
                    strokeLinecap="round"
                    d="M12 15V17"
                    animate={anim ? { opacity: [1, 1, 0.25, 0.25, 1, 1] } : undefined}
                    transition={{
                      duration: 3.4,
                      times: [0, 0.3, 0.42, 0.68, 0.8, 1],
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
              </motion.div>

              {/* Bolt — lightning flash with a charge-up punch */}
              <motion.div
                className="absolute bottom-2 right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fc1717] shadow-xl"
                animate={anim ? { y: [0, -6, 0] } : undefined}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              >
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    style={{ transformOrigin: "12px 12px", transformBox: "view-box" }}
                    animate={
                      anim
                        ? {
                            opacity: [1, 1, 0.2, 1, 0.4, 1, 1],
                            scale: [1, 1, 1.15, 1, 1.12, 1, 1],
                          }
                        : undefined
                    }
                    transition={{
                      duration: 2.2,
                      times: [0, 0.55, 0.6, 0.65, 0.7, 0.75, 1],
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </svg>
              </motion.div>

              {/* Globe — spinning */}
              <motion.div
                className="absolute left-4 top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/90 shadow-xl"
                animate={anim ? { y: [0, -7, 0] } : undefined}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              >
                <svg className="h-7 w-7 text-[#3e9446]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <motion.g
                    style={{ transformOrigin: "12px 12px", transformBox: "view-box" }}
                    animate={anim ? { rotate: 360 } : undefined}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3" />
                  </motion.g>
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
