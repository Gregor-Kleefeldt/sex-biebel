"use client";

import { useEffect } from "react";
import { bootstrapAnalyticsSession } from "@/lib/analytics";

/**
 * Runs once on the client to start/continue an analytics session (no UI).
 */
export function AnalyticsBootstrap() {
  useEffect(() => {
    bootstrapAnalyticsSession();
  }, []);
  return null;
}
