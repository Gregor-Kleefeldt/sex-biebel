"use client";

import { useMemo, useState } from "react";
import { PositionGrid } from "@/components/PositionGrid";
import { useAppProgress } from "@/context/AppProgressProvider";
import { trackExploreFilterChanged } from "@/lib/analytics";
import { categories } from "@/data/categories";
import type { Position } from "@/types";
import type { CategorySlug } from "@/types";
import type { Difficulty } from "@/types";

const CATEGORY_ORDER: CategorySlug[] = [
  "fuer-anfaenger",
  "wenig-beweglichkeit",
  "intim",
  "romantisch",
  "tiefe-penetration",
  "fortgeschritten",
];

interface ExploreCatalogProps {
  positions: Position[];
}

export function ExploreCatalog({ positions }: ExploreCatalogProps) {
  const { favorites } = useAppProgress();
  const [category, setCategory] = useState<"" | CategorySlug>("");
  const [difficulty, setDifficulty] = useState<"" | Difficulty>("");
  const [level, setLevel] = useState<"" | "1" | "2" | "3">("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = positions;
    if (category) {
      list = list.filter((p) => p.categories.includes(category));
    }
    if (difficulty) {
      list = list.filter((p) => p.difficulty === difficulty);
    }
    if (level) {
      const n = Number(level) as 1 | 2 | 3;
      list = list.filter((p) => p.level === n);
    }
    if (favoritesOnly) {
      list = list.filter((p) => favorites.includes(p.slug));
    }
    return list;
  }, [positions, category, difficulty, level, favoritesOnly, favorites]);

  const filtersActive =
    Boolean(category) ||
    Boolean(difficulty) ||
    Boolean(level) ||
    favoritesOnly;

  const clearFilters = () => {
    setCategory("");
    setDifficulty("");
    setLevel("");
    setFavoritesOnly(false);
    trackExploreFilterChanged("reset", "all");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Filter
          </h2>
          {filtersActive && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline"
            >
              Zurücksetzen
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Kategorie
            <select
              value={category}
              onChange={(e) => {
                const v = (e.target.value || "") as "" | CategorySlug;
                setCategory(v);
                trackExploreFilterChanged("category", v || "all");
              }}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option value="">Alle</option>
              {CATEGORY_ORDER.map((slug) => (
                <option key={slug} value={slug}>
                  {categories[slug].name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Schwierigkeit
            <select
              value={difficulty}
              onChange={(e) => {
                const v = (e.target.value || "") as "" | Difficulty;
                setDifficulty(v);
                trackExploreFilterChanged("difficulty", v || "all");
              }}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option value="">Alle</option>
              <option value="easy">Einfach</option>
              <option value="medium">Mittel</option>
              <option value="advanced">Fortgeschritten</option>
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Level (Freischaltung)
            <select
              value={level}
              onChange={(e) => {
                const v = (e.target.value || "") as "" | "1" | "2" | "3";
                setLevel(v);
                trackExploreFilterChanged("level", v || "all");
              }}
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            >
              <option value="">Alle</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
            </select>
          </label>
          <div className="flex flex-col justify-end pb-0.5">
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={favoritesOnly}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setFavoritesOnly(checked);
                  trackExploreFilterChanged("favorites_only", checked);
                }}
                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              Nur Favoriten
            </label>
            <p className="mt-1 text-xs text-slate-500">
              {favorites.length} Favorit
              {favorites.length === 1 ? "" : "en"}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-600">
        {filtered.length} Stellung
        {filtered.length === 1 ? "" : "en"} angezeigt
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-600">
          Keine Treffer – Filter zurücksetzen oder Favoriten hinzufügen.
        </p>
      ) : (
        <PositionGrid positions={filtered} />
      )}
    </div>
  );
}
