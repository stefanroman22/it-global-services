"use client";

import type { ReactElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { SceneKey } from "@/data/scenes";

/**
 * Looping SVG micro-scenes that illustrate each service / feature.
 *
 * All scenes draw with `currentColor` so the parent sets the color, and
 * every animation is disabled under `prefers-reduced-motion` (the scene
 * renders as a static icon instead — content never depends on motion).
 */

interface P {
  /** false → render the static first frame (reduced motion). */
  anim: boolean;
}

/** Shared helper for rotations around a viewBox point. */
const spinStyle = (cx: number, cy: number) =>
  ({
    transformOrigin: `${cx}px ${cy}px`,
    transformBox: "view-box",
  }) as const;

const LOOP = { repeat: Infinity, ease: "easeInOut" as const };

function ComputerRepairScene({ anim }: P) {
  return (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M3 20h18" />
      {/* Check mark drawing on the screen, then fading */}
      <motion.path
        d="M8.5 11l2.4 2.4L15.5 9"
        strokeWidth={1.8}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          anim
            ? { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
            : { pathLength: 1, opacity: 1 }
        }
        transition={anim ? { duration: 3.6, times: [0.1, 0.4, 0.8, 1], ...LOOP } : undefined}
      />
      {/* Wrench nudging at the corner */}
      <motion.g
        style={spinStyle(19, 16)}
        animate={anim ? { rotate: [-14, 14, -14] } : undefined}
        transition={anim ? { duration: 2.4, ...LOOP } : undefined}
      >
        <path d="M16.7 18.7l2.9-2.9M19.6 15.8a1.9 1.9 0 10.9-3.2l-1.4 1.4-1-1 1.4-1.4a1.9 1.9 0 00-3.2.9" />
      </motion.g>
    </>
  );
}

function ScreenRepairScene({ anim }: P) {
  return (
    <>
      <rect x="3" y="4" width="18" height="13" rx="1.5" />
      <path d="M9 21h6M12 17v4" />
      {/* Crack that heals */}
      <motion.path
        d="M9 6l2.5 3-1.5 2 2.5 3"
        animate={anim ? { opacity: [1, 1, 0, 0, 1] } : { opacity: 0 }}
        transition={anim ? { duration: 4.5, times: [0, 0.4, 0.55, 0.9, 1], ...LOOP } : undefined}
      />
      {/* Sparkle when healed */}
      <motion.path
        d="M15.5 8.5v3M14 10h3"
        strokeWidth={1.8}
        initial={{ opacity: 0, scale: 0.4 }}
        style={spinStyle(15.5, 10)}
        animate={anim ? { opacity: [0, 0, 1, 0], scale: [0.4, 0.4, 1, 0.6] } : { opacity: 1, scale: 1 }}
        transition={anim ? { duration: 4.5, times: [0, 0.55, 0.7, 0.9], ...LOOP } : undefined}
      />
    </>
  );
}

function KeyboardScene({ anim }: P) {
  const keys = [
    { x: 6.2, delay: 0 },
    { x: 10.7, delay: 0.45 },
    { x: 15.2, delay: 0.9 },
  ];
  return (
    <>
      <rect x="2.5" y="7" width="19" height="10" rx="1.5" />
      <path d="M7 14.5h10" />
      {keys.map((k) => (
        <motion.rect
          key={k.x}
          x={k.x}
          y={9.2}
          width="2.6"
          height="2.6"
          rx="0.6"
          animate={anim ? { y: [9.2, 10.1, 9.2] } : undefined}
          transition={anim ? { duration: 1.6, delay: k.delay, ...LOOP } : undefined}
        />
      ))}
    </>
  );
}

function MouseScene({ anim }: P) {
  return (
    <>
      <rect x="8" y="4" width="8" height="16" rx="4" />
      <path d="M12 7v3" />
      {/* Click ripples */}
      {[0, 1].map((i) => (
        <motion.circle
          key={i}
          cx="12"
          cy="5.5"
          r="5"
          initial={{ opacity: 0, scale: 0.4 }}
          style={spinStyle(12, 5.5)}
          animate={anim ? { opacity: [0.7, 0], scale: [0.4, 1.3] } : { opacity: 0 }}
          transition={
            anim
              ? { duration: 2.2, delay: i * 1.1, repeat: Infinity, ease: "easeOut" }
              : undefined
          }
        />
      ))}
    </>
  );
}

function WindowsInstallScene({ anim }: P) {
  const panes = [
    { x: 5, y: 4, delay: 0 },
    { x: 13, y: 4, delay: 0.3 },
    { x: 5, y: 10.5, delay: 0.6 },
    { x: 13, y: 10.5, delay: 0.9 },
  ];
  return (
    <>
      {panes.map((p) => (
        <motion.rect
          key={`${p.x}-${p.y}`}
          x={p.x}
          y={p.y}
          width="6"
          height="5"
          rx="0.8"
          style={spinStyle(p.x + 3, p.y + 2.5)}
          initial={{ opacity: 0.3, scale: 0.85 }}
          animate={anim ? { opacity: [0.3, 1, 1, 0.3], scale: [0.85, 1, 1, 0.85] } : { opacity: 1, scale: 1 }}
          transition={anim ? { duration: 4, delay: p.delay, times: [0, 0.2, 0.8, 1], ...LOOP } : undefined}
        />
      ))}
      {/* Progress bar */}
      <rect x="5" y="18.5" width="14" height="2.4" rx="1.2" />
      <motion.rect
        x="5"
        y="18.5"
        height="2.4"
        rx="1.2"
        fill="currentColor"
        stroke="none"
        initial={{ width: 2 }}
        animate={anim ? { width: [2, 14, 14, 2] } : { width: 14 }}
        transition={anim ? { duration: 4, times: [0, 0.7, 0.95, 1], repeat: Infinity, ease: "linear" } : undefined}
      />
    </>
  );
}

function NetworkScene({ anim }: P) {
  return (
    <>
      <path d="M12 6.5L5.5 17M12 6.5L18.5 17M5.5 17h13" opacity={0.6} />
      <circle cx="12" cy="5.5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      {/* Packet traveling the triangle */}
      <motion.circle
        r="1.1"
        fill="currentColor"
        stroke="none"
        initial={{ cx: 12, cy: 5.5 }}
        animate={anim ? { cx: [12, 5, 19, 12], cy: [5.5, 18, 18, 5.5] } : { cx: 12, cy: 5.5 }}
        transition={anim ? { duration: 4.2, repeat: Infinity, ease: "linear" } : undefined}
      />
    </>
  );
}

function SecurityScene({ anim }: P) {
  return (
    <>
      <path d="M12 3l7 2.8v5.4c0 4.5-3 8.6-7 9.8-4-1.2-7-5.3-7-9.8V5.8L12 3z" />
      {/* Scan line sweeping */}
      <motion.path
        d="M7.5 10h9"
        strokeWidth={1.2}
        animate={anim ? { y: [-2.5, 4.5, -2.5], opacity: [0.2, 0.9, 0.2] } : { opacity: 0 }}
        transition={anim ? { duration: 3, ...LOOP } : undefined}
      />
      <motion.path
        d="M9.2 11.5l2 2 3.6-3.8"
        strokeWidth={1.8}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={anim ? { pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] } : { pathLength: 1, opacity: 1 }}
        transition={anim ? { duration: 6, times: [0, 0.5, 0.65, 0.9, 1], ...LOOP } : undefined}
      />
    </>
  );
}

