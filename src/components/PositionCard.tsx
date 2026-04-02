"use client";

import Link from "next/link";
import type { Position } from "@/types";
import { useAppProgress } from "@/context/AppProgressProvider";

interface PositionCardProps {
  position: Position;
}

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
  const { isFavorite, isCompleted, isUnlocked } = useAppProgress();
  const unlocked = isUnlocked(position);
  const fav = isFavorite(position.slug);
  const done = isCompleted(position.slug);
  const teaser =
    position.shortDescription?.trim() ||
    `${position.description.slice(0, 120)}${position.description.length > 120 ? "…" : ""}`;

  return (
    <Link
      href={`/sexstellungen/${position.slug}`}
      className={`group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/50 ${
        unlocked ? "" : "opacity-75"
      }`}
    >
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/80 shadow-inner">
          <span className="text-4xl text-primary-400" aria-hidden>
            ●
          </span>
        </div>
        {!unlocked && (
          <span className="absolute bottom-3 left-1/2 max-w-[90%] -translate-x-1/2 rounded-full bg-slate-900/80 px-3 py-1 text-center text-xs font-medium text-white">
            Level {position.level} · gesperrt
          </span>
        )}
      </div>
      <div className="relative p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-slate-800 transition-colors group-hover:text-primary-600">
            {position.name}
          </h3>
          {fav && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
              Favorit
            </span>
          )}
          {done && (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-900">
              Erledigt
            </span>
          )}
        </div>
        <p className="mb-3 line-clamp-2 text-sm text-slate-600">{teaser}</p>
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={position.difficulty} />
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
            Lv.{position.level}
          </span>
          <span className="text-xs text-slate-500">+{position.xpReward} XP</span>
        </div>
      </div>
    </Link>
  );
}
