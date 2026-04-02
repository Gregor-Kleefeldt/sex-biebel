"use client";

import Link from "next/link";
import type { Position } from "@/types";
import { useAppProgress } from "@/context/AppProgressProvider";
import {
  getUnlockedAppLevel,
  getXpRemainingToUnlockPosition,
} from "@/lib/appProgress";

interface PositionCardProps {
  position: Position;
  /** When true, adds a subtle ring/badge for the dashboard “Passt zu deinem Level” strip. */
  tierSpotlight?: boolean;
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

function IconLock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function IconHeart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 21s-6.716-5.436-9-9.5C.68 8.07 2.5 5.5 5.5 5.5c1.899 0 3.182 1.174 4.5 3 1.318-1.826 2.601-3 4.5-3 3 0 4.82 2.57 2.5 6C18.716 15.564 12 21 12 21z" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function PositionCard({ position, tierSpotlight = false }: PositionCardProps) {
  const { isFavorite, isCompleted, isUnlocked, totalXp } = useAppProgress();
  const unlocked = isUnlocked(position);
  const fav = isFavorite(position.slug);
  const done = isCompleted(position.slug);
  const xpToUnlock = getXpRemainingToUnlockPosition(position, totalXp);
  const userAppLevel = getUnlockedAppLevel(totalXp);
  const teaser =
    position.shortDescription?.trim() ||
    `${position.description.slice(0, 120)}${position.description.length > 120 ? "…" : ""}`;

  const lockHint =
    !unlocked &&
    xpToUnlock > 0 &&
    `Noch ${xpToUnlock} XP bis App-Level ${position.level}`;
  const lockHintFallback =
    !unlocked &&
    xpToUnlock <= 0 &&
    `Benötigt App-Level ${position.level} (aktuell ${userAppLevel})`;

  const ariaLabel = [
    position.name,
    unlocked ? "Freigeschaltet" : "Gesperrt",
    fav ? "Favorit" : "",
    done ? "Erledigt" : "",
  ]
    .filter(Boolean)
    .join(", ");

  const cardRing = tierSpotlight && unlocked
    ? "ring-2 ring-amber-300/70 ring-offset-2 ring-offset-white"
    : unlocked
      ? "ring-1 ring-primary-100"
      : "ring-1 ring-slate-200/90";

  return (
    <Link
      href={`/sexstellungen/${position.slug}`}
      aria-label={ariaLabel}
      className={`group relative block overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-100/50 ${cardRing} ${
        unlocked ? "border-slate-200 opacity-100" : "border-slate-200/90"
      } ${!unlocked ? "opacity-[0.92]" : ""} ${done ? "border-emerald-200/80" : ""}`}
    >
      <div
        className={`pointer-events-none absolute right-2 top-2 z-20 flex max-w-[min(100%,12rem)] flex-wrap items-center justify-end gap-1`}
      >
        {!unlocked && (
          <span
            className="inline-flex items-center gap-0.5 rounded-full bg-slate-900/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm sm:text-xs"
            title={lockHint || lockHintFallback || "Gesperrt"}
          >
            <IconLock className="h-3.5 w-3.5 shrink-0 text-white/95" />
            Gesperrt
          </span>
        )}
        {unlocked && tierSpotlight && (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-900 shadow-sm sm:text-xs">
            Neu frei
          </span>
        )}
        {fav && (
          <span
            className="inline-flex items-center justify-center rounded-full bg-rose-100 p-1.5 text-rose-700 shadow-sm"
            title="Favorit"
          >
            <IconHeart className="h-3.5 w-3.5" />
            <span className="sr-only">Favorit</span>
          </span>
        )}
        {done && (
          <span
            className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-900 shadow-sm sm:text-xs"
            title="Erledigt"
          >
            <IconCheck className="h-3.5 w-3.5 text-emerald-700" />
            Erledigt
          </span>
        )}
      </div>

      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 ${
          !unlocked ? "saturate-[0.78]" : ""
        }`}
      >
        {!unlocked && (
          <>
            <div
              className="absolute inset-0 bg-slate-900/25"
              aria-hidden
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(15,23,42,0.35)_100%)]"
              aria-hidden
            />
          </>
        )}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/80 shadow-inner">
          {!unlocked ? (
            <IconLock className="h-9 w-9 text-slate-500" />
          ) : (
            <span className="text-4xl text-primary-400" aria-hidden>
              ●
            </span>
          )}
        </div>
        {!unlocked && (
          <span className="absolute bottom-2 left-1/2 z-10 max-w-[92%] -translate-x-1/2 rounded-full bg-slate-900/85 px-3 py-1 text-center text-[11px] font-medium leading-snug text-white shadow-md sm:bottom-3 sm:py-1.5 sm:text-xs">
            {lockHint || lockHintFallback}
          </span>
        )}
      </div>

      <div className={`relative p-4 ${!unlocked ? "opacity-95" : ""}`}>
        <div className="mb-2 flex flex-wrap items-center gap-2 pr-1 sm:pr-14">
          <h3 className="font-semibold text-slate-800 transition-colors group-hover:text-primary-600">
            {position.name}
          </h3>
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
