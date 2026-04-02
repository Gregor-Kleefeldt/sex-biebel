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
  /** When true, the dashboard onboarding strip stays hidden (local preference). */
  onboardingDismissed: boolean;
}

const DEFAULT_STATE: PersistedAppState = {
  version: 1,
  favorites: [],
  completed: [],
  onboardingDismissed: false,
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
      onboardingDismissed:
        typeof parsed.onboardingDismissed === "boolean"
          ? parsed.onboardingDismissed
          : false,
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
  onboardingDismissed: boolean;
  totalXp: number;
  unlockedLevel: AppLevel;
  nextTier: ReturnType<typeof xpUntilNextTier>;
  toggleFavorite: (slug: string) => void;
  toggleCompleted: (slug: string) => void;
  dismissOnboarding: () => void;
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
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);

  useEffect(() => {
    const s = readPersisted();
    setFavorites(s.favorites);
    setCompleted(s.completed);
    setOnboardingDismissed(s.onboardingDismissed);
    setHydrated(true);
  }, []);

  /**
   * Dev-only: `/?resetOnboarding=1` shows the onboarding strip again (if XP/erledigt = 0).
   * `/?resetApp=1` clears favorites, completed, and onboarding flag (full local “fresh start”).
   */
  useEffect(() => {
    if (!hydrated || process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const path = window.location.pathname;
    if (params.get("resetApp") === "1") {
      setFavorites([]);
      setCompleted([]);
      setOnboardingDismissed(false);
      window.history.replaceState({}, "", path);
      return;
    }
    if (params.get("resetOnboarding") === "1") {
      setOnboardingDismissed(false);
      window.history.replaceState({}, "", path);
    }
  }, [hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    writePersisted({
      version: 1,
      favorites,
      completed,
      onboardingDismissed,
    });
  }, [hydrated, favorites, completed, onboardingDismissed]);

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

  const dismissOnboarding = useCallback(() => {
    setOnboardingDismissed(true);
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
      onboardingDismissed,
      totalXp,
      unlockedLevel,
      nextTier,
      toggleFavorite,
      toggleCompleted,
      dismissOnboarding,
      isFavorite,
      isCompleted,
      isUnlocked,
    }),
    [
      hydrated,
      favorites,
      completed,
      onboardingDismissed,
      totalXp,
      unlockedLevel,
      nextTier,
      toggleFavorite,
      toggleCompleted,
      dismissOnboarding,
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
