# CLAUDE.md — it-global-services

Guidance for AI agents (incl. Claude Code on the web, triggered from mobile) working on this repo.

## What this is

Marketing website for **IT Global Services**, built with **Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript**, animated with **framer-motion**, localized with **next-intl** (RO default at `/`, EN at `/en`, HU at `/hu`). Deployed on Vercel.

Almost all visible text/images come from an **external CMS at runtime** — they are NOT hardcoded. The site fetches a per-locale content manifest and renders it with ISR (`revalidate: 60`), so CMS edits appear within ~60s without a redeploy.

## Branch workflow (IMPORTANT)

- **`main`** = production. Do **not** push or open PRs against `main` unless the owner explicitly says so.
- **`cms-preview`** = the working/integration branch. **All agent-driven changes land here.** Base your work on `cms-preview` and target `cms-preview`.
- The owner merges `cms-preview` → `main` manually when ready.

## Commands

```bash
npm run dev     # local dev (next dev --turbopack)
npm run build   # production build — run this to verify changes compile
npm run lint    # eslint
```

There is no test suite. **Verify changes with `npm run build`** before considering a task done.

## Architecture & where things live

```
src/
  app/
    [locale]/               # every page lives under the locale segment
      layout.tsx            # root layout: theme init script, metadata, JSON-LD,
                            #   Header/Footer, skip link, providers
      page.tsx              # Home — Hero / marquee / ServicesGrid / marquee / WhyChooseUs
      about/, contact/      # page.tsx (data) + *PageContent.tsx (presentation)
      services/[slug]/      # dynamic per-service pages (slugs are per-locale!)
      loading.tsx (per-route), not-found.tsx, [...rest]/ (404 catch-all)
    sitemap.ts, robots.ts, icon.png
    globals.css             # theme tokens (light = brand palette, dark derived)
  components/
    layout/                 # Header, Footer, MobileMenu, ServicesDropdown
    sections/               # Hero, ServicesGrid, WhyChooseUs, SectionMarquee
    ui/                     # ContactForm, PageBanner, ServiceScene (animated
                            #   SVG scenes), ThemeToggle, LanguageSwitcher, ...
    providers/              # RouteAlternatesProvider (per-locale slug map for
                            #   the language switcher on service pages)
  data/
    services.ts             # Service type + toService() adapter (CMS → component shape)
    scenes.ts               # scene keys + CMS-`animation`-field / keyword resolvers
    contact.ts
  i18n/
    routing.ts              # locales ro/en/hu, default ro, prefix as-needed —
                            #   MUST mirror the CMS project's enabled locales
    request.ts, navigation.ts
  lib/
    cms.ts                  # getCmsData(locale) + typed accessors — the CMS data layer
    contactFields.ts        # resolves arbitrary contact_info keys into cards
    site.ts                 # SITE_URL + hreflang/canonical helpers
  proxy.ts                  # next-intl locale negotiation (Next 16 middleware)
messages/{ro,en,hu}.json    # UI-chrome strings (nav, forms, aria labels, fallbacks)
cms.config.json             # declares the CMS content schema (keys, types, pages, locales)
```

### CMS data flow (read before editing content rendering)

- `src/lib/cms.ts` is the single source for content. `getCmsData(locale)` fetches the
  localized manifest (`<endpoint>/<locale>`, draft: `<endpoint>/<locale>/draft`) and
  falls back to the default-locale endpoint when the locale is not enabled in the CMS.
  Pages call typed accessors: `textBlock()`, `image()`, `keyValue()`, `repeater()`,
  `contactInfo()`, `keyFeatures()`, `servicesCatalog()`.
- Content keys are declared in `cms.config.json` (e.g. `home_hero_subhead`,
  `services_catalog`, `general_logo`). The `_type` (text_block / image / key_value /
  repeater / email_config) determines which accessor to use.
- **Languages**: the CMS project has locales `en` (default/authoring), `ro`, `hu`;
  DeepL auto-translation fills `ro`/`hu` server-side when the default locale is saved
  in the dashboard. UI-chrome strings live in `messages/*.json` in this repo instead.
- **Card animations**: `services_catalog` and `key_features` items carry an optional
  `animation` field (a `url`-typed `_schema` field so DeepL never translates it).
  Valid values are the scene keys in `src/data/scenes.ts`; empty → keyword-based
  auto-pick. Scenes themselves are framer-motion SVGs in
  `src/components/ui/ServiceScene.tsx` (every scene must respect reduced motion).
- Endpoint + preview behaviour are controlled by env vars (`NEXT_PUBLIC_CMS_ENDPOINT`,
  `NEXT_PUBLIC_CMS_PREVIEW_TOKEN`) set on Vercel — not in this repo. The endpoint env
  var stays locale-less; `cms.ts` derives localized URLs from it.

**To change wording/images that an operator can edit, change it in the CMS, not in code.**
Edit code only for: layout, styling, animation, component structure, new sections,
scenes (`ServiceScene.tsx` / `scenes.ts`), UI-chrome translations (`messages/`),
or fallback defaults (the `?? "..."` / `|| t("...")` values in pages).

## Conventions

- Server Components are `async` and fetch CMS data at the top; presentation is split into
  sibling `*PageContent.tsx` / section components that receive plain props.
- Accessors always return a safe empty shape on miss — callers use `?? "fallback"`.
- Styling is Tailwind utility classes; shared theme/tokens live in `globals.css`.
  Light mode is the canonical brand palette — **never change the light colors**;
  dark mode derives via the CSS variables under `[data-theme="dark"]`.
- Use the locale-aware `Link` / `usePathname` from `@/i18n/navigation`, never
  `next/link` / `next/navigation` directly in components.
- TypeScript throughout; keep the existing typed-accessor pattern rather than reaching
  into `cms.content[...]` directly.
- Every animation needs a reduced-motion fallback (`useReducedMotion`), and content
  must never be visibility-gated on an animation firing.

## Working style

- Make **surgical changes** — touch only what the task needs; match surrounding style.
- After editing, run `npm run build` and report the result.
- Stay on `cms-preview`. Never push to `main` without explicit instruction.
