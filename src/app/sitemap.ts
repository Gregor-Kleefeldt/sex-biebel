import { MetadataRoute } from "next";
import { positions } from "@/data/positions";
import { blogArticles } from "@/data/blog";
import { challenges } from "@/data/challenges";
import { categories } from "@/data/categories";
import { longTailLandingPages } from "@/data/longTailPages";

// Base URL - replace with your actual domain in production
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sex-bibel.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const categorySlugs = Object.keys(categories);
  const positionSlugs = positions.map((p) => p.slug);
  const blogSlugs = blogArticles.map((a) => a.slug);
  const challengeSlugs = challenges.map((c) => c.slug);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sexstellungen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/challenge`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/sexstellungen/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const longTailPages: MetadataRoute.Sitemap = longTailLandingPages.map(
    (page) => ({
      url: `${baseUrl}/sexstellungen/${page.categorySlug}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }),
  );

  // Position pages
  const positionPages: MetadataRoute.Sitemap = positionSlugs.map((slug) => ({
    url: `${baseUrl}/sexstellungen/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Challenge pages
  const challengePages: MetadataRoute.Sitemap = challengeSlugs.map((slug) => ({
    url: `${baseUrl}/challenge/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Combine and deduplicate (categories and positions share slug path but different content - categories ARE under /sexstellungen/slug)
  // Categories: fuer-anfaenger, romantisch, etc. - Positions: missionarsstellung, doggy-style, etc.
  // They don't overlap, so no deduplication needed
  return [
    ...staticPages,
    ...categoryPages,
    ...longTailPages,
    ...positionPages,
    ...blogPages,
    ...challengePages,
  ];
}