function CloudScene({ anim }: P) {
  return (
    <>
      <path d="M6.5 18a3.5 3.5 0 01-.4-7A5 5 0 0116 9.5 4 4 0 0116 18H6.5z" />
      {/* Upload / download alternating */}
      <motion.path
        d="M10 14.5v-3.2M8.8 12.5l1.2-1.2 1.2 1.2"
        animate={anim ? { opacity: [1, 1, 0, 0, 1], y: [0.6, -0.6, -0.6, 0.6, 0.6] } : undefined}
        transition={anim ? { duration: 3.2, times: [0, 0.4, 0.5, 0.9, 1], ...LOOP } : undefined}
      />
      <motion.path
        d="M14 11.3v3.2M12.8 13.3l1.2 1.2 1.2-1.2"
        animate={anim ? { opacity: [0, 0, 1, 1, 0], y: [-0.6, -0.6, 0.6, -0.6, -0.6] } : undefined}
        transition={anim ? { duration: 3.2, times: [0, 0.4, 0.5, 0.9, 1], ...LOOP } : undefined}
      />
    </>
  );
}

function BackupScene({ anim }: P) {
  return (
    <>
      <rect x="4" y="14.5" width="16" height="6" rx="1.5" />
      <path d="M7.5 17.5h.01M11 17.5h2" />
      {/* Circular arrows orbiting above the drive */}
      <motion.g
        style={spinStyle(12, 8.5)}
        animate={anim ? { rotate: 360 } : undefined}
        transition={anim ? { duration: 4, repeat: Infinity, ease: "linear" } : undefined}
      >
        <path d="M8.8 8.5a3.2 3.2 0 015.5-2.2M15.2 8.5a3.2 3.2 0 01-5.5 2.2" />
        <path d="M14.5 5v1.6H13M9.5 12v-1.6H11" />
      </motion.g>
    </>
  );
}

