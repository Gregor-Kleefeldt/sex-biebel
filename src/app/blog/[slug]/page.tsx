import Link from "next/link";
import { notFound } from "next/navigation";
import { PositionCard } from "@/components/PositionCard";
import { blogArticles } from "@/data/blog";
import { getPositionBySlug } from "@/lib/utils";
import type { Metadata } from "next";

// Generate static params for all blog slugs
export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Nicht gefunden" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  // Resolve position slugs to full position objects for internal links
  const linkedPositions = article.positionSlugs
    .map((s) => getPositionBySlug(s))
    .filter(Boolean);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
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
            <Link href="/blog" className="hover:text-primary-600">
              Blog
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium text-slate-700">{article.title}</li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-2 text-slate-500">
          Veröffentlicht am {new Date(article.publishedAt).toLocaleDateString("de-DE")}
        </p>
      </header>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600">{article.excerpt}</p>
        <p className="text-slate-600">{article.content}</p>
      </div>

      {/* Internal links to position pages */}
      {linkedPositions.length > 0 && (
        <section className="mt-12 border-t border-slate-200 pt-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Empfohlene Sexstellungen aus diesem Artikel
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {linkedPositions.map((pos) => (
              <PositionCard key={pos!.slug} position={pos!} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-8">
        <Link
          href="/blog"
          className="text-primary-600 hover:text-primary-700 hover:underline"
        >
          ← Zurück zu allen Artikeln
        </Link>
      </div>
    </article>
  );
}
