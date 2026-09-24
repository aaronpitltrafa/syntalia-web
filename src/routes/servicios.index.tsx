import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { GoldCta } from "@/components/gold-cta";
import { Subrayado } from "@/components/subrayado";
import { SITE_URL } from "@/lib/site";
import { SYSTEM_STAGES, type EtapaSistema } from "@/lib/sistema";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/servicios/")({
  head: () => ({
    meta: [
      { title: "Servicios — Syntalia Vértice" },
      {
        name: "description",
        content:
          "Diagnóstico, posicionamiento, captación y optimización: un sistema en cuatro etapas para convertir tu presencia digital en resultados medibles.",
      },
      { property: "og:title", content: "Servicios — Syntalia Vértice" },
      {
        property: "og:description",
        content:
          "Diagnóstico, posicionamiento, captación y optimización. Un sistema estratégico en cuatro etapas para hacer crecer tu negocio.",
      },
      { property: "og:url", content: `${SITE_URL}/servicios` },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Servicios — Syntalia Vértice" },
      {
        name: "twitter:description",
        content:
          "Un sistema estratégico en cuatro etapas —diagnóstico, posicionamiento, captación y optimización— para convertir tu presencia digital en resultados medibles.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/servicios` }],
  }),
  component: ServiciosPage,
});

/** El ancla de cada etapa: 01 -> #etapa-01. */
const ancla = (e: EtapaSistema) => `etapa-${e.number}`;

const focoNavy =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

/**
 * Las cuatro etapas del Sistema Vértice desarrolladas, con los servicios de
 * cada una. Todo sale de lib/sistema.ts, el mismo origen que la home.
 */
function ServiciosPage() {
  return (
    <div>
      <ServiciosHero />
      {SYSTEM_STAGES.map((etapa, i) => (
        <EtapaBloque key={etapa.number} etapa={etapa} alterna={i % 2 === 0} />
      ))}
      <ServiciosCTA />
    </div>
  );
}

function ServiciosHero() {
  return (
    <section className="seccion-clara">
      <div className="contenedor pt-[clamp(48px,6vw,88px)] pb-[clamp(48px,6vw,80px)]">
        <p className="etiqueta">Servicios</p>
        <h1 className="mt-5 max-w-[22ch] text-h2 text-balance">
          <Subrayado>Cuatro etapas</Subrayado> para convertir tu presencia digital en un sistema
          preparado para crecer
        </h1>
        <p className="mt-6 max-w-[40em] text-lead text-navy/72">
          Diagnóstico, posicionamiento, captación y optimización. Cada etapa se apoya en la
          anterior, y los servicios cobran sentido cuando trabajan juntos.
        </p>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {SYSTEM_STAGES.map((etapa) => (
            <li key={etapa.number}>
              <a
                href={`#${ancla(etapa)}`}
                className={cn(
                  "flex h-full items-center gap-4 rounded-btn border border-navy/12 bg-paper px-5 py-4 transition-colors hover:border-gold/60 motion-reduce:transition-none",
                  focoNavy,
                )}
              >
                <span className="font-display text-[28px] leading-none font-bold tracking-[-0.04em] text-gold-ink [font-variant-numeric:lining-nums]">
                  {etapa.number}
                </span>
                <span className="text-[14.5px] leading-[1.35] font-semibold">{etapa.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * Una etapa: a la izquierda número, título, lema y descripción; a la
 * derecha sus servicios. Los que tienen página propia se enlazan y llevan
 * el círculo con flecha; los demás van como texto.
 */
function EtapaBloque({ etapa, alterna }: { etapa: EtapaSistema; alterna: boolean }) {
  return (
    <section
      id={ancla(etapa)}
      className={cn("seccion-clara seccion scroll-mt-24", alterna && "alterna")}
    >
      <div className="contenedor grid gap-10 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] min-[900px]:gap-14">
        <div>
          <span
            aria-hidden
            className="block font-display text-[clamp(56px,7vw,96px)] leading-[0.85] font-bold tracking-[-0.05em] text-gold-ink [font-variant-numeric:lining-nums]"
          >
            {etapa.number}
          </span>
          <h2 className="mt-6 max-w-[16ch] text-h2 text-balance">{etapa.title}</h2>
          <p className="mt-3 text-lead font-semibold">{etapa.tagline}</p>
          <p className="mt-4 max-w-[38em] text-navy/72">{etapa.description}</p>
        </div>

        <div>
          <p className="etiqueta">Servicios de esta etapa</p>
          <ul className="mt-5 border-t border-navy/12">
            {(etapa.services ?? []).map((s) => (
              <li key={s.label} className="border-b border-navy/12">
                {s.to ? (
                  <Link
                    to={s.to}
                    className={cn(
                      "group flex items-center justify-between gap-4 px-1.5 py-4 text-[16px] font-medium transition-[background-color,padding] duration-200 hover:bg-navy/4 hover:pr-3 hover:pl-3.5 motion-reduce:transition-none",
                      focoNavy,
                    )}
                  >
                    {s.label}
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-content-center rounded-full border border-navy/18 transition-colors duration-200 group-hover:border-transparent group-hover:bg-gold motion-reduce:transition-none"
                    >
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.4} />
                    </span>
                  </Link>
                ) : (
                  <span className="block px-1.5 py-4 text-[16px] text-navy/80">{s.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ServiciosCTA() {
  return (
    <section className="seccion-clara seccion">
      <div className="contenedor">
        <div className="rounded-block bg-navy px-6 py-14 text-center text-cream md:px-16 md:py-16">
          <h2 className="mx-auto max-w-[22ch] text-h2 text-balance">
            ¿Listo para crecer con un sistema estratégico y medible?
          </h2>
          <p className="mx-auto mt-5 max-w-[38em] text-lead text-cream/72">
            Solicita tu diagnóstico y descubre oportunidades de crecimiento personalizadas para tu
            negocio.
          </p>
          <GoldCta to="/diagnostico" className="mt-9">
            Solicitar diagnóstico gratuito
          </GoldCta>
        </div>
      </div>
    </section>
  );
}
