import type { Position } from "@/types";

/** Stimmungs-/Ziel-Filter für den Stellungsgenerator. */
export type GeneratorMood = "romantisch" | "verspielt" | "abenteuerlich" | "intim";

/** Zeitfenster: kurz vs. ausgedehnt. */
export type GeneratorTime = "kurz" | "mittel" | "entspannt";

/** Gewünschter körperlicher Aufwand. */
export type GeneratorEnergy = "wenig" | "normal" | "aktiv";

/** Gewünschte Beweglichkeit. */
export type GeneratorFlexibility = "wenig" | "normal" | "flexibel";

/** Typischer Ort / Setting. */
export type GeneratorPlace = "bett" | "sofa" | "dusche" | "kleiner-raum";

/** Selbsteinschätzung Erfahrung. */
export type GeneratorExperience = "anfaenger" | "mittel" | "fortgeschritten";

/** Alle Generator-Filter in einem Objekt (Standardwerte setzt die UI). */
export interface GeneratorFilters {
  mood: GeneratorMood;
  time: GeneratorTime;
  energy: GeneratorEnergy;
  flexibility: GeneratorFlexibility;
  place: GeneratorPlace;
  experience: GeneratorExperience;
}

/** Eine einzelne Vorschlagszeile inkl. Begründung und Roh-Score. */
export interface GeneratorSuggestion {
  position: Position;
  /** Kurze deutsche Gründe („Romantisch“, „Wenig Aufwand“, …). */
  reasons: string[];
  /** Gewichteter Score 0–100 (für Sortierung / Degradation). */
  score: number;
}

/** „Eng“ = gute Passung, „ähnlich“ = nachgelagerte Heuristik / weichere Treffer. */
export type GeneratorMatchTier = "eng" | "aehnlich";

/** Ergebnis eines Generator-Laufs inkl. Hinweistext bei weicher Treffermenge. */
export interface GeneratorRunResult {
  tier: GeneratorMatchTier;
  /** Optional: erklärt, warum nicht nur „perfekte“ Treffer gezeigt werden. */
  note?: string;
  suggestions: GeneratorSuggestion[];
}

/** Standard-Filter (ausgewogene Ausgangslage in der UI). */
export const DEFAULT_GENERATOR_FILTERS: GeneratorFilters = {
  mood: "intim",
  time: "mittel",
  energy: "normal",
  flexibility: "normal",
  place: "bett",
  experience: "mittel",
};

const WEIGHTS_FULL = {
  mood: 0.22,
  time: 0.14,
  energy: 0.2,
  flexibility: 0.16,
  place: 0.1,
  experience: 0.18,
} as const;

/** Gewichte ohne Ort (für zweite Degradations-Stufe); Summe = 1. */
const WEIGHTS_NO_PLACE = {
  mood: 0.25,
  time: 0.15,
  energy: 0.22,
  flexibility: 0.18,
  experience: 0.2,
} as const;

/** Normalisiert Tag-Strings für einfache Teilstring-Vergleiche. */
function tagBlob(p: Position): string {
  return (p.tags ?? []).join(" ").toLowerCase();
}

/** Misst Übereinstimmung Stimmung/Ziel (0–1). */
function scoreMood(p: Position, mood: GeneratorMood): number {
  const cats = p.categories;
  const e = p.eignung ?? {};
  const tags = tagBlob(p);
  switch (mood) {
    case "romantisch": {
      const c = cats.includes("romantisch") || e.romantisch ? 1 : 0;
      const i = cats.includes("intim") || e.intim ? 0.75 : 0.35;
      return Math.max(c, i * 0.9, tags.includes("intim") ? 0.85 : 0);
    }
    case "intim": {
      if (cats.includes("intim") || e.intim) return 1;
      return tags.includes("intim") ? 0.9 : 0.35;
    }
    case "verspielt": {
      if (e.experimentell) return 0.92;
      if (p.difficulty === "easy" && cats.includes("fuer-anfaenger")) return 0.55;
      if (tags.includes("kontrolle") || tags.includes("experiment")) return 0.75;
      return 0.38;
    }
    case "abenteuerlich": {
      const adv =
        cats.includes("fortgeschritten") || p.difficulty === "advanced" ? 1 : 0;
      const ex = e.experimentell ? 0.85 : 0;
      const hi = p.level >= 3 ? 0.72 : 0.25;
      return Math.max(adv, ex, hi);
    }
    default:
      return 0.5;
  }
}

