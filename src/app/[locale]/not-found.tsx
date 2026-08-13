import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

/** Branded 404 page (localized). */
export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="page-home flex min-h-[70vh] items-center justify-center py-20">
      <div className="container-main text-center">
        <p className="mb-4 text-7xl font-bold text-white/90 md:text-8xl">404</p>
        <h1 className="mb-3 text-2xl font-bold text-white md:text-3xl">
          {t("title")}
        </h1>
        <p className="mx-auto mb-8 max-w-md text-white/75">{t("body")}</p>
        <Link href="/" className="btn-primary">
          {t("backHome")}
        </Link>
      </div>
    </div>
  );
}
