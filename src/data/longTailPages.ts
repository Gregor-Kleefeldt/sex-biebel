import type { CategorySlug } from "@/types";
import type { Position } from "@/types";

// Long-tail landing pages: URL = /sexstellungen/[categorySlug]/[slug]
export interface LongTailLandingPage {
  categorySlug: CategorySlug;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  h2Guide: string;
  guideBody: string;
  filter: (position: Position) => boolean;
  blogSlugs: string[];
  challengeSlugs: string[];
}

export const longTailLandingPages: LongTailLandingPage[] = [
  {
    categorySlug: "fuer-anfaenger",
    slug: "wenig-beweglichkeit",
    title:
      "Sexstellungen für Anfänger mit wenig Beweglichkeit – sanfte Übersicht",
    metaDescription:
      "Sanfte, einsteigerfreundliche Stellungen bei wenig Beweglichkeit: wenig Akrobatik, viel Komfort. Kuratierte Auswahl mit Tipps und internen Links.",
    h1: "Sexstellungen für Anfänger mit wenig Beweglichkeit",
    intro:
      "Wenn du neu einsteigst oder Gelenke und Rücken schonen willst, sind ruhige Liegepositionen und seitliche Stellungen oft die beste Wahl. Diese Übersicht fokussiert auf Stellungen, die ohne große Bewegungsamplitude auskommen und sich gut kommunizieren lassen.",
    h2Guide: "So nutzt du diese Auswahl sinnvoll",
    guideBody:
      "Startet langsam, nutzt Kissen für Winkel und Druckentlastung und sprecht kurz ab, ob Tempo und Tiefe passen. Wenn etwas unangenehm wirkt: Position wechseln ist völlig normal. Die Liste unten ist bewusst kuratiert – nicht jede klassische Stellung passt zu jedem Körper.",
    filter: (p) =>
      Boolean(p.eignung?.fuerAnfaenger && p.eignung?.wenigBeweglichkeit),
    blogSlugs: ["beste-sexstellungen-fuer-anfaenger"],
    challengeSlugs: ["anfaenger-challenge"],
  },
  {
    categorySlug: "intim",
    slug: "ohne-akrobatik",
    title: "Intime Sexstellungen ohne Akrobatik – nah, entspannt, alltagstauglich",
    metaDescription:
      "Intime Stellungen ohne Turnübungen: Fokus auf Nähe, Augenkontakt und Komfort. Passende Positionen und Links zu Guides und Challenges.",
    h1: "Intime Sexstellungen ohne Akrobatik",
    intro:
      "Intimität braucht keine spektakulären Posen. Diese Seite sammelt Stellungen, die eher nah, langsam und körperlich entspannt sind – ohne fortgeschrittene Flexibilität oder experimentelle Intensität als Voraussetzung.",
    h2Guide: "Worauf es hier ankommt",
    guideBody:
      "Sucht euch eine Stellung, in der ihr euch lange angucken oder nah am Körper bleiben könnt. Reduziert Tempo, wenn es intensiv wird, und nutzt Unterlagen, damit nichts zwickt. Die Auswahl schließt absichtlich sehr anspruchsvolle Stellungen aus.",
    filter: (p) =>
      p.categories.includes("intim") &&
      p.difficulty !== "advanced" &&
      !p.categories.includes("fortgeschritten") &&
      !p.eignung?.experimentell,
    blogSlugs: ["sexstellungen-fuer-mehr-intimitaet", "tipps-fuer-besseren-sex"],
    challengeSlugs: ["intimitaets-challenge"],
  },
  {
    categorySlug: "romantisch",
    slug: "fuer-paare",
    title: "Romantische Sexstellungen für Paare – Nähe und Verbindung",
    metaDescription:
      "Romantische Stellungen für Paare: Augenkontakt, Zärtlichkeit und gemeinsames Tempo. Kuratierte Liste plus Blog- und Challenge-Ideen.",
    h1: "Romantische Sexstellungen für Paare",
    intro:
      "Romantik ist kein Genre aus Filmen, sondern oft ein Mix aus Nähe, langsamerem Tempo und echtem Blickkontakt. Diese Seite richtet sich an Paare, die Stellungen suchen, die Verbindung in den Vordergrund stellen – statt nur Dynamik oder Tiefe.",
    h2Guide: "Kleiner Fahrplan für euch beide",
    guideBody:
      "Sprecht vorher kurz, was euch heute guttut (Tempo, Körperhaltung, Pausen). Viele romantische Stellungen funktionieren besonders gut, wenn ihr euch Zeit für Küssen und Berühren lasst – nicht nur für die eigentliche Bewegung.",
    filter: (p) =>
      Boolean(p.eignung?.romantisch && p.eignung?.fuerPaare) &&
      p.categories.includes("romantisch"),
    blogSlugs: ["sexstellungen-fuer-paare", "sexstellungen-fuer-mehr-intimitaet"],
    challengeSlugs: ["intimitaets-challenge", "7-tage-paar-challenge"],
  },
  {
    categorySlug: "tiefe-penetration",
    slug: "sanft-und-kontrolliert",
    title: "Tiefe Penetration sanft & kontrolliert – einfache Einstiege",
    metaDescription:
      "Tiefe Penetration ohne Überforderung: leichtere Stellungen mit gutem Gefühl für Tempo und Winkel. Übersicht mit Tipps und weiterführenden Artikeln.",
    h1: "Tiefe Penetration – sanft und kontrolliert",
    intro:
      "Tiefe Stimulation kann stark wirken – deshalb lohnt sich ein sanfter Einstieg mit Stellungen, die ihr gut steuern könnt. Hier findest du Positionen aus dem Bereich ‚tiefe Penetration‘, die als Einstieg gedacht sind (einfache Schwierigkeit), damit ihr Tempo und Tiefe gemeinsam austariert.",
    h2Guide: "Sicherheit und Komfort",
    guideBody:
      "Kurze Check-ins helfen: Wenn etwas zu tief oder zu schnell ist, ändert den Winkel oder wechselt die Stellung. Kissen unter dem Becken können Winkel weicher machen; langsames Eindringen ist oft angenehmer als schnelle Bewegungen.",
    filter: (p) =>
      p.categories.includes("tiefe-penetration") && p.difficulty === "easy",
    blogSlugs: ["tipps-fuer-besseren-sex"],
    challengeSlugs: ["7-tage-paar-challenge"],
  },
  {
    categorySlug: "fuer-anfaenger",
    slug: "intim-und-romantisch",
    title:
      "Sexstellungen für Anfänger: intim & romantisch – der sanfte Einstieg",
    metaDescription:
      "Einsteigerfreundliche Stellungen mit Fokus auf Intimität und Romantik: wenig Druck, viel Nähe. Auswahl mit Ratgebern und Challenges.",
    h1: "Sexstellungen für Anfänger – intim und romantisch",
    intro:
      "Am Anfang zählt oft nicht ‚die perfekte Technik‘, sondern ein Gefühl von Sicherheit und Nähe. Diese Kombination fasst Stellungen zusammen, die gleichzeitig einsteigerfreundlich, intim und romantisch sind – ideal, wenn ihr euch noch orientiert oder bewusst langsam starten wollt.",
    h2Guide: "Was diese Kombination ausmacht",
    guideBody:
      "Sucht Positionen, in denen ihr euch gut seht oder aneinander liegen könnt. Nehmt Pausen, wenn ihr unsicher seid, und feiert kleine Fortschritte – Romantik entsteht oft aus Aufmerksamkeit, nicht aus Leistung.",
    filter: (p) =>
      Boolean(
        p.eignung?.fuerAnfaenger &&
          p.eignung?.intim &&
          p.eignung?.romantisch,
      ),
    blogSlugs: [
      "beste-sexstellungen-fuer-anfaenger",
      "sexstellungen-fuer-mehr-intimitaet",
    ],
    challengeSlugs: ["anfaenger-challenge", "intimitaets-challenge"],
  },
];

export function getLongTailPage(
  categorySlug: string,
  longtailSlug: string,
): LongTailLandingPage | undefined {
  return longTailLandingPages.find(
    (entry) =>
      entry.categorySlug === categorySlug && entry.slug === longtailSlug,
  );
}

export function getLongTailsForCategory(
  categorySlug: CategorySlug,
): LongTailLandingPage[] {
  return longTailLandingPages.filter(
    (entry) => entry.categorySlug === categorySlug,
  );
}
