import Link from "next/link";
import { notFound } from "next/navigation";
import { PositionCard } from "@/components/PositionCard";
import { PositionDetailActions } from "@/components/PositionDetailActions";
import { PositionOpenedTracker } from "@/components/PositionOpenedTracker";
import { CategoryPage } from "@/components/CategoryPage";
import {
  getPositionBySlug,
  getRelatedPositions,
  getPositionsByCategory,
  getVerwandteInhalte,
  getVerwandteInhalteAufgeloest,
  getBlogArticleBySlug,
  getChallengeBySlug,
} from "@/lib/utils";
import { positions } from "@/data/positions";
import { categories } from "@/data/categories";
import { categoryHubExtras } from "@/data/categoryHubContent";
import {
  getLongTailsForCategory,
  getLongTailPage,
} from "@/data/longTailPages";
import type { Metadata } from "next";
import type { Position } from "@/types";
import type { CategorySlug } from "@/types";
import type { Schwierigkeit, VerwandterInhalt } from "@/types";

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
      title: `${cat.name} – Themen-Hub Sexstellungen`,
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

function mapDifficultyToSchwierigkeit(
  difficulty: Position["difficulty"],
): Schwierigkeit {
  if (difficulty === "easy") return "leicht";
  if (difficulty === "medium") return "mittel";
  return "anspruchsvoll";
}

