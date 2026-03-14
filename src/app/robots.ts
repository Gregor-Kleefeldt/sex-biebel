import { MetadataRoute } from "next";

// Base URL - replace with your actual domain in production
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sex-bibel.example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
