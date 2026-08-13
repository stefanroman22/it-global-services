# Design

## Theme

Light mode is canonical and preserves the shipped palette untouched. Dark
mode is a derived theme (same hues, inverted lightness roles) toggled by the
user and persisted; system preference is the initial default. No new
gradients beyond the existing page-wrapper gradients; dark mode re-maps
those same gradients to deep-blue equivalents.

## Color palette

Light (canonical, do not change):

- `--color-brand-blue: #2A5088` — header, primary surfaces, buttons
- `--color-brand-green: #3e9446` — primary CTA, success
- `--color-brand-red: #fc1717` — active nav / alerts (used sparingly)
- `--color-card-blue: #3A70A9` — service card surface
- `--color-text-dark: #074285` — ink on light surfaces
- `--color-footer-green: #316936` — footer surface
- `#49d4fc` — cyan accent (headings on cards, brand mark accent)
- Page gradients: home `#2A5088→#81a9e3→#DAEBFF→#FFF`; service
  `#cafcce→#e1fae3→#f7faf8`; about `#cbe5f2→#e8f6fc→#f7fbfc`; contact
  `#f7d2da→#fce6eb→#faf2f4`.

Dark (derived): page ground `#0b1526` → `#0e1b30` band of the brand blue;
surfaces `#132441` / `#16294a`; ink `#dbe7f6`; the green/red/cyan accents
keep hue with +L adjustments for AA contrast (`#5cc768`, `#ff5f5f`,
`#49d4fc` unchanged). Footer `#0f2113`.

## Typography

Inter (existing) for headings and body: identity-preservation wins over the
reflex-reject list since the family is already shipping. Weight contrast
carries hierarchy: 800/700 display, 600 subheads, 400/500 body. Headings use
`text-wrap: balance`.

## Components

- `container-main` (max-w-7xl) wrapper everywhere.
- Buttons: `btn-primary` (green), `btn-submit` (blue); rounded-lg.
- Service cards: `#3A70A9` surface, rounded-xl, animated SVG scene header
  (replaces static icon), cyan title, white body.
- Section headers: `section-title` / `section-subtitle`.

## Motion

framer-motion throughout. Ease-out expo family, 0.4–0.7s reveals; looping
micro-scenes on service/feature cards (2–6s cycles); scroll-linked parallax
accents in hero; animated section dividers (drifting line/net motif) between
home sections. All loops pause under `prefers-reduced-motion` and content is
never visibility-gated on animation.

## Layout

Header: logo left (larger, ~h-16), all nav right, language + theme toggles
right of nav. Home sections in existing order: Hero → Services → Why Choose
Us. Grids: services `repeat(auto-fit, minmax(...))`-style responsive tiers;
features 3-col max. Footer: brand / nav / contact 3-col.
