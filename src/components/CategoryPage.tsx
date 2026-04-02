import { PositionGrid } from "./PositionGrid";
import Link from "next/link";
import type { Position } from "@/types";
import type { CategoryHubSection } from "@/data/categoryHubContent";

interface LongTailTeaser {
  href: string;
  title: string;
  description: string;
}

interface ResourceTeaser {
  href: string;
  title: string;
  description: string;
  meta?: string;
}

interface CategoryPageProps {
  categoryName: string;
  categoryDescription: string;
  positions: Position[];
  hubSections?: CategoryHubSection[];
  longTailPages?: LongTailTeaser[];
  relatedBlog?: ResourceTeaser[];
  relatedChallenges?: ResourceTeaser[];
}

export function CategoryPage({
  categoryName,
  categoryDescription,
  positions,
  hubSections = [],
  longTailPages = [],
  relatedBlog = [],
  relatedChallenges = [],
}: CategoryPageProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
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
          <li className="text-slate-700 font-medium">{categoryName}</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {categoryName}
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">{categoryDescription}</p>
      </header>

      {hubSections.map((section) => (
        <section key={section.h2} className="mb-10 max-w-3xl">
          <h2 className="text-xl font-semibold text-slate-900">{section.h2}</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">{section.body}</p>
        </section>
      ))}

      {longTailPages.length > 0 && (
        <section className="mb-12" aria-labelledby="longtail-heading">
          <h2
            id="longtail-heading"
            className="text-xl font-semibold text-slate-900"
          >
            Spezifische Suchanfragen &amp; Guides
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Diese Seiten greifen konkrete Fragen auf – mit kuratierten Listen und
            kurzen Einordnungen.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {longTailPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary-200 hover:shadow-md"
                >
                  <span className="font-semibold text-slate-900">
                    {page.title}
                  </span>
                  <p className="mt-2 text-sm text-slate-600">{page.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="positions-heading">
        <h2
          id="positions-heading"
          className="mb-6 text-xl font-semibold text-slate-900"
        >
          Passende Sexstellungen
        </h2>
        <PositionGrid positions={positions} />
      </section>

      {(relatedBlog.length > 0 || relatedChallenges.length > 0) && (
        <section className="mt-14 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-semibold text-slate-900">
            Ratgeber &amp; Challenges
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Vertiefung zum Thema – mit strukturierten Artikeln und
            mehrtägigen Ideen.
          </p>

          {relatedBlog.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-slate-900">Blog</h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedBlog.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-2xl border border-slate-200 bg-slate-50/80 p-4 no-underline transition hover:border-primary-200 hover:bg-white"
                    >
                      <span className="font-semibold text-slate-900">
                        {item.title}
                      </span>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedChallenges.length > 0 && (
            <div className={relatedBlog.length > 0 ? "mt-10" : "mt-6"}>
              <h3 className="text-lg font-semibold text-slate-900">
                Challenges
              </h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {relatedChallenges.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-2xl border border-slate-200 bg-slate-50/80 p-4 no-underline transition hover:border-primary-200 hover:bg-white"
                    >
                      <span className="font-semibold text-slate-900">
                        {item.title}
                      </span>
                      {item.meta && (
                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {item.meta}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-slate-600">
                        {item.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/sexstellungen"
          className="text-primary-600 hover:text-primary-700 hover:underline"
        >
          ← Alle Sexstellungen anzeigen
        </Link>
      </div>
    </div>
  );
}
