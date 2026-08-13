# Product

## Register

brand

## Users

Individuals and small businesses in Cluj-Napoca whose computers, laptops, or
peripherals are broken: dead screens, faulty keyboards and mice, Windows
installs/reinstalls, slow machines, malware cleanup, small network problems.
A second audience is remote: people anywhere in Romania (Bucharest included)
who call for phone/remote guidance instead of an on-site visit. Visitors are
non-technical, often stressed, and want to know three things fast: "can you
fix my problem", "how do I reach you", "can I trust you". Romanian is the
default language; English and Hungarian must be first-class (Cluj has a large
Hungarian-speaking community).

## Product Purpose

Marketing site for a hardware-and-support IT service (brand name is
CMS-driven via `general_brand_name`; currently operating as Koterio / IT
Global Services SRL). The site's job is to convert a worried visitor into a
phone call or contact-form submission. It is NOT a software-development
agency site: services are hands-on (repairs, Windows installs, peripherals,
data recovery, remote assistance).

Success = visitor understands the offer in one screen, finds the service
that matches their problem, and contacts the company. All visible copy and
imagery is editable through the Roman Technologies CMS; a new service added
in the CMS dashboard must appear on the site with zero code changes.

## Brand Personality

Reliable, approachable, energetic. A neighborhood expert with modern tools,
not a corporate integrator. The interface should evoke confidence and calm
("this is fixable") with moments of liveliness through motion, never through
loud color or gimmicks.

## Anti-references

- Generic SaaS landing pages: gradient meshes, glassmorphism, purple-blue
  AI gradients. The palette is fixed and must not be extended with new
  gradients or new hues.
- Enterprise IT consultancies (heavy jargon, stock photos of server rooms).
- Anything that hides the phone number or buries contact behind funnels.

## Design Principles

1. **The palette is the identity.** Light mode keeps the existing brand
   colors exactly (#2A5088 blue, #3e9446 green, #fc1717 red, #3A70A9 card
   blue, #074285 ink, #49d4fc cyan accent, #316936 footer green). Dark mode
   derives from them; nothing new is invented, no gradients are added.
2. **Motion explains the service.** Animations are illustrative, not
   decorative: each service card animates a miniature scene of what the
   service does. Every animation has a reduced-motion fallback.
3. **CMS-first.** Every user-visible string and image flows from the CMS
   manifest or has a CMS-controlled variant; layout and motion live in code.
   Operators may add/remove services freely.
4. **Romanian-first, trilingual always.** RO is default; EN and HU are
   complete, not partial. UI chrome strings live in code-side dictionaries;
   content strings come translated from the CMS/DeepL pipeline.
5. **Fast and accessible are features.** Keyboard-complete navigation,
   visible focus, correct ARIA, WCAG AA contrast, smooth loading states.

## Accessibility & Inclusion

WCAG 2.1 AA target. Full keyboard operability (menus, dropdowns, toggles,
skip link), visible focus rings, `prefers-reduced-motion` alternatives for
every animation, screen-reader labels on icon-only controls, `lang`
attribute switching with the active language.
