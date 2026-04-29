/**
 * CMS data fetcher for it-global-services.
 *
 * Uses the public CMS content endpoint at NEXT_PUBLIC_CMS_ENDPOINT
 * (set on Vercel: prod → /content/it-global-services, preview →
 * /content/it-global-services/draft). Preview also sends the
 * NEXT_PUBLIC_CMS_PREVIEW_TOKEN as Bearer authorisation.
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
  last_updated: string | null;
  content: Record<string, CmsService>;
}

/** Fetches the entire CMS manifest. ISR cached for 60s. */
export async function getCmsData(): Promise<CmsContent> {
  if (!ENDPOINT) {
    throw new Error(
      "NEXT_PUBLIC_CMS_ENDPOINT env var is not set. Configure it on Vercel.",
    );
  }

  const res = await fetch(ENDPOINT, {
    headers: PREVIEW_TOKEN ? { Authorization: `Bearer ${PREVIEW_TOKEN}` } : {},
    next: { revalidate: 60 },
  });

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

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
}

export function contactInfo(content: CmsContent): ContactInfo {
  return (keyValue(content, "contact_info").entries ?? {}) as ContactInfo;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export function keyFeatures(content: CmsContent): KeyFeature[] {
  return repeater<KeyFeature>(content, "key_features").items;
}

export interface ServiceCatalogItem {
  slug: string;
  title: string;
  short_description: string;
  full_description: string;
  features: string[];
}

export function servicesCatalog(content: CmsContent): ServiceCatalogItem[] {
  return repeater<ServiceCatalogItem>(content, "services_catalog").items;
}
