// Difficulty levels for sex positions
export type Difficulty = "easy" | "medium" | "advanced";

// Category slugs for filtering positions
export type CategorySlug =
  | "fuer-anfaenger"
  | "romantisch"
  | "tiefe-penetration"
  | "intim"
  | "fortgeschritten";

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
