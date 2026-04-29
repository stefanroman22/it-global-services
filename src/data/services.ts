/**
 * Service catalog type — matches CMS `services_catalog` repeater item shape.
 *
 * Items are fetched from the CMS via `getCmsData()` in `src/lib/cms.ts`.
 * The hand-written array that previously lived here is gone; the icon SVG
 * paths now live in `service-icons.ts` keyed by slug, since SVG paths are
 * not safely client-editable through the CMS.
 */
export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  /** Resolved icon SVG path, looked up from service-icons.ts by slug. */
  icon: string;
}

import type { ServiceCatalogItem } from "@/lib/cms";
import { iconFor } from "./service-icons";

/** Adapt a CMS catalog item to the legacy `Service` shape used by components. */
export function toService(item: ServiceCatalogItem): Service {
  return {
    slug: item.slug,
    title: item.title,
    shortDescription: item.short_description,
    fullDescription: item.full_description,
    features: item.features ?? [],
    icon: iconFor(item.slug),
  };
}
