import type { CategorySlug } from "@/types";

// Extra hub copy and internal links for category overview pages (SEO + UX)
export interface CategoryHubSection {
  h2: string;
  body: string;
}

export interface CategoryHubExtras {
  sections: CategoryHubSection[];
  blogSlugs: string[];
  challengeSlugs: string[];
}

export const categoryHubExtras: Record<CategorySlug, CategoryHubExtras> = {
  "fuer-anfaenger": {
    sections: [
      {
        h2: "Für wen eignet sich dieser Überblick?",
        body: "Wenn ihr neu startet, wieder einsteigt oder bewusst einfache Stellungen bevorzugt: Hier findest du Positionen mit klarer Kommunikation und wenig Voraussetzungen. Ideal, um gemeinsam Tempo und Grenzen zu finden.",
      },
      {
        h2: "Was du als Nächstes lesen kannst",
        body: "Vertiefe den Einstieg mit unseren Ratgebern und Challenges – dort sind Stellungen in einem roten Faden sortiert, statt nur einzeln zu stöbern.",
      },
    ],
    blogSlugs: ["beste-sexstellungen-fuer-anfaenger", "tipps-fuer-besseren-sex"],
    challengeSlugs: ["anfaenger-challenge"],
  },
  romantisch: {
    sections: [
      {
        h2: "Romantik heißt hier: Nähe statt Show",
        body: "Diese Stellungen betonen Augenkontakt, Umarmung und langsames Tempo. Perfekt für Abende, in denen Verbindung wichtiger ist als Dynamik.",
      },
    ],
    blogSlugs: ["sexstellungen-fuer-mehr-intimitaet", "sexstellungen-fuer-paare"],
    challengeSlugs: ["intimitaets-challenge", "7-tage-paar-challenge"],
  },
  "tiefe-penetration": {
    sections: [
      {
        h2: "Tiefe Stimulation – mit Verantwortung",
        body: "Tiefe Penetration kann intensiv sein. Kommuniziert offen über Winkel und Tempo und wechselt die Stellung, wenn etwas unangenehm wird. Die folgenden Positionen sind nach Thema gruppiert – von einfacher bis anspruchsvoller.",
      },
    ],
    blogSlugs: ["tipps-fuer-besseren-sex", "sexstellungen-fuer-paare"],
    challengeSlugs: ["7-tage-paar-challenge"],
  },
  intim: {
    sections: [
      {
        h2: "Intimität ohne Druck",
        body: "Intime Stellungen sind oft nah, langsam und mit viel Hautkontakt. Sie eignen sich gut, wenn ihr euch Zeit für Berührung und Blickkontakt nehmen wollt.",
      },
    ],
    blogSlugs: ["sexstellungen-fuer-mehr-intimitaet", "tipps-fuer-besseren-sex"],
    challengeSlugs: ["intimitaets-challenge"],
  },
  fortgeschritten: {
    sections: [
      {
        h2: "Wenn ihr mehr Herausforderung sucht",
        body: "Diese Stellungen können mehr Kraft, Balance oder Flexibilität verlangen. Startet vorsichtig, nutzt stabile Unterlagen und wechselt bei Unsicherheit sofort zurück zu einfacheren Varianten.",
      },
    ],
    blogSlugs: ["sexstellungen-fuer-paare", "tipps-fuer-besseren-sex"],
    challengeSlugs: ["7-tage-paar-challenge"],
  },
  "wenig-beweglichkeit": {
    sections: [
      {
        h2: "Sanft für Körper und Gelenke",
        body: "Liegen- und Seitenpositionen entlasten oft Hüfte und Wirbelsäule. Kissen können Winkel anpassen und Druck reduzieren – probiert aus, was für euch am angenehmsten ist.",
      },
      {
        h2: "Passende Long-Tail-Guides",
        body: "Speziell für die Kombination aus Einsteiger-Status und wenig Beweglichkeit haben wir eine zusätzliche Kurzübersicht mit Fokus auf diese Suchintention.",
      },
    ],
    blogSlugs: ["beste-sexstellungen-fuer-anfaenger", "sexstellungen-fuer-mehr-intimitaet"],
    challengeSlugs: ["anfaenger-challenge", "intimitaets-challenge"],
  },
};
