import Link from "next/link";
import { PositionGrid } from "@/components/PositionGrid";
import { positions } from "@/data/positions";
import { categories } from "@/data/categories";

export const metadata = {
  title: "Sexstellungen – Alle Stellungen im Überblick",
  description:
    "Entdecke unsere Sammlung von Sexstellungen. Von klassisch bis fortgeschritten – mit Tipps für Anfänger und erfahrene Paare.",
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
          <li className="text-slate-700 font-medium">Sexstellungen</li>
        </ol>
      </nav>

      <header className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Sexstellungen Datenbank
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Alle Stellungen im Überblick. Wähle eine Kategorie oder stöbere durch
          die vollständige Sammlung.
        </p>
      </header>

      {/* Category Links */}
      <div className="mb-12 flex flex-wrap gap-3">
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
            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-primary-100 hover:text-primary-700"
          >
            {categories[slug].name}
          </Link>
        ))}
      </div>

      {/* All Positions */}
      <PositionGrid positions={positions} />
    </div>
  );
}
