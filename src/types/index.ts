// Difficulty levels for sex positions
export type Difficulty = "easy" | "medium" | "advanced";

// German difficulty levels for position detail pages (editor-friendly + SEO text)
export type Schwierigkeit = "leicht" | "mittel" | "anspruchsvoll";

export type EignungAspekt =
  | "fuerAnfaenger"
  | "fuerPaare"
  | "wenigBeweglichkeit"
  | "intim"
  | "romantisch"
  | "experimentell";

// Structured suitability flags (only set what's true)
export type Eignung = Partial<Record<EignungAspekt, true>>;

export interface Sicherheit {
  hinweise?: string[];
  vermeidenWenn?: string[];
  tipps?: string[];
}

export interface VariantenEintrag {
  name: string;
  slug: string;
  kurzeBeschreibung: string;
  unterschiedZurBasisposition?: string;
}

export type VerwandterInhaltType = "position" | "blog" | "challenge";

export interface VerwandterInhalt {
  type: VerwandterInhaltType;
  slug: string;
  reason?: string;
}

// Category slugs for filtering positions (SEO hubs + filtering)
export type CategorySlug =
  | "fuer-anfaenger"
  | "romantisch"
  | "tiefe-penetration"
  | "intim"
  | "fortgeschritten"
  | "wenig-beweglichkeit";

// Single sex position data structure
export interface Position {
  slug: string;
  name: string;
  difficulty: Difficulty;
  description: string;
  tips: string[];
  variations: string[];
  relatedSlugs: string[];
  categories: CategorySlug[];

  // Extended (optional) model for richer position detail pages
  schwierigkeit?: Schwierigkeit;
  eignung?: Eignung;
  sicherheit?: Sicherheit;
  varianten?: VariantenEintrag[];
  verwandteInhalte?: VerwandterInhalt[];
}

// Blog article data structure
export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  positionSlugs: string[];
  publishedAt: string;
}

// Challenge data structure
export interface Challenge {
  slug: string;
  title: string;
  description: string;
  duration: string;
  positionSlugs: string[];
}
