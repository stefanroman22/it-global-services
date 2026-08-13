/**
 * Resolves arbitrary CMS contact_info entries into renderable cards.
 *
 * The CMS Key-Value editor accepts ANY keys the operator wants —
 * `phone`, `email`, `program`, `whatsapp`, `office_hours_friday`,
 * Romanian translations, anything. The website used to hardcode a
 * fixed set (phone/email/address/hours), so any unknown key was
 * silently dropped. This module replaces that with a heuristic
 * resolver:
 *
 *   1. If the VALUE looks like an email (contains `@`) → email card.
 *   2. If the VALUE looks like a phone number → phone card.
 *   3. If the KEY matches a known semantic family (address / hours /
 *      schedule / program / etc.) → that card type.
 *   4. Otherwise → generic info card with the key humanised.
 *
 * Every entry renders. No data is dropped. No naming convention is
 * imposed on the operator.
 */

export type ContactCard = {
  /** Original CMS key (kept for stable React keys + debugging). */
  key: string;
  /** Display label — humanised key OR canonical name for known families. */
  label: string;
  /** i18n key in the `contactCards` namespace for known families; callers
   *  translate via `t(labelKey)` and fall back to `label` when absent. */
  labelKey?: string;
  /** The CMS value as-typed by the operator. */
  value: string;
  /** Click target. `null` when the card is informational only. */
  href: string | null;
  /** Tailwind background class for the icon chip. */
  color: string;
  /** SVG path `d` string for the 24×24 viewbox icon. */
  iconPath: string;
};

// ── Icon path data (stroked, 24×24 viewbox) ─────────────────────────────────

const ICON_PHONE =
  "M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38278L7.96701 10.5114C9.06925 12.9728 11.0272 14.9307 13.4886 16.033L14.6172 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z";
const ICON_EMAIL =
  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
const ICON_PIN =
  "M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z";
const ICON_CLOCK = "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z";
const ICON_GLOBE =
  "M3.6 9h16.8 M3.6 15h16.8 M11.5 3a17 17 0 000 18 M12.5 3a17 17 0 010 18 M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
const ICON_INFO = "M12 8v4 M12 16h.01 M12 22a10 10 0 110-20 10 10 0 010 20z";

// ── Heuristics ──────────────────────────────────────────────────────────────

/** Loose phone match: 6+ digit-y chars, optional leading + and separators. */
const PHONE_RE = /^\+?[\d\s().-]{6,}$/;

/** Email — anything with an `@` and a `.` after it. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Word stems that hint at a particular contact-card family. Keys are
 * lowercased + stripped of underscores/dashes before matching, so
 * `office_hours`, `Office-Hours`, `OFFICEHOURS` all match `hour`.
 */
const KEY_FAMILIES: Array<{ stems: string[]; label: string; labelKey: string; iconPath: string; color: string }> = [
  {
    stems: ["address", "location", "adres", "adresa", "office", "headquarter"],
    label: "Visit Us",
    labelKey: "visitUs",
    iconPath: ICON_PIN,
    color: "bg-[#fc1717]",
  },
  {
    stems: ["hour", "schedule", "program", "time", "open", "when", "orar"],
    label: "Business Hours",
    labelKey: "businessHours",
    iconPath: ICON_CLOCK,
    color: "bg-[#2A5088]",
  },
  {
    stems: ["website", "site", "url", "web"],
    label: "Website",
    labelKey: "website",
    iconPath: ICON_GLOBE,
    color: "bg-[#666]",
  },
  {
    stems: ["phone", "tel", "mobile", "telefon", "cellular"],
    label: "Call Us",
    labelKey: "callUs",
    iconPath: ICON_PHONE,
    color: "bg-[#2A5088]",
  },
  {
    stems: ["email", "mail", "e-mail"],
    label: "Email Us",
    labelKey: "emailUs",
    iconPath: ICON_EMAIL,
    color: "bg-[#3e9446]",
  },
];

