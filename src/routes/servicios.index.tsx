import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ShieldCheck, Target, Waypoints, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios — Syntalia Vértice" },
      { name: "description", content: "Posicionamiento, autoridad y captación: un sistema en tres fases para convertir tu presencia digital en resultados medibles." },
      { property: "og:title", content: "Servicios — Syntalia Vértice" },
      { property: "og:description", content: "Posicionamiento, autoridad y captación. Un sistema estratégico en tres fases para hacer crecer tu negocio." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/servicios" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Servicios — Syntalia Vértice" },
      { name: "twitter:description", content: "Un sistema estratégico en tres fases para convertir tu presencia digital en resultados medibles." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/servicios" }],
  }),
  component: ServiciosPage,
});

type Phase = {
  id: string;
  number: string;
  shortTitle: string;
  title: string;
  text: string;
  icon: LucideIcon;
  services: string[];
};

const PHASES: Phase[] = [
  {
    id: "posicionamiento",
    number: "01",
    shortTitle: "Posicionamiento",
    title: "Posicionamiento y presencia digital",
    text: "Definimos la base estratégica y visual sobre la que se construirá todo lo demás.",
    icon: Target,
    services: [
      "Posicionamiento de marca",
      "Propuesta de valor y mensaje",
      "Branding e identidad visual",
      "Web y landing pages",
      "Optimización de perfiles digitales",
    ],
  },
  {
    id: "autoridad",
    number: "02",
    shortTitle: "Autoridad",
    title: "Autoridad y visibilidad",
    text: "Trabajamos tu presencia en los canales adecuados para transmitir valor, generar confianza y aumentar tu visibilidad.",
    icon: ShieldCheck,
    services: [
      "Estrategia de contenidos",
      "Gestión de redes sociales",
      "Copywriting y SEO",
      "Contenido de autoridad",
      "Optimización de canales digitales",
    ],
  },
  {
    id: "captacion",
    number: "03",
    shortTitle: "Captación",
    title: "Captación y conversión",
    text: "Construimos el sistema necesario para transformar visibilidad e interés en contactos cualificados y oportunidades.",
    icon: Waypoints,
    services: [
      "Social Ads y campañas",
      "Formularios y landing de captación",
      "CRM y automatizaciones",
      "Email marketing y seguimiento",
      "Optimización de conversión",
    ],
  },
];

function ServiciosPage() {
  return (
    <div>
      <ServiciosHero />
      {PHASES.map((phase, i) => (
        <div key={phase.id}>
          <PhaseBlock phase={phase} reversed={i % 2 === 1} />
          {i < PHASES.length - 1 && <PhaseDivider />}
        </div>
      ))}
      <ServiciosCTA />
    </div>
  );
}

function ServiciosHero() {
  return (
    <section className="relative bg-gradient-navy text-cream">
      <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Servicios</p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl text-balance">
          Tres fases para convertir tu presencia digital en un sistema <span className="text-gradient-gold">preparado para crecer</span>.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-cream/75 leading-relaxed">
          Un enfoque estratégico en tres fases que alinea tu marca, genera autoridad y convierte oportunidades en resultados medibles.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {PHASES.map((phase) => (
            <a
              key={phase.id}
              href={`#${phase.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-cream/15 bg-cream/5 px-6 py-5 transition-colors hover:border-gold/50 hover:bg-cream/10"
            >
              <span className="font-raleway text-3xl font-extrabold text-gold/80 transition-colors group-hover:text-gold">
                {phase.number}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wide text-cream/90">{phase.shortTitle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhaseDivider() {
  return (
    <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-center px-6" aria-hidden>
      <span className="h-full w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
      <span className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-background">
        <ArrowDown className="h-4 w-4 text-gold" />
      </span>
    </div>
  );
}

function PhaseBlock({ phase, reversed }: { phase: Phase; reversed: boolean }) {
  return (
    <section id={phase.id} className={cn("scroll-mt-24", reversed ? "bg-secondary/40" : "bg-background")}>
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <div className="grid gap-14 md:grid-cols-2 md:items-center md:gap-16">
          <div
            className={cn(
              "surface-glass rounded-3xl p-8 md:p-10",
              reversed ? "md:order-2" : undefined,
            )}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-gold text-navy">
              <phase.icon className="h-6 w-6" aria-hidden />
            </div>
            <div className="mt-8 font-raleway text-7xl font-extrabold text-gold">{phase.number}</div>
            <h2 className="mt-4 text-3xl font-semibold text-cream md:text-4xl text-balance">{phase.title}</h2>
            <p className="mt-5 max-w-md text-foreground/70 leading-relaxed">{phase.text}</p>
          </div>

          <div
            className={cn(
              "surface-glass rounded-3xl p-8 md:p-10",
              reversed ? "md:order-1" : undefined,
            )}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cream/55">Servicios incluidos</p>
            <ul className="mt-6 space-y-4">
              {phase.services.map((s) => (
                <li key={s} className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                  <span className="text-foreground/85">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiciosCTA() {
  return (
    <section className="border-t border-white/10 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="rounded-[2rem] bg-gradient-navy px-8 py-14 text-center text-cream md:px-16 md:py-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight md:text-4xl text-balance">
            ¿Listo para crecer con un sistema estratégico y medible?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/75 leading-relaxed">
            Solicita tu diagnóstico y descubre oportunidades de crecimiento personalizadas para tu negocio.
          </p>
          <Link
            to="/diagnostico"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy transition hover:bg-gold-soft"
          >
            Solicitar diagnóstico <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
