import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Lightbulb, Eye, Target, ArrowRight } from "lucide-react";
import logoAsset from "@/assets/logo-syntalia-3.png.asset.json";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes Somos — Syntalia Vértice" },
      { name: "description", content: "Agencia de marketing digital con enfoque estratégico. Diseñamos sistemas de crecimiento para empresas con ambición real." },
      { property: "og:title", content: "Quiénes Somos — Syntalia Vértice" },
      { property: "og:description", content: "Somos una agencia de crecimiento digital. Estrategia, propósito y valores detrás de Syntalia Vértice." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/quienes-somos" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Quiénes Somos — Syntalia Vértice" },
      { name: "twitter:description", content: "Somos una agencia de crecimiento digital con enfoque estratégico y compromiso con los resultados." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/quienes-somos" }],
  }),
  component: QuienesSomos,
});

const VALORES = [
  { icon: Heart, t: "Compromiso", d: "Nos involucramos con tus metas como si fueran propias. Trabajamos cada proyecto con responsabilidad y cercanía." },
  { icon: Lightbulb, t: "Innovación", d: "Aplicamos ideas creativas y soluciones actualizadas, adaptándonos a un entorno digital en constante evolución." },
  { icon: Eye, t: "Transparencia", d: "Trabajamos con una comunicación clara, directa y honesta, garantizando confianza en cada fase del proyecto." },
  { icon: Target, t: "Resultados", d: "Todas nuestras acciones tienen un propósito. Medimos, analizamos y optimizamos para generar impacto real." },
];

function QuienesSomos() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-navy text-cream">
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Quiénes Somos</p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] md:text-6xl text-balance">
              Estrategia digital con enfoque en <span className="italic text-gradient-gold">resultados reales</span>.
            </h1>
            <p className="mt-8 text-lg text-cream/75 leading-relaxed">
              Syntalia Vértice es una agencia de crecimiento para empresas con ambición real. No somos una agencia de marketing digital cualquiera.
            </p>
            <p className="mt-4 text-cream/70 leading-relaxed">
              Trabajamos con negocios, marcas y empresas que quieren dejar de depender solo del boca a boca, mejorar su imagen, captar contactos cualificados y construir una presencia digital que genere oportunidades comerciales.
            </p>
            <Link to="/servicios" className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-navy hover:bg-cream transition-colors">
              Conoce cómo podemos ayudarte <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 blur-3xl rounded-full" />
              <img src={logoAsset.url} alt="Syntalia Vértice" className="relative h-72 w-72 rounded-3xl object-contain drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-3" style={{ margin: "0 auto" }}>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-3">
            {[
              { t: "Propósito", d: "Impulsar a las marcas a crecer y evolucionar en el entorno digital, acompañándolas con estrategias que generen impacto real." },
              { t: "Misión", d: "Crear soluciones digitales que respondan a las necesidades de cada proyecto, transformando ideas en resultados y guiando a nuestros clientes en cada etapa." },
              { t: "Visión", d: "Ser un referente en marketing digital por nuestro enfoque estratégico, especialización y compromiso con los resultados." },
            ].map((b) => (
              <div key={b.t} className="bg-card p-10">
                <div className="gold-divider" />
                <h2 className="mt-5 text-xl font-semibold text-primary">{b.t}</h2>
                <p className="mt-4 text-foreground/70 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="gold-divider" />
          <h2 className="mt-6 text-4xl font-semibold md:text-5xl text-balance">Nuestros valores</h2>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {VALORES.map((v) => (
              <div key={v.t} className="rounded-3xl border border-border bg-card p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-navy">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-primary">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2">
          <div>
            <div className="gold-divider" />
            <h2 className="mt-6 text-3xl font-semibold md:text-4xl text-balance">Nuestra especialización</h2>
            <p className="mt-6 text-foreground/75 leading-relaxed">
              Contamos con un enfoque estratégico claro, diseñado para empresas que operan en entornos complejos donde la confianza, la estacionalidad y las relaciones comerciales marcan la diferencia.
            </p>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              Entendemos los ciclos de cada sector, la importancia de la imagen profesional y cómo construir una presencia digital que genere oportunidades reales.
            </p>
          </div>
          <div>
            <div className="gold-divider" />
            <h2 className="mt-6 text-3xl font-semibold md:text-4xl text-balance">Cómo entendemos el marketing</h2>
            <p className="mt-6 text-foreground/75 leading-relaxed">
              Para nosotros, el marketing digital no consiste en acciones aisladas, sino en la construcción de un sistema.
            </p>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              Un sistema que conecta la marca con su audiencia, genera confianza y transforma esa relación en oportunidades de negocio.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-navy text-cream">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-semibold md:text-5xl text-balance">¿Hablamos?</h2>
          <p className="mt-6 text-cream/75 max-w-2xl mx-auto">
            Si quieres mejorar la presencia digital de tu empresa y desarrollar una estrategia adaptada a tu negocio, podemos ayudarte.
          </p>
          <Link to="/diagnostico" className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy hover:bg-cream transition-colors">
            Solicita asesoramiento <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
