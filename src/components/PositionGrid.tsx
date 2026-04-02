import { PositionCard } from "./PositionCard";
import type { Position } from "@/types";

interface PositionGridProps {
  positions: Position[];
  /** Highlights cards in the dashboard “Passt zu deinem Level” strip. */
  tierSpotlight?: boolean;
}

export function PositionGrid({ positions, tierSpotlight = false }: PositionGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {positions.map((position) => (
        <PositionCard
          key={position.slug}
          position={position}
          tierSpotlight={tierSpotlight}
        />
      ))}
    </div>
  );
}
