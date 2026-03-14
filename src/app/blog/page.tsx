import Link from "next/link";
import { BlogCard } from "@/components/BlogCard";
import { blogArticles } from "@/data/blog";

export const metadata = {
  title: "Blog – Sexstellungen & Intimität Tipps",
  description:
    "Artikel über Sexstellungen, Intimität und Tipps für Paare. Von Anfängern bis Fortgeschrittenen.",
};

export default function BlogPage() {
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
          <li className="font-medium text-slate-700">Blog</li>
        </ol>
      </nav>

      <header className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Blog & Guides
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Lese Artikel über Sexstellungen, Intimität und Tipps für erfüllenderen
          Sex. Alle Inhalte verlinken zu passenden Stellungen.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogArticles.map((article) => (
          <BlogCard
            key={article.slug}
            slug={article.slug}
            title={article.title}
            excerpt={article.excerpt}
          />
        ))}
      </div>
    </div>
  );
}
