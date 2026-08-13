import { notFound } from "next/navigation";

/** Catch-all for unknown paths inside a locale → renders the localized 404.
 *  notFound() also fires in generateMetadata so the response carries a real
 *  404 status (thrown from the page alone, the streamed shell would have
 *  already sent 200). */
export function generateMetadata(): never {
  notFound();
}

export default function CatchAllPage() {
  notFound();
}