/** Zeit: kurz = eher wenig Ausdauer, entspannt = eher niedriges stamina. */
function scoreTime(p: Position, time: GeneratorTime): number {
  const st = p.stamina ?? 2;
  if (time === "kurz") {
    if (st <= 1) return 1;
    if (st === 2) return 0.72;
    return 0.35;
  }
  if (time === "mittel") return 0.82;
  if (time === "entspannt") {
    if (st <= 1) return 1;
    if (st === 2) return 0.78;
    return 0.42;
  }
  return 0.7;
}

/** Energie vs. stamina-Feld. */
function scoreEnergy(p: Position, energy: GeneratorEnergy): number {
  const st = p.stamina ?? 2;
  if (energy === "wenig") {
    if (st === 1) return 1;
    if (st === 2) return 0.55;
    return 0.22;
  }
  if (energy === "normal") {
    if (st === 2) return 1;
    return st === 1 ? 0.78 : 0.62;
  }
  if (energy === "aktiv") {
    if (st === 3) return 1;
    if (st === 2) return 0.62;
    return 0.35;
  }
  return 0.7;
}

/** Beweglichkeit vs. Kategorie / flexibility. */
function scoreFlexibility(
  p: Position,
  flexibility: GeneratorFlexibility,
): number {
  const f = p.flexibility ?? 2;
  const lowCat =
    p.categories.includes("wenig-beweglichkeit") || p.eignung?.wenigBeweglichkeit;
  if (flexibility === "wenig") {
    if (lowCat || f === 1) return 1;
    if (f === 2) return 0.58;
    return 0.28;
  }
  if (flexibility === "normal") {
    if (f === 2) return 1;
    return f === 1 ? 0.8 : 0.65;
  }
  if (flexibility === "flexibel") {
    if (f === 3) return 1;
    if (f === 2) return 0.62;
    return 0.35;
  }
  return 0.7;
}

/** Ort: heuristisch aus Slug, Tags und Kategorien. */
function scorePlace(p: Position, place: GeneratorPlace): number {
  const tags = tagBlob(p);
  switch (place) {
    case "bett": {
      if (p.slug === "schmetterling") return 1;
      if (
        p.slug === "missionarsstellung" ||
        p.slug === "an-g-punkt" ||
        p.slug === "doggy-style"
      )
        return 0.95;
      return 0.72;
    }
    case "sofa": {
      if (p.slug === "seitlich" || p.slug === "loeffelchen") return 1;
      if (tags.includes("entspannt") || tags.includes("sanft")) return 0.72;
      return 0.48;
    }
    case "dusche": {
      if (p.slug === "kuhlerin" || tags.includes("stehend")) return 1;
      return 0.28;
    }
    case "kleiner-raum": {
      if (p.slug === "kuhlerin" || tags.includes("stehend")) return 0.88;
      if (p.slug === "missionarsstellung" || p.slug === "loeffelchen") return 0.65;
      return 0.52;
    }
    default:
      return 0.65;
  }
}

/** Erfahrung vs. difficulty / Kategorien. */
function scoreExperience(
  p: Position,
  experience: GeneratorExperience,
): number {
  if (experience === "anfaenger") {
    const easy = p.difficulty === "easy";
    const beg =
      p.categories.includes("fuer-anfaenger") || p.eignung?.fuerAnfaenger;
    if (easy && beg) return 1;
    if (easy) return 0.78;
    return 0.32;
  }
  if (experience === "mittel") {
    if (p.difficulty === "medium") return 1;
    if (p.difficulty === "easy") return 0.82;
    return 0.58;
  }
  if (experience === "fortgeschritten") {
    if (p.difficulty === "advanced" || p.categories.includes("fortgeschritten"))
      return 1;
    if (p.difficulty === "medium") return 0.78;
    return 0.38;
  }
  return 0.7;
}

