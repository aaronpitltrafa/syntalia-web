import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  Play,
  ShieldCheck,
  Target,
  UserPlus,
} from "lucide-react";
import logoWhite from "@/assets/logo-white.png";
import { Reveal } from "@/components/motion";
import { GoldButton } from "@/components/gold-button";
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
 * La home en 7 bloques: hero (con los diferenciales dentro), problema,
 * sistema, para quién, caso, FAQ y cierre. Un único bloque azul, el final.
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

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-2">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
      <span className="text-micro font-semibold uppercase tracking-[0.22em] text-gold-text">{children}</span>
    </span>
  );
}

/** Los dos anchos del sistema: bloque y columna de texto. */
const BLOQUE = "mx-auto max-w-block px-6 sm:px-8";

/* ------------------------------------------------------------------ */
/* 1 · HERO                                                             */
/* ------------------------------------------------------------------ */

// TODO: datos de ejemplo, sustituir por reales
const PANEL_FLUJO = [
  { etiqueta: "Entrada", valor: "Meta Ads · Instagram" },
  { etiqueta: "Conversión", valor: "Landing + formulario" },
];

// TODO: datos de ejemplo, sustituir por reales
const PANEL_LEADS = [
  { iniciales: "CD", nombre: "Clínica dental · Murcia", origen: "Meta Ads", estado: "WhatsApp enviado", activo: true },
  { iniciales: "GM", nombre: "Gimnasio · Molina de Segura", origen: "Instagram", estado: "En seguimiento", activo: false },
  { iniciales: "FS", nombre: "Centro de fisioterapia", origen: "SEO local", estado: "Cualificando", activo: false },
  { iniciales: "AG", nombre: "Asesoría · Cartagena", origen: "Referido", estado: "Propuesta enviada", activo: false },
];

const PANEL_COLS = "grid grid-cols-[1fr_120px_150px] gap-4 lg:grid-cols-[1fr_190px_170px]";
const PANEL_LABEL = "text-micro font-semibold uppercase tracking-[0.22em] text-foreground/70";

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

