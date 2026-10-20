
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://quicktools-6in.pages.dev/",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
