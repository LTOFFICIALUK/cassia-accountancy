import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      allow: "/",
    },
    {
      userAgent: "GPTBot",
      allow: "/",
    },
    {
      userAgent: "ChatGPT-User",
      allow: "/",
    },
    {
      userAgent: "Google-Extended",
      allow: "/",
    },
    {
      userAgent: "anthropic-ai",
      allow: "/",
    },
    {
      userAgent: "ClaudeBot",
      allow: "/",
    },
    {
      userAgent: "PerplexityBot",
      allow: "/",
    },
  ],
  sitemap: `${SITE_URL}/sitemap.xml`,
  host: SITE_URL,
});

export default robots;
