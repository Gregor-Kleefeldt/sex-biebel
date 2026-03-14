import type { CategorySlug } from "@/types";

// Category metadata for navigation and SEO
export const categories: Record<
  CategorySlug,
  { name: string; description: string }
> = {
  "fuer-anfaenger": {
    name: "Für Anfänger",
    description:
      "Einfache und einsteigerfreundliche Sexstellungen. Perfekt für den Anfang oder entspannten Sex.",
  },
  romantisch: {
    name: "Romantisch",
    description:
      "Stellungen für Augenkontakt, Nähe und emotionale Verbindung. Ideal für intensive Momente zu zweit.",
  },
  "tiefe-penetration": {
    name: "Tiefe Penetration",
    description:
      "Stellungen, die tiefe Penetration und intensive Stimulation ermöglichen.",
  },
  intim: {
    name: "Intim",
    description:
      "Haut-an-Haut, entspannt und verbunden. Stellungen für maximale körperliche und emotionale Nähe.",
  },
  fortgeschritten: {
    name: "Fortgeschritten",
    description:
      "Anspruchsvollere Stellungen, die etwas Übung oder Flexibilität erfordern.",
  },
};
