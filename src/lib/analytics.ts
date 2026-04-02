import type { AppLevel, Position } from "@/types";
import {
  XP_THRESHOLD_LEVEL_2,
  XP_THRESHOLD_LEVEL_3,
} from "@/lib/appProgress";

/** localStorage key for anonymous id + session timing (separate from app progress). */
export const ANALYTICS_STORAGE_KEY = "sex-bibel-analytics-v1";

const SESSION_IDLE_MS = 30 * 60 * 1000;
const DAY_MS = 86400000;

const DEV_PREFIX = "[analytics]";

export type AnalyticsFilterType =
  | "category"
  | "difficulty"
  | "level"
  | "favorites_only"
  | "reset";

/** Known event names for autocomplete and future adapters (PostHog, etc.). */
export type AnalyticsEventName =
  | "session_started"
  | "returning_session"
  | "position_opened"
  | "favorite_added"
  | "favorite_removed"
  | "position_completed"
  | "explore_filter_changed"
  | "unlock_achieved"
  | "onboarding_started"
  | "onboarding_dismissed"
  | "onboarding_completed"
  | "xp_milestone_reached";

export type AnalyticsPayload = Record<string, string | number | boolean | null>;

let memorySessionId: string | null = null;

export function getAnalyticsSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return memorySessionId;
}

interface AnalyticsPersistedV1 {
  version: 1;
  anonymousId: string;
  /** Last client activity timestamp (ms); used for session idle + days-since. */
  lastActivityAt: number;
  firstVisitAt: number | null;
  currentSessionId: string | null;
}

function readAnalyticsState(): AnalyticsPersistedV1 | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<AnalyticsPersistedV1>;
    if (p.version !== 1 || typeof p.anonymousId !== "string") return null;
    return {
      version: 1,
      anonymousId: p.anonymousId,
      lastActivityAt:
        typeof p.lastActivityAt === "number" ? p.lastActivityAt : Date.now(),
      firstVisitAt:
        typeof p.firstVisitAt === "number" ? p.firstVisitAt : null,
      currentSessionId:
        typeof p.currentSessionId === "string" ? p.currentSessionId : null,
    };
  } catch {
    return null;
  }
}

function writeAnalyticsState(state: AnalyticsPersistedV1) {
  try {
    window.localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* quota / private mode */
  }
}

function newId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `s_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

function devLog(name: AnalyticsEventName, payload: AnalyticsPayload) {
  if (process.env.NODE_ENV !== "development") return;
  // eslint-disable-next-line no-console -- intentional MVP debug channel
  console.info(DEV_PREFIX, name, payload);
}

/**
 * Sends one analytics event. No PII: only slugs, enums, counts, ids.
 * Replace the body later with posthog.capture(name, payload).
 */
export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {},
): void {
  if (typeof window === "undefined") return;
  devLog(name, payload);
}

/**
 * Run once per app load (client). Starts or continues a session and emits
 * session_started / returning_session when a new session begins.
 */
export function bootstrapAnalyticsSession(): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  let state = readAnalyticsState();

  if (!state) {
    state = {
      version: 1,
      anonymousId: newId(),
      lastActivityAt: now,
      firstVisitAt: null,
      currentSessionId: null,
    };
  }

  const idleMs = now - state.lastActivityAt;
  const isNewSession =
    !state.currentSessionId || idleMs > SESSION_IDLE_MS;

  if (isNewSession) {
    const sessionId = newId();
    memorySessionId = sessionId;
    const firstVisit = state.firstVisitAt === null;
    const firstVisitAt = firstVisit ? now : state.firstVisitAt;

    trackEvent("session_started", {
      session_id: sessionId,
      anonymous_id: state.anonymousId,
      first_visit: firstVisit,
    });

    if (!firstVisit) {
      const daysSince = Math.max(
        0,
        Math.floor(idleMs / DAY_MS),
      );
      trackEvent("returning_session", {
        session_id: sessionId,
        anonymous_id: state.anonymousId,
        days_since_last_seen: daysSince,
      });
    }

    writeAnalyticsState({
      ...state,
      currentSessionId: sessionId,
      lastActivityAt: now,
      firstVisitAt,
    });
  } else {
    memorySessionId = state.currentSessionId;
    writeAnalyticsState({
      ...state,
      lastActivityAt: now,
    });
  }
}

export function primaryCategory(position: Position): string {
  return position.categories[0] ?? "unknown";
}

export function positionAnalyticsFields(position: Position): AnalyticsPayload {
  return {
    slug: position.slug,
    level: position.level,
    difficulty: position.difficulty,
    primary_category: primaryCategory(position),
  };
}

export function trackExploreFilterChanged(
  filterType: AnalyticsFilterType,
  value: string | boolean,
): void {
  trackEvent("explore_filter_changed", {
    filter_type: filterType,
    value: typeof value === "boolean" ? (value ? "true" : "false") : value,
  });
}

export function trackXpMilestone(
  milestoneXp: number,
  totalXp: number,
): void {
  trackEvent("xp_milestone_reached", {
    milestone_xp: milestoneXp,
    total_xp: totalXp,
  });
}

/** Call when total XP crosses a threshold upward (Level-2 / Level-3 gates). */
export function maybeTrackXpMilestones(
  previousXp: number,
  nextXp: number,
): void {
  const thresholds = [XP_THRESHOLD_LEVEL_2, XP_THRESHOLD_LEVEL_3] as const;
  for (const t of thresholds) {
    if (previousXp < t && nextXp >= t) {
      trackXpMilestone(t, nextXp);
    }
  }
}

export function trackUnlockAchieved(
  fromLevel: AppLevel,
  toLevel: AppLevel,
  totalXp: number,
): void {
  trackEvent("unlock_achieved", {
    from_level: fromLevel,
    to_level: toLevel,
    total_xp: totalXp,
  });
}
