import Link from "next/link";
import { ChallengeCard } from "@/components/ChallengeCard";
import { challenges } from "@/data/challenges";

export const metadata = {
  title: "Challenges – Paar-Challenges für mehr Intimität",
  description:
    "7-Tage-Challenge, Intimitäts-Challenge, Anfänger-Challenge. Entdecke Paar-Challenges mit mehreren Sexstellungen.",
};

export default function ChallengePage() {
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
          <li className="font-medium text-slate-700">Challenges</li>
        </ol>
      </nav>

      <header className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Paar-Challenges
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Probiere strukturierte Challenges mit mehreren Sexstellungen aus.
          Perfekt um gemeinsam neue Stellungen zu entdecken.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <ChallengeCard
            key={challenge.slug}
            slug={challenge.slug}
            title={challenge.title}
            description={challenge.description}
            duration={challenge.duration}
          />
        ))}
      </div>
    </div>
  );
}
