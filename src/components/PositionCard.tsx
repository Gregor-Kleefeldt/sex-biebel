import Link from "next/link";
import type { Position } from "@/types";

interface PositionCardProps {
  position: Position;
}

// Badge component for difficulty level
function DifficultyBadge({ difficulty }: { difficulty: Position["difficulty"] }) {
  const styles = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    advanced: "bg-rose-100 text-rose-800",
  };
  const labels = {
    easy: "Einfach",
    medium: "Mittel",
    advanced: "Fortgeschritten",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${styles[difficulty]}`}
    >
      {labels[difficulty]}
    </span>
  );
}

export function PositionCard({ position }: PositionCardProps) {
  return (
    <Link
      href={`/sexstellungen/${position.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/50"
    >
      {/* Illustration placeholder - decorative geometric shape */}
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 shadow-inner">
          <span className="text-4xl text-primary-400" aria-hidden>
            ●
          </span>
        </div>
      </div>
      {/* Card content */}
      <div className="p-4">
        <h3 className="mb-2 font-semibold text-slate-800 transition-colors group-hover:text-primary-600">
          {position.name}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-slate-600">
          {position.description}
        </p>
        <DifficultyBadge difficulty={position.difficulty} />
      </div>
    </Link>
  );
}