function normaliseKey(key: string): string {
  return key.toLowerCase().replace(/[_\-\s]+/g, "");
}

function humaniseKey(key: string): string {
  return key
    .replace(/[_\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function matchKeyFamily(key: string): (typeof KEY_FAMILIES)[number] | null {
  const norm = normaliseKey(key);
  for (const family of KEY_FAMILIES) {
    if (family.stems.some((stem) => norm.includes(stem))) return family;
  }
  return null;
}

// ── Resolver ────────────────────────────────────────────────────────────────

export function resolveContactCard(key: string, value: string): ContactCard {
  const trimmedValue = value.trim();

  // (1) Value-shape wins — `email_friday` with a phone number in it
  // becomes a phone card, not an email card.
  if (EMAIL_RE.test(trimmedValue)) {
    return {
      key,
      label: "Email Us",
      labelKey: "emailUs",
      value: trimmedValue,
      href: `mailto:${trimmedValue}`,
      color: "bg-[#3e9446]",
      iconPath: ICON_EMAIL,
    };
  }
  if (PHONE_RE.test(trimmedValue)) {
    return {
      key,
      label: "Call Us",
      labelKey: "callUs",
      value: trimmedValue,
      href: `tel:${trimmedValue.replace(/\s/g, "")}`,
      color: "bg-[#2A5088]",
      iconPath: ICON_PHONE,
    };
  }

  // (2) Key-name family matching — `program`, `hours`, `address`,
  // `website`, etc.
  const family = matchKeyFamily(key);
  if (family) {
    let href: string | null = null;
    if (family.label === "Visit Us") {
      href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trimmedValue)}`;
    } else if (family.label === "Website" && /^https?:\/\//.test(trimmedValue)) {
      href = trimmedValue;
    }
    return {
      key,
      label: family.label,
      labelKey: family.labelKey,
      value: trimmedValue,
      href,
      color: family.color,
      iconPath: family.iconPath,
    };
  }

  // (3) Fallback — informational card with the humanised key as label.
  return {
    key,
    label: humaniseKey(key),
    value: trimmedValue,
    href: null,
    color: "bg-[#666]",
    iconPath: ICON_INFO,
  };
}

/** Brand color cycle for unknown-key fallback cards. */
const FALLBACK_COLORS = ["bg-[#2A5088]", "bg-[#3e9446]", "bg-[#fc1717]"];

/**
 * Resolve every CMS entry into a card. Accepts both the legacy array
 * shape `[{key, value}, …]` and the modern object shape `{key: value}`.
 * Skips entries with empty keys or empty values (they would render
 * blank cards otherwise).
 */
export function resolveContactCards(
  entries: Record<string, unknown> | Array<{ key?: unknown; value?: unknown }> | undefined | null
): ContactCard[] {
  if (!entries) return [];

  const pairs: Array<[string, string]> = [];
  if (Array.isArray(entries)) {
    for (const item of entries) {
      if (!item || typeof item !== "object") continue;
      const k = (item as { key?: unknown }).key;
      const v = (item as { value?: unknown }).value;
      if (typeof k === "string" && typeof v === "string" && k.trim() && v.trim()) {
        pairs.push([k.trim(), v]);
      }
    }
  } else {
    for (const [k, v] of Object.entries(entries)) {
      if (typeof k === "string" && typeof v === "string" && k.trim() && v.trim()) {
        pairs.push([k.trim(), v]);
      }
    }
  }

  // Cycle brand colors across unknown-key fallback cards so they stay
  // on-palette instead of all rendering as gray.
  let fallbackIdx = 0;
  return pairs.map(([k, v]) => {
    const card = resolveContactCard(k, v);
    if (card.color === "bg-[#666]" && card.iconPath === ICON_INFO) {
      card.color = FALLBACK_COLORS[fallbackIdx % FALLBACK_COLORS.length];
      fallbackIdx++;
    }
    return card;
  });
}
