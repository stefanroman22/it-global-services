import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Locale negotiation proxy (Next 16 name for middleware). Serves the
 *  default locale (ro) unprefixed and /en, /hu prefixed; locale detection
 *  is disabled in `routing` so `/` is always Romanian. */
export default createMiddleware(routing);

export const config = {
  // Skip Next internals and static files entirely.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
