import { getTranslations } from "next-intl/server";

/** Branded route-transition loading screen. Pure CSS animation (no JS
 *  needed before hydration); respects reduced motion via Tailwind's
 *  motion-safe variants. */
export default async function Loading() {
  const t = await getTranslations("common");
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 bg-header-bar"
    >
      <span className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-white/20" />
        <span className="absolute inset-0 motion-safe:animate-spin rounded-full border-2 border-transparent border-t-[#49d4fc]" />
        <svg
          className="h-7 w-7 text-white/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M9 17V15M12 17V13M15 17V11M5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21Z" />
        </svg>
      </span>
      <p className="text-sm font-medium tracking-wide text-white/70">
        {t("loading")}
      </p>
    </div>
  );
}