/** Gewichteter Gesamt-Score 0–100. */
function totalScore(
  p: Position,
  filters: GeneratorFilters,
  skipPlace: boolean,
): number {
  const m = scoreMood(p, filters.mood);
  const t = scoreTime(p, filters.time);
  const e = scoreEnergy(p, filters.energy);
  const f = scoreFlexibility(p, filters.flexibility);
  const pl = skipPlace ? 0.7 : scorePlace(p, filters.place);
  const x = scoreExperience(p, filters.experience);

  if (skipPlace) {
    const w = WEIGHTS_NO_PLACE;
    return Math.round(
      100 *
        (w.mood * m + w.time * t + w.energy * e + w.flexibility * f + w.experience * x),
    );
  }
  const w = WEIGHTS_FULL;
  return Math.round(
    100 *
      (w.mood * m +
        w.time * t +
        w.energy * e +
        w.flexibility * f +
        w.place * pl +
        w.experience * x),
  );
}

/** Leichte Bevorzugung freigeschalteter Stellungen bei Punktgleichheit (optional). */
function unlockBoost(unlocked: boolean): number {
  return unlocked ? 3 : 0;
}

/** Baut bis zu wenige lesbare Gründe aus den stärksten Dimensionen. */
function buildReasons(
  p: Position,
  filters: GeneratorFilters,
  skipPlace: boolean,
): string[] {
  const reasons: string[] = [];
  const pairs: [string, number][] = [
    ["Romantisch", scoreMood(p, filters.mood)],
    ["Passend zur Zeit", scoreTime(p, filters.time)],
    ["Passender Aufwand", scoreEnergy(p, filters.energy)],
    ["Passt zur Beweglichkeit", scoreFlexibility(p, filters.flexibility)],
    ["Passt zum Ort", skipPlace ? 0 : scorePlace(p, filters.place)],
    ["Passt zur Erfahrung", scoreExperience(p, filters.experience)],
  ];

  const moodLabel: Record<GeneratorMood, string> = {
    romantisch: "Romantisch",
    intim: "Intim",
    verspielt: "Verspielt",
    abenteuerlich: "Abenteuerlich",
  };
  if (scoreMood(p, filters.mood) >= 0.72) {
    reasons.push(moodLabel[filters.mood]);
  }
  if (scoreEnergy(p, filters.energy) >= 0.75) {
    if (filters.energy === "wenig") reasons.push("Wenig Aufwand");
    else if (filters.energy === "aktiv") reasons.push("Aktiv & intensiv");
  }
  if (scoreFlexibility(p, filters.flexibility) >= 0.75) {
    if (filters.flexibility === "wenig") reasons.push("Wenig Beweglichkeit nötig");
  }
  if (!skipPlace && scorePlace(p, filters.place) >= 0.78) {
    const pl: Record<GeneratorPlace, string> = {
      bett: "Gut fürs Bett",
      sofa: "Gut fürs Sofa",
      dusche: "Gut für die Dusche",
      "kleiner-raum": "Passt in kleine Räume",
    };
    reasons.push(pl[filters.place]);
  }
  if (scoreExperience(p, filters.experience) >= 0.75) {
    if (filters.experience === "anfaenger") reasons.push("Gut für Anfänger");
    else if (filters.experience === "fortgeschritten")
      reasons.push("Für Fortgeschrittene");
  }
  if (scoreTime(p, filters.time) >= 0.85 && filters.time === "entspannt") {
    reasons.push("Entspanntes Tempo");
  }

  if (reasons.length === 0) {
    const best = pairs.filter(([, s]) => s > 0.5).sort((a, b) => b[1] - a[1]);
    if (best[0]) reasons.push(`${best[0][0].replace("Passend ", "")}`);
  }
  return Array.from(new Set(reasons)).slice(0, 4);
}

