import { positions } from "@/data/positions";
import { blogArticles } from "@/data/blog";
import { challenges } from "@/data/challenges";
import type { LongTailLandingPage } from "@/data/longTailPages";
import type { Position } from "@/types";
import type { CategorySlug } from "@/types";
import type { BlogArticle, Challenge, VerwandterInhalt } from "@/types";

// Get position by slug
export function getPositionBySlug(slug: string): Position | undefined {
  return positions.find((p) => p.slug === slug);
}

export function getBlogArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug);
}

// Get positions by category
export function getPositionsByCategory(category: CategorySlug): Position[] {
  return positions.filter((p) => p.categories.includes(category));
}

// Positions matching a long-tail landing page filter
export function getPositionsForLongTail(
  definition: LongTailLandingPage,
): Position[] {
  return positions.filter(definition.filter);
}

function normalizeVerwandteInhalte(position: Position): VerwandterInhalt[] {
  const fromNew = position.verwandteInhalte ?? [];
  const fromOld = (position.relatedSlugs ?? []).map((slug) => ({
    type: "position" as const,
    slug,
  }));

  const seen = new Set<string>();
  const merged: VerwandterInhalt[] = [];

  for (const item of [...fromNew, ...fromOld]) {
    const key = `${item.type}:${item.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(item);
  }

  return merged;
}

export function getVerwandteInhalte(position: Position): VerwandterInhalt[] {
  return normalizeVerwandteInhalte(position);
}

export function getVerwandteInhalteAufgeloest(position: Position): {
  positionen: Position[];
  blogartikel: BlogArticle[];
  challenges: Challenge[];
} {
  const items = normalizeVerwandteInhalte(position);

  const positionen: Position[] = [];
  const blogartikel: BlogArticle[] = [];
  const challengeItems: Challenge[] = [];

  for (const item of items) {
    if (item.type === "position") {
      const p = getPositionBySlug(item.slug);
      if (p) positionen.push(p);
    } else if (item.type === "blog") {
      const a = getBlogArticleBySlug(item.slug);
      if (a) blogartikel.push(a);
    } else if (item.type === "challenge") {
      const c = getChallengeBySlug(item.slug);
      if (c) challengeItems.push(c);
    }
  }

  return { positionen, blogartikel, challenges: challengeItems };
}

// Get related positions (backwards compatible)
export function getRelatedPositions(position: Position): Position[] {
  const items = normalizeVerwandteInhalte(position).filter(
    (i) => i.type === "position",
  );
  return items
    .map((i) => getPositionBySlug(i.slug))
    .filter((p): p is Position => p !== undefined);
}
