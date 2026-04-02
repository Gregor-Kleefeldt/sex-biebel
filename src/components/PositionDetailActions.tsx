"use client";

import { useAppProgress } from "@/context/AppProgressProvider";
import type { Position } from "@/types";

export function PositionDetailActions({ position }: { position: Position }) {
  const {
    toggleFavorite,
    toggleCompleted,
    isFavorite,
    isCompleted,
    isUnlocked,
    totalXp,
    unlockedLevel,
    nextTier,
  } = useAppProgress();

  const unlocked = isUnlocked(position);
  const fav = isFavorite(position.slug);
  const done = isCompleted(position.slug);

  return (
    <section
      className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:mb-8 sm:p-6"
      aria-label="App-Aktionen"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Aktionen
      </p>
      {!unlocked && (
        <div className="mb-3 mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 sm:mb-4">
          <p className="font-medium">Noch nicht freigeschaltet</p>
          <p className="mt-1 text-amber-900/90">
            Diese Stellung gehört zu <strong>Level {position.level}</strong>. Dein
            App-Level ist <strong>{unlockedLevel}</strong> ({totalXp} XP).
            {nextTier.targetLevel !== null && nextTier.xpRemaining > 0 && (
              <>
                {" "}
                Noch <strong>{nextTier.xpRemaining} XP</strong> bis Level{" "}
                {nextTier.targetLevel}.
              </>
            )}
          </p>
        </div>
      )}

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <button
          type="button"
          onClick={() => toggleFavorite(position.slug)}
          className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
            fav
              ? "bg-amber-100 text-amber-950 ring-2 ring-amber-300"
              : "bg-slate-100 text-slate-800 hover:bg-slate-200"
          }`}
        >
          {fav ? "Favorit entfernen" : "Als Favorit speichern"}
        </button>

        <button
          type="button"
          disabled={!unlocked}
          onClick={() => unlocked && toggleCompleted(position.slug)}
          className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
            !unlocked
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : done
                ? "bg-emerald-100 text-emerald-950 ring-2 ring-emerald-300"
                : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
        >
          {done ? "Erledigt (zurücknehmen)" : "Als erledigt markieren"}
        </button>

        <p className="text-sm text-slate-600 sm:ml-auto">
          +{position.xpReward} XP bei Erledigung · Level {position.level}
        </p>
      </div>
    </section>
  );
}
