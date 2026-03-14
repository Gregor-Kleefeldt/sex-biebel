import Link from "next/link";

interface ChallengeCardProps {
  slug: string;
  title: string;
  description: string;
  duration: string;
}

export function ChallengeCard({
  slug,
  title,
  description,
  duration,
}: ChallengeCardProps) {
  return (
    <Link
      href={`/challenge/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent-200 hover:shadow-lg"
    >
      <span className="mb-2 inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-medium text-accent-800">
        {duration}
      </span>
      <h3 className="mb-2 font-semibold text-slate-800 transition-colors group-hover:text-accent-600">
        {title}
      </h3>
      <p className="line-clamp-2 text-sm text-slate-600">{description}</p>
      <span className="mt-3 inline-block text-sm font-medium text-accent-600 group-hover:underline">
        Challenge starten →
      </span>
    </Link>
  );
}
