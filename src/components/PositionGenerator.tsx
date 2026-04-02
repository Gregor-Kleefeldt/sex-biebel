"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useAppProgress } from "@/context/AppProgressProvider";
import { trackEvent } from "@/lib/analytics";
import {
  DEFAULT_GENERATOR_FILTERS,
  generatePositionSuggestions,
  type GeneratorEnergy,
  type GeneratorExperience,
  type GeneratorFilters,
  type GeneratorFlexibility,
  type GeneratorMood,
  type GeneratorPlace,
  type GeneratorRunResult,
  type GeneratorSuggestion,
  type GeneratorTime,
} from "@/lib/positionGenerator";
import {
  getUnlockedAppLevel,
  getXpRemainingToUnlockPosition,
} from "@/lib/appProgress";
import { positions } from "@/data/positions";
import type { Position } from "@/types";

/** Chip-Zeile für eine Filterdimension (kompakt, touch-freundlich). */
function FilterChipGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  getLabel,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
  getLabel: (v: T) => string;
}) {
  const baseId = useId();
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt;
          const id = `${baseId}-${opt}`;
          return (
            <button
              key={opt}
              id={id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(opt)}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                selected
                  ? "border-primary-500 bg-primary-50 text-primary-900 shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-primary-200 hover:bg-primary-50/50"
              }`}
            >
              {getLabel(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Schwierigkeits-Badge (Farben wie PositionCard). */
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
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[difficulty]}`}
    >
      {labels[difficulty]}
    </span>
  );
}

/** Schloss für gesperrte Karten. */
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

const MOODS: GeneratorMood[] = [
  "romantisch",
  "verspielt",
  "abenteuerlich",
  "intim",
];
const TIMES: GeneratorTime[] = ["kurz", "mittel", "entspannt"];
const ENERGIES: GeneratorEnergy[] = ["wenig", "normal", "aktiv"];
const FLEXES: GeneratorFlexibility[] = ["wenig", "normal", "flexibel"];
const PLACES: GeneratorPlace[] = [
  "bett",
  "sofa",
  "dusche",
  "kleiner-raum",
];
const EXPS: GeneratorExperience[] = [
  "anfaenger",
  "mittel",
  "fortgeschritten",
];

