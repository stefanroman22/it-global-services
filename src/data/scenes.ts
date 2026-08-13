/**
 * Animated scene registry — the predefined set of card animations.
 *
 * Each service / feature card renders a small looping SVG animation
 * ("scene") instead of a static icon. The scene for an item is resolved
 * in this order:
 *
 *   1. The CMS `animation` field on the repeater item (services_catalog /
 *      key_features), if it names a valid scene key below. Operators pick
 *      from this predefined set in the dashboard.
 *   2. Keyword heuristics over the item's slug + title (multilingual —
 *      slugs/titles may arrive DeepL-translated per locale).
 *   3. A sensible fallback (`gear` for services, a rotating pick for
 *      features).
 *
 * Keep this list in sync with the `animation` field hint text configured
 * in the CMS services_catalog / key_features `_schema`.
 */

export const SCENE_KEYS = [
  "computer-repair",
  "screen-repair",
  "keyboard",
  "mouse",
  "windows-install",
  "network",
  "security",
  "cloud",
  "backup",
  "phone-support",
  "hardware",
  "hosting",
  "consulting",
  "speed",
  "clock",
  "certificate",
  "pricing",
  "growth",
  "gear",
] as const;

export type SceneKey = (typeof SCENE_KEYS)[number];

function normalise(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_]+/g, "-");
}

export function isSceneKey(value: string): value is SceneKey {
  return (SCENE_KEYS as readonly string[]).includes(value);
}

/** Keyword → scene rules, first match wins. Keywords cover RO / EN / HU
 *  because slugs and titles arrive per-locale from the CMS. */
const SERVICE_RULES: Array<[SceneKey, RegExp]> = [
  ["screen-repair", /screen|ecran|display|kijelz/],
  ["keyboard", /keyboard|tastatur|billenty/],
  ["mouse", /mouse|maus|egér|eger/],
  ["windows-install", /windows|instal|telepít|telepit|operating|sistem de operare/],
  ["security", /security|cyber|securit|biztons/],
  ["cloud", /cloud|felhő|felho/],
  ["backup", /backup|recovery|recuper|restaur|mentés|mentes|adatment/],
  ["phone-support", /voip|phone|telefon|call|remote|distan|távoli|tavoli|asisten|communic|comunic/],
  ["hosting", /hosting|web|site|domeniu|domain|weboldal/],
  ["network", /network|rețea|retea|hálózat|halozat|wifi|infrastructur/],
  ["hardware", /hardware|procurement|component|piese|echipament|alkatrész|alkatresz/],
  ["consulting", /consult|tanácsad|tanacsad/],
  ["computer-repair", /repair|repar|javít|javit|computer|laptop|calculator|pc|desktop|számítógép|szamitogep/],
  ["gear", /managed|mentenan|maintenance|karbantart/],
];

/** Resolve the scene for a service card. */
export function serviceScene(
  explicit: string | undefined,
  slug: string,
  title: string,
): SceneKey {
  if (explicit) {
    const key = normalise(explicit);
    if (isSceneKey(key)) return key;
  }
  const hay = `${slug} ${title}`.toLowerCase();
  for (const [scene, re] of SERVICE_RULES) {
    if (re.test(hay)) return scene;
  }
  return "gear";
}

const FEATURE_RULES: Array<[SceneKey, RegExp]> = [
  ["clock", /24|clock|hour|support|suport|nonstop|non-stop|órás|oras|ügyelet|ugyelet/],
  ["certificate", /certif|expert|profession|specialist|szakért|szakert|acredit/],
  ["security", /secur|protect|siguran|threat|biztons|védel|vedel/],
  ["pricing", /pric|cost|tarif|preț|pret|transparent|ár|arak|fizet/],
  ["speed", /fast|speed|rapid|quick|response|răspuns|raspuns|gyors/],
  ["growth", /scal|grow|creș|cres|trend|növek|novek|evolu/],
];

const FEATURE_FALLBACK: SceneKey[] = [
  "clock",
  "certificate",
  "security",
  "pricing",
  "speed",
  "growth",
];

/** Resolve the scene for a Why-Choose-Us / pillar feature card. */
export function featureScene(
  explicit: string | undefined,
  title: string,
  index: number,
): SceneKey {
  if (explicit) {
    const key = normalise(explicit);
    if (isSceneKey(key)) return key;
  }
  const hay = title.toLowerCase();
  for (const [scene, re] of FEATURE_RULES) {
    if (re.test(hay)) return scene;
  }
  return FEATURE_FALLBACK[index % FEATURE_FALLBACK.length];
}
