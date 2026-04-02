import type { Position, PositionBase } from "@/types";
import { POSITION_APP_META } from "./positionAppMeta";

// All sex positions data - educational content in German
const positionsBase: PositionBase[] = [
  {
    slug: "missionarsstellung",
    name: "Missionarsstellung",
    difficulty: "easy",
    schwierigkeit: "leicht",
    eignung: {
      fuerAnfaenger: true,
      fuerPaare: true,
      wenigBeweglichkeit: true,
      intim: true,
      romantisch: true,
    },
    sicherheit: {
      hinweise: [
        "Ein Kissen unter dem Becken kann den Winkel angenehmer machen.",
        "Kommuniziert über Tempo und Tiefe – besonders bei empfindlichen Stellen.",
      ],
      vermeidenWenn: [
        "Wenn Druck auf Handgelenke/Schultern schmerzt (dann lieber eine seitliche Variante wählen).",
      ],
      tipps: [
        "Langsam starten und den Rhythmus gemeinsam finden.",
        "Mit Beinpositionen experimentieren, um den Winkel zu variieren.",
      ],
    },
    description:
      "Die klassische Missionarsstellung ist eine der bekanntesten und beliebtesten Sexstellungen. Die Frau liegt auf dem Rücken, der Partner liegt darüber und beide blicken sich an. Diese Stellung ermöglicht intensiven Augenkontakt und emotionale Nähe.",
    tips: [
      "Ein Kissen unter dem Po der Frau kann den Winkel verbessern und den G-Punkt besser stimulieren",
      "Kommuniziert offen über Tempo und Tiefe",
      "Die Frau kann die Beine anwinkeln oder um die Hüften des Partners schlingen",
    ],
    variations: [
      "Beine über die Schultern legen für tiefere Penetration",
      "Arme des Partners nutzen zum Abstützen",
      "Kopfkissen für bessere Blickwinkel nutzen",
    ],
    varianten: [
      {
        name: "G-Punkt-Stellung (Winkel-Variante)",
        slug: "an-g-punkt",
        kurzeBeschreibung:
          "Ähnlicher Aufbau, aber mit stärkerem Beckenwinkel für gezieltere Stimulation.",
        unterschiedZurBasisposition:
          "Mehr Fokus auf Winkel/Beckenposition statt reiner Nähe.",
      },
      {
        name: "Seitliche Stellung (sanfter, entspannter)",
        slug: "seitlich",
        kurzeBeschreibung:
          "Sehr gemütlich und oft weniger anstrengend – gut für lange Sessions.",
        unterschiedZurBasisposition:
          "Weniger Druck, mehr Entspannung und ruhigeres Tempo.",
      },
    ],
    relatedSlugs: ["reiterstellung", "loeffelchen", "lotus"],
    verwandteInhalte: [
      {
        type: "position",
        slug: "reiterstellung",
        reason: "Gibt Kontrolle über Tempo und Tiefe.",
      },
      {
        type: "position",
        slug: "loeffelchen",
        reason: "Ähnlich intim, aber noch entspannter.",
      },
      {
        type: "blog",
        slug: "beste-sexstellungen-fuer-anfaenger",
        reason: "Einsteigerfreundliche Auswahl mit Tipps.",
      },
      {
        type: "challenge",
        slug: "anfaenger-challenge",
        reason: "Sanfter Einstieg mit klarer Struktur über mehrere Tage.",
      },
    ],
    categories: [
      "fuer-anfaenger",
      "romantisch",
      "intim",
      "wenig-beweglichkeit",
    ],
  },
  {
    slug: "doggy-style",
    name: "Doggy Style",
    difficulty: "easy",
    schwierigkeit: "leicht",
    eignung: {
      fuerPaare: true,
      experimentell: true,
    },
    sicherheit: {
      hinweise: [
        "Tiefe und Tempo können sich stark anfühlen – tastet euch langsam heran.",
      ],
      vermeidenWenn: [
        "Bei Schmerzen im unteren Rücken oder wenn tiefe Stöße unangenehm sind (Winkel reduzieren).",
      ],
      tipps: [
        "Mit Kissen unter Brust/Becken den Winkel weicher machen.",
        "Kurze Check-ins („so gut?“) helfen, Überforderung zu vermeiden.",
      ],
    },
    description:
      "Beim Doggy Style kniet die Frau auf Händen und Knien, der Partner dringt von hinten ein. Diese Stellung ermöglicht tiefe Penetration und gibt dem Partner guten Zugang zum G-Punkt.",
    tips: [
      "Die Frau kann ein Kissen unter den Händen oder Knien platzieren für mehr Komfort",
      "Tempo und Tiefe sollten kommuniziert werden",
      "Die Wirbelsäule kann gerade oder leicht gewölbt gehalten werden",
    ],
    variations: [
      "Flach auf dem Bauch liegend mit Kissen unter dem Becken",
      "Stehend gegen die Wand gebeugt",
      "Prone Bone – komplett flach auf dem Bauch",
    ],
    relatedSlugs: ["reiterstellung", "missionarsstellung"],
    verwandteInhalte: [
      {
        type: "position",
        slug: "an-g-punkt",
        reason: "Ebenfalls gut für gezielte Stimulation durch Winkel.",
      },
      {
        type: "blog",
        slug: "tipps-fuer-besseren-sex",
        reason: "Kommunikation und Komfort-Tipps passen hier besonders gut.",
      },
      {
        type: "challenge",
        slug: "7-tage-paar-challenge",
        reason: "Abwechslung mit strukturiertem Ablauf.",
      },
    ],
    categories: ["fuer-anfaenger", "tiefe-penetration"],
  },
  {
    slug: "reiterstellung",
    name: "Reiterstellung",
    difficulty: "easy",
    schwierigkeit: "leicht",
    eignung: {
      fuerAnfaenger: true,
      fuerPaare: true,
      intim: true,
      romantisch: true,
      experimentell: true,
    },
    sicherheit: {
      hinweise: [
        "Der/die Obere steuert Tempo und Winkel – langsam beginnen ist meist angenehmer.",
      ],
      vermeidenWenn: [
        "Wenn Knie stark belastet sind (dann ggf. weichere Unterlage oder Variante wählen).",
      ],
      tipps: [
        "Kleinere, kreisende Bewegungen können intensiver sein als große Auf-und-ab-Bewegungen.",
        "Hände zum Abstützen nutzen, wenn Balance schwierig ist.",
      ],
    },
    description:
      "In der Reiterstellung sitzt die Frau auf dem Partner, der liegt oder sitzt. Sie hat die Kontrolle über Tempo, Tiefe und Winkel. Ideale Stellung für Klitorisstimulation und Augenkontakt.",
    tips: [
      "Die Frau kann vor- und zurückwippen oder kreisende Bewegungen machen",
      "Der Partner kann die Hüften der Frau führen",
      "Beide können sich gleichzeitig bewegen für maximale Stimulation",
    ],
    variations: [
      "Klassisch: Frau sitzt aufrecht",
      "Reversed: Frau dreht den Rücken zum Partner",
      "Tiefer: Partner liegt, Frau lehnt sich vor",
    ],
    varianten: [
      {
        name: "Lotusstellung (noch mehr Nähe)",
        slug: "lotus",
        kurzeBeschreibung:
          "Sitzend, eng umschlungen – maximal intim und langsam.",
        unterschiedZurBasisposition:
          "Weniger Dynamik, mehr Umarmung und Augenkontakt.",
      },
    ],
    relatedSlugs: ["missionarsstellung", "lotus"],
    verwandteInhalte: [
      {
        type: "blog",
        slug: "sexstellungen-fuer-paare",
        reason: "Mehr Abwechslung und Ideen für Paare.",
      },
      {
        type: "blog",
        slug: "beste-sexstellungen-fuer-anfaenger",
        reason: "Sehr zugänglich und gut erklärt.",
      },
    ],
    categories: ["fuer-anfaenger", "romantisch", "intim"],
  },
  {
    slug: "loeffelchen",
    name: "Löffelchen",
    difficulty: "easy",
    schwierigkeit: "leicht",
    eignung: {
      fuerAnfaenger: true,
      fuerPaare: true,
      wenigBeweglichkeit: true,
      intim: true,
      romantisch: true,
    },
    sicherheit: {
      hinweise: [
        "Sehr körpernah – achtet auf angenehme Arm-/Nackenpositionen.",
      ],
      vermeidenWenn: [
        "Wenn seitliches Liegen Schmerzen verursacht (z. B. bei Schulterproblemen).",
      ],
      tipps: [
        "Ein Kissen im Rücken oder zwischen den Knien kann den Komfort stark erhöhen.",
        "Langsame Bewegungen und viel Berührung machen diese Stellung besonders intensiv.",
      ],
    },
    description:
      "Beim Löffelchen liegen beide Partner auf der Seite, der penetrierende Partner liegt hinter der anderen Person. Wie zwei Löffel, die ineinander passen. Sehr intim und entspannt.",
    tips: [
      "Die Beine sollten etwas angewinkelt sein für bessere Penetration",
      "Der hintere Partner kann die Arme um die vordere Person legen",
      "Ideal für langsamen, entspannten Sex",
    ],
    variations: [
      "Vordere Person zieht das obere Bein an",
      "Beide können gleichzeitig die Klitoris stimulieren",
      "Küssen und Berühren des Nackens verstärkt die Intimität",
    ],
    relatedSlugs: ["missionarsstellung", "lotus"],
    verwandteInhalte: [
      {
        type: "blog",
        slug: "sexstellungen-fuer-mehr-intimitaet",
        reason: "Fokus auf Nähe, Tempo und Verbindung.",
      },
      {
        type: "challenge",
        slug: "intimitaets-challenge",
        reason: "Mehrere Tage bewusst intime Stellungen entdecken.",
      },
    ],
    categories: [
      "fuer-anfaenger",
      "romantisch",
      "intim",
      "wenig-beweglichkeit",
    ],
  },
  {
    slug: "lotus",
    name: "Lotusstellung",
    difficulty: "medium",
    schwierigkeit: "mittel",
    eignung: {
      fuerPaare: true,
      intim: true,
      romantisch: true,
      experimentell: true,
    },
    sicherheit: {
      hinweise: [
        "Erfordert etwas Flexibilität – langsam in Position kommen und bequem machen.",
      ],
      vermeidenWenn: [
        "Bei Hüft-/Knieproblemen (dann lieber Löffelchen oder Missionarsstellung wählen).",
      ],
      tipps: [
        "Kurze Pausen zum Umarmen/Küssen einbauen – diese Stellung lebt von Langsamkeit.",
      ],
    },
    description:
      "Die Lotusstellung verbindet Intimität mit spiritueller Nähe. Die Frau sitzt im Lotussitz auf dem Schoß des Partners, beide umarmen sich eng. Maximale Haut-an-Haut-Nähe und Augenkontakt.",
    tips: [
      "Langsam und behutsam einnehmen – erfordert etwas Flexibilität",
      "Beide atmen gemeinsam für mehr Verbindung",
      "Küssen und Umarmen während der Stellung intensiviert das Erlebnis",
    ],
    variations: [
      "Leichte Vor- und Rückwärtsbewegung",
      "Hände können überall am Körper wandern",
      "Längeres Verweilen in der Stellung für Tantra-ähnliche Erfahrung",
    ],
    relatedSlugs: ["reiterstellung", "loeffelchen"],
    verwandteInhalte: [
      {
        type: "blog",
        slug: "sexstellungen-fuer-mehr-intimitaet",
        reason: "Passt perfekt zu langsamem, achtsamem Sex.",
      },
      {
        type: "challenge",
        slug: "intimitaets-challenge",
        reason: "Mehr Nähe und Verbindung über mehrere Tage.",
      },
    ],
    categories: ["romantisch", "intim", "fortgeschritten"],
  },
  {
    slug: "kuhlerin",
    name: "Kuhlerin (Standing Rider)",
    difficulty: "medium",
    schwierigkeit: "mittel",
    eignung: {
      fuerPaare: true,
      experimentell: true,
    },
    sicherheit: {
      hinweise: [
        "Kraft und Stabilität sind wichtig – besser mit Wand als Unterstützung starten.",
      ],
      vermeidenWenn: [
        "Wenn Tragen/Belasten unsicher ist oder Rückenschmerzen vorhanden sind.",
      ],
      tipps: [
        "An eine Wand lehnen reduziert Kraftaufwand und erhöht Sicherheit.",
        "Langsam einnehmen und bei Unsicherheit sofort abbrechen und wechseln.",
      ],
    },
    description:
      "Bei der Kuhlerin wird die Frau vom Partner getragen, während sie ihre Beine um seine Hüften schlingt. Erforderlich ist etwas Kraft vom tragenden Partner, belohnt durch intensive Nähe.",
    tips: [
      "Die Frau sollte sich an den Schultern oder am Nacken des Partners festhalten",
      "An eine Wand gelehnt reduziert die Kraftanstrengung",
      "Beide sollten die Kommunikation offen halten",
    ],
    variations: [
      "Stehend in der Mitte des Raums",
      "Mit Rücken an der Wand abgestützt",
      "Die Frau kann aktiv mit der Hüfte mitarbeiten",
    ],
    relatedSlugs: ["reiterstellung", "missionarsstellung"],
    verwandteInhalte: [
      {
        type: "position",
        slug: "reiterstellung",
        reason: "Ähnliches Kontrollgefühl, aber deutlich stabiler.",
      },
      {
        type: "challenge",
        slug: "7-tage-paar-challenge",
        reason: "Gute Abwechslung für Paare, die Neues ausprobieren wollen.",
      },
    ],
    categories: ["tiefe-penetration", "fortgeschritten"],
  },
  {
    slug: "an-g-punkt",
    name: "G-Punkt-Stellung",
    difficulty: "easy",
    schwierigkeit: "leicht",
    eignung: {
      fuerAnfaenger: true,
      fuerPaare: true,
      experimentell: true,
    },
    sicherheit: {
      hinweise: [
        "Gezielte Winkel können intensiv sein – langsam herantasten und Feedback einholen.",
      ],
      vermeidenWenn: [
        "Wenn tiefe Penetration unangenehm ist (dann Winkel reduzieren).",
      ],
      tipps: [
        "Ein Keilkissen/Polster kann den Winkel stabil halten.",
        "Kleine Winkeländerungen wirken oft stärker als schnelleres Tempo.",
      ],
    },
    description:
      "Eine Stellung, die den G-Punkt optimal stimuliert. Die Frau liegt auf dem Rücken mit angewinkelten Beinen oder Beinen über den Schultern. Der Winkel ermöglicht gezielte Stimulation der vorderen Vaginalwand.",
    tips: [
      "Ein Keilkissen unter dem Po hebt das Becken an",
      "Langsames, gezieltes Eindringen kann effektiver sein als schnelle Bewegungen",
      "Die Frau kann mitteilen, wenn der richtige Winkel gefunden wurde",
    ],
    variations: [
      "Missionarsstellung mit hochgelegten Beinen",
      "Reiterstellung mit nach vorne gelehntem Oberkörper",
      "Doggy mit leicht nach unten geneigtem Oberkörper",
    ],
    relatedSlugs: ["missionarsstellung", "doggy-style"],
    verwandteInhalte: [
      {
        type: "blog",
        slug: "tipps-fuer-besseren-sex",
        reason: "Mehr Genuss durch Tempo, Komfort und Kommunikation.",
      },
      {
        type: "position",
        slug: "missionarsstellung",
        reason: "Ähnliche Basis, aber weniger „techniklastig“.",
      },
    ],
    categories: ["fuer-anfaenger", "tiefe-penetration"],
  },
  {
    slug: "schmetterling",
    name: "Schmetterling (Butterfly)",
    difficulty: "advanced",
    schwierigkeit: "anspruchsvoll",
    eignung: {
      fuerPaare: true,
      experimentell: true,
    },
    sicherheit: {
      hinweise: [
        "Die Unterlage muss stabil sein (Bettkante oder sehr stabiler Tisch).",
        "Achtet darauf, dass Beine/Hüfte nicht überdehnt werden.",
      ],
      vermeidenWenn: [
        "Wenn die Unterlage wackelt oder Unsicherheit besteht (Sturz-/Rutschgefahr).",
      ],
      tipps: [
        "Höhe so anpassen, dass kein Zug im Rücken entsteht.",
        "Mit Kissen den Komfort erhöhen und Winkel feinjustieren.",
      ],
    },
    description:
      "Die Frau liegt auf dem Rücken am Rand eines Bettes oder Tisches, die Beine sind über die Schultern des Partners gelegt. Er steht und dringt von vorne ein. Ermöglicht tiefe Penetration und guten Zugang zum G-Punkt.",
    tips: [
      "Stabile Unterlage ist wichtig – Bett oder stabiler Tisch",
      "Die Frau sollte sich festhalten können",
      "Höhe sollte zum Partner passen",
    ],
    variations: [
      "Beine weiter gespreizt für mehr Tiefe",
      "Kissen unter dem Kopf für Komfort",
      "Die Frau kann die Beine um die Taille des Partners legen",
    ],
    relatedSlugs: ["an-g-punkt", "missionarsstellung"],
    verwandteInhalte: [
      {
        type: "position",
        slug: "an-g-punkt",
        reason: "Ähnlicher Fokus auf Winkel und Tiefe, meist weniger wackelig.",
      },
      {
        type: "blog",
        slug: "sexstellungen-fuer-paare",
        reason: "Mehr Abwechslung für Paare, die Neues wollen.",
      },
    ],
    categories: ["tiefe-penetration", "fortgeschritten"],
  },
  {
    slug: "seitlich",
    name: "Seitliche Stellung",
    difficulty: "easy",
    schwierigkeit: "leicht",
    eignung: {
      fuerAnfaenger: true,
      fuerPaare: true,
      wenigBeweglichkeit: true,
      intim: true,
      romantisch: true,
    },
    sicherheit: {
      hinweise: [
        "Sehr komfortabel, aber achtet auf Schulter-/Nackenpositionen.",
      ],
      tipps: [
        "Mit Kissen zwischen den Knien oder im Rücken wird es oft deutlich bequemer.",
      ],
    },
    description:
      "Beide Partner liegen auf der Seite, ein Bein der Frau ist angehoben. Entspannt und intim, ermöglicht Blickkontakt und längeren Geschlechtsverkehr ohne große Anstrengung.",
    tips: [
      "Ein Kissen zwischen den Knien kann Komfort verbessern",
      "Die Höhe des angehobenen Beins bestimmt den Winkel",
      "Ideal für entspannten Sex oder wenn einer Partner erschöpft ist",
    ],
    variations: [
      "Vordere Person dreht sich leicht zum Partner",
      "Unteres Bein ausgestreckt oder angewinkelt",
      "Küssen während der Stellung",
    ],
    relatedSlugs: ["loeffelchen", "missionarsstellung"],
    verwandteInhalte: [
      {
        type: "blog",
        slug: "beste-sexstellungen-fuer-anfaenger",
        reason: "Sehr einsteigerfreundlich und entspannt.",
      },
      {
        type: "challenge",
        slug: "anfaenger-challenge",
        reason: "Passt gut als sanfter Tag in einer Challenge.",
      },
    ],
    categories: [
      "fuer-anfaenger",
      "romantisch",
      "intim",
      "wenig-beweglichkeit",
    ],
  },
];

export const positions: Position[] = positionsBase.map((p) => {
  const meta = POSITION_APP_META[p.slug];
  if (!meta) {
    throw new Error(`Missing POSITION_APP_META for slug: ${p.slug}`);
  }
  return { ...p, ...meta };
});
