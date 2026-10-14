import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";
import { allPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["", 1],
    ["/conheca-a-cdpema", 0.9],
    ["/conheca-a-cdpema/calendario-ecologico", 0.8],
    ["/publicacoes", 0.8],
    ["/reunioes", 0.6],
    ["/contato", 0.7],
  ];
  return [
    ...pages.map(([path, priority]) => ({
      url: `${SITE.url}${path}`,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...allPosts.map((p) => ({
      url: `${SITE.url}/${p.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