function HeroPanel() {
  return (
    <div className="surface-card rounded-[26px] p-[18px]">
      {/* barra superior */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 pt-1 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-gold" />
          </span>
          <span className={PANEL_LABEL}>Panel de leads · vista de ejemplo</span>
        </div>

        <Chip>Automatización activa</Chip>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* flujo lateral */}
        <div className="flex flex-col">
          {PANEL_FLUJO.map((paso) => (
            <div key={paso.etiqueta}>
              <div className="rounded-[14px] border border-border bg-background px-4 py-3">
                <div className={PANEL_LABEL}>{paso.etiqueta}</div>
                <div className="mt-1 text-meta font-semibold text-foreground">{paso.valor}</div>
              </div>
              <div className="flex justify-center py-2" aria-hidden>
                <ArrowDown className="h-4 w-4 text-gold-text" />
              </div>
            </div>
          ))}

          <div className="rounded-[14px] bg-gradient-to-b from-gold-light to-gold px-4 py-3">
            <div className="text-micro font-semibold uppercase tracking-[0.22em] text-navy">Seguimiento</div>
            <div className="mt-1 text-meta font-bold text-navy">WhatsApp automático</div>
          </div>
        </div>

        {/* tabla de leads */}
        <div className="overflow-x-auto rounded-[16px] border border-border">
          <div className="min-w-[520px]">
            <div className={cn(PANEL_COLS, "border-b border-border px-[18px] py-3")}>
              <span className={PANEL_LABEL}>Contacto</span>
              <span className={PANEL_LABEL}>Origen</span>
              <span className={PANEL_LABEL}>Estado</span>
            </div>

            {PANEL_LEADS.map((lead, i) => (
              <div
                key={lead.iniciales}
                className={cn(PANEL_COLS, "items-center px-[18px] py-3", i < PANEL_LEADS.length - 1 && "border-b border-border")}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    aria-hidden
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] border text-micro font-bold",
                      lead.activo ? "border-gold/30 bg-gold/15 text-gold-text" : "border-border bg-background text-foreground/70",
                    )}
                  >
                    {lead.iniciales}
                  </span>
                  <span className="truncate text-meta font-medium text-foreground">{lead.nombre}</span>
                </div>

                <span className="text-meta text-foreground/70">{lead.origen}</span>

                <span
                  className={cn(
                    "inline-flex items-center gap-2 text-micro font-semibold",
                    lead.activo ? "text-gold-text" : "text-foreground/70",
                  )}
                >
                  <span aria-hidden className={cn("h-1.5 w-1.5 shrink-0 rounded-full", lead.activo ? "bg-gold" : "bg-foreground/40")} />
                  {lead.estado}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroPrincipal() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-gold absolute -top-[180px] -right-[140px] h-[720px] w-[720px] rounded-full opacity-70" />
        <div className="absolute top-10 left-1/2 h-[920px] w-[920px] -translate-x-1/2 rounded-full border border-foreground/5" />
        <div className="hero-grain absolute inset-0 opacity-5" />
      </div>

      <div className="relative px-6 pt-32 pb-24 sm:px-8 sm:pt-40 lg:pt-[11.5rem]">
        <div className="mx-auto max-w-block text-center">
          <Chip>Consultora estratégica de marketing digital</Chip>

          <h1 className="mx-auto mt-[30px] max-w-[15ch] text-[46px] leading-[0.95] tracking-[-0.035em] text-foreground text-balance lg:text-hero">
            Convertimos tu presencia digital en{" "}
            <span className="text-gradient-gold-hero italic">oportunidades comerciales reales</span>
          </h1>

          <p className="mx-auto mt-[26px] max-w-text text-lead leading-[1.62] text-foreground/70 ">
            Ayudamos a empresas y negocios que ya venden, a posicionarse mejor y generar contactos
            cualificados con una estrategia digital clara.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GoldButton to="/diagnostico">Solicitar diagnóstico gratuito</GoldButton>

            <Link
              to="/servicios"
              className="btn-glass inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-full px-6 text-body font-medium tracking-[-0.01em] text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <Play className="h-4 w-4 shrink-0" aria-hidden />
              Ver cómo trabajamos
            </Link>
          </div>
        </div>

        {/* panel de producto */}
        <div className="mx-auto mt-14 max-w-block">
          <HeroPanel />
        </div>

        {/* diferenciales, dentro del propio hero */}
        <div className="mx-auto mt-9 grid max-w-block gap-7 text-left sm:grid-cols-3">
          {DIFERENCIALES_STRIP.map((d) => (
            <div key={d.title} className="border-t border-border pt-4">
              <span className="block text-body font-semibold tracking-[-0.01em] text-foreground">{d.title}</span>
              <p className="mt-1.5 text-meta leading-[1.55] text-foreground/70">{d.description}</p>
            </div>
          ))}
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
        <Chip>El problema</Chip>

        <h2 className="mt-[22px] max-w-text text-h3 leading-[1.0] tracking-[-0.03em] text-foreground text-balance md:text-h2">
          No basta con tener valor. Hay que saber convertirlo en{" "}
          <span className="text-gradient-gold-hero italic">oportunidades</span>.
        </h2>

        <p className="mt-5 max-w-text text-lead leading-[1.65] text-foreground/70 ">
          Muchas empresas tienen experiencia y una oferta sólida, pero su presencia digital no está generando confianza ni oportunidades comerciales.
        </p>

        <div className="mt-12 grid gap-[18px] md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.id} delay={i * 90} className="h-full">
              <div className="surface-card flex h-full flex-col rounded-[22px] p-7">
                <span className="mb-[22px] flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15" aria-hidden>
                  <p.icon className="h-[18px] w-[18px] text-gold-text" />
                </span>
                <h3 className="text-title font-semibold leading-[1.25] tracking-[-0.02em] text-foreground text-balance">
                  {p.title}
                </h3>
                <p className="mt-3 leading-[1.6] text-foreground/70">{p.description}</p>
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
 * Fusión de "Cómo trabajamos" y las tres capas del Sistema Vértice: las
 * cuatro etapas a la vista, y los servicios de las capas repartidos
 * dentro de las etapas 02 y 03.
 */
const SYSTEM_STAGES = [
  {
    number: "01",
    title: "Diagnóstico estratégico",
    tagline: "Entendemos antes de construir.",
    description:
      "Analizamos el negocio, el mercado, el cliente ideal y la presencia digital para identificar qué está frenando el crecimiento.",
    includes: ["Posicionamiento y captación actual", "Prioridades y objetivos", "Hoja de ruta"],
  },
  {
    number: "02",
    title: "Posicionamiento y base digital",
    tagline: "Ordenamos cómo debe percibirse tu empresa.",
    description:
      "Clarificamos el mensaje, la propuesta de valor y los activos digitales necesarios para transmitir una imagen sólida, profesional y diferenciada.",
    includes: ["Branding e identidad visual", "Web y landing pages", "Contenidos y redes sociales", "Copywriting y SEO"],
  },
  {
    number: "03",
    title: "Captación y conversión",
    tagline: "Convertimos atención en oportunidades.",
    description:
      "Diseñamos el recorrido necesario para atraer, recoger, organizar y seguir contactos con intención comercial.",
    includes: ["Social Ads y campañas", "Formularios y landing de captación", "CRM y automatizaciones", "Email marketing y seguimiento"],
  },
  {
    number: "04",
    title: "Optimización y escalado",
    tagline: "Medimos, corregimos y reforzamos.",
    description:
      "Analizamos el funcionamiento del sistema para mejorar su eficiencia y potenciar aquello que realmente genera resultados.",
    includes: ["Conversión y rendimiento", "Automatización", "Escalado"],
  },
] as const;

function Sistema() {
  return (
    <section id="fases" className="relative scroll-mt-24 py-16 md:py-24">
      <div className={BLOQUE}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end lg:gap-10">
          <div>
            <Chip>Sistema Vértice · 4 etapas</Chip>
            <h2 className="mt-[22px] max-w-text text-h3 leading-[1.0] tracking-[-0.03em] text-foreground text-balance md:text-h2">
              De una presencia digital dispersa a un{" "}
              <span className="text-gradient-gold-hero italic">sistema preparado para crecer</span>.
            </h2>
          </div>
          <p className="max-w-text text-lead leading-[1.65] text-foreground/70 ">
            Cada etapa se apoya en la anterior. Las tres capas de servicio viven dentro de las etapas 02 y 03.
          </p>
        </div>

        <div className="relative mt-14 grid gap-[18px] md:grid-cols-4">
          {/* la línea que une las cuatro etapas */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-7 bottom-7 left-7 w-px bg-gradient-to-b from-foreground/20 to-gold md:top-7 md:right-7 md:bottom-auto md:left-7 md:h-px md:w-auto md:bg-gradient-to-r"
          />

          {SYSTEM_STAGES.map((s, i) => {
            const ultimo = i === SYSTEM_STAGES.length - 1;
            return (
              <Reveal key={s.number} delay={i * 80} className="h-full">
                <div className="relative grid h-full grid-cols-[56px_minmax(0,1fr)] items-start gap-4 md:flex md:flex-col md:gap-0">
                  <span
                    aria-hidden
                    className={cn(
                      "relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-display text-title",
                      ultimo
                        ? "border-transparent bg-gradient-to-b from-gold-light to-gold text-navy shadow-[0_10px_24px_-10px_oklch(0.745_0.135_82/80%)]"
                        : "border-foreground/20 bg-background text-foreground",
                    )}
                  >
                    {s.number}
                  </span>

                  <div className="surface-card rounded-[22px] p-6 md:mt-[18px] md:flex-1">
                    <h3 className="text-lead font-semibold leading-[1.3] tracking-[-0.015em] text-foreground">{s.title}</h3>
                    <p className="mt-1.5 font-display text-lead italic leading-[1.3] text-gold-text">{s.tagline}</p>
                    <p className="mt-3 text-meta leading-[1.6] text-foreground/70">{s.description}</p>

                    <ul className="mt-4 flex flex-col gap-1.5 border-t border-border pt-3.5">
                      {s.includes.map((item) => (
                        <li key={item} className="flex items-baseline gap-2.5 text-meta text-foreground">
                          <span aria-hidden className="h-[5px] w-[5px] shrink-0 -translate-y-0.5 rounded-full bg-gold" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
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
            <Chip>¿Es esto para ti?</Chip>

            <h2 className="mt-[22px] max-w-text text-h3 leading-[1.0] tracking-[-0.03em] text-foreground text-balance md:text-h2">
              <span className="block">Esto es</span>
              <span className="block">
                para ti <span className="text-gold-text italic">si</span>
              </span>
              <span className="block text-gold-text italic">tu empresa...</span>
            </h2>

            <p className="mt-5 max-w-text text-lead leading-[1.65] text-foreground/70">
              Tu empresa tiene valor real, pero algo está bloqueando su crecimiento. Si te identificas con alguno de estos puntos, podemos ayudarte:
            </p>

            <p className="mt-7 text-title font-semibold leading-[1.3] tracking-[-0.02em] text-foreground">
              No es vender más.
              <br />
              Es <span className="text-gold-text">posicionarte mejor</span>.
            </p>
          </div>

          <ul className="flex flex-col gap-2.5">
            {FIT_ITEMS.map((it, i) => (
              <Reveal key={it} delay={i * 80}>
                <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-[18px] border border-border bg-background px-5 py-4 text-lead text-foreground ">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/18" aria-hidden>
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

const FRULONSA_METRICS = [
  { value: "1,4 M", label: "Usuarios únicos" },
  { value: "157 K", label: "Interacciones" },
  { value: "+7.301", label: "Nuevos seguidores" },
] as const;

function CasoDeExito() {
  return (
    <section className="relative py-16 md:py-24">
      <div className={BLOQUE}>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* izquierda: titular y texto */}
          <div>
            <Chip>Caso de éxito · Frulonsa</Chip>

            <h2 className="mt-[22px] max-w-text text-h3 leading-[1.05] tracking-[-0.03em] text-foreground text-balance">
              Resultados que demuestran lo que pasa cuando{" "}
              <span className="text-gradient-gold-hero italic">el sistema está bien construido</span>.
            </h2>

            <p className="mt-5 max-w-text text-lead leading-[1.65] text-foreground/70 ">
              Durante 90 días trabajamos la estrategia, planificación y producción de contenido de Frulonsa para aumentar su visibilidad, fortalecer su comunidad y ampliar su presencia digital.
            </p>

            <Link
              to="/contacto"
              className="mt-[26px] inline-flex items-center gap-2 border-b border-gold pb-[3px] text-meta font-semibold text-foreground transition-colors hover:text-gold-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Ver el caso completo
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          {/* derecha: dato estrella y métricas */}
          <div>
            <Reveal>
              <div className="surface-navy relative overflow-hidden rounded-[26px] p-8">
                <div
                  aria-hidden
                  className="glow-gold pointer-events-none absolute -top-[140px] -right-[120px] h-[360px] w-[360px] rounded-full"
                />
                <div className="relative">
                  <span className="text-micro font-semibold uppercase tracking-[0.22em] text-gold-text">
                    Resultado destacado
                  </span>
                  <div className="mt-3 font-display text-h2 leading-[0.9] text-foreground md:text-hero">
                    {FRULONSA_DESTACADO}
                  </div>
                  <p className="mt-2.5 max-w-text text-meta leading-[1.6] text-foreground/72">
                    Reproducciones del contenido durante el periodo analizado.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {FRULONSA_METRICS.map((m, i) => (
                <Reveal key={m.label} delay={100 + i * 80} className="h-full">
                  <div className="surface-card h-full rounded-[18px] p-[18px]">
                    <div className="font-display text-h3 leading-none text-gold-text">
                      {m.value}
                    </div>
                    <span className="mt-2 block text-micro font-semibold uppercase tracking-[0.1em] text-foreground/70">
                      {m.label}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="mt-3.5 text-micro text-foreground/70">
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
            <Chip>FAQ</Chip>
            <h2 className="mt-[22px] max-w-text text-h3 leading-[1.0] tracking-[-0.03em] text-foreground text-balance md:text-h2">
              Preguntas <span className="text-gradient-gold-hero italic">frecuentes</span>.
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full border-t border-border">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="group gap-5 py-5 text-left hover:no-underline [&>svg]:hidden">
                  <span className="font-sans text-lead font-semibold tracking-[-0.01em] text-foreground ">
                    {f.q}
                  </span>
                  <span aria-hidden className="ml-5 shrink-0 text-gold-text">
                    <Plus className="h-5 w-5 group-data-[state=open]:hidden" />
                    <Minus className="hidden h-5 w-5 group-data-[state=open]:block" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-10 pb-5 leading-relaxed text-foreground/70">{f.a}</AccordionContent>
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
      <div className="surface-navy relative overflow-hidden rounded-[34px] border border-gold/24 md:rounded-[40px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-gold absolute -bottom-[340px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full" />
          <div className="absolute -bottom-[420px] left-1/2 h-[840px] w-[840px] -translate-x-1/2 rounded-full border border-gold/20" />
          <div className="absolute -bottom-[300px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full border border-gold/14" />
          <div className="hero-grain absolute inset-0 opacity-5" />
        </div>

        <div className="relative mx-auto max-w-block px-6 py-20 text-center md:py-[104px]">
          <div className="relative mx-auto w-36 overflow-hidden aspect-[761/220] sm:w-44 md:w-52">
            <img src={logoWhite} alt="" className="h-auto w-full" />
          </div>

          <div className="mt-8">
            <Chip>Plazas limitadas este mes</Chip>
          </div>

          <h2 className="mx-auto mt-6 max-w-text text-h3 leading-[1.0] tracking-[-0.03em] text-foreground text-balance md:text-h2">
            Tu empresa ya tiene valor. Ahora necesita un{" "}
            <span className="text-gradient-gold-hero italic">sistema</span> que lo convierta en oportunidades.
          </h2>

          <p className="mx-auto mt-[22px] max-w-text text-lead leading-[1.65] text-foreground/74 ">
            Solicita tu diagnóstico gratuito y descubre qué le está frenando a tu empresa para captar clientes de forma constante.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GoldButton to="/diagnostico">Solicitar diagnóstico gratuito</GoldButton>
            <Link
              to="/contacto"
              className="btn-glass inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-full px-6 text-body font-medium tracking-[-0.01em] text-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Hablar con el equipo
            </Link>
          </div>

          <div className="mt-[30px] flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-meta text-foreground/72">
            <span>Sin compromiso</span>
            <span className="text-gold-text" aria-hidden>·</span>
            <span>Respuesta en 24h</span>
            <span className="text-gold-text" aria-hidden>·</span>
            <span>Plan estratégico gratuito</span>
          </div>
        </div>
      </div>
    </section>
  );
}
