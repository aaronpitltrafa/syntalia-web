import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://syntalia.verticeagency.es";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/quienes-somos", changefreq: "monthly", priority: "0.8" },
          { path: "/servicios", changefreq: "monthly", priority: "0.9" },
          { path: "/servicios/branding-completo", changefreq: "monthly", priority: "0.7" },
          { path: "/servicios/desarrollo-web", changefreq: "monthly", priority: "0.7" },
          { path: "/servicios/seo", changefreq: "monthly", priority: "0.7" },
          { path: "/servicios/grabacion-contenido", changefreq: "monthly", priority: "0.7" },
          { path: "/servicios/redes-sociales", changefreq: "monthly", priority: "0.7" },
          { path: "/servicios/contenido", changefreq: "monthly", priority: "0.7" },
          { path: "/servicios/social-ads", changefreq: "monthly", priority: "0.7" },
          { path: "/servicios/email-marketing", changefreq: "monthly", priority: "0.7" },
          { path: "/servicios/captacion", changefreq: "monthly", priority: "0.7" },
          { path: "/contacto", changefreq: "monthly", priority: "0.8" },
          { path: "/diagnostico", changefreq: "monthly", priority: "0.8" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});