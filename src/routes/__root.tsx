import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ParallaxBackground } from "@/components/parallax-background";
import { MobileCtaBar } from "@/components/mobile-cta-bar";
import { WhatsAppFlotante } from "@/components/whatsapp-flotante";
import { SIN_BARRA_CTA } from "@/lib/barra-cta";
import { legalData } from "@/lib/legal-data";
import { ORG_ID, ORG_LOGO_URL, SITE_URL } from "@/lib/site";

const { direccion } = legalData;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#F5F2E9" },
      { name: "author", content: "Syntalia Vértice" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Syntalia Vértice" },
      { property: "og:locale", content: "es_ES" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Fuentes alojadas en /fonts (src/fuentes.css). Solo se precarga lo
      // que se ve sin hacer scroll: Raleway (el H1, archivo variable) y el
      // Poppins 300 del texto. El resto llega cuando hace falta.
      {
        rel: "preload",
        href: "/fonts/raleway-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/poppins-300-latin.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    scripts: [
      {
        // La organización, una sola vez y con @id: /contacto y las páginas
        // de servicio la referencian en vez de redeclararla. Solo datos
        // publicados en la web: ni precios ni horarios. La dirección sale de
        // lib/legal-data.ts, igual que el correo y el teléfono. Sin "geo":
        // solo se pondrá con coordenadas de una fuente oficial para este
        // portal; unas aproximadas serían inventadas.
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": ORG_ID,
          name: "Syntalia Vértice",
          url: SITE_URL,
          logo: ORG_LOGO_URL,
          description:
            "Consultora estratégica de marketing digital, sistemas y tecnología para empresas con ambición real.",
          email: legalData.email,
          telephone: legalData.telefonoJsonLd,
          address: {
            "@type": "PostalAddress",
            streetAddress: `${direccion.calle}, ${direccion.barrio}`,
            addressLocality: direccion.localidad,
            addressRegion: direccion.provincia,
            postalCode: direccion.codigoPostal,
            addressCountry: direccion.codigoPais,
          },
          areaServed: [
            { "@type": "City", name: "Murcia" },
            { "@type": "Country", name: "España" },
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: legalData.telefonoJsonLd,
            email: legalData.email,
            contactType: "customer service",
            areaServed: "ES",
            availableLanguage: ["Spanish"],
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Syntalia Vértice",
          url: SITE_URL,
          publisher: { "@id": ORG_ID },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const conBarra = !SIN_BARRA_CTA.includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <ParallaxBackground />
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      {conBarra && <MobileCtaBar />}
      <WhatsAppFlotante />
    </QueryClientProvider>
  );
}
