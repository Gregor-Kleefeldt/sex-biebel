"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AppLevel, Position } from "@/types";
import {
  computeTotalXp,
  getUnlockedAppLevel,
  isPositionUnlockedForUser,
  xpUntilNextTier,
} from "@/lib/appProgress";

export const APP_STORAGE_KEY = "sex-bibel-app-v1";

export interface PersistedAppState {
  version: number;
  favorites: string[];
  completed: string[];
}

const DEFAULT_STATE: PersistedAppState = {
  version: 1,
  favorites: [],
  completed: [],
};

function readPersisted(): PersistedAppState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(APP_STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedAppState>;
    if (!parsed || parsed.version !== 1) return DEFAULT_STATE;
    return {
      version: 1,
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writePersisted(state: PersistedAppState) {
  try {
    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
}

interface AppProgressContextValue {
  hydrated: boolean;
  favorites: string[];
  completed: string[];
  totalXp: number;
  unlockedLevel: AppLevel;
  nextTier: ReturnType<typeof xpUntilNextTier>;
  toggleFavorite: (slug: string) => void;
  toggleCompleted: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  isCompleted: (slug: string) => boolean;
  isUnlocked: (position: Position) => boolean;
}

const AppProgressContext = createContext<AppProgressContextValue | null>(
  null,
);

export function AppProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hydrated, setHydrated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const s = readPersisted();
    setFavorites(s.favorites);
    setCompleted(s.completed);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writePersisted({ version: 1, favorites, completed });
  }, [hydrated, favorites, completed]);

  const totalXp = useMemo(() => computeTotalXp(completed), [completed]);

  const unlockedLevel = useMemo(
    () => getUnlockedAppLevel(totalXp),
    [totalXp],
  );

  const nextTier = useMemo(() => xpUntilNextTier(totalXp), [totalXp]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const toggleCompleted = useCallback((slug: string) => {
    setCompleted((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites],
  );

  const isCompleted = useCallback(
    (slug: string) => completed.includes(slug),
    [completed],
  );

  const isUnlocked = useCallback(
    (position: Position) => isPositionUnlockedForUser(position, totalXp),
    [totalXp],
  );

  const value = useMemo(
    () => ({
      hydrated,
      favorites,
      completed,
      totalXp,
      unlockedLevel,
      nextTier,
      toggleFavorite,
      toggleCompleted,
      isFavorite,
      isCompleted,
      isUnlocked,
    }),
    [
      hydrated,
      favorites,
      completed,
      totalXp,
      unlockedLevel,
      nextTier,
      toggleFavorite,
      toggleCompleted,
      isFavorite,
      isCompleted,
      isUnlocked,
    ],
  );

  return (
    <AppProgressContext.Provider value={value}>
      {children}
    </AppProgressContext.Provider>
  );
}

export function useAppProgress(): AppProgressContextValue {
  const ctx = useContext(AppProgressContext);
  if (!ctx) {
    throw new Error("useAppProgress must be used within AppProgressProvider");
  }
  return ctx;
}
