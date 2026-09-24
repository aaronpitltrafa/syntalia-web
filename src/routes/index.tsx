import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Play,
  Plus,
} from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import logoBruma from "@/assets/logos-clientes/bruma-tropical.png";
import logoCnc from "@/assets/logos-clientes/cnc.png";
import logoFrulonsa from "@/assets/logos-clientes/frulonsa.png";
import logoRevivalia from "@/assets/logos-clientes/revivalia.png";
import { Reveal } from "@/components/motion";
import { GoldButton } from "@/components/gold-button";
import { GoldCta } from "@/components/gold-cta";
import { SectionLink } from "@/components/section-link";
import { SectionRail } from "@/components/section-rail";
import { useHomeSectionObserver } from "@/lib/home-sections";
import { SYSTEM_STAGES } from "@/lib/sistema";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { name: "description", content: "Solicita tu diagnóstico estratégico gratuito y descubre qué le está frenando a tu empresa para captar clientes de forma constante." },
      { property: "og:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { property: "og:description", content: "Consultoría de marketing digital estratégico. Solicita tu diagnóstico gratuito, sin compromiso." },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { name: "twitter:description", content: "Consultoría de marketing digital estratégico. Solicita tu diagnóstico gratuito, sin compromiso." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

/**
 * Home v3, en obras: hero y logos ya van en la dirección nueva, sobre
 * fondo ink. El resto de bloques se rehacen uno a uno; mientras tanto
 * siguen tal cual dentro de una banda crema, porque su texto navy sobre
 * ink no se leería.
 */
function Index() {
  useHomeSectionObserver();

  return (
    <div className="home-v3 relative bg-ink text-cream">
      <SectionRail />
      <Hero />
      <Logos />
      <Problema />
      <Sistema />

      {/* Bloques anteriores, pendientes de rehacer */}
      <div className="bg-background text-foreground">
        <AQuienVaDirigido />
        <CasoDeExito />
        <FAQ />
        <FinalCTA />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Piezas compartidas                                                   */
/* ------------------------------------------------------------------ */

/** Los dos anchos del sistema: bloque y columna de texto. */
const BLOQUE = "mx-auto max-w-wide px-6 sm:px-8";

/** Enlace subrayado: la alternativa discreta al botón principal. */
const FANTASMA =
  "inline-flex items-center gap-2 border-b-2 border-current pb-1 text-body font-semibold tracking-[-0.01em] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

/* ------------------------------------------------------------------ */
/* 1 · HERO                                                             */
/* ------------------------------------------------------------------ */

/** Cifras del caso Frulonsa en 90 días. La unidad se pinta aparte, más pequeña y en dorado. */
const CIFRAS_FRULONSA = [
  { label: "Reproducciones", value: "5,6", unit: "M" },
  { label: "Usuarios únicos", value: "1,4", unit: "M" },
  { label: "Interacciones", value: "157", unit: "K" },
  { label: "Nuevos seguidores", value: "+7.301" },
] as const;

const FUENTE_CIFRAS = "Caso Frulonsa · 90 días · datos de las analíticas de sus canales";

const GARANTIAS = ["Sin compromiso", "Respuesta en 24 h", "Plan estratégico gratuito"] as const;

function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[clamp(600px,88svh,920px)] flex-col justify-end overflow-hidden"
    >
      <div aria-hidden className="hero-stage pointer-events-none absolute inset-0 overflow-hidden">
        {/*
          HUECO PARA EL VÍDEO DE FONDO. Cuando esté listo, va aquí: encima
          del degradado (que queda de respaldo mientras carga) y debajo de
          las líneas y el velo:

            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={heroVideo}
              poster={heroPoster}
              autoPlay muted loop playsInline preload="metadata"
            />

          El velo NO se quita: es lo que mantiene el texto del hero en AA
          encima de cualquier imagen. Con prefers-reduced-motion conviene
          dejar solo el poster.
        */}
        <div className="hero-lines absolute inset-0" />
        <div className="hero-veil absolute inset-0" />
      </div>

      <div className="relative z-[2] pt-[clamp(120px,15vw,190px)] pb-[clamp(28px,3vw,44px)]">
        <div className="contenedor">
          <span className="inline-flex items-center gap-[9px] rounded-full border border-cream/13 bg-cream/4 px-[17px] py-[9px] text-[11px] leading-none font-semibold tracking-[0.16em] text-cream/72 uppercase">
            <i
              aria-hidden
              className="h-[7px] w-[7px] shrink-0 rounded-full bg-gold shadow-[0_0_0_4px_rgb(212_175_55/0.16)]"
            />
            Consultora estratégica de marketing digital
          </span>

          <h1 className="mt-6 max-w-[15ch] text-hero text-balance text-cream">
            Construimos el{" "}
            <span className="mark-v3">sistema digital</span>{" "}
            que hace crecer tu empresa
          </h1>

          <p className="mt-6 max-w-[46ch] text-lead text-cream/72">
            No hacemos acciones aisladas. Analizamos qué necesita tu empresa y montamos un
            ecosistema donde estrategia, marca, captación, tecnología y automatización trabajan
            juntas.
          </p>

          <div className="mt-[34px] flex flex-wrap items-center gap-[13px]">
            <GoldCta to="/diagnostico">Solicitar diagnóstico</GoldCta>
            <SectionLink
              id="caso"
              className="group inline-flex items-center gap-3 rounded-full pr-2 text-[14px] text-cream/72 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <span
                aria-hidden
                className="grid h-[46px] w-[46px] place-content-center rounded-full border border-cream/28 bg-cream/9 backdrop-blur-[6px] transition-colors group-hover:border-gold group-hover:bg-gold/20"
              >
                <Play className="h-4 w-4 fill-cream text-cream" strokeWidth={0} />
              </span>
              Ver el caso Frulonsa
            </SectionLink>
          </div>

          <ul className="mt-[26px] flex flex-wrap gap-x-7 gap-y-2.5 text-[13px] leading-[1.5] font-normal text-cream/62">
            {GARANTIAS.map((g) => (
              <li key={g} className="flex items-center gap-2">
                <span aria-hidden className="h-[5px] w-[5px] shrink-0 rounded-full bg-gold" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Banda de cifras sobre cristal, pegada al borde inferior */}
      <div className="relative z-[2] border-t border-cream/13 bg-[rgb(3_11_36/0.5)] backdrop-blur-[10px]">
        <div className="contenedor">
          <dl className="grid grid-cols-2 min-[860px]:grid-cols-4">
            {CIFRAS_FRULONSA.map((c, i) => (
              <div
                key={c.label}
                className={cn(
                  "px-[22px] py-5",
                  i % 2 === 1 && "border-l border-cream/13",
                  i >= 2 && "border-t border-cream/13 min-[860px]:border-t-0",
                  i === 2 && "min-[860px]:border-l",
                )}
              >
                <dt className="text-[11px] leading-[1.3] font-normal tracking-[0.14em] text-cream/62 uppercase">
                  {c.label}
                </dt>
                <dd className="mt-[9px] font-display text-[clamp(26px,2.9vw,38px)] leading-none font-bold tracking-[-0.035em] text-cream [font-variant-numeric:lining-nums_tabular-nums]">
                  {c.value}
                  {"unit" in c && (
                    <small className="ml-[0.05em] text-[0.5em] text-gold-light">{c.unit}</small>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-cream/13 px-[22px] pt-3 pb-4 text-[12.5px] leading-[1.5] text-cream/62">
            {FUENTE_CIFRAS}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 1b · LOGOS                                                           */
/* ------------------------------------------------------------------ */

const LOGOS = [
  { src: logoFrulonsa, alt: "Frulonsa", height: 34 },
  { src: logoRevivalia, alt: "Revivalia", height: 46 },
  { src: logoCnc, alt: "Método CNC", height: 34 },
  { src: logoBruma, alt: "Bruma Tropical", height: 38 },
] as const;

function Logos() {
  return (
    <div className="overflow-hidden border-y border-cream/13 py-[clamp(30px,3.4vw,44px)]">
      <div className="contenedor">
        <p className="etiqueta mb-[26px] text-center">Empresas que confían en nosotros</p>
      </div>

      <div className="marquesina">
        {/* La misma tanda dos veces en el mismo track: al llegar a -50% el
            track vuelve a 0 sin que se note. La copia no se anuncia. */}
        <ul className="marquesina-track flex w-max items-center">
          {[false, true].map((copia) =>
            LOGOS.map((l) => (
              <li
                key={`${l.alt}-${copia}`}
                aria-hidden={copia || undefined}
                className={cn(
                  "grid min-h-[58px] shrink-0 place-content-center pr-[clamp(56px,7vw,110px)] opacity-82 transition-[opacity,translate] duration-200 hover:-translate-y-px hover:opacity-100 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:px-6",
                  copia && "marquesina-copia",
                )}
              >
                <img
                  src={l.src}
                  alt={copia ? "" : l.alt}
                  style={{ height: l.height }}
                  className="block w-auto max-w-none"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · EL PROBLEMA                                                      */
/* ------------------------------------------------------------------ */

/** Los iconos son los trazos de la referencia (24x24, trazo 2). */
const PROBLEMAS = [
  {
    titulo: "No se entiende qué te diferencia",
    texto:
      "Tu mensaje se parece al de cualquier otra empresa y el cliente no encuentra una razón clara para elegirte.",
    icono: "M3 12h4l3 8 4-16 3 8h4",
  },
  {
    titulo: "Tu presencia no genera confianza",
    texto:
      "Tu web, tus redes y tu mensaje no reflejan el nivel real, la experiencia ni la solidez de tu negocio.",
    icono: "M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z",
  },
  {
    titulo: "El marketing no genera contactos",
    texto:
      "Hay acciones, publicaciones o campañas, pero no un sistema claro para convertir el interés en oportunidades comerciales.",
    icono: "M4 6h16M4 12h10M4 18h6M20 14l-4 4 4 4",
  },
] as const;

function Problema() {
  return (
    <section id="problema" className="seccion-clara seccion scroll-mt-6">
      <div className="contenedor">
        <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:items-start min-[900px]:gap-14">
          <div>
            <p className="etiqueta">
              <span className="etiqueta-num">01</span>El problema
            </p>
            <h2 className="mt-5 max-w-[15ch] text-h2 text-balance">
              Tu empresa tiene valor. Su presencia digital no lo demuestra.
            </h2>
          </div>
          <p className="max-w-[34em] text-lead text-navy/72">
            Empresas con experiencia y una oferta sólida que, sin embargo, no generan confianza ni
            oportunidades en el canal donde hoy decide el cliente.
          </p>
        </div>

        <ul className="mt-[clamp(36px,4vw,54px)] grid gap-[18px] min-[860px]:grid-cols-3">
          {PROBLEMAS.map((p) => (
            <li
              key={p.titulo}
              className="rounded-card border border-navy/12 bg-paper p-[26px] shadow-[0_26px_48px_-40px_rgb(2_21_87/0.5)] transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-gold/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 place-content-center rounded-[13px] bg-navy text-gold-light"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={p.icono} />
                </svg>
              </span>
              <h3 className="mt-5 text-h3 font-semibold text-balance">{p.titulo}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.65] text-navy/72">{p.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · EL SISTEMA                                                       */
/* ------------------------------------------------------------------ */

/**
 * La home resume cada etapa en una frase. El título, el lema y las listas
 * de servicios salen de lib/sistema.ts, que comparte con /servicios.
 */
const RESUMEN_ETAPA: Record<string, string> = {
  "01": "Negocio, mercado, cliente ideal y presencia digital, para ver qué frena el crecimiento.",
  "02": "Mensaje, propuesta de valor, marca, web y contenidos que sostienen todo lo demás.",
  "03": "Campañas, landings, formularios, CRM y automatizaciones conectados entre sí.",
  "04": "Analizamos el sistema para potenciar lo que de verdad genera negocio.",
};

/** Bloque azul de marca a sangre. Crema sobre #021557: 15:1, y al 72% 8:1. */
function Sistema() {
  return (
    <section id="sistema" className="seccion scroll-mt-6 bg-navy text-cream">
      <div className="contenedor">
        <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:items-start min-[900px]:gap-14">
          <div>
            <p className="etiqueta">
              <span className="etiqueta-num">02</span>Sistema Vértice
            </p>
            <h2 className="mt-5 max-w-[15ch] text-h2 text-balance">
              Cuatro etapas, un solo ecosistema
            </h2>
          </div>
          <p className="max-w-[34em] text-lead text-cream/72">
            Cada etapa se apoya en la anterior. No lanzamos campañas hasta que la base está
            construida, porque es lo que hace que el gasto se convierta en retorno.
          </p>
        </div>

        <ol className="mt-[clamp(40px,4.5vw,60px)] grid border-t border-cream/13 min-[960px]:grid-cols-4">
          {SYSTEM_STAGES.map((s) => (
            <li
              key={s.number}
              className="border-b border-cream/13 pt-[26px] pb-[30px] min-[960px]:border-b-0 min-[960px]:pt-7 min-[960px]:pr-[26px] min-[960px]:pb-[34px] min-[960px]:[&+&]:border-l min-[960px]:[&+&]:pl-[26px]"
            >
              <span
                aria-hidden
                className="block font-display text-[clamp(46px,4.6vw,64px)] leading-[0.85] font-bold tracking-[-0.05em] text-gold-light [font-variant-numeric:lining-nums]"
              >
                {s.number}
              </span>
              <h3 className="mt-[18px] text-h3 font-semibold text-balance">{s.title}</h3>
              <p className="mt-[9px] text-[14.5px] leading-[1.5] font-semibold">{s.tagline}</p>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-cream/72">
                {RESUMEN_ETAPA[s.number]}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · ¿ES ESTO PARA TI?                                                */
/* ------------------------------------------------------------------ */

const FIT_ITEMS = [
  "Tu empresa funciona bien, pero no crece al ritmo que debería.",
  "No transmite online el nivel real de calidad que tiene.",
  "Depende demasiado del boca a boca o de clientes de siempre.",
  "No genera contactos nuevos de forma constante cada mes.",
  "Quieres dejar de improvisar y trabajar con una estrategia real.",
];

function AQuienVaDirigido() {
  return (
    <section id="para-ti" className="relative scroll-mt-24 py-16 md:py-24">
      <div className={BLOQUE}>
        <div className="surface-slab grid gap-12 rounded-[30px] px-6 py-10 md:rounded-[40px] md:px-16 md:py-[72px] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <p className="label-mono">¿Es esto para ti?</p>

            <h2 className="mt-5 max-w-[15ch] text-h2 text-foreground">
              Esto es para ti <span className="mark">si tu empresa...</span>
            </h2>

            <p className="mt-6 max-w-text text-lead leading-[1.65] text-foreground/75">
              Tu empresa tiene valor real, pero algo está bloqueando su crecimiento. Si te identificas con alguno de estos puntos, podemos ayudarte:
            </p>

            <p className="mt-7 text-title leading-[1.15] font-bold tracking-[-0.03em] text-foreground">
              No es vender más.
              <br />
              Es posicionarte mejor.
            </p>
          </div>

          {/* En movil no hay tarjetas: una linea por punto, a todo el
              ancho y separadas por filetes. */}
          <ul className="flex flex-col md:gap-2.5">
            {FIT_ITEMS.map((it, i) => (
              <Reveal key={it} delay={i * 80}>
                <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 border-b border-border py-4 text-lead text-foreground md:gap-4 md:rounded-[18px] md:border md:bg-background md:px-5">
                  <CheckCircle2 aria-hidden className="h-[18px] w-[18px] shrink-0 text-gold-text md:hidden" />
                  <span className="hidden h-7 w-7 items-center justify-center rounded-full bg-gold/18 md:flex" aria-hidden>
                    <CheckCircle2 className="h-[15px] w-[15px] text-gold-text" />
                  </span>
                  {it}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · CASO DE ÉXITO                                                    */
/* ------------------------------------------------------------------ */

/** Cifras fijas, sin contador: una captura a medias mostraba un dato falso. */
const FRULONSA_DESTACADO = "5,6 M";

/** La unidad se pinta más pequeña, así que la separamos de la cifra. */
const [FRULONSA_CIFRA, FRULONSA_UNIDAD] = FRULONSA_DESTACADO.split(" ");

const FRULONSA_METRICS = [
  { value: "1,4 M", label: "Usuarios únicos" },
  { value: "157 K", label: "Interacciones" },
  { value: "+7.301", label: "Nuevos seguidores" },
] as const;

function CasoDeExito() {
  return (
    <section id="caso" className="relative scroll-mt-24 py-16 md:py-24">
      <div className={BLOQUE}>
        <p className="label-mono">Caso de éxito · Frulonsa</p>

        <h2 className="mt-5 max-w-[18ch] text-h2 text-foreground">
          Resultados que demuestran lo que pasa cuando el sistema está{" "}
          <span className="mark">bien construido</span>.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          {/* izquierda: la cifra estrella, a tamaño de titular */}
          <div>
            <Reveal>
              <span className="block text-[clamp(84px,13vw,200px)] leading-[0.92] font-bold tracking-[-0.04em] text-foreground">
                {FRULONSA_CIFRA}
                <span className="text-[0.34em] tracking-[-0.03em]">{FRULONSA_UNIDAD}</span>
              </span>
            </Reveal>

            <p className="mt-6 max-w-[34ch] text-lead leading-[1.55] text-foreground/75">
              Reproducciones del contenido durante los 90 días en los que trabajamos la estrategia,
              la planificación y la producción de contenido de Frulonsa.
            </p>

            <Link to="/contacto" className={cn(FANTASMA, "mt-7 text-foreground")}>
              Ver el caso completo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          {/* derecha: el resto de métricas, en lista con filetes */}
          <div>
            <dl className="border-t-2 border-navy">
              {FRULONSA_METRICS.map((m, i) => (
                <Reveal key={m.label} delay={100 + i * 80}>
                  <div className="flex items-baseline justify-between gap-5 border-b border-border py-[18px]">
                    <dt className="label-mono">{m.label}</dt>
                    <dd className="text-[40px] leading-none font-bold tracking-[-0.035em] text-foreground">
                      {m.value}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>

            <p className="mt-4 text-meta text-foreground/75">
              Datos de las analíticas de los canales de Frulonsa durante 90 días.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · PREGUNTAS FRECUENTES                                             */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "¿Para qué tipo de empresas está pensado el Sistema Vértice?",
    a: "Trabajamos principalmente con empresas que ya tienen actividad real, una oferta sólida y necesitan ordenar su posicionamiento, presencia digital, captación o seguimiento comercial.",
  },
  {
    q: "¿Puedo trabajar con vosotros si todavía no tengo una base digital bien construida?",
    a: "Sí. Podemos comenzar definiendo posicionamiento, mensaje, identidad y los activos digitales necesarios antes de trabajar visibilidad o captación.",
  },
  {
    q: "¿Y si ya tengo web, redes o campañas, pero no están funcionando?",
    a: "Analizamos lo que ya existe para detectar qué debe mantenerse, corregirse o conectarse mejor. Aprovechamos lo útil y reorganizamos lo que no cumple una función clara.",
  },
  {
    q: "¿Trabajáis solo la estrategia o también implementáis?",
    a: "Trabajamos ambas partes. Podemos implementar webs, landings, contenido, captación, CRM, automatizaciones y procesos de seguimiento.",
  },
  {
    q: "¿Puedo contratar únicamente una parte del sistema?",
    a: "Sí, siempre que tenga sentido estratégico. Podemos trabajar servicios concretos, pero evitamos ejecutar acciones aisladas cuando falta una base imprescindible.",
  },
  {
    q: "¿Cuánto tiempo tarda en ponerse en marcha?",
    a: "Depende del punto de partida y del alcance. Después del diagnóstico definimos prioridades, fases y un calendario realista.",
  },
  {
    q: "¿Cómo se determina la inversión?",
    a: "Se calcula según las necesidades, los activos que debamos construir y el nivel de implementación. La propuesta será personalizada, no un paquete genérico.",
  },
  {
    q: "¿Qué ocurre después de solicitar el diagnóstico?",
    a: "Revisamos la información de tu empresa, identificamos los principales puntos de mejora y nos ponemos en contacto para compartir conclusiones y valorar el siguiente paso.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-28 py-16 md:py-24">
      <div className={BLOQUE}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start lg:gap-14">
          <div>
            <p className="label-mono">FAQ</p>
            <h2 className="mt-5 max-w-[9ch] text-h2 text-foreground">
              Preguntas <span className="mark">frecuentes</span>.
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full border-t-2 border-navy">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="group gap-5 py-5 text-left hover:no-underline [&>svg]:hidden">
                  <span className="font-sans text-lead font-semibold tracking-[-0.015em] text-foreground">
                    {f.q}
                  </span>
                  <span aria-hidden className="ml-5 shrink-0 text-gold-text">
                    <Plus className="h-5 w-5 group-data-[state=open]:hidden" />
                    <Minus className="hidden h-5 w-5 group-data-[state=open]:block" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-10 pb-5 leading-relaxed text-foreground/75">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7 · CIERRE                                                           */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section id="contacto" className="relative scroll-mt-24 px-3 pb-7 md:px-5">
      <div className="surface-navy relative overflow-hidden rounded-[34px] md:rounded-[40px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-gold absolute -bottom-[340px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full" />
          <div className="hero-grain absolute inset-0 opacity-5" />
        </div>

        <div className="relative mx-auto max-w-wide px-6 py-20 sm:px-8 md:py-[104px]">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="relative w-32 overflow-hidden aspect-[761/220] sm:w-40">
              <img src={logoWhite} alt="" className="h-auto w-full" />
            </div>
            <p className="label-mono">Plazas limitadas este mes</p>
          </div>

          <h2 className="mt-12 max-w-[13ch] text-[clamp(40px,6.7vw,104px)] leading-[0.98] tracking-[-0.035em] text-foreground">
            Tu empresa ya tiene valor.
          </h2>

          <p className="mt-6 max-w-[24ch] text-[clamp(22px,2.4vw,34px)] leading-[1.15] font-bold tracking-[-0.03em] text-gold">
            Ahora necesita un sistema que lo convierta en oportunidades.
          </p>

          <p className="mt-8 max-w-text text-lead leading-[1.6] text-foreground/75">
            Solicita tu diagnóstico gratuito y descubre qué le está frenando a tu empresa para captar clientes de forma constante.
          </p>

          <div className="mt-16 flex flex-col gap-6 border-t border-cream/20 pt-7 md:flex-row md:items-center md:justify-between">
            <p className="label-mono">Sin compromiso · Respuesta en 24 h · Plan estratégico gratuito</p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/contacto" className={cn(FANTASMA, "text-foreground")}>
                Hablar con el equipo
              </Link>
              <GoldButton to="/diagnostico">Solicitar diagnóstico gratuito</GoldButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
