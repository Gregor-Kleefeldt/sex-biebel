import Link from "next/link";
import { PositionGenerator } from "@/components/PositionGenerator";

export const metadata = {
  title: "Stellungs-Generator – passende Ideen",
  description:
    "Wähle Stimmung, Zeit, Ort und mehr – erhalte drei passende Stellungsvorschläge aus dem Katalog.",
};

/** Seite: kontextbasierter Stellungsgenerator unterhalb von „Entdecken“. */
export default function PositionGeneratorPage() {
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
              Entdecken
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium text-slate-700">Generator</li>
        </ol>
      </nav>

      <header className="mb-10">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary-700">
          Produkt-Tipp
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Stellungs-Generator
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Sag uns kurz, wie&apos;s bei euch gerade ist – wir schlagen drei
          Stellungen vor, die zu Stimmung, Aufwand und Erfahrung passen. Alles
          bleibt lokal auf diesem Gerät.
        </p>
      </header>

      <PositionGenerator />
    </div>
  );
}
