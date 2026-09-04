import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  Compass,
  Target,
  Eye,
  Crosshair,
  Feather,
  Lightbulb,
  TrendingUp,
  Building2,
  Workflow,
} from "lucide-react";
import { Reveal } from "@/components/motion";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "Quiénes Somos — Syntalia Vértice" },
      { name: "description", content: "Consultora estratégica de marketing digital. Diseñamos sistemas de crecimiento para empresas con actividad real." },
      { property: "og:title", content: "Quiénes Somos — Syntalia Vértice" },
      { property: "og:description", content: "Somos una consultora estratégica de marketing digital. Estrategia, propósito y valores detrás de Syntalia Vértice." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/quienes-somos" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Quiénes Somos — Syntalia Vértice" },
      { name: "twitter:description", content: "Consultora estratégica de marketing digital con enfoque en resultados reales." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/quienes-somos" }],
  }),
  component: QuienesSomos,
});

const ABOUT_POINTS = [
  { t: "Pensamos como negocio", d: "Cada decisión responde a una prioridad comercial." },
  { t: "Estrategia antes de ejecutar", d: "Definimos el rumbo antes de diseñar, publicar o lanzar." },
  { t: "Implementación real", d: "Construimos webs, contenido, captación y sistemas." },
  { t: "Cercanía y comunicación", d: "Trabajamos de forma directa, clara y coordinada." },
  { t: "Medición y mejora continua", d: "Analizamos, corregimos y reforzamos lo que funciona." },
  { t: "Compromiso con el resultado", d: "Nos implicamos para que cada acción tenga una función." },
] as const;

const PMV = [
  {
    icon: Compass,
    t: "Propósito",
    d: "Impulsar el crecimiento de empresas mediante estrategia, sistemas y acciones que generen impacto real.",
  },
  {
    icon: Target,
    t: "Misión",
    d: "Construir soluciones de marketing digital que conviertan posicionamiento, visibilidad y captación en oportunidades comerciales.",
  },
  {
    icon: Eye,
    t: "Visión",
    d: "Ser una referencia en crecimiento estratégico para empresas que buscan estructura, posicionamiento y escalabilidad con criterio.",
  },
];

const VALORES = [
  { icon: Compass, t: "Estrategia", d: "Cada acción responde a un plan, no a la improvisación." },
  { icon: Crosshair, t: "Precisión", d: "Decisiones basadas en datos, no en suposiciones." },
  { icon: Feather, t: "Simplicidad", d: "Procesos claros, sin complejidad innecesaria." },
  { icon: Lightbulb, t: "Innovación", d: "Soluciones actuales para un entorno que cambia." },
  { icon: TrendingUp, t: "Crecimiento", d: "Todo se mide y se orienta a escalar resultados." },
];