/** Deterministischer „Shuffle“-Schlüssel aus Slug + Salt (für Neu generieren). */
function mixKey(slug: string, salt: string): number {
  let h = 0;
  const s = `${slug}::${salt}`;
  for (let i = 0; i < s.length; i += 1) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/**
 * Liefert bis zu drei Vorschläge mit Degradation (eng → ohne Ort → ähnlich).
 * @param allPositions Katalog
 * @param filters Nutzerauswahl
 * @param isUnlockedFn ob die Stellung für den Nutzer freigeschaltet ist
 * @param salt Zufallssalt für „Neu generieren“
 */
export function generatePositionSuggestions(
  allPositions: Position[],
  filters: GeneratorFilters,
  isUnlockedFn: (position: Position) => boolean,
  salt: string,
): GeneratorRunResult {
  const scoreRow = (
    p: Position,
    skipPlace: boolean,
  ): { score: number; skipPlace: boolean } => {
    const base = totalScore(p, filters, skipPlace);
    return {
      score: base + unlockBoost(isUnlockedFn(p)),
      skipPlace,
    };
  };

  let tier: GeneratorMatchTier = "eng";
  let note: string | undefined;

  const ranked = (placeSkipped: boolean) => {
    return allPositions
      .map((p) => {
        const { score } = scoreRow(p, placeSkipped);
        return { p, score, placeSkipped };
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return mixKey(a.p.slug, salt) - mixKey(b.p.slug, salt);
      });
  };

  let order = ranked(false);
  let best = order[0]?.score ?? 0;

  const pickTop = (
    list: typeof order,
    skipped: boolean,
  ): GeneratorSuggestion[] => {
    const seen = new Set<string>();
    const out: GeneratorSuggestion[] = [];
    for (const row of list) {
      if (seen.has(row.p.slug)) continue;
      seen.add(row.p.slug);
      const reasons = buildReasons(row.p, filters, skipped);
      out.push({ position: row.p, reasons, score: row.score });
      if (out.length >= 3) break;
    }
    return out;
  };

  let suggestions = pickTop(order, false);

  const threshold = Math.max(48, best * 0.58);
  const weak =
    suggestions.length < 3 ||
    suggestions.some((s) => s.score < threshold) ||
    best < 52;

  if (weak) {
    order = ranked(true);
    suggestions = pickTop(order, true);
    tier = "aehnlich";
    note =
      "Zu wenige perfekte Treffer für alle Filter – diese Ideen passen trotzdem gut (Ort wurde dabei weicher gewichtet).";
  }

  if (suggestions.length < 3) {
    order = allPositions
      .map((p) => ({
        p,
        score: scoreMood(p, filters.mood) * 40 + scoreExperience(p, filters.experience) * 60,
        placeSkipped: true,
      }))
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return mixKey(a.p.slug, salt) - mixKey(b.p.slug, salt);
      });
    const filler = pickTop(
      order.map((r) => ({ p: r.p, score: r.score, placeSkipped: true })),
      true,
    );
    const have = new Set(suggestions.map((s) => s.position.slug));
    for (const s of filler) {
      if (suggestions.length >= 3) break;
      if (!have.has(s.position.slug)) {
        have.add(s.position.slug);
        suggestions.push({
          ...s,
          reasons:
            s.reasons.length > 0
              ? s.reasons
              : ["Ähnliche Idee zu deiner Auswahl"],
        });
      }
    }
    tier = "aehnlich";
    note =
      note ??
      "Sehr spezifische Kombination – wir zeigen nah verwandte Stellungen, die trotzdem passen können.";
  }

  return { tier, note, suggestions: suggestions.slice(0, 3) };
}
