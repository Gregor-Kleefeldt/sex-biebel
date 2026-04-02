"use client";

import Link from "next/link";
import { useMemo } from "react";
import { PositionGrid } from "@/components/PositionGrid";
import { useAppProgress } from "@/context/AppProgressProvider";
import {
  XP_THRESHOLD_LEVEL_2,
  XP_THRESHOLD_LEVEL_3,
} from "@/lib/appProgress";
import { categories } from "@/data/categories";
import { positions } from "@/data/positions";
import type { CategorySlug } from "@/types";

const QUICK_CATS: CategorySlug[] = [
  "fuer-anfaenger",
  "romantisch",
  "intim",
  "fortgeschritten",
];

export function DashboardHome() {
  const {
    totalXp,
    completed,
    unlockedLevel,
    nextTier,
    isCompleted,
    isUnlocked,
  } = useAppProgress();

  const tierProgressPct = useMemo(() => {
    if (totalXp >= XP_THRESHOLD_LEVEL_3) return 100;
    if (totalXp >= XP_THRESHOLD_LEVEL_2) {
      return Math.min(
        100,
        Math.round(
          ((totalXp - XP_THRESHOLD_LEVEL_2) /
            (XP_THRESHOLD_LEVEL_3 - XP_THRESHOLD_LEVEL_2)) *
            100,
        ),
      );
    }
    return Math.min(
      100,
      Math.round((totalXp / XP_THRESHOLD_LEVEL_2) * 100),
    );
  }, [totalXp]);

  const recommended = useMemo(() => {
    const open = positions.filter((p) => isUnlocked(p) && !isCompleted(p.slug));
    if (open.length > 0) return open.slice(0, 6);
    return positions.filter((p) => isUnlocked(p)).slice(0, 6);
  }, [isCompleted, isUnlocked]);

  const newlyUnlocked = useMemo(() => {
    return positions
      .filter((p) => p.level === unlockedLevel && isUnlocked(p))
      .slice(0, 3);
  }, [unlockedLevel, isUnlocked]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary-700">
            Paar-App · MVP
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Hallo – bereit für etwas Neues?
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-slate-600">
            Entdeckt Stellungen spielerisch, sammelt XP und schaltet neue Ideen
            frei – lokal auf diesem Gerät, ohne Account.
          </p>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm lg:col-span-2">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Fortschritt
              </h2>
              <div className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-900">{totalXp}</span>
                <span className="text-slate-600">XP</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-700">
                  {completed.length} erledigt
                </span>
                <span className="text-slate-400">·</span>
                <span className="rounded-full bg-primary-100 px-2 py-0.5 text-sm font-medium text-primary-900">
                  App-Level {unlockedLevel}
                </span>
              </div>
              <div
                className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={tierProgressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Fortschritt bis zum nächsten Level"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all"
                  style={{ width: `${tierProgressPct}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-slate-600">
                {nextTier.targetLevel !== null && nextTier.xpRemaining > 0 ? (
                  <>
                    Nächstes Unlock:{" "}
                    <strong>Level {nextTier.targetLevel}</strong> in{" "}
                    <strong>{nextTier.xpRemaining} XP</strong>.
                  </>
                ) : (
                  <>Maximales App-Level erreicht – weiterhin XP sammeln möglich.</>
                )}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <Link
                href="/sexstellungen"
                className="rounded-xl bg-primary-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-primary-700"
              >
                Jetzt entdecken
              </Link>
              <Link
                href="/sexstellungen/fuer-anfaenger"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Für Anfänger
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-4 text-xl font-bold text-slate-900">
          Schnellzugriff Kategorien
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_CATS.map((slug) => (
            <Link
              key={slug}
              href={`/sexstellungen/${slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary-200 hover:shadow-md"
            >
              <span className="font-semibold text-slate-800">
                {categories[slug].name}
              </span>
              <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                {categories[slug].description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {newlyUnlocked.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50/80 py-12">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-6 text-xl font-bold text-slate-900">
              Passt zu deinem Level
            </h2>
            <PositionGrid positions={newlyUnlocked} />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold text-slate-900">
          Empfohlen für euch
        </h2>
        <PositionGrid positions={recommended} />
        <div className="mt-8 text-center">
          <Link
            href="/sexstellungen"
            className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
          >
            Zum Katalog →
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            Mehr entdecken (optional)
          </h2>
          <p className="mb-4 max-w-2xl text-slate-600">
            Blog und Challenges bleiben als zusätzliche Inspiration erreichbar –
            Kern der App sind Stellungen, Fortschritt und Favoriten.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="text-sm font-medium text-primary-700 hover:underline"
            >
              Zum Blog
            </Link>
            <Link
              href="/challenge"
              className="text-sm font-medium text-accent-700 hover:underline"
            >
              Zu den Challenges
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
