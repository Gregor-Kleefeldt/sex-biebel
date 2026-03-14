import Link from "next/link";
import { notFound } from "next/navigation";
import { PositionCard } from "@/components/PositionCard";
import { challenges } from "@/data/challenges";
import { getPositionBySlug } from "@/lib/utils";
import type { Metadata } from "next";

// Generate static params for all challenge slugs
export function generateStaticParams() {
  return challenges.map((c) => ({ slug: c.slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const challenge = challenges.find((c) => c.slug === slug);
  if (!challenge) return { title: "Nicht gefunden" };
  return {
    title: challenge.title,
    description: challenge.description,
  };
}

export default async function ChallengeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenge = challenges.find((c) => c.slug === slug);
  if (!challenge) notFound();

  // Resolve position slugs to full position objects
  const positions = challenge.positionSlugs
    .map((s) => getPositionBySlug(s))
    .filter(Boolean);

  return (
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
            <Link href="/challenge" className="hover:text-primary-600">
              Challenges
            </Link>
          </li>
          <li>/</li>
          <li className="font-medium text-slate-700">{challenge.title}</li>
        </ol>
      </nav>

      <header className="mb-8">
        <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-sm font-medium text-accent-800">
          {challenge.duration}
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {challenge.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{challenge.description}</p>
      </header>

      <section>
        <h2 className="mb-6 text-xl font-semibold text-slate-900">
          Stellungen in dieser Challenge
        </h2>
        <ol className="grid gap-6 sm:grid-cols-2">
          {positions.map((pos, index) => (
            <li key={pos!.slug} className="relative">
              <span
                className="absolute -left-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent-100 text-sm font-semibold text-accent-700"
                aria-hidden
              >
                {index + 1}
              </span>
              <PositionCard position={pos!} />
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12">
        <Link
          href="/challenge"
          className="text-accent-600 hover:text-accent-700 hover:underline"
        >
          ← Zurück zu allen Challenges
        </Link>
      </div>
    </article>
  );
}
