/**
 * Curated beginner trio: level 1, easy, distinct dynamics — used by dashboard onboarding only.
 */
export const ONBOARDING_STARTER_SLUGS = [
  "missionarsstellung",
  "loeffelchen",
  "reiterstellung",
] as const;

export type OnboardingStarterSlug = (typeof ONBOARDING_STARTER_SLUGS)[number];