/** Stellungsgenerator mit Filtern und Ergebnisliste. */
export function PositionGenerator() {
  const { isUnlocked, isFavorite, toggleFavorite, totalXp, hydrated } =
    useAppProgress();
  const [filters, setFilters] = useState<GeneratorFilters>(
    DEFAULT_GENERATOR_FILTERS,
  );
  const [salt, setSalt] = useState(() => `${Date.now()}`);
  const [result, setResult] = useState<GeneratorRunResult | null>(null);
  const openedTracked = useRef(false);

  useEffect(() => {
    if (!hydrated || openedTracked.current) return;
    openedTracked.current = true;
    trackEvent("generator_opened", {});
  }, [hydrated]);

  const emitResultsAnalytics = useCallback(
    (
      r: GeneratorRunResult,
      kind: "initial" | "apply" | "regen",
    ) => {
      trackEvent("generator_results_shown", {
        tier: r.tier,
        count: r.suggestions.length,
        top_slug: r.suggestions[0]?.position.slug ?? "",
        kind,
      });
    },
    [],
  );

  const compute = useCallback(
    (f: GeneratorFilters, s: string) => {
      return generatePositionSuggestions(
        positions,
        f,
        (p) => isUnlocked(p),
        s,
      );
    },
    [isUnlocked],
  );

  useEffect(() => {
    if (!hydrated) return;
    const r = compute(filters, salt);
    setResult(r);
    emitResultsAnalytics(r, "initial");
    // Nur nach Hydration einmal – Filter ändern Nutzer bewusst über den Button.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initial load only
  }, [hydrated]);

  const onApplyFilters = useCallback(() => {
    const r = compute(filters, salt);
    setResult(r);
    trackEvent("generator_filters_applied", {
      mood: filters.mood,
      time: filters.time,
      energy: filters.energy,
      flexibility: filters.flexibility,
      place: filters.place,
      experience: filters.experience,
    });
    emitResultsAnalytics(r, "apply");
  }, [compute, filters, salt, emitResultsAnalytics]);

  const onRegenerate = useCallback(() => {
    const nextSalt = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setSalt(nextSalt);
    const r = compute(filters, nextSalt);
    setResult(r);
    emitResultsAnalytics(r, "regen");
  }, [compute, filters, emitResultsAnalytics]);

  const moodLabel = useMemo(
    () =>
      ({
        romantisch: "Romantisch",
        verspielt: "Verspielt",
        abenteuerlich: "Abenteuerlich",
        intim: "Intim",
      }) satisfies Record<GeneratorMood, string>,
    [],
  );
  const timeLabel = useMemo(
    () =>
      ({
        kurz: "Kurz",
        mittel: "Mittel",
        entspannt: "Entspannt",
      }) satisfies Record<GeneratorTime, string>,
    [],
  );
  const energyLabel = useMemo(
    () =>
      ({
        wenig: "Wenig Aufwand",
        normal: "Normal",
        aktiv: "Aktiv",
      }) satisfies Record<GeneratorEnergy, string>,
    [],
  );
  const flexLabel = useMemo(
    () =>
      ({
        wenig: "Wenig Beweglichkeit",
        normal: "Normal",
        flexibel: "Flexibel",
      }) satisfies Record<GeneratorFlexibility, string>,
    [],
  );
  const placeLabel = useMemo(
    () =>
      ({
        bett: "Bett",
        sofa: "Sofa",
        dusche: "Dusche",
        "kleiner-raum": "Kleiner Raum",
      }) satisfies Record<GeneratorPlace, string>,
    [],
  );
  const expLabel = useMemo(
    () =>
      ({
        anfaenger: "Anfänger",
        mittel: "Mittel",
        fortgeschritten: "Fortgeschritten",
      }) satisfies Record<GeneratorExperience, string>,
    [],
  );

  return (
    <div className="space-y-10">
      <section
        className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-primary-50/20 to-accent-50/20 p-5 shadow-sm sm:p-7"
        aria-labelledby="generator-filters-heading"
      >
        <h2
          id="generator-filters-heading"
          className="mb-1 text-lg font-bold text-slate-900"
        >
          Deine Situation
        </h2>
        <p className="mb-6 text-sm text-slate-600">
          Tippe dich kurz ein – wir kombinieren Kategorien, Tags und
          Schwierigkeit mit einfachen Regeln. Kein Quiz, nur eine klare
          Empfehlung.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <FilterChipGroup
            label="Stimmung / Ziel"
            value={filters.mood}
            options={MOODS}
            onChange={(mood) => setFilters((f) => ({ ...f, mood }))}
            getLabel={(m) => moodLabel[m]}
          />
          <FilterChipGroup
            label="Zeit"
            value={filters.time}
            options={TIMES}
            onChange={(time) => setFilters((f) => ({ ...f, time }))}
            getLabel={(t) => timeLabel[t]}
          />
          <FilterChipGroup
            label="Energie / Aufwand"
            value={filters.energy}
            options={ENERGIES}
            onChange={(energy) => setFilters((f) => ({ ...f, energy }))}
            getLabel={(e) => energyLabel[e]}
          />
          <FilterChipGroup
            label="Beweglichkeit"
            value={filters.flexibility}
            options={FLEXES}
            onChange={(flexibility) =>
              setFilters((f) => ({ ...f, flexibility }))
            }
            getLabel={(x) => flexLabel[x]}
          />
          <FilterChipGroup
            label="Ort"
            value={filters.place}
            options={PLACES}
            onChange={(place) => setFilters((f) => ({ ...f, place }))}
            getLabel={(p) => placeLabel[p]}
          />
          <FilterChipGroup
            label="Erfahrung"
            value={filters.experience}
            options={EXPS}
            onChange={(experience) =>
              setFilters((f) => ({ ...f, experience }))
            }
            getLabel={(x) => expLabel[x]}
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <button
            type="button"
            onClick={onApplyFilters}
            className="inline-flex items-center justify-center rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
          >
            Vorschläge aktualisieren
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50"
          >
            Neu generieren
          </button>
        </div>
      </section>

      {result && (
        <section aria-live="polite">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              Drei Ideen für euch
            </h2>
            {result.tier === "eng" ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-900">
                Enge Treffer
              </span>
            ) : (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                Ähnliche Treffer
              </span>
            )}
          </div>
          {result.note && (
            <p className="mb-6 rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
              {result.note}
            </p>
          )}
          <ul className="grid gap-5 md:grid-cols-3">
            {result.suggestions.map((s) => (
              <GeneratorResultCard
                key={s.position.slug}
                suggestion={s}
                isUnlocked={isUnlocked}
                isFavorite={isFavorite}
                toggleFavorite={toggleFavorite}
                totalXp={totalXp}
              />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

/** Karte für einen Generator-Treffer inkl. CTAs. */
function GeneratorResultCard({
  suggestion,
  isUnlocked,
  isFavorite,
  toggleFavorite,
  totalXp,
}: {
  suggestion: GeneratorSuggestion;
  isUnlocked: (p: Position) => boolean;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => void;
  totalXp: number;
}) {
  const { position, reasons } = suggestion;
  const unlocked = isUnlocked(position);
  const fav = isFavorite(position.slug);
  const teaser =
    position.shortDescription?.trim() ||
    `${position.description.slice(0, 110)}${position.description.length > 110 ? "…" : ""}`;
  const xpToUnlock = getXpRemainingToUnlockPosition(position, totalXp);
  const userAppLevel = getUnlockedAppLevel(totalXp);

  return (
    <li className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {!unlocked && (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
            <IconLock className="h-3 w-3" />
            Gesperrt
          </span>
        )}
        <DifficultyBadge difficulty={position.difficulty} />
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
          Lv.{position.level}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{position.name}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{teaser}</p>
      {reasons.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {reasons.map((r) => (
            <li
              key={r}
              className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-900"
            >
              {r}
            </li>
          ))}
        </ul>
      )}
      {!unlocked && (
        <p className="mt-3 text-xs text-slate-500">
          {xpToUnlock > 0
            ? `Noch ${xpToUnlock} XP bis App-Level ${position.level}.`
            : `Benötigt App-Level ${position.level} (du: ${userAppLevel}).`}
        </p>
      )}
      <div className="mt-4 flex flex-1 flex-col justify-end gap-2 sm:flex-row sm:flex-wrap">
        <Link
          href={`/sexstellungen/${position.slug}`}
          onClick={() =>
            trackEvent("generator_result_opened", {
              slug: position.slug,
            })
          }
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Zur Stellung
        </Link>
        <button
          type="button"
          onClick={() => toggleFavorite(position.slug)}
          className={`inline-flex flex-1 items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
            fav
              ? "border-rose-200 bg-rose-50 text-rose-800"
              : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
          }`}
        >
          {fav ? "Favorit ✓" : "Als Favorit speichern"}
        </button>
      </div>
    </li>
  );
}
