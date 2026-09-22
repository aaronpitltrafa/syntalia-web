import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Minus,
  Plus,
  ShieldCheck,
  Target,
  UserPlus,
} from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { Reveal } from "@/components/motion";
import { GoldButton } from "@/components/gold-button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SITE_URL } from "@/lib/site";
import { SYSTEM_STAGES } from "@/lib/sistema";
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
 * La home en 7 bloques: hero (con los diferenciales dentro), problema,
 * sistema, para quién, caso, FAQ y cierre. Dos bloques a sangre: el
 * dorado del sistema y el azul del cierre.
 */
function Index() {
  return (
    <div className="relative text-foreground">
      <HeroPrincipal />
      <Problema />
      <Sistema />
      <AQuienVaDirigido />
      <CasoDeExito />
      <FAQ />
      <FinalCTA />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Piezas compartidas                                                   */
/* ------------------------------------------------------------------ */

/** Los dos anchos del sistema: bloque y columna de texto. */
const BLOQUE = "mx-auto max-w-block px-6 sm:px-8";

/** Enlace subrayado: la alternativa discreta al botón principal. */
const FANTASMA =
  "inline-flex items-center gap-2 border-b-2 border-current pb-1 text-body font-semibold tracking-[-0.01em] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

/* ------------------------------------------------------------------ */
/* 1 · HERO                                                             */
/* ------------------------------------------------------------------ */

const DIFERENCIALES_STRIP = [
  {
    title: "Estrategia antes que ejecución",
    description: "Cada acción responde a un plan claro, no a impulsos ni modas pasajeras.",
  },
  {
    title: "Captación y contenido conectados",
    description: "El contenido no es decorativo: alimenta directamente el sistema de captación.",
  },
  {
    title: "Seguimiento orientado a crecimiento",
    description: "Medimos, ajustamos y evolucionamos la estrategia con datos reales.",
  },
] as const;

function HeroPrincipal() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-gold absolute -top-[180px] -right-[140px] h-[720px] w-[720px] rounded-full opacity-70" />
        <div className="hero-grain absolute inset-0 opacity-5" />
      </div>

      <div className="relative pt-28 pb-16 lg:pt-32">
        <div className={BLOQUE}>
          <p className="label-mono">Syntalia Vértice · Consultora estratégica · Murcia</p>

          {/* El H1 manda: ancho corto para que caiga en pocas líneas muy
              grandes, y una sola palabra subrayada en dorado. */}
          <h1 className="mt-6 max-w-[17ch] text-hero text-foreground">
            Convertimos tu presencia digital en{" "}
            <span className="mark">oportunidades</span> comerciales reales
          </h1>

          {/* filete y dos columnas: el argumento a la izquierda, la acción a la derecha */}
          <div className="mt-10 grid gap-8 border-t-2 border-navy pt-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <p className="max-w-[34ch] text-[18px] leading-[1.5] text-foreground/75 md:text-[21px]">
              Ayudamos a empresas y negocios que ya venden, a posicionarse mejor y generar contactos
              cualificados con una estrategia digital clara.
            </p>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Link to="/servicios" className={cn(FANTASMA, "text-foreground")}>
                Ver cómo trabajamos
              </Link>
              <GoldButton to="/diagnostico">Solicitar diagnóstico gratuito</GoldButton>
            </div>
          </div>
        </div>

        {/* diferenciales, dentro del propio hero */}
        <div className={cn(BLOQUE, "mt-14")}>
          <div className="grid gap-7 text-left sm:grid-cols-3">
            {DIFERENCIALES_STRIP.map((d) => (
              <div key={d.title} className="border-t-2 border-navy pt-4">
                <span className="label-mono">{d.title}</span>
                <p className="mt-2 text-meta leading-[1.55] text-foreground/75">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · EL PROBLEMA                                                      */
/* ------------------------------------------------------------------ */

const PROBLEMS = [
  {
    id: "diferenciacion",
    icon: Target,
    title: "No se entiende qué te diferencia",
    description:
      "Tu mensaje se parece al de cualquier otra empresa y el cliente no encuentra una razón clara para elegirte.",
  },
  {
    id: "confianza",
    icon: ShieldCheck,
    title: "Tu presencia no genera confianza",
    description:
      "Tu web, tus redes y tu mensaje no reflejan el nivel real, la experiencia ni la solidez de tu negocio.",
  },
  {
    id: "contactos",
    icon: UserPlus,
    title: "El marketing no genera contactos",
    description:
      "Hay acciones, publicaciones o campañas, pero no un sistema claro para convertir el interés en oportunidades comerciales.",
  },
] as const;

function Problema() {
  return (
    <section className="relative py-16 md:py-24">
      <div className={BLOQUE}>
        <p className="label-mono">El problema</p>

        <h2 className="mt-5 max-w-[16ch] text-h2 text-foreground">
          No basta con tener valor. Hay que saber convertirlo en{" "}
          <span className="mark">oportunidades</span>.
        </h2>

        <p className="mt-6 max-w-text text-lead leading-[1.65] text-foreground/75">
          Muchas empresas tienen experiencia y una oferta sólida, pero su presencia digital no está generando confianza ni oportunidades comerciales.
        </p>

        <div className="mt-12 grid gap-[18px] md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="h-full">
              <div className="surface-card flex h-full flex-col rounded-[22px] p-7">
                <span className="mb-[22px] flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15" aria-hidden>
                  <p.icon className="h-[18px] w-[18px] text-gold-text" />
                </span>
                <h3 className="text-title leading-[1.15] font-bold tracking-[-0.03em] text-foreground text-balance">
                  {p.title}
                </h3>
                <p className="mt-3 leading-[1.6] text-foreground/75">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · EL SISTEMA                                                       */
/* ------------------------------------------------------------------ */


/**
 * Una etapa. Por debajo de md el detalle (parrafo y viñetas) va plegado
 * detras de "Ver qué incluye": cuatro etapas abiertas hacian del bloque
 * una pantalla y media de scroll en movil. De md en adelante el detalle
 * esta siempre visible y el boton no se monta.
 */
function Etapa({ stage }: { stage: (typeof SYSTEM_STAGES)[number] }) {
  const [abierta, setAbierta] = useState(false);
  const panelId = `etapa-${stage.number}`;

  return (
    <div className="flex h-full flex-col pr-4">
      <span
        aria-hidden
        className="block text-[64px] leading-[0.9] font-bold tracking-[-0.04em] text-foreground lg:text-[96px]"
      >
        {stage.number}
      </span>

      <h3 className="mt-5 text-[23px] leading-[1.1] font-bold tracking-[-0.03em] text-foreground text-balance">
        {stage.title}
      </h3>
      <p className="mt-1.5 text-lead leading-[1.3] font-semibold text-foreground/80">{stage.tagline}</p>

      <button
        type="button"
        onClick={() => setAbierta((v) => !v)}
        aria-expanded={abierta}
        aria-controls={panelId}
        className="mt-4 flex w-full items-center justify-between gap-3 border-t border-navy/25 pt-3.5 text-left text-meta font-semibold text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy md:hidden"
      >
        Ver qué incluye
        <ChevronDown
          aria-hidden
          className={cn("h-4 w-4 shrink-0 transition-transform", abierta && "rotate-180")}
        />
      </button>

      <div id={panelId} className={cn("md:block", abierta ? "block" : "hidden")}>
        <p className="mt-3 text-meta leading-[1.6] text-foreground/85">{stage.description}</p>

        <ul className="mt-4 flex flex-col gap-1.5 pt-3.5 md:border-t md:border-navy/25">
          {stage.includes.map((item) => (
            <li key={item} className="flex items-baseline gap-2.5 text-meta text-foreground">
              <span aria-hidden className="h-[5px] w-[5px] shrink-0 -translate-y-0.5 rounded-full bg-navy" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** El único bloque dorado de la web: a sangre y con todo el texto en navy. */
function Sistema() {
  return (
    <section id="fases" className="surface-gold relative scroll-mt-24 py-[72px] md:py-24">
      <div className={BLOQUE}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-10">
          <h2 className="max-w-[16ch] text-h2 text-foreground">
            De una presencia digital dispersa a un sistema preparado para crecer.
          </h2>

          <div>
            <p className="label-mono">Sistema Vértice · 4 etapas</p>
            <p className="mt-3 max-w-text text-lead leading-[1.55] text-foreground/85">
              Cada etapa se apoya en la anterior.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-y-10 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
          {SYSTEM_STAGES.map((s, i) => (
            <Reveal
              key={s.number}
              delay={i * 80}
              className={cn(
                "h-full border-t-2 border-navy pt-6",
                "sm:[&:nth-child(2n)]:border-l-2 sm:[&:nth-child(2n)]:border-navy sm:[&:nth-child(2n)]:pl-6",
                "lg:[&:nth-child(n+2)]:border-l-2 lg:[&:nth-child(n+2)]:border-navy lg:[&:nth-child(n+2)]:pl-6",
              )}
            >
              <Etapa stage={s} />
            </Reveal>
          ))}
        </div>
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
    <section className="relative py-16 md:py-24">
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
    <section className="relative py-16 md:py-24">
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
    <section className="relative px-3 pb-7 md:px-5">
      <div className="surface-navy relative overflow-hidden rounded-[34px] md:rounded-[40px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-gold absolute -bottom-[340px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full" />
          <div className="hero-grain absolute inset-0 opacity-5" />
        </div>

        <div className="relative mx-auto max-w-block px-6 py-20 sm:px-8 md:py-[104px]">
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
