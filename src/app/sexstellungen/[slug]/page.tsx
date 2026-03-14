import Link from "next/link";
import { notFound } from "next/navigation";
import { PositionCard } from "@/components/PositionCard";
import { CategoryPage } from "@/components/CategoryPage";
import {
  getPositionBySlug,
  getRelatedPositions,
  getPositionsByCategory,
} from "@/lib/utils";
import { positions } from "@/data/positions";
import { categories } from "@/data/categories";
import type { Metadata } from "next";
import type { Position } from "@/types";
import type { CategorySlug } from "@/types";

// All valid slugs: positions + categories
const categorySlugs = Object.keys(categories) as CategorySlug[];
const positionSlugs = positions.map((p) => p.slug);
const allSlugs = [...categorySlugs, ...positionSlugs];

// Generate static params for all slugs (positions + categories)
export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Category metadata
  if (categorySlugs.includes(slug as CategorySlug)) {
    const cat = categories[slug as CategorySlug];
    return {
      title: `${cat.name} – Sexstellungen`,
      description: cat.description,
    };
  }

  // Position metadata
  const position = getPositionBySlug(slug);
  if (!position) return { title: "Nicht gefunden" };

  return {
    title: `${position.name} – Sexstellung`,
    description: `${position.description.slice(0, 155)}…`,
    openGraph: {
      title: `${position.name} | Sex-Bibel`,
      description: position.description,
    },
  };
}

// Difficulty badge component
function DifficultyBadge({ difficulty }: { difficulty: Position["difficulty"] }) {
  const styles = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-amber-100 text-amber-800",
    advanced: "bg-rose-100 text-rose-800",
  };
  const labels = {
    easy: "Einfach",
    medium: "Mittel",
    advanced: "Fortgeschritten",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${styles[difficulty]}`}
    >
      {labels[difficulty]}
    </span>
  );
}

export default async function SexstellungenSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Render category page if slug is a category
  if (categorySlugs.includes(slug as CategorySlug)) {
    const categoryPositions = getPositionsByCategory(slug as CategorySlug);
    const cat = categories[slug as CategorySlug];
    return (
      <CategoryPage
        categorySlug={slug as CategorySlug}
        categoryName={cat.name}
        categoryDescription={cat.description}
        positions={categoryPositions}
      />
    );
  }

  // Otherwise render position detail page
  const position = getPositionBySlug(slug);
  if (!position) notFound();

  const related = getRelatedPositions(position);

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: position.name,
    description: position.description,
    inLanguage: "de",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-4xl px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/" className="hover:text-primary-600">
                Start
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/sexstellungen" className="hover:text-primary-600">
                Sexstellungen
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-slate-700">{position.name}</li>
          </ol>
        </nav>

        {/* Illustration placeholder */}
        <div className="mb-8 flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/80 shadow-inner">
            <span className="text-6xl text-primary-400" aria-hidden>
              ●
            </span>
          </div>
        </div>

        <header className="mb-8">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {position.name}
          </h1>
          <DifficultyBadge difficulty={position.difficulty} />
        </header>

        <div className="prose prose-slate max-w-none">
          <p className="text-lg text-slate-600">{position.description}</p>

          <h2 className="mt-10 text-xl font-semibold text-slate-900">
            Tipps für Komfort & Kommunikation
          </h2>
          <ul className="mt-3 space-y-2 text-slate-600">
            {position.tips.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-xl font-semibold text-slate-900">
            Variationen
          </h2>
          <ul className="mt-3 space-y-2 text-slate-600">
            {position.variations.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </div>

        {/* Related Positions */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">
              Ähnliche Sexstellungen
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PositionCard key={p.slug} position={p} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
