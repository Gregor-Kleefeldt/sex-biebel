import { PositionCard } from "./PositionCard";
import type { Position } from "@/types";

interface PositionGridProps {
  positions: Position[];
}

export function PositionGrid({ positions }: PositionGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {positions.map((position) => (
        <PositionCard key={position.slug} position={position} />
      ))}
    </div>
  );
}
