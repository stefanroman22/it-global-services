/**
 * CMS data fetcher for it-global-services.
 *
 * Uses the public CMS content endpoint at NEXT_PUBLIC_CMS_ENDPOINT
 * (set on Vercel: prod → /content/it-global-services, preview →
 * /content/it-global-services/draft). Preview sends the
 * NEXT_PUBLIC_CMS_PREVIEW_TOKEN via the X-CMS-Preview-Token header.
 *
 * Language support: the Roman Technologies CMS serves per-locale manifests
 * at /content/<slug>/<locale> (draft: /content/<slug>/<locale>/draft).
 * `getCmsData(locale)` requests the localized manifest and falls back to
 * the default-locale endpoint when that locale is not enabled yet in the
 * CMS (the backend answers 404 "Locale not configured"), so the site keeps
 * rendering while languages are being rolled out in the dashboard.
 *
 * Each Server Component imports `getCmsData()` to fetch all services in one
 * round trip; Next.js' fetch cache + ISR (revalidate=60) keeps it cheap.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_CMS_ENDPOINT;
const PREVIEW_TOKEN = process.env.NEXT_PUBLIC_CMS_PREVIEW_TOKEN;

export interface CmsTextBlock {
  _type: "text_block";
  _label?: string;
  title?: string;
  body?: string;
}

export interface CmsImage {
  _type: "image";
  _label?: string;
  url?: string;
  alt?: string;
}

export interface CmsKeyValue {
  _type: "key_value";
  _label?: string;
  entries?: Record<string, unknown>;
}

export interface CmsRepeater<T = Record<string, unknown>> {
  _type: "repeater";
  _label?: string;
  _schema?: { key: string; label: string; type: string }[];
  items: T[];
}

export interface CmsEmailConfig {
  _type: "email_config";
  _label?: string;
  destination_email?: string;
}

export type CmsService =
  | CmsTextBlock
  | CmsImage
  | CmsKeyValue
  | CmsRepeater
  | CmsEmailConfig;

export interface CmsContent {
  project_slug: string;
  project_name: string;
  locale?: string;
  last_updated: string | null;
  content: Record<string, CmsService>;
}

/** Splits the env endpoint into its base URL and preview flag.
 *  The env var is the FULL default-locale URL (optionally ending in /draft);
 *  localized URLs are derived from it, keeping existing Vercel env vars
 *  working unchanged. */
function endpointParts(): { base: string; preview: boolean } {
  if (!ENDPOINT) {
    throw new Error(
      "NEXT_PUBLIC_CMS_ENDPOINT env var is not set. Configure it on Vercel.",
    );
  }
  const preview = ENDPOINT.endsWith("/draft");
  const base = preview ? ENDPOINT.slice(0, -"/draft".length) : ENDPOINT;
  return { base, preview };
}

async function fetchManifest(url: string, preview: boolean): Promise<Response> {
  return fetch(url, {
    headers:
      preview && PREVIEW_TOKEN ? { "X-CMS-Preview-Token": PREVIEW_TOKEN } : {},
    // Preview/draft → always fresh. Production → 60s ISR cache.
    cache: preview ? "no-store" : undefined,
    next: preview ? undefined : { revalidate: 60 },
  });
}

/** Fetches the CMS manifest for a locale (falls back to the default-locale
 *  manifest when the locale is not enabled in the CMS). ISR cached for 60s. */
export async function getCmsData(locale?: string): Promise<CmsContent> {
  const { base, preview } = endpointParts();

  if (locale) {
    const localizedUrl = `${base}/${locale}${preview ? "/draft" : ""}`;
    const res = await fetchManifest(localizedUrl, preview);
    if (res.ok) return (await res.json()) as CmsContent;
    if (res.status !== 404) {
      throw new Error(`CMS fetch failed: ${res.status} ${res.statusText}`);
    }
    // 404 → locale not configured in the CMS yet; fall through to default.
  }

  const res = await fetchManifest(ENDPOINT as string, preview);
  if (!res.ok) {
    throw new Error(`CMS fetch failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as CmsContent;
}

// ── Typed accessors ──────────────────────────────────────────────────────────

export function textBlock(content: CmsContent, key: string): CmsTextBlock {
  const svc = content.content[key];
  if (!svc || svc._type !== "text_block") return { _type: "text_block" };
  return svc;
}

export function image(content: CmsContent, key: string): CmsImage {
  const svc = content.content[key];
  if (!svc || svc._type !== "image") return { _type: "image" };
  return svc;
}

export function keyValue(content: CmsContent, key: string): CmsKeyValue {
  const svc = content.content[key];
  if (!svc || svc._type !== "key_value") return { _type: "key_value" };
  return svc;
}

export function repeater<T = Record<string, unknown>>(
  content: CmsContent,
  key: string,
): CmsRepeater<T> {
  const svc = content.content[key];
  if (!svc || svc._type !== "repeater") {
    return { _type: "repeater", items: [] as T[] };
  }
  return svc as CmsRepeater<T>;
}

// ── Domain types layered over generic shapes ─────────────────────────────────

/**
 * `ContactInfo` is intentionally a free-form record now.
 *
 * The previous shape pinned four named keys (phone/email/address/
 * hours), so anything the operator typed outside that set was
 * dropped on the floor. The contact section now renders WHATEVER
 * keys exist via `resolveContactCards` (see `lib/contactFields.ts`),
 * so the operator gets a usable card for every entry without having
 * to memorise our naming convention.
 */
export type ContactInfo = Record<string, string>;

export function contactInfo(content: CmsContent): ContactInfo {
  const entries = keyValue(content, "contact_info").entries;
  if (!entries) return {};
  // Pre-flatten the legacy array shape ({key,value}[]) to the modern
  // object shape so callers downstream can treat it uniformly. The
  // backend `_normalise_published` helper does this server-side too;
  // duplicating it client-side is cheap and keeps the type honest if
  // a stale CDN cache or older deploy serves the array form.
  if (Array.isArray(entries)) {
    const out: Record<string, string> = {};
    for (const item of entries as Array<{ key?: unknown; value?: unknown }>) {
      const k = item?.key;
      const v = item?.value;
      if (typeof k === "string" && typeof v === "string" && k.trim()) {
        out[k.trim()] = v;
      }
    }
    return out;
  }
  // Object case — coerce values to strings (CMS sometimes serialises
  // numbers; downstream resolver only handles string values).
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(entries as Record<string, unknown>)) {
    if (v != null) out[k] = String(v);
  }
  return out;
}

export interface KeyFeature {
  title: string;
  description: string;
  /** Optional CMS-selected animation scene for the feature card
   *  (see `src/data/scenes.ts` for the predefined set). */
  animation?: string;
}

export function keyFeatures(content: CmsContent): KeyFeature[] {
  return repeater<KeyFeature>(content, "key_features").items;
}

export interface ServiceCatalogItem {
  /** Stable CMS item id (present on newer manifests; used to match the
   *  same service across locales when slugs are translated). */
  _id?: string;
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  features: string[];
  /** Optional CMS-selected animation scene for the service card
   *  (see `src/data/scenes.ts` for the predefined set). */
  animation?: string;
}

export function servicesCatalog(content: CmsContent): ServiceCatalogItem[] {
  return repeater<ServiceCatalogItem>(content, "services_catalog").items;
}
