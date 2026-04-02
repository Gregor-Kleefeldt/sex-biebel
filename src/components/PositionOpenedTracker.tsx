"use client";

import { useEffect } from "react";
import {
  positionAnalyticsFields,
  trackEvent,
} from "@/lib/analytics";
import type { Position } from "@/types";

export function PositionOpenedTracker({ position }: { position: Position }) {
  useEffect(() => {
    trackEvent("position_opened", positionAnalyticsFields(position));
  }, [position]);

  return null;
}