function QuienesSomos() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-navy text-cream">
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-2 md:items-center md:gap-16 md:py-32">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Quiénes Somos</p>
            <h1 className="mt-6 font-raleway text-5xl font-semibold leading-[1.05] md:text-6xl text-balance">
              Estrategia digital con enfoque en <span className="text-gradient-gold">resultados reales</span>.
            </h1>
            <p className="mt-8 max-w-xl font-sans text-lg text-cream/75 leading-relaxed">
              En Syntalia Vértice ayudamos a empresas con actividad real a crecer con más estructura. Combinamos estrategia, creatividad y ejecución para ordenar su presencia digital, generar oportunidades y construir sistemas conectados con el negocio.
            </p>
            <Link
              to="/servicios"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-navy transition-colors hover:bg-cream"
            >
              Conoce cómo podemos ayudarte <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55)]">
              <img
                src="/images/quienes-somos-hero.jpg"
                alt="Persona en el centro mientras el movimiento ocurre a su alrededor"
                className="h-[340px] w-full object-cover object-[50%_60%] md:h-[440px]"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-[2rem]" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="relative border-t border-navy/10">
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-12 md:gap-16 md:py-32">
          <div className="md:col-span-5">
            <Reveal className="h-full">
              <div className="relative h-full overflow-hidden rounded-[2rem] shadow-[0_40px_100px_-40px_rgba(2,21,87,0.35)]">
                <img
                  src="/images/syntalia-hero-reunion.jpeg"
                  alt="Equipo de Syntalia Vértice trabajando"
                  className="h-full min-h-[420px] w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/5 to-transparent" aria-hidden />
                <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-navy/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-cream backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5 text-gold" aria-hidden />
                  Murcia · España
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70">Sobre nosotros</span>
            </div>

            <h2 className="mt-6 font-raleway text-3xl leading-[1.15] font-extrabold tracking-tight text-primary md:text-5xl">
              Quiénes somos
            </h2>

            <p className="mt-4 font-raleway text-lg font-bold leading-snug text-gold md:text-xl">
              Más que una consultora, somos un equipo estratégico que se implica en tu negocio.
            </p>

            <p className="mt-6 font-sans text-primary/75 leading-relaxed md:text-lg">
              No trabajamos desde fuera ni aplicamos soluciones genéricas. Nos integramos en cada proyecto para entender el negocio, detectar qué está frenando su crecimiento y construir una estrategia digital alineada con sus objetivos.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-7 border-t border-navy/10 pt-8 sm:grid-cols-2">
              {ABOUT_POINTS.map((p) => (
                <div key={p.t} className="flex items-start gap-3.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  <div>
                    <h3 className="font-raleway text-base font-bold text-primary">{p.t}</h3>
                    <p className="mt-1.5 font-sans text-sm leading-relaxed text-cream/60">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Propósito, Misión, Visión */}
      <section className="bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-border shadow-[0_30px_80px_-50px_rgba(2,21,87,0.3)] md:grid-cols-3">
            {PMV.map((b) => (
              <div key={b.t} className="bg-card p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-navy">
                  <b.icon className="h-5 w-5" aria-hidden />
                </div>
                <h2 className="mt-6 font-raleway text-xl font-semibold text-primary">{b.t}</h2>
                <p className="mt-4 font-sans text-foreground/70 leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="gold-divider" />
          <h2 className="mt-6 font-raleway text-4xl font-semibold md:text-5xl text-balance">Nuestros valores</h2>

          <div className="mt-14 flex flex-col divide-y divide-navy/10 md:flex-row md:divide-x md:divide-y-0">
            {VALORES.map((v) => (
              <div key={v.t} className="flex flex-1 flex-col items-start gap-3 py-8 md:items-center md:px-8 md:py-2 md:text-center">
                <v.icon className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden />
                <h3 className="font-raleway text-base font-bold text-primary">{v.t}</h3>
                <p className="font-sans text-sm leading-relaxed text-foreground/60">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Especialización + Cómo entendemos el marketing */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-px overflow-hidden rounded-3xl bg-border shadow-[0_30px_80px_-50px_rgba(2,21,87,0.3)] md:grid-cols-2">
            <div className="bg-card p-10 md:p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-navy">
                <Building2 className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-6 font-raleway text-2xl font-semibold text-primary md:text-3xl text-balance">Nuestra especialización</h2>
              <p className="mt-4 font-sans text-foreground/70 leading-relaxed">
                Enfoque estratégico para empresas en entornos donde la confianza y las relaciones comerciales marcan la diferencia. Entendemos los ciclos de cada sector y construimos presencia digital que genera oportunidades reales.
              </p>
            </div>
            <div className="bg-card p-10 md:p-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-navy">
                <Workflow className="h-5 w-5" aria-hidden />
              </div>
              <h2 className="mt-6 font-raleway text-2xl font-semibold text-primary md:text-3xl text-balance">Cómo entendemos el marketing</h2>
              <p className="mt-4 font-sans text-foreground/70 leading-relaxed">
                No son acciones aisladas, sino un sistema que conecta la marca con su audiencia, genera confianza y transforma esa relación en oportunidades de negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="text-cream" style={{ background: "#021557", backgroundImage: "none" }}>
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="font-raleway text-4xl font-semibold md:text-5xl text-balance">
            ¿Listo para construir un sistema que haga crecer tu empresa?
          </h2>
          <Link
            to="/diagnostico"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy transition-colors hover:bg-cream"
          >
            Solicitar diagnóstico <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
