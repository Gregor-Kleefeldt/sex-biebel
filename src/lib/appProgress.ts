import type { AppLevel, Position } from "@/types";
import { positions } from "@/data/positions";

/** XP needed to unlock app tier 2 (more Stellungen spielbar). */
export const XP_THRESHOLD_LEVEL_2 = 36;

/** XP needed to unlock app tier 3. */
export const XP_THRESHOLD_LEVEL_3 = 84;

const xpRewardBySlug = new Map(
  positions.map((p) => [p.slug, p.xpReward] as const),
);

export function getUnlockedAppLevel(totalXp: number): AppLevel {
  if (totalXp >= XP_THRESHOLD_LEVEL_3) return 3;
  if (totalXp >= XP_THRESHOLD_LEVEL_2) return 2;
  return 1;
}

export function computeTotalXp(completedSlugs: readonly string[]): number {
  let sum = 0;
  for (const slug of completedSlugs) {
    sum += xpRewardBySlug.get(slug) ?? 0;
  }
  return sum;
}

export function isPositionUnlockedForUser(
  position: Position,
  totalXp: number,
): boolean {
  return position.level <= getUnlockedAppLevel(totalXp);
}

export function xpUntilNextTier(totalXp: number): {
  targetLevel: AppLevel | null;
  xpRemaining: number;
} {
  if (totalXp < XP_THRESHOLD_LEVEL_2) {
    return { targetLevel: 2, xpRemaining: XP_THRESHOLD_LEVEL_2 - totalXp };
  }
  if (totalXp < XP_THRESHOLD_LEVEL_3) {
    return { targetLevel: 3, xpRemaining: XP_THRESHOLD_LEVEL_3 - totalXp };
  }
  return { targetLevel: null, xpRemaining: 0 };
}

/** XP total required so `getUnlockedAppLevel(totalXp)` reaches at least `minLevel`. */
function xpRequiredForMinAppLevel(minLevel: AppLevel): number {
  if (minLevel <= 1) return 0;
  if (minLevel === 2) return XP_THRESHOLD_LEVEL_2;
  return XP_THRESHOLD_LEVEL_3;
}

/**
 * When a position is still locked, returns how much XP is still needed until the
 * user’s app level reaches `position.level` (same rule as `isPositionUnlockedForUser`).
 */
export function getXpRemainingToUnlockPosition(
  position: Position,
  totalXp: number,
): number {
  const required = xpRequiredForMinAppLevel(position.level);
  return Math.max(0, required - totalXp);
}