function SchwierigkeitBadge({
  schwierigkeit,
}: {
  schwierigkeit: Schwierigkeit;
}) {
  const styles: Record<Schwierigkeit, string> = {
    leicht: "bg-green-100 text-green-800",
    mittel: "bg-amber-100 text-amber-800",
    anspruchsvoll: "bg-rose-100 text-rose-800",
  };
  const labels: Record<Schwierigkeit, string> = {
    leicht: "Leicht",
    mittel: "Mittel",
    anspruchsvoll: "Anspruchsvoll",
  };
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${styles[schwierigkeit]}`}
    >
      {labels[schwierigkeit]}
    </span>
  );
}

function EignungChips({ position }: { position: Position }) {
  const eignung = position.eignung ?? {};
  const entries: Array<{ key: keyof typeof eignung; label: string }> = [
    { key: "fuerAnfaenger", label: "Für Anfänger" },
    { key: "fuerPaare", label: "Für Paare" },
    { key: "wenigBeweglichkeit", label: "Wenig Beweglichkeit" },
    { key: "intim", label: "Intim" },
    { key: "romantisch", label: "Romantisch" },
    { key: "experimentell", label: "Experimentell" },
  ];

  const active = entries.filter((e) => eignung[e.key]);
  if (active.length === 0) return null;

  return (
    <div className="mb-8 mt-1 flex flex-wrap gap-2">
      {active.map((e) => (
        <span
          key={String(e.key)}
          className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
        >
          {e.label}
        </span>
      ))}
    </div>
  );
}

function SafetyBox({ position }: { position: Position }) {
  const s = position.sicherheit;
  const hinweise = s?.hinweise ?? [];
  const vermeidenWenn = s?.vermeidenWenn ?? [];
  const tipps = s?.tipps ?? [];

  if (hinweise.length === 0 && vermeidenWenn.length === 0 && tipps.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <h2 className="text-xl font-semibold text-slate-900">Sicherheit & Komfort</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-3">
        {hinweise.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Hinweise
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {hinweise.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {vermeidenWenn.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Vermeiden wenn
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {vermeidenWenn.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
        {tipps.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
              Tipps
            </h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {tipps.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function getVerwandterInhaltReason(
  items: VerwandterInhalt[],
  type: VerwandterInhalt["type"],
  slug: string,
): string | undefined {
  return items.find((i) => i.type === type && i.slug === slug)?.reason;
}

export default async function SexstellungenSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Render category page if slug is a category
  if (categorySlugs.includes(slug as CategorySlug)) {
    const categorySlug = slug as CategorySlug;
    const categoryPositions = getPositionsByCategory(categorySlug);
    const cat = categories[categorySlug];
    const extras = categoryHubExtras[categorySlug];
    const longTails = getLongTailsForCategory(categorySlug);
    const longTailPages = longTails.map((lt) => ({
      href: `/sexstellungen/${lt.categorySlug}/${lt.slug}`,
      title: lt.h1,
      description:
        lt.metaDescription.length > 155
          ? `${lt.metaDescription.slice(0, 152)}…`
          : lt.metaDescription,
    }));
    const crossAnfaengerWenig = getLongTailPage(
      "fuer-anfaenger",
      "wenig-beweglichkeit",
    );
    if (
      categorySlug === "wenig-beweglichkeit" &&
      crossAnfaengerWenig &&
      !longTailPages.some((l) => l.href.endsWith("/wenig-beweglichkeit"))
    ) {
      longTailPages.push({
        href: `/sexstellungen/fuer-anfaenger/wenig-beweglichkeit`,
        title: crossAnfaengerWenig.h1,
        description:
          crossAnfaengerWenig.metaDescription.length > 155
            ? `${crossAnfaengerWenig.metaDescription.slice(0, 152)}…`
            : crossAnfaengerWenig.metaDescription,
      });
    }
    const relatedBlog = extras.blogSlugs
      .map((s) => {
        const a = getBlogArticleBySlug(s);
        if (!a) return null;
        return {
          href: `/blog/${a.slug}`,
          title: a.title,
          description: a.excerpt,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);
    const relatedChallenges = extras.challengeSlugs
      .map((s) => {
        const c = getChallengeBySlug(s);
        if (!c) return null;
        return {
          href: `/challenge/${c.slug}`,
          title: c.title,
          description: c.description,
          meta: `Dauer: ${c.duration}`,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    return (
      <CategoryPage
        categoryName={cat.name}
        categoryDescription={cat.description}
        positions={categoryPositions}
        hubSections={extras.sections}
        longTailPages={longTailPages}
        relatedBlog={relatedBlog}
        relatedChallenges={relatedChallenges}
      />
    );
  }

  // Otherwise render position detail page
  const position = getPositionBySlug(slug);
  if (!position) notFound();

  const related = getRelatedPositions(position);
  const verwandteInhalte = getVerwandteInhalte(position);
  const verwandteAufgeloest = getVerwandteInhalteAufgeloest(position);
  const schwierigkeit =
    position.schwierigkeit ?? mapDifficultyToSchwierigkeit(position.difficulty);

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
                Entdecken
              </Link>
            </li>
            <li>/</li>
            <li className="font-medium text-slate-700">{position.name}</li>
          </ol>
        </nav>

        <PositionOpenedTracker position={position} />

        <div className="mb-6 flex h-44 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary-50 to-accent-50 sm:mb-8 sm:h-48">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/80 shadow-inner sm:h-28 sm:w-28">
            <span className="text-5xl text-primary-400 sm:text-6xl" aria-hidden>
              ●
            </span>
          </div>
        </div>

        <header className="mb-4">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {position.name}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <SchwierigkeitBadge schwierigkeit={schwierigkeit} />
          </div>
          <p className="mt-3 text-base text-slate-600">{position.shortDescription}</p>
        </header>

        <PositionDetailActions position={position} />

        <EignungChips position={position} />

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
          {position.varianten && position.varianten.length > 0 ? (
            <div className="not-prose mt-4 grid gap-4 sm:grid-cols-2">
              {position.varianten.map((v) => (
                <Link
                  key={v.slug}
                  href={`/sexstellungen/${v.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 no-underline shadow-sm transition hover:border-primary-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-900">{v.name}</div>
                      <div className="mt-1 text-sm text-slate-600">
                        {v.kurzeBeschreibung}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary-700">
                      Öffnen
                    </span>
                  </div>
                  {v.unterschiedZurBasisposition && (
                    <div className="mt-3 text-sm text-slate-600">
                      <span className="font-medium text-slate-700">
                        Unterschied:
                      </span>{" "}
                      {v.unterschiedZurBasisposition}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <ul className="mt-3 space-y-2 text-slate-600">
              {position.variations.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          )}
        </div>

        <SafetyBox position={position} />

        {position.categories.length > 0 && (
          <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              Passende Themen
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Weitere Stellungen und Übersichten nach Interesse.
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {position.categories.map((catSlug) => (
                <li key={catSlug}>
                  <Link
                    href={`/sexstellungen/${catSlug}`}
                    className="inline-block rounded-full bg-white px-4 py-2 text-sm font-medium text-primary-700 shadow-sm ring-1 ring-slate-200 transition hover:ring-primary-300"
                  >
                    Weitere Stellungen: {categories[catSlug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Related Positions */}
        {(related.length > 0 ||
          verwandteAufgeloest.blogartikel.length > 0 ||
          verwandteAufgeloest.challenges.length > 0) && (
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="text-xl font-semibold text-slate-900">
              Verwandte Inhalte
            </h2>
            <p className="mb-6 mt-1 text-sm text-slate-600">
              Optional – Inspiration jenseits dieser Stellung.
            </p>

            {related.length > 0 && (
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Ähnliche Sexstellungen
                </h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((p) => (
                    <PositionCard key={p.slug} position={p} />
                  ))}
                </div>
              </div>
            )}

            {verwandteAufgeloest.blogartikel.length > 0 && (
              <div className={related.length > 0 ? "mt-12" : undefined}>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Passende Blogartikel
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {verwandteAufgeloest.blogartikel.map((a) => {
                    const reason = getVerwandterInhaltReason(
                      verwandteInhalte,
                      "blog",
                      a.slug,
                    );
                    return (
                      <Link
                        key={a.slug}
                        href={`/blog/${a.slug}`}
                        className="rounded-2xl border border-slate-200 bg-white p-4 no-underline shadow-sm transition hover:border-primary-200 hover:shadow-md"
                      >
                        <div className="font-semibold text-slate-900">{a.title}</div>
                        <div className="mt-1 text-sm text-slate-600">
                          {a.excerpt}
                        </div>
                        {reason && (
                          <p className="mt-2 text-xs leading-relaxed text-slate-500">
                            {reason}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {verwandteAufgeloest.challenges.length > 0 && (
              <div
                className={
                  related.length > 0 || verwandteAufgeloest.blogartikel.length > 0
                    ? "mt-12"
                    : undefined
                }
              >
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Passende Challenges
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {verwandteAufgeloest.challenges.map((c) => {
                    const reason = getVerwandterInhaltReason(
                      verwandteInhalte,
                      "challenge",
                      c.slug,
                    );
                    return (
                      <Link
                        key={c.slug}
                        href={`/challenge/${c.slug}`}
                        className="rounded-2xl border border-slate-200 bg-white p-4 no-underline shadow-sm transition hover:border-primary-200 hover:shadow-md"
                      >
                        <div className="font-semibold text-slate-900">{c.title}</div>
                        <div className="mt-1 text-sm text-slate-600">
                          {c.description}
                        </div>
                        <div className="mt-2 text-sm text-slate-600">
                          <span className="font-medium text-slate-700">
                            Dauer:
                          </span>{" "}
                          {c.duration}
                        </div>
                        {reason && (
                          <p className="mt-2 text-xs leading-relaxed text-slate-500">
                            {reason}
                          </p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        )}
      </article>
    </>
  );
}
