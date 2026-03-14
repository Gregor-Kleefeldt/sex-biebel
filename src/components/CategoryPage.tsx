import { PositionGrid } from "./PositionGrid";
import Link from "next/link";
import type { Position } from "@/types";
import type { CategorySlug } from "@/types";

interface CategoryPageProps {
  categorySlug: CategorySlug;
  categoryName: string;
  categoryDescription: string;
  positions: Position[];
}

export function CategoryPage({
  categorySlug,
  categoryName,
  categoryDescription,
  positions,
}: CategoryPageProps) {
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
          <li>
            <Link href="/sexstellungen" className="hover:text-primary-600">
              Sexstellungen
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-700 font-medium">{categoryName}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {categoryName}
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">{categoryDescription}</p>
      </header>

      {/* Position grid */}
      <PositionGrid positions={positions} />

      {/* Back link */}
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
