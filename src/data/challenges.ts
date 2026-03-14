import type { Challenge } from "@/types";

// Challenge data for the challenge section
export const challenges: Challenge[] = [
  {
    slug: "7-tage-paar-challenge",
    title: "7-Tage-Paar-Challenge",
    description:
      "Eine Woche voller Entdeckung und Nähe. Jeden Tag eine neue Stellung ausprobieren und eure Verbindung vertiefen.",
    duration: "7 Tage",
    positionSlugs: [
      "missionarsstellung",
      "reiterstellung",
      "loeffelchen",
      "doggy-style",
      "lotus",
      "seitlich",
      "an-g-punkt",
    ],
  },
  {
    slug: "intimitaets-challenge",
    title: "Intimitäts-Challenge",
    description:
      "Fokussiere dich auf Stellungen, die maximale emotionale und körperliche Nähe schaffen. Perfekt für Paare, die sich neu verbinden möchten.",
    duration: "5 Tage",
    positionSlugs: ["loeffelchen", "lotus", "missionarsstellung", "seitlich", "reiterstellung"],
  },
  {
    slug: "anfaenger-challenge",
    title: "Anfänger-Challenge",
    description:
      "Sanft und einsteigerfreundlich. Lerne die besten Stellungen für den Anfang kennen – ohne Druck, mit viel Nähe.",
    duration: "4 Tage",
    positionSlugs: ["missionarsstellung", "reiterstellung", "loeffelchen", "seitlich"],
  },
];
