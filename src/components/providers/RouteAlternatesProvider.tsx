"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/routing";

/** Per-locale path overrides for the current route. Needed on service
 *  detail pages, where the CMS translates slugs per locale, so the
 *  language switcher can jump to the equivalent page instead of a 404. */
export type RouteAlternates = Partial<Record<Locale, string>>;

interface Ctx {
  alternates: RouteAlternates | null;
  setAlternates: (a: RouteAlternates | null) => void;
}

const RouteAlternatesContext = createContext<Ctx>({
  alternates: null,
  setAlternates: () => {},
});

export function RouteAlternatesProvider({ children }: { children: ReactNode }) {
  const [alternates, setAlternates] = useState<RouteAlternates | null>(null);
  const value = useMemo(() => ({ alternates, setAlternates }), [alternates]);
  return (
    <RouteAlternatesContext.Provider value={value}>
      {children}
    </RouteAlternatesContext.Provider>
  );
}

export function useRouteAlternates(): RouteAlternates | null {
  return useContext(RouteAlternatesContext).alternates;
}

/** Rendered by pages whose path differs per locale; registers the map for
 *  the language switcher and clears it on unmount. */
export function SetRouteAlternates({
  alternates,
}: {
  alternates: RouteAlternates;
}) {
  const { setAlternates } = useContext(RouteAlternatesContext);
  const key = JSON.stringify(alternates);
  useEffect(() => {
    setAlternates(JSON.parse(key) as RouteAlternates);
    return () => setAlternates(null);
  }, [key, setAlternates]);
  return null;
}
