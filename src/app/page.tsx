import Link from "next/link";
import { PositionGrid } from "@/components/PositionGrid";
import { BlogCard } from "@/components/BlogCard";
import { ChallengeCard } from "@/components/ChallengeCard";
import { positions } from "@/data/positions";
import { blogArticles } from "@/data/blog";
import { challenges } from "@/data/challenges";
import { categories } from "@/data/categories";

export default function HomePage() {
  // Featured positions - first 6
  const featuredPositions = positions.slice(0, 6);
  // Featured guides - first 3 blog articles
  const featuredGuides = blogArticles.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Sex-Bibel – Deine Bildungsressource für Sexstellungen
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-slate-600">
            Entdecke eine Sammlung von Sexstellungen, Tipps für mehr Intimität
            und Paar-Challenges. Alle Inhalte dienen ausschließlich zu
            Bildungszwecken und sind auf Deutsch.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/sexstellungen"
              className="rounded-xl bg-primary-600 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-700"
            >
              Alle Sexstellungen
            </Link>
            <Link
              href="/challenge"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Challenges entdecken
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Positions */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">
          Beliebte Sexstellungen
        </h2>
        <PositionGrid positions={featuredPositions} />
        <div className="mt-8 text-center">
          <Link
            href="/sexstellungen"
            className="text-primary-600 hover:text-primary-700 hover:underline"
          >
            Alle Sexstellungen anzeigen →
          </Link>
        </div>
      </section>

      {/* Categories - Internal Linking */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">Kategorien</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {(
              [
                "fuer-anfaenger",
                "romantisch",
                "tiefe-penetration",
                "intim",
                "fortgeschritten",
              ] as const
            ).map((slug) => (
              <Link
                key={slug}
                href={`/sexstellungen/${slug}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/50"
              >
                <h3 className="font-semibold text-slate-800">
                  {categories[slug].name}
                </h3>
                <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                  {categories[slug].description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides (Blog) */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-2xl font-bold text-slate-900">
          Lese-Guides & Tipps
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredGuides.map((article) => (
            <BlogCard
              key={article.slug}
              slug={article.slug}
              title={article.title}
              excerpt={article.excerpt}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-700 hover:underline"
          >
            Alle Artikel lesen →
          </Link>
        </div>
      </section>

      {/* Challenges */}
      <section className="border-t border-slate-200 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">
            Paar-Challenges
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.slug}
                slug={challenge.slug}
                title={challenge.title}
                description={challenge.description}
                duration={challenge.duration}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/challenge"
              className="text-accent-600 hover:text-accent-700 hover:underline"
            >
              Alle Challenges anzeigen →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
