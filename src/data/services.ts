/**
 * Service catalog type — matches CMS `services_catalog` repeater item shape.
 *
 * Items are fetched from the CMS via `getCmsData()` in `src/lib/cms.ts`.
 * Cards render an animated scene (see `src/components/ui/ServiceScene.tsx`)
 * resolved from the CMS-selected `animation` field with slug/title keyword
 * fallbacks — so a brand-new service added in the dashboard gets a fitting
 * animation with zero code changes.
 */
import type { SceneKey } from "@/data/scenes";
import { serviceScene } from "@/data/scenes";
import type { ServiceCatalogItem } from "@/lib/cms";

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  /** Resolved animated scene key (CMS `animation` field or keyword match). */
  scene: SceneKey;
}

/** Adapt a CMS catalog item to the `Service` shape used by components. */
export function toService(item: ServiceCatalogItem): Service {
  return {
    slug: item.slug,
    title: item.title,
    shortDescription: item.short_description,
    fullDescription: item.full_description,
    features: item.features ?? [],
    scene: serviceScene(item.animation, item.slug, item.title),
  };
}
