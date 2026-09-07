import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export function serviceHead(opts: {
  path: string;
  title: string;
  description: string;
  serviceType: string;
}) {
  const url = `${BASE}${opts.path}`;
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.title },
      { property: "og:description", content: opts.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:title", content: opts.title },
      { name: "twitter:description", content: opts.description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: opts.serviceType,
          description: opts.description,
          url,
          provider: {
            "@type": "Organization",
            name: "Syntalia Vértice",
            url: BASE,
          },
          areaServed: "ES",
        }),
      },
    ],
  };
}