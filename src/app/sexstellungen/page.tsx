import Link from "next/link";
import { ExploreCatalog } from "@/components/ExploreCatalog";
import { positions } from "@/data/positions";
import { categories } from "@/data/categories";
import { longTailLandingPages } from "@/data/longTailPages";
import type { CategorySlug } from "@/types";

const categoryOrder: CategorySlug[] = [
  "fuer-anfaenger",
  "wenig-beweglichkeit",
  "intim",
  "romantisch",
  "tiefe-penetration",
  "fortgeschritten",
];

export const metadata = {
  title: "Entdecken – Stellungen & Filter",
  description:
    "Stöbere durch Stellungen, filtere nach Kategorie und Schwierigkeit und markiere Favoriten und erledigte Übungen.",
};

export default function SexstellungenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-slate-500" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-primary-600">
              Start
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-700 font-medium">Entdecken</li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Entdecken
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Alle Stellungen im Überblick – filtere nach Kategorie, Schwierigkeit und
          Level. Status und Favoriten werden lokal auf diesem Gerät gespeichert.
        </p>
      </header>

      <div className="mb-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Themen-Übersichten
        </p>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">
          Kuratierte Sammlungen pro Thema – ergänzend zu den Filtern unten.
        </p>
      </div>
      <div className="mb-8 flex flex-wrap gap-2 sm:gap-3">
        {categoryOrder.map((slug) => (
          <Link
            key={slug}
            href={`/sexstellungen/${slug}`}
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-100 hover:text-primary-700"
          >
            {categories[slug].name}
          </Link>
        ))}
      </div>

      <ExploreCatalog positions={positions} />

      <details className="mb-12 rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
        <summary className="cursor-pointer text-lg font-semibold text-slate-900">
          Vertiefende Themen
        </summary>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Optional: kurze Zusatzseiten für spezielle Fragen und Suchanfragen.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {longTailLandingPages.map((page) => (
            <li key={`${page.categorySlug}-${page.slug}`}>
              <Link
                href={`/sexstellungen/${page.categorySlug}/${page.slug}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-primary-800 shadow-sm transition hover:border-primary-200 hover:shadow-md"
              >
                {page.h1}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