function PhoneSupportScene({ anim }: P) {
  return (
    <>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4h2l1.2 3.6-1.8 1a10.4 10.4 0 004.5 4.5l1-1.8L16 12.5v2c0 .8-.7 1.5-1.5 1.5h-.8C8 16 4 12 4 6.3v-.8z" />
      {/* Radiating waves */}
      {[0, 1].map((i) => (
        <motion.path
          key={i}
          d={i === 0 ? "M15.5 6.5a4 4 0 012 2" : "M16.5 3.5a7 7 0 013.9 3.9"}
          animate={anim ? { opacity: [0.15, 1, 0.15] } : undefined}
          transition={anim ? { duration: 2, delay: i * 0.35, ...LOOP } : undefined}
        />
      ))}
    </>
  );
}

function HardwareScene({ anim }: P) {
  const pins = [
    "M9 4.5V2.5",
    "M15 4.5V2.5",
    "M9 21.5v-2",
    "M15 21.5v-2",
    "M4.5 9h-2",
    "M4.5 15h-2",
    "M21.5 9h-2",
    "M21.5 15h-2",
  ];
  return (
    <>
      <rect x="5.5" y="5.5" width="13" height="13" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" />
      {pins.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          animate={anim ? { opacity: [0.25, 1, 0.25] } : undefined}
          transition={anim ? { duration: 2.4, delay: (i % 4) * 0.3, ...LOOP } : undefined}
        />
      ))}
    </>
  );
}

function HostingScene({ anim }: P) {
  return (
    <>
      <rect x="4" y="4.5" width="16" height="6" rx="1.2" />
      <rect x="4" y="13.5" width="16" height="6" rx="1.2" />
      <path d="M12.5 7.5h4M12.5 16.5h4" opacity={0.6} />
      {/* Blinking LEDs */}
      {[
        { cy: 7.5, delay: 0 },
        { cy: 16.5, delay: 0.8 },
      ].map((led) => (
        <motion.circle
          key={led.cy}
          cx="7.5"
          cy={led.cy}
          r="1"
          fill="currentColor"
          stroke="none"
          animate={anim ? { opacity: [0.2, 1, 0.2] } : undefined}
          transition={anim ? { duration: 1.6, delay: led.delay, ...LOOP } : undefined}
        />
      ))}
    </>
  );
}

function ConsultingScene({ anim }: P) {
  const rays = ["M12 2.5V4", "M5.6 5.6l1.1 1.1", "M18.4 5.6l-1.1 1.1", "M3.5 12H5", "M19 12h1.5"];
  return (
    <>
      <path d="M9.5 17h5M10.5 20h3" />
      <path d="M8.2 13.8a5.2 5.2 0 117.6 0c-.9.9-1.3 1.6-1.3 3.2h-5c0-1.6-.4-2.3-1.3-3.2z" />
      {rays.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          animate={anim ? { opacity: [0.2, 1, 0.2] } : undefined}
          transition={anim ? { duration: 2.2, delay: i * 0.25, ...LOOP } : undefined}
        />
      ))}
    </>
  );
}

function SpeedScene({ anim }: P) {
  return (
    <>
      <motion.path
        d="M13.5 9.5V3.5L5 14h5.5v6.5L19 10h-5.5z"
        style={spinStyle(12, 12)}
        animate={anim ? { scale: [1, 1.07, 1] } : undefined}
        transition={anim ? { duration: 1.8, ...LOOP } : undefined}
      />
      {[
        { d: "M2.5 8.5h3.5", delay: 0 },
        { d: "M1.5 12.5h3", delay: 0.3 },
        { d: "M2.5 16.5h3.5", delay: 0.6 },
      ].map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          animate={anim ? { opacity: [0, 1, 0], x: [1.5, -1.5, 1.5] } : { opacity: 0.6 }}
          transition={anim ? { duration: 1.8, delay: l.delay, ...LOOP } : undefined}
        />
      ))}
    </>
  );
}

