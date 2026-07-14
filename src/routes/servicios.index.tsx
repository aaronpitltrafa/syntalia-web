import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios — Syntalia Vértice" },
      { name: "description", content: "Branding, desarrollo web, SEO, redes, contenido, ads, email marketing y captación para empresas con ambición." },
      { property: "og:title", content: "Servicios — Syntalia Vértice" },
      { property: "og:description", content: "Branding, desarrollo web, SEO, redes, contenido, ads, email y captación. Sistemas integrados de crecimiento digital." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/servicios" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Servicios — Syntalia Vértice" },
      { name: "twitter:description", content: "Servicios integrados de marketing digital para empresas con ambición." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/servicios" }],
  }),
  component: ServiciosPage,
});

const SERVICES = [
  { slug: "branding-completo", t: "Branding Completo", d: "Identidad visual integral (logotipo, paleta, tipografías), narrativa corporativa, tono y posicionamiento estratégico para construir una marca reconocible, diferencial y preparada para crecer." },
  { slug: "desarrollo-web", t: "Desarrollo Web y Optimización", d: "Creamos sitios web modernos, funcionales y orientados a resultados. Páginas rápidas, seguras y con experiencia de usuario fluida, preparadas para convertir." },
  { slug: "seo", t: "SEO", d: "Optimizamos tu presencia en buscadores con auditorías, arquitectura, palabras clave, mejoras técnicas y contenido para atraer tráfico cualificado." },
  { slug: "grabacion-contenido", t: "Grabación de Contenido", d: "Edición profesional de vídeos y adaptación a formatos para redes sociales. Entrega optimizada para Instagram, TikTok y Reels." },
  { slug: "redes-sociales", t: "Gestión de Redes Sociales", d: "Estrategia clara, estética coherente y contenido de valor. Creamos publicaciones que conectan con tu audiencia y fortalecen tu marca." },
  { slug: "contenido", t: "Estrategias de Contenido", d: "Diseñamos contenidos relevantes alineados con tus objetivos. Blogs, textos corporativos, guiones, creatividades y recursos descargables." },
  { slug: "social-ads", t: "Social Ads", d: "Campañas publicitarias en redes enfocadas en conversiones, alcance y reconocimiento. Inversión eficiente y resultados medibles." },
  { slug: "email-marketing", t: "Email Marketing y Automatización", d: "Campañas y flujos automatizados de bienvenida, recuperación, fidelización y mensajes personalizados." },
  { slug: "captacion", t: "Sistema de Captación de Clientes", d: "Sistemas digitales orientados a atraer, captar y convertir clientes potenciales de forma estratégica." },
];

function ServiciosPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-navy text-cream">
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Servicios</p>
          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] md:text-7xl text-balance">
            Estrategia, ejecución y crecimiento <span className="text-gradient-gold italic">a medida</span>.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
            Cada servicio se integra dentro de una estrategia digital diseñada para empresas que quieren crecer con estructura.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Link
                key={s.slug}
                to={`/servicios/${s.slug}` as string}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[0_30px_80px_-30px_oklch(0.235_0.137_269/0.4)]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-accent/70">0{i + 1}</span>
                  <ArrowRight className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-primary">{s.t}</h3>
                <p className="mt-4 text-foreground/70 leading-relaxed">{s.d}</p>
                <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">Leer más</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}