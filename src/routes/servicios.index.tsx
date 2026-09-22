import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { SYSTEM_STAGES, type EtapaSistema } from "@/lib/sistema";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios — Syntalia Vértice" },
      { name: "description", content: "Diagnóstico, posicionamiento, captación y optimización: un sistema en cuatro etapas para convertir tu presencia digital en resultados medibles." },
      { property: "og:title", content: "Servicios — Syntalia Vértice" },
      { property: "og:description", content: "Diagnóstico, posicionamiento, captación y optimización. Un sistema estratégico en cuatro etapas para hacer crecer tu negocio." },
      { property: "og:url", content: `${SITE_URL}/servicios` },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Servicios — Syntalia Vértice" },
      { name: "twitter:description", content: "Un sistema estratégico en cuatro etapas —diagnóstico, posicionamiento, captación y optimización— para convertir tu presencia digital en resultados medibles." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/servicios` }],
  }),
  component: ServiciosPage,
});

/** El mismo contenedor que la home. */
const BLOQUE = "mx-auto max-w-block px-6 sm:px-8";

/** El ancla de cada etapa: 01 -> #etapa-01. */
const ancla = (e: EtapaSistema) => `etapa-${e.number}`;

function ServiciosPage() {
  return (
    <div>
      <ServiciosHero />
      {SYSTEM_STAGES.map((etapa, i) => (
        <EtapaBloque key={etapa.number} etapa={etapa} alterna={i % 2 === 1} />
      ))}
      <ServiciosCTA />
    </div>
  );
}

function ServiciosHero() {
  return (
    <section className="relative">
      <div className={cn(BLOQUE, "relative pt-28 pb-12 md:pb-16 lg:pt-32")}>
        <p className="label-mono">Servicios</p>
        <h1 className="mt-6 max-w-[20ch] text-h2 text-balance">
          Cuatro etapas para convertir tu presencia digital en un sistema{" "}
          <span className="mark">preparado para crecer</span>.
        </h1>
        <p className="mt-8 max-w-text text-lead leading-relaxed text-foreground/75">
          Un sistema estratégico en cuatro etapas: entender, posicionar, captar y optimizar.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEM_STAGES.map((etapa) => (
            <a
              key={etapa.number}
              href={`#${ancla(etapa)}`}
              className="group flex items-center gap-4 rounded-2xl border border-foreground/15 bg-foreground/5 px-5 py-4 transition-colors hover:border-gold/50 hover:bg-foreground/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <span className="text-[28px] leading-none font-bold tracking-[-0.04em] text-foreground">
                {etapa.number}
              </span>
              <span className="text-meta font-semibold text-foreground">{etapa.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Una etapa desarrollada, en el mismo lenguaje que el bloque dorado de la
 * home: número grande, título, lema y la lista de servicios con filetes.
 */
function EtapaBloque({ etapa, alterna }: { etapa: EtapaSistema; alterna: boolean }) {
  return (
    <section
      id={ancla(etapa)}
      className={cn("scroll-mt-24", alterna ? "bg-secondary/40" : "bg-background")}
    >
      <div className={cn(BLOQUE, "py-16 md:py-24")}>
        <div className="grid gap-10 border-t-2 border-navy pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <span
              aria-hidden
              className="block text-[64px] leading-[0.9] font-bold tracking-[-0.04em] text-foreground lg:text-[96px]"
            >
              {etapa.number}
            </span>

            <h2 className="mt-5 max-w-[16ch] text-h3 text-balance">{etapa.title}</h2>
            <p className="mt-2 text-lead leading-[1.3] font-semibold text-foreground/80">{etapa.tagline}</p>
            <p className="mt-5 max-w-text leading-[1.6] text-foreground/75">{etapa.description}</p>
          </div>

          <div>
            <p className="label-mono">Servicios incluidos</p>
            <ul className="mt-5 border-t border-border">
              {(etapa.services ?? []).map((s) => (
                <li key={s.label} className="border-b border-border">
                  {s.to ? (
                    <Link
                      to={s.to}
                      className="group flex items-center justify-between gap-4 py-4 text-lead text-foreground transition-colors hover:text-gold-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      {s.label}
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  ) : (
                    <span className="block py-4 text-lead text-foreground/85">{s.label}</span>
                  )}
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
    <section className="border-t border-foreground/10 bg-background">
      <div className={cn(BLOQUE, "py-20 md:py-24")}>
        <div className="surface-navy rounded-[2rem] px-8 py-14 text-center md:px-16 md:py-16">
          <h2 className="mx-auto max-w-[24ch] text-h3 text-balance">
            ¿Listo para crecer con un sistema estratégico y medible?
          </h2>
          <p className="mx-auto mt-5 max-w-text leading-relaxed text-foreground/75">
            Solicita tu diagnóstico y descubre oportunidades de crecimiento personalizadas para tu negocio.
          </p>
          <Link
            to="/diagnostico"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy transition hover:bg-gold-soft"
          >
            Solicitar diagnóstico gratuito <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
