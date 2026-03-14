import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-lg font-bold text-slate-900 hover:text-primary-600"
            >
              Sex-Bibel
            </Link>
            <p className="mt-2 text-sm text-slate-600">
              Bildungsressource für sexuelle Gesundheit und Intimität.
            </p>
          </div>

          {/* Links - Sexstellungen */}
          <div>
            <h4 className="font-semibold text-slate-900">Sexstellungen</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/sexstellungen/fuer-anfaenger"
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  Für Anfänger
                </Link>
              </li>
              <li>
                <Link
                  href="/sexstellungen/romantisch"
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  Romantisch
                </Link>
              </li>
              <li>
                <Link
                  href="/sexstellungen/intim"
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  Intim
                </Link>
              </li>
              <li>
                <Link
                  href="/sexstellungen/tiefe-penetration"
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  Tiefe Penetration
                </Link>
              </li>
              <li>
                <Link
                  href="/sexstellungen/fortgeschritten"
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  Fortgeschritten
                </Link>
              </li>
            </ul>
          </div>

          {/* Links - Blog & Challenges */}
          <div>
            <h4 className="font-semibold text-slate-900">Entdecken</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/challenge"
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  Challenges
                </Link>
              </li>
              <li>
                <Link
                  href="/sexstellungen"
                  className="text-sm text-slate-600 hover:text-primary-600"
                >
                  Alle Sexstellungen
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-semibold text-slate-900">Hinweis</h4>
            <p className="mt-3 text-sm text-slate-600">
              Diese Seite dient ausschließlich zu Bildungszwecken. Alle Inhalte
              sind für Erwachsene bestimmt.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Sex-Bibel. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
