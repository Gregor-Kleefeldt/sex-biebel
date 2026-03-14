import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
}

export function BlogCard({ slug, title, excerpt }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-200 hover:shadow-lg"
    >
      <h3 className="mb-2 font-semibold text-slate-800 transition-colors group-hover:text-primary-600">
        {title}
      </h3>
      <p className="line-clamp-2 text-sm text-slate-600">{excerpt}</p>
      <span className="mt-3 inline-block text-sm font-medium text-primary-600 group-hover:underline">
        Artikel lesen →
      </span>
    </Link>
  );
}
