/**
 * CMS display options (ADR-0013) for this site's pages.
 *
 * Each page has one `<page>_page_options` service in the CMS. The defaults
 * below are what the page renders when the service (or one value) is missing,
 * so the site never depends on the CMS for its layout.
 */
import type { CSSProperties } from "react";
import type { CmsContent } from "@/lib/cms";
import { contrastRatio, inkOn, readOptions } from "@/lib/cms-rich-text";

/** How wide the text of a page runs. Banner images keep their designed width.
 *  narrow   — reading column inside the standard container (the original look)
 *  standard — text spans the standard container
 *  wide     — text container up to 1600px
 *  full     — text container spans the screen */
export type ContentWidth = "narrow" | "standard" | "wide" | "full";

export const SERVICE_PAGE_DEFAULTS = {
  background: "",
  card_background: "",
  content_width: "wide",
};

export const ABOUT_PAGE_DEFAULTS = {
  background: "",
  card_background: "",
  content_width: "wide",
  /** top | left | right | hidden */
  image_position: "top",
};

export const CONTACT_PAGE_DEFAULTS = {
  background: "",
  card_background: "",
  content_width: "standard",
  /** split (map + details left, form right) | stacked (details card, form below) */
  layout: "split",
  show_map: true,
};

export type ServicePageOptions = typeof SERVICE_PAGE_DEFAULTS;
export type AboutPageOptions = typeof ABOUT_PAGE_DEFAULTS;
export type ContactPageOptions = typeof CONTACT_PAGE_DEFAULTS;

export function servicePageOptions(cms: CmsContent): ServicePageOptions {
  return readOptions(cms.content.services_page_options, SERVICE_PAGE_DEFAULTS);
}

export function aboutPageOptions(cms: CmsContent): AboutPageOptions {
  return readOptions(cms.content.about_page_options, ABOUT_PAGE_DEFAULTS);
}

export function contactPageOptions(cms: CmsContent): ContactPageOptions {
  return readOptions(cms.content.contact_page_options, CONTACT_PAGE_DEFAULTS);
}

/** Container class for a page's text blocks. */
export function contentContainerClass(width: string): string {
  if (width === "wide") return "container-wide";
  if (width === "full") return "container-full";
  return "container-main";
}

/** Reading-column cap for flowing text: only the `narrow` width keeps it. */
export function proseColumnClass(width: string): string {
  return width === "narrow" ? "max-w-3xl" : "";
}

/** The light theme's `--ink` (globals.css). */
const SITE_INK = "#074285";

/** The site ink when it stays readable (4.5:1) on `background`, else black or white. */
function readableInk(background: string): string {
  return contrastRatio(background, SITE_INK) >= 4.5 ? SITE_INK : inkOn(background);
}

/** `--surface-card-softer` (white at 60%) painted over `background`. */
function softCardOver(background: string): string {
  const channel = (i: number) =>
    Math.round(255 * 0.6 + parseInt(background.slice(i, i + 2), 16) * 0.4)
      .toString(16)
      .padStart(2, "0");
  return `#${channel(1)}${channel(3)}${channel(5)}`;
}

/** Class + CSS variables that apply the client's colours to a page wrapper.
 *  Put both on the `.page-*` element and mark each customisable card with
 *  `page-card`. Light theme only — see "Client-chosen page colours" in
 *  globals.css. */
export function pageSurface(options: {
  background: string;
  card_background: string;
}): { className: string; style: CSSProperties } {
  const { background, card_background: card } = options;
  const classes: string[] = [];
  const vars: Record<string, string> = {};
  if (background) {
    classes.push("page-custom-bg");
    vars["--page-bg"] = background;
    vars["--page-ink"] = readableInk(background);
  }
  if (background || card) {
    classes.push("page-custom-card");
    if (card) vars["--page-card-bg"] = card;
    vars["--page-card-ink"] = readableInk(card || softCardOver(background));
  }
  return { className: classes.join(" "), style: vars as CSSProperties };
}
