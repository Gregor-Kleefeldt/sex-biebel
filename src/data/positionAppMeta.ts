import type { PositionAppMeta } from "@/types";

/** Per-slug app fields merged into `positions` (content stays in positions.ts). */
export const POSITION_APP_META: Record<string, PositionAppMeta> = {
  missionarsstellung: {
    shortDescription:
      "Klassiker mit Augenkontakt – sanft, nah und gut für den Einstieg.",
    level: 1,
    xpReward: 10,
    unlockedByDefault: true,
    tags: ["Klassiker", "intim", "Anfänger"],
    flexibility: 2,
    stamina: 2,
  },
  "doggy-style": {
    shortDescription:
      "Von hinten – tief, direkt, mit klarem Kommunikationsfokus.",
    level: 1,
    xpReward: 10,
    unlockedByDefault: true,
    tags: ["von hinten", "experimentell"],
    flexibility: 2,
    stamina: 2,
  },
  reiterstellung: {
    shortDescription:
      "Oben sitzen, Tempo und Winkel selbst steuern – sehr viel Kontrolle.",
    level: 1,
    xpReward: 10,
    unlockedByDefault: true,
    tags: ["Kontrolle", "Paare"],
    flexibility: 2,
    stamina: 2,
  },
  loeffelchen: {
    shortDescription:
      "Seitlich, entspannt, sehr nah – ideal für ruhige Sessions.",
    level: 1,
    xpReward: 10,
    unlockedByDefault: true,
    tags: ["entspannt", "intim", "wenig Beweglichkeit"],
    flexibility: 1,
    stamina: 1,
  },
  lotus: {
    shortDescription:
      "Sitzend eng umschlungen – intensiv, langsam, braucht etwas Flexibilität.",
    level: 2,
    xpReward: 18,
    unlockedByDefault: false,
    tags: ["intim", "langsam"],
    flexibility: 3,
    stamina: 2,
  },
  kuhlerin: {
    shortDescription:
      "Getragen werden – kraftvoll, intensiv, braucht Vertrauen und Stabilität.",
    level: 2,
    xpReward: 18,
    unlockedByDefault: false,
    tags: ["stehend", "kraftvoll"],
    flexibility: 2,
    stamina: 3,
  },
  "an-g-punkt": {
    shortDescription:
      "Winkel für gezielte Stimulation – gut steuerbar mit Kissen & Tempo.",
    level: 1,
    xpReward: 10,
    unlockedByDefault: true,
    tags: ["Winkel", "Stimulation"],
    flexibility: 2,
    stamina: 2,
  },
  schmetterling: {
    shortDescription:
      "Am Bettrand – tief, anspruchsvoll, stabile Unterlage ist Pflicht.",
    level: 3,
    xpReward: 28,
    unlockedByDefault: false,
    tags: ["tief", "fortgeschritten"],
    flexibility: 3,
    stamina: 3,
  },
  seitlich: {
    shortDescription:
      "Sanft seitlich – gelenkschonend und trotzdem verbunden.",
    level: 1,
    xpReward: 10,
    unlockedByDefault: true,
    tags: ["sanft", "wenig Beweglichkeit"],
    flexibility: 1,
    stamina: 1,
  },
};
