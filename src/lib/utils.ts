import { positions } from "@/data/positions";
import type { Position } from "@/types";
import type { CategorySlug } from "@/types";

// Get position by slug
export function getPositionBySlug(slug: string): Position | undefined {
  return positions.find((p) => p.slug === slug);
}

// Get positions by category
export function getPositionsByCategory(category: CategorySlug): Position[] {
  return positions.filter((p) => p.categories.includes(category));
}

// Get related positions
export function getRelatedPositions(position: Position): Position[] {
  return position.relatedSlugs
    .map((slug) => getPositionBySlug(slug))
    .filter((p): p is Position => p !== undefined);
}
