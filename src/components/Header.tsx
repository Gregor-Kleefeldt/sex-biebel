import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-primary-600"
        >
          Sex-Bibel
        </Link>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6" aria-label="Hauptnavigation">
          <Link
            href="/sexstellungen"
            className="text-sm font-medium text-slate-600 hover:text-primary-600"
          >
            Entdecken
          </Link>
          <Link
            href="/sexstellungen/generator"
            className="text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            Generator
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-600 hover:text-primary-600"
          >
            Blog
          </Link>
          <Link
            href="/challenge"
            className="text-sm font-medium text-slate-600 hover:text-primary-600"
          >
            Challenges
          </Link>
        </nav>
      </div>
    </header>
  );
}
