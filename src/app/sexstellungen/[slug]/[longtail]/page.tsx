import Link from "next/link";
import { notFound } from "next/navigation";
import { PositionGrid } from "@/components/PositionGrid";
import { categories } from "@/data/categories";
import {
  getLongTailPage,
  longTailLandingPages,
} from "@/data/longTailPages";
import {
  getBlogArticleBySlug,
  getChallengeBySlug,
  getPositionsForLongTail,
} from "@/lib/utils";
import type { Metadata } from "next";
import type { BlogArticle, Challenge } from "@/types";

export function generateStaticParams() {
  return longTailLandingPages.map((entry) => ({
    slug: entry.categorySlug,
    longtail: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; longtail: string }>;
}): Promise<Metadata> {
  const { slug, longtail } = await params;
  const def = getLongTailPage(slug, longtail);
  if (!def) return { title: "Nicht gefunden" };
  return {
    title: def.title,
    description: def.metaDescription,
  };
}

export default async function LongTailLandingRoute({
  params,
}: {
  params: Promise<{ slug: string; longtail: string }>;
}) {
  const { slug, longtail } = await params;
  const def = getLongTailPage(slug, longtail);
  if (!def) notFound();

  const hubMeta = categories[def.categorySlug];
  const matched = getPositionsForLongTail(def);
  const blogItems = def.blogSlugs
    .map((s) => getBlogArticleBySlug(s))
    .filter((a): a is BlogArticle => a !== undefined);
  const challengeItems = def.challengeSlugs
    .map((s) => getChallengeBySlug(s))
    .filter((c): c is Challenge => c !== undefined);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12">
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
          <li>
            <Link
              href={`/sexstellungen/${def.categorySlug}`}
              className="hover:text-primary-600"
            >
              {hubMeta.name}
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium text-slate-700">{def.h1}</li>
        </ol>
      </nav>

      <header className="mb-10 max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {def.h1}
        </h1>
        <p className="text-lg leading-relaxed text-slate-600">{def.intro}</p>
      </header>

      <section className="mb-10 max-w-3xl">
        <h2 className="text-xl font-semibold text-slate-900">{def.h2Guide}</h2>
        <p className="mt-3 leading-relaxed text-slate-600">{def.guideBody}</p>
      </section>

      {matched.length < 3 && (
        <p
          className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"
          role="status"
        >
          Für diese sehr spezifische Kombination gibt es in unserer Datenbank
          aktuell nur wenige passende Stellungen – die Liste unten ist dennoch
          vollständig für unsere Kriterien. Mit der Zeit ergänzen wir weitere
          Positionen.
        </p>
      )}

      <section className="mb-14" aria-labelledby="curated-heading">
        <h2
          id="curated-heading"
          className="mb-6 text-xl font-semibold text-slate-900"
        >
          Kuratierte Stellungen
        </h2>
        <PositionGrid positions={matched} />
      </section>

      <section className="mb-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Zum Themen-Hub
        </h2>
        <p className="mt-2 text-slate-600">
          Alle Stellungen rund um „{hubMeta.name}“ mit weiteren Filtern und
          Ratgebern.
        </p>
        <Link
          href={`/sexstellungen/${def.categorySlug}`}
          className="mt-4 inline-block font-medium text-primary-700 hover:text-primary-800 hover:underline"
        >
          Zur Übersicht {hubMeta.name}
        </Link>
      </section>

      {(blogItems.length > 0 || challengeItems.length > 0) && (
        <section className="border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-900">
            Passende Ratgeber &amp; Challenges
          </h2>
          {blogItems.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900">Blog</h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {blogItems.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/blog/${a.slug}`}
                      className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary-200"
                    >
                      <span className="font-semibold text-slate-900">
                        {a.title}
                      </span>
                      <p className="mt-1 text-sm text-slate-600">{a.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {challengeItems.length > 0 && (
            <div className={blogItems.length > 0 ? "mt-10" : "mt-6"}>
              <h3 className="text-lg font-semibold text-slate-900">
                Challenges
              </h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {challengeItems.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/challenge/${c.slug}`}
                      className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-primary-200"
                    >
                      <span className="font-semibold text-slate-900">
                        {c.title}
                      </span>
                      <p className="mt-1 text-xs text-slate-500">
                        Dauer: {c.duration}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {c.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <p className="mt-10 text-center">
        <Link
          href="/sexstellungen"
          className="text-primary-600 hover:text-primary-700 hover:underline"
        >
          ← Zurück zur Sexstellungen-Übersicht
        </Link>
      </p>
    </article>
  );
}
