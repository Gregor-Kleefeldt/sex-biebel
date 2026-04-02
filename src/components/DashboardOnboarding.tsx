"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo } from "react";
import { useAppProgress } from "@/context/AppProgressProvider";
import { getAnalyticsSessionId, trackEvent } from "@/lib/analytics";
import { ONBOARDING_STARTER_SLUGS } from "@/data/onboardingStarters";
import { getPositionBySlug } from "@/lib/utils";
import type { Position } from "@/types";

function resolveStarters(): Position[] {
  const list: Position[] = [];
  for (const slug of ONBOARDING_STARTER_SLUGS) {
    const p = getPositionBySlug(slug);
    if (p) list.push(p);
  }
  return list;
}

export function DashboardOnboarding() {
  const {
    hydrated,
    completed,
    totalXp,
    onboardingDismissed,
    dismissOnboarding,
  } = useAppProgress();

  const starters = useMemo(() => resolveStarters(), []);

  const show =
    hydrated &&
    !onboardingDismissed &&
    completed.length === 0 &&
    totalXp === 0 &&
    starters.length > 0;

  useEffect(() => {
    if (!hydrated || !show) return;
    const sid = getAnalyticsSessionId();
    trackEvent("onboarding_started", sid ? { session_id: sid } : {});
  }, [hydrated, show]);

  const onDismiss = useCallback(() => {
    const sid = getAnalyticsSessionId();
    trackEvent("onboarding_dismissed", sid ? { session_id: sid } : {});
    dismissOnboarding();
  }, [dismissOnboarding]);

  if (!show) return null;

  return (
    <section
      className="border-b border-primary-100 bg-gradient-to-b from-primary-50/50 to-white"
      aria-labelledby="onboarding-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <div className="rounded-2xl border border-primary-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2
                id="onboarding-heading"
                className="text-lg font-bold text-slate-900 sm:text-xl"
              >
                So funktioniert&apos;s – kurz &amp; einfach
              </h2>
              <ul className="mt-3 max-w-2xl list-inside list-disc space-y-1.5 text-sm text-slate-600">
                <li>Stellung öffnen, gemeinsam ausprobieren – alles bleibt auf diesem Gerät.</li>
                <li>
                  <strong className="font-medium text-slate-700">Erledigt</strong> markieren
                  bringt XP; XP erhöhen dein{" "}
                  <strong className="font-medium text-slate-700">App-Level</strong> und
                  schaltet neue Ideen frei.
                </li>
                <li>Favoriten speichern – jederzeit wiederfinden.</li>
              </ul>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              className="shrink-0 self-start rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Verstanden, ausblenden
            </button>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-primary-800">
              Starte mit 3 einfachen Stellungen
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Alle drei sind <strong className="font-medium">Level 1</strong> – direkt
              freigeschaltet, gut für den Einstieg.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {starters.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/sexstellungen/${p.slug}`}
                    className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-primary-300 hover:bg-white hover:shadow-md"
                  >
                    <span className="font-semibold text-slate-900">{p.name}</span>
                    <span className="mt-1 line-clamp-2 text-sm text-slate-600">
                      {p.shortDescription}
                    </span>
                    <span className="mt-3 text-xs font-medium text-primary-700">
                      Leicht · Level 1 · freigeschaltet →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