function ClockScene({ anim }: P) {
  return (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 12l3.2 1.9" />
      {/* Minute hand sweeping */}
      <motion.path
        d="M12 12V6.8"
        style={spinStyle(12, 12)}
        animate={anim ? { rotate: 360 } : undefined}
        transition={anim ? { duration: 8, repeat: Infinity, ease: "linear" } : undefined}
      />
    </>
  );
}

function CertificateScene({ anim }: P) {
  return (
    <>
      <motion.g
        style={spinStyle(12, 10)}
        animate={anim ? { rotate: [-5, 5, -5] } : undefined}
        transition={anim ? { duration: 3, ...LOOP } : undefined}
      >
        <circle cx="12" cy="10" r="5.5" />
        <path d="M9.8 10l1.5 1.5 3-3.2" strokeWidth={1.8} />
      </motion.g>
      <path d="M9 14.8L7.5 21l4.5-2.4L16.5 21 15 14.8" />
    </>
  );
}

function PricingScene({ anim }: P) {
  return (
    <motion.g
      style={{ transformOrigin: "7px 7px", transformBox: "view-box" } as const}
      animate={anim ? { rotate: [-7, 7, -7] } : undefined}
      transition={anim ? { duration: 2.6, ...LOOP } : undefined}
    >
      <path d="M12.6 3.5H6a2.5 2.5 0 00-2.5 2.5v6.6c0 .66.26 1.3.73 1.77l7.4 7.4a2.5 2.5 0 003.54 0l6.06-6.06a2.5 2.5 0 000-3.54l-7.4-7.4a2.5 2.5 0 00-1.77-.73z" />
      <circle cx="8.5" cy="8.5" r="1.2" />
    </motion.g>
  );
}

function GrowthScene({ anim }: P) {
  return (
    <>
      <path d="M3.5 4v16h17" opacity={0.6} />
      <motion.path
        d="M6 16.5l4-4.5 3 2.8 6-6.8"
        initial={{ pathLength: 0 }}
        animate={anim ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
        transition={anim ? { duration: 3.2, times: [0, 0.6, 1], ...LOOP } : undefined}
      />
      <motion.path
        d="M15.5 7.5H19V11"
        initial={{ opacity: 0 }}
        animate={anim ? { opacity: [0, 0, 1, 1] } : { opacity: 1 }}
        transition={anim ? { duration: 3.2, times: [0, 0.5, 0.7, 1], ...LOOP } : undefined}
      />
    </>
  );
}

function GearScene({ anim }: P) {
  return (
    <>
      <motion.g
        style={spinStyle(12, 12)}
        animate={anim ? { rotate: 360 } : undefined}
        transition={anim ? { duration: 9, repeat: Infinity, ease: "linear" } : undefined}
      >
        <path d="M12 4.5l1 2.1 2.3-.5 .4 2.3 2.3 .4-.5 2.3 2.1 1-2.1 1 .5 2.3-2.3 .4-.4 2.3-2.3-.5-1 2.1-1-2.1-2.3 .5-.4-2.3-2.3-.4 .5-2.3-2.1-1 2.1-1-.5-2.3 2.3-.4 .4-2.3 2.3 .5z" />
      </motion.g>
      <circle cx="12" cy="12" r="2.6" />
    </>
  );
}

const SCENES: Record<SceneKey, (p: P) => ReactElement> = {
  "computer-repair": ComputerRepairScene,
  "screen-repair": ScreenRepairScene,
  keyboard: KeyboardScene,
  mouse: MouseScene,
  "windows-install": WindowsInstallScene,
  network: NetworkScene,
  security: SecurityScene,
  cloud: CloudScene,
  backup: BackupScene,
  "phone-support": PhoneSupportScene,
  hardware: HardwareScene,
  hosting: HostingScene,
  consulting: ConsultingScene,
  speed: SpeedScene,
  clock: ClockScene,
  certificate: CertificateScene,
  pricing: PricingScene,
  growth: GrowthScene,
  gear: GearScene,
};

interface ServiceSceneProps {
  scene: SceneKey;
  size?: number;
  className?: string;
}

/** Renders a looping animated scene (decorative — always aria-hidden). */
export default function ServiceScene({
  scene,
  size = 32,
  className = "",
}: ServiceSceneProps) {
  const reduced = useReducedMotion();
  const Scene = SCENES[scene] ?? SCENES.gear;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <Scene anim={!reduced} />
    </svg>
  );
}
