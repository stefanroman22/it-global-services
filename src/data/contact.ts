/**
 * Contact info type — values now live in the CMS `contact_info` (key_value)
 * service. Fetch via `contactInfo()` from `src/lib/cms.ts`.
 *
 * This file remains as a type alias only; the previous hard-coded export
 * was removed when the site became CMS-driven.
 */
export type { ContactInfo as ContactInfo } from "@/lib/cms";
