import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/** Locale-aware wrappers around Next navigation APIs. Use these instead of
 *  `next/link` / `next/navigation` in components so hrefs stay unprefixed
 *  (`/about`) and the active locale is applied automatically. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
