# CLAUDE.md — it-global-services

Guidance for AI agents (incl. Claude Code on the web, triggered from mobile) working on this repo.

## What this is

Marketing website for **IT Global Services**, built with **Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript**, animated with **framer-motion**. Deployed on Vercel.

Almost all visible text/images come from an **external CMS at runtime** — they are NOT hardcoded. The site fetches a content manifest and renders it with ISR (`revalidate: 60`), so CMS edits appear within ~60s without a redeploy.

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
  app/                      # App Router pages (Server Components, async)
    page.tsx                # Home — composes Hero / ServicesGrid / WhyChooseUs
    about/, contact/        # page.tsx (data) + *PageContent.tsx (presentation)
    services/[slug]/        # dynamic per-service pages
    layout.tsx, globals.css # root layout + global styles / Tailwind theme
  components/
    layout/                 # Header, Footer, MobileMenu, ServicesDropdown
    sections/               # Hero, ServicesGrid, WhyChooseUs (page sections)
    ui/                     # ContactForm, PageBanner, ServiceCard, etc.
  data/
    services.ts             # Service type + toService() adapter (CMS → component shape)
    service-icons.ts        # SVG icon paths keyed by service slug (NOT CMS-editable)
    contact.ts
  lib/
    cms.ts                  # getCmsData() + typed accessors — the CMS data layer
    contactFields.ts        # resolves arbitrary contact_info keys into cards
cms.config.json             # declares the CMS content schema (keys, types, pages)
```

### CMS data flow (read before editing content rendering)

- `src/lib/cms.ts` is the single source for content. `getCmsData()` fetches the whole
  manifest in one request; pages call typed accessors: `textBlock()`, `image()`,
  `keyValue()`, `repeater()`, `contactInfo()`, `keyFeatures()`, `servicesCatalog()`.
- Content keys are declared in `cms.config.json` (e.g. `home_hero_subhead`,
  `services_catalog`, `general_logo`). The `_type` (text_block / image / key_value /
  repeater / email_config) determines which accessor to use.
- Endpoint + preview behaviour are controlled by env vars (`NEXT_PUBLIC_CMS_ENDPOINT`,
  `NEXT_PUBLIC_CMS_PREVIEW_TOKEN`) set on Vercel — not in this repo.

**To change wording/images that an operator can edit, change it in the CMS, not in code.**
Edit code only for: layout, styling, animation, component structure, new sections,
icons (`service-icons.ts`), or fallback defaults (the `?? "..."` values in pages).

## Conventions

- Server Components are `async` and fetch CMS data at the top; presentation is split into
  sibling `*PageContent.tsx` / section components that receive plain props.
- Accessors always return a safe empty shape on miss — callers use `?? "fallback"`.
- Styling is Tailwind utility classes; shared theme/tokens live in `globals.css`.
- TypeScript throughout; keep the existing typed-accessor pattern rather than reaching
  into `cms.content[...]` directly.

## Working style

- Make **surgical changes** — touch only what the task needs; match surrounding style.
- After editing, run `npm run build` and report the result.
- Stay on `cms-preview`. Never push to `main` without explicit instruction.
