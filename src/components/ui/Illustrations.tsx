"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Flat-vector illustration scenes in the brand palette, animated with
 * framer-motion (floating badges, pulsing glows). Inline SVG only — zero
 * network requests, tiny payload, theme-agnostic (drawn on transparent
 * background so they sit on light and dark surfaces alike).
 *
 * All motion loops disable under prefers-reduced-motion.
 */

const FLOAT = { repeat: Infinity, ease: "easeInOut" as const };

interface SceneProps {
  className?: string;
  /** Accessible description; empty string marks the scene decorative. */
  title?: string;
}

/** Circular floating badge with an icon glyph, used by both scenes. */
function Badge({
  cx,
  cy,
  r,
  fill,
  anim,
  delay,
  children,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  anim: boolean;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.g
      animate={anim ? { y: [0, -9, 0] } : undefined}
      transition={{ duration: 3.4, delay, ...FLOAT }}
    >
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      {children}
    </motion.g>
  );
}

/**
 * Support agent with a headset at a monitor, floating contact bubbles
 * (mail, calendar, 24/7, gears). Used in the contact CTA band and on the
 * contact page — mirrors the "Questions?" bookend of the reference site.
 */
export function SupportDeskIllustration({ className = "", title }: SceneProps) {
  const reduced = useReducedMotion();
  const anim = !reduced;
  return (
    <motion.svg
      viewBox="0 0 640 520"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      whileHover={anim ? { scale: 1.03 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {/* Cloud blob backdrop */}
      <path
        d="M104 402c-44-10-72-44-66-88 5-38 34-60 68-62 2-52 40-92 92-96 34-70 128-88 186-38 16-16 40-24 64-18 44 10 64 52 54 92 40 12 66 46 60 88-6 46-46 74-92 74z"
        fill="#ffffff"
        opacity="0.92"
      />
      <ellipse cx="330" cy="466" rx="240" ry="12" fill="#2A5088" opacity="0.10" />

      {/* Floating contact bubbles */}
      <Badge cx={150} cy={150} r={34} fill="#81a9e3" anim={anim} delay={0}>
        {/* envelope */}
        <rect x="131" y="138" width="38" height="26" rx="4" fill="#ffffff" />
        <path
          d="M133 142l17 12 17-12"
          stroke="#2A5088"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Badge>
      <Badge cx={226} cy={96} r={38} fill="#DAEBFF" anim={anim} delay={0.5}>
        {/* calendar */}
        <rect x="206" y="80" width="40" height="34" rx="5" fill="#ffffff" stroke="#2A5088" strokeWidth="2.5" />
        <path d="M206 92h40" stroke="#2A5088" strokeWidth="2.5" />
        <path d="M216 76v8M236 76v8" stroke="#2A5088" strokeWidth="3" strokeLinecap="round" />
        <path d="M214 101h6M223 101h6M232 101h6M214 108h6M223 108h6" stroke="#3A70A9" strokeWidth="2.5" strokeLinecap="round" />
      </Badge>
      <Badge cx={318} cy={78} r={34} fill="#81a9e3" anim={anim} delay={1}>
        {/* 24/7 clock */}
        <circle cx="318" cy="78" r="22" fill="#ffffff" />
        <text
          x="318"
          y="84"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill="#2A5088"
          fontFamily="Inter, sans-serif"
        >
          24/7
        </text>
      </Badge>
      <motion.g
        animate={anim ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: 3.8, delay: 1.4, ...FLOAT }}
      >
        <circle cx="398" cy="128" r="30" fill="#DAEBFF" />
        {/* gear, slowly rotating */}
        <motion.g
          style={{ transformOrigin: "398px 128px", transformBox: "view-box" }}
          animate={anim ? { rotate: 360 } : undefined}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M398 112l3 6 6.5-1.5 1 7 7 1-1.5 6.5 6 3-6 3 1.5 6.5-7 1-1 7-6.5-1.5-3 6-3-6-6.5 1.5-1-7-7-1 1.5-6.5-6-3 6-3-1.5-6.5 7-1 1-7 6.5 1.5z"
            fill="#3A70A9"
          />
          <circle cx="398" cy="128" r="7" fill="#DAEBFF" />
        </motion.g>
      </motion.g>

      {/* Monitor */}
      <g>
        <rect x="236" y="180" width="188" height="126" rx="10" fill="#1f3a5f" />
        <motion.rect
          x="246"
          y="190"
          width="168"
          height="106"
          rx="6"
          fill="#3A70A9"
          animate={anim ? { opacity: [1, 0.85, 1] } : undefined}
          transition={{ duration: 4, ...FLOAT }}
        />
        {/* screen content lines — text "types" itself, cursor blinks */}
        <rect x="258" y="204" width="70" height="8" rx="4" fill="#DAEBFF" opacity="0.9" />
        <motion.rect
          x="258"
          y="220"
          height="6"
          rx="3"
          fill="#DAEBFF"
          opacity="0.55"
          initial={{ width: 120 }}
          animate={anim ? { width: [24, 120, 120, 24] } : undefined}
          transition={{ duration: 5, times: [0, 0.5, 0.9, 1], ...FLOAT }}
        />
        <motion.rect
          x="258"
          y="232"
          height="6"
          rx="3"
          fill="#DAEBFF"
          opacity="0.55"
          initial={{ width: 100 }}
          animate={anim ? { width: [10, 100, 100, 10] } : undefined}
          transition={{ duration: 5, delay: 0.8, times: [0, 0.5, 0.9, 1], ...FLOAT }}
        />
        <motion.rect
          x="384"
          y="228"
          width="3"
          height="12"
          fill="#49d4fc"
          animate={anim ? { opacity: [1, 1, 0, 0] } : undefined}
          transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: "linear" }}
        />
        <motion.rect
          x="258"
          y="252"
          width="52"
          height="16"
          rx="8"
          fill="#3e9446"
          animate={anim ? { opacity: [1, 0.7, 1] } : undefined}
          transition={{ duration: 2.6, ...FLOAT }}
        />
        <rect x="322" y="278" width="14" height="26" fill="#1f3a5f" />
        <rect x="298" y="302" width="64" height="8" rx="4" fill="#1f3a5f" />
      </g>

      {/* Person with headset (right of monitor) */}
      <g>
        {/* chair */}
        <rect x="472" y="286" width="14" height="90" rx="6" fill="#1f3a5f" />
        <rect x="440" y="368" width="78" height="12" rx="6" fill="#1f3a5f" />
        <rect x="452" y="252" width="52" height="86" rx="18" fill="#2b4a75" />
        {/* torso */}
        <path d="M436 268c0-30 24-52 52-52s50 22 50 52v70h-102z" fill="#3A70A9" />
        {/* arm to keyboard — hand taps as if typing */}
        <motion.g
          animate={anim ? { y: [0, -2.5, 0, -1.5, 0] } : undefined}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M446 288c-24 14-52 26-84 30l4 16c36-2 66-16 88-32z"
            fill="#3A70A9"
          />
          <circle cx="360" cy="330" r="9" fill="#f0b592" />
        </motion.g>
        {/* key-tap sparks above the keyboard */}
        {[344, 362, 380].map((x, i) => (
          <motion.rect
            key={x}
            x={x}
            y={314}
            width="6"
            height="3"
            rx="1.5"
            fill="#49d4fc"
            initial={{ opacity: 0 }}
            animate={anim ? { opacity: [0, 1, 0], y: [0, -4, -7] } : undefined}
            transition={{ duration: 1.1, delay: i * 0.35, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        {/* head — gentle nod while working */}
        <motion.g
          style={{ transformOrigin: "487px 226px", transformBox: "view-box" }}
          animate={anim ? { rotate: [-1.5, 1.5, -1.5], y: [0, -1.5, 0] } : undefined}
          transition={{ duration: 4.6, ...FLOAT }}
        >
          <circle cx="487" cy="196" r="30" fill="#f0b592" />
          <path d="M458 190c-2-22 14-38 30-38s32 14 30 34c-8-12-18-16-30-16s-22 8-30 20z" fill="#1f3a5f" />
          <path
            d="M459 186c0-18 12-30 28-30s28 12 28 30"
            stroke="#1f3a5f"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="452" y="184" width="10" height="18" rx="5" fill="#2A5088" />
          <path d="M457 202c0 12 10 18 20 18" stroke="#2A5088" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M492 206c3 4 8 4 11 0" stroke="#c98a66" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>
      </g>

      {/* Desk */}
      <rect x="120" y="336" width="420" height="14" rx="7" fill="#2A5088" />
      <rect x="150" y="350" width="12" height="112" fill="#2A5088" />
      <rect x="498" y="350" width="12" height="112" fill="#2A5088" />
      {/* keyboard on desk */}
      <rect x="330" y="324" width="70" height="10" rx="4" fill="#81a9e3" />

      {/* plant */}
      <g>
        <motion.g
          style={{ transformOrigin: "196px 316px", transformBox: "view-box" }}
          animate={anim ? { rotate: [-2, 2, -2] } : undefined}
          transition={{ duration: 4.5, ...FLOAT }}
        >
          <path d="M196 318c-4-24-18-34-30-36 4 18 14 32 30 36z" fill="#3e9446" />
          <path d="M196 318c4-26 16-38 30-42-2 20-12 36-30 42z" fill="#57c168" />
          <path d="M196 320v-30" stroke="#2f7a3a" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
        <path d="M182 318h28l-4 20h-20z" fill="#2A5088" />
      </g>
    </motion.svg>
  );
}

/**
 * Person working securely on a laptop — cloud with shield & lock, password
 * card, sync folder. Used on the About page and service surfaces.
 */
export function SecureWorkspaceIllustration({
  className = "",
  title,
}: SceneProps) {
  const reduced = useReducedMotion();
  const anim = !reduced;
  return (
    <motion.svg
      viewBox="0 0 640 520"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      whileHover={anim ? { scale: 1.03 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
    >
      {/* blob backdrop */}
      <path
        d="M96 380c-40-36-44-104-6-150 30-38 76-48 116-36 20-52 72-84 128-76 60 8 102 56 106 112 40 4 72 34 76 76 4 50-32 90-82 96z"
        fill="#ffffff"
        opacity="0.92"
      />
      <ellipse cx="320" cy="472" rx="250" ry="12" fill="#2A5088" opacity="0.10" />

      {/* Cloud + shield + lock */}
      <motion.g
        animate={anim ? { y: [0, -10, 0] } : undefined}
        transition={{ duration: 4, ...FLOAT }}
      >
        <path
          d="M120 168a38 38 0 01 4-76 52 52 0 01 100-14 34 34 0 11 10 90z"
          fill="#81a9e3"
        />
        <path
          d="M178 90l34 12v26c0 22-14 40-34 46-20-6-34-24-34-46v-26z"
          fill="#DAEBFF"
        />
        <motion.g
          animate={anim ? { scale: [1, 1.08, 1] } : undefined}
          style={{ transformOrigin: "178px 130px", transformBox: "view-box" }}
          transition={{ duration: 2.6, ...FLOAT }}
        >
          <rect x="166" y="122" width="24" height="20" rx="4" fill="#2A5088" />
          <path
            d="M171 122v-6a7 7 0 0114 0v6"
            stroke="#2A5088"
            strokeWidth="4"
            fill="none"
          />
          <circle cx="178" cy="131" r="3" fill="#DAEBFF" />
        </motion.g>
      </motion.g>

      {/* small sync cloud + folder */}
      <motion.g
        animate={anim ? { y: [0, -7, 0] } : undefined}
        transition={{ duration: 3.4, delay: 0.6, ...FLOAT }}
      >
        <path
          d="M262 190a20 20 0 012-40 27 27 0 0152-8 18 18 0 116 48z"
          fill="#DAEBFF"
        />
        <rect x="288" y="176" width="34" height="24" rx="4" fill="#49d4fc" />
        <path d="M288 180l8-8h10l4 4h12" fill="none" stroke="#2A5088" strokeWidth="2.5" />
        <motion.path
          d="M296 188h18m0 0l-5-5m5 5l-5 5"
          stroke="#2A5088"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={anim ? { x: [0, 4, 0], opacity: [1, 0.5, 1] } : undefined}
          transition={{ duration: 1.8, ...FLOAT }}
        />
      </motion.g>

      {/* password card */}
      <motion.g
        animate={anim ? { y: [0, -6, 0] } : undefined}
        transition={{ duration: 3.8, delay: 1.1, ...FLOAT }}
      >
        <rect x="66" y="248" width="112" height="64" rx="8" fill="#ffffff" stroke="#DAEBFF" strokeWidth="2" />
        <rect x="78" y="262" width="88" height="14" rx="4" fill="#DAEBFF" />
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.circle
            key={i}
            cx={90 + i * 13}
            cy={269}
            r={3}
            fill="#2A5088"
            animate={anim ? { opacity: [0.25, 1, 1, 0.25] } : undefined}
            transition={{
              duration: 2.4,
              delay: i * 0.18,
              times: [0, 0.25, 0.8, 1],
              ...FLOAT,
            }}
          />
        ))}
        <rect x="78" y="284" width="88" height="14" rx="4" fill="#DAEBFF" />
        <rect x="84" y="289" width="40" height="4" rx="2" fill="#3A70A9" />
      </motion.g>

      {/* browser window (top right) */}
      <motion.g
        animate={anim ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: 4.4, delay: 0.3, ...FLOAT }}
      >
        <rect x="428" y="76" width="150" height="110" rx="8" fill="#ffffff" />
        <rect x="428" y="76" width="150" height="22" rx="8" fill="#DAEBFF" />
        <circle cx="566" cy="87" r="5" fill="#49d4fc" />
        <rect x="440" y="108" width="126" height="34" rx="4" fill="#DAEBFF" />
        <rect x="440" y="150" width="58" height="10" rx="4" fill="#DAEBFF" />
        <rect x="506" y="150" width="60" height="10" rx="4" fill="#DAEBFF" />
        <rect x="440" y="166" width="126" height="10" rx="4" fill="#DAEBFF" opacity="0.7" />
      </motion.g>

      {/* Person at laptop */}
      <g>
        {/* chair */}
        <rect x="404" y="330" width="12" height="86" rx="6" fill="#1f3a5f" />
        <path d="M370 416h80" stroke="#1f3a5f" strokeWidth="10" strokeLinecap="round" />
        <circle cx="374" cy="424" r="6" fill="#1f3a5f" />
        <circle cx="446" cy="424" r="6" fill="#1f3a5f" />
        <rect x="428" y="252" width="20" height="96" rx="10" fill="#1f3a5f" />
        {/* legs (crossed) */}
        <path d="M418 340c-20 26-52 44-88 48l-4-16c32-6 60-20 78-42z" fill="#2A5088" />
        <path d="M330 384l-14 26 16 8 16-28z" fill="#2A5088" />
        <ellipse cx="318" cy="420" rx="16" ry="9" fill="#1f3a5f" />
        {/* torso */}
        <path d="M382 268c6-26 28-42 50-38 24 4 38 26 34 52l-10 62-70-8z" fill="#81a9e3" />
        {/* arm to laptop — hand taps as if typing */}
        <motion.g
          animate={anim ? { y: [0, -2.5, 0, -1.5, 0] } : undefined}
          transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M394 286c-16 16-38 28-64 32l4 16c28-4 52-18 70-38z" fill="#81a9e3" />
          <circle cx="332" cy="330" r="8" fill="#f0b592" />
        </motion.g>
        {/* key-tap sparks above the laptop keyboard */}
        {[300, 316].map((x, i) => (
          <motion.rect
            key={x}
            x={x}
            y={326}
            width="6"
            height="3"
            rx="1.5"
            fill="#49d4fc"
            initial={{ opacity: 0 }}
            animate={anim ? { opacity: [0, 1, 0], y: [0, -4, -7] } : undefined}
            transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
        {/* head — gentle focus nod */}
        <motion.g
          style={{ transformOrigin: "414px 240px", transformBox: "view-box" }}
          animate={anim ? { rotate: [-1.5, 1.5, -1.5], y: [0, -1.5, 0] } : undefined}
          transition={{ duration: 5, ...FLOAT }}
        >
          <circle cx="414" cy="212" r="27" fill="#f0b592" />
          <path
            d="M438 196c8-24-6-46-28-48-20-2-36 14-36 34 0 30-6 46-16 58 12 4 22 0 28-8 2 14-2 26-10 34 14 2 26-6 30-18 4 10 2 20-4 28 12 0 22-10 24-24 4-22 8-40 12-56z"
            fill="#1f3a5f"
          />
          <path d="M420 218c3 3 7 3 10 0" stroke="#c98a66" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </motion.g>
      </g>

      {/* Desk + laptop */}
      <rect x="150" y="346" width="330" height="13" rx="6" fill="#2A5088" />
      <rect x="176" y="359" width="11" height="102" fill="#2A5088" />
      <rect x="444" y="359" width="11" height="102" fill="#2A5088" />
      <g>
        <path d="M238 346l14-52c1-4 4-6 8-6h96c5 0 8 5 7 10l-13 48z" fill="#232a35" />
        {/* screen glow flickers softly while she works */}
        <motion.path
          d="M350 296l-12 44"
          stroke="#49d4fc"
          strokeWidth="3"
          strokeLinecap="round"
          animate={anim ? { opacity: [0.3, 0.8, 0.3] } : { opacity: 0.5 }}
          transition={{ duration: 3, ...FLOAT }}
        />
        <rect x="226" y="338" width="132" height="8" rx="4" fill="#1f3a5f" />
      </g>

      {/* drawers (left) */}
      <g>
        <rect x="60" y="352" width="104" height="108" rx="8" fill="#ffffff" stroke="#DAEBFF" strokeWidth="2" />
        {[366, 400, 434].map((y) => (
          <g key={y}>
            <rect x="72" y={y} width="80" height="22" rx="5" fill="#DAEBFF" />
            <rect x="100" y={y + 9} width="24" height="4" rx="2" fill="#3A70A9" />
          </g>
        ))}
      </g>

      {/* leafy accents */}
      <motion.g
        style={{ transformOrigin: "560px 420px", transformBox: "view-box" }}
        animate={anim ? { rotate: [-2, 2, -2] } : undefined}
        transition={{ duration: 5, ...FLOAT }}
      >
        <path
          d="M560 460c0-36 10-62 30-78M560 460c-2-24-10-42-24-52M560 452c8-18 20-28 34-32M560 440c-8-14-18-20-28-22"
          stroke="#3e9446"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </motion.g>
    </motion.svg>
  );
}
