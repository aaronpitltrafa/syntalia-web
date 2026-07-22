import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Layers,
  ShieldCheck,
  Target,
  Plus,
  Play,
  Search,
  Settings2,
  Users,
  Heart,
  Waypoints,
  Zap,
  LineChart,
  Compass,
  UserPlus,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Counter, Reveal, usePrefersReducedMotion } from "@/components/motion";
import SyntaliaMotionHero from "@/components/SyntaliaMotionHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { name: "description", content: "Solicita tu diagnóstico estratégico gratuito y descubre qué le está frenando a tu empresa para captar clientes de forma constante." },
      { property: "og:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { property: "og:description", content: "Consultoría de marketing digital estratégico. Solicita tu diagnóstico gratuito, sin compromiso." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/" },
      { name: "twitter:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { name: "twitter:description", content: "Consultoría de marketing digital estratégico. Solicita tu diagnóstico gratuito, sin compromiso." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative text-primary">
      <SyntaliaMotionHero />
      <MarqueeStrip />
      <Problema />
      <ComoTrabajamos />
      <OfertaPrincipal />
      <AQuienVaDirigido />
      <CasoDeExito />
      <Diferenciales />
      <Hero />
      <FinalCTA />
      <FAQ />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 0. EL PROBLEMA                                                       */
/* ------------------------------------------------------------------ */

const PROBLEMS = [
  {
    id: "diferenciacion",
    number: "01",
    title: "No se entiende qué te diferencia",
    description:
      "Tu mensaje se parece al de cualquier otra empresa y el cliente no encuentra una razón clara para elegirte.",
  },
  {
    id: "confianza",
    number: "02",
    title: "Tu presencia no genera confianza",
    description:
      "Tu web, tus redes y tu mensaje no reflejan el nivel real, la experiencia ni la solidez de tu negocio.",
  },
  {
    id: "contactos",
    number: "03",
    title: "El marketing no genera contactos",
    description:
      "Hay acciones, publicaciones o campañas, pero no un sistema claro para convertir el interés en oportunidades comerciales.",
  },
];

function ProblemRow({
  problem,
  isOpen,
  onToggle,
}: {
  problem: (typeof PROBLEMS)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const buttonId = `problem-trigger-${problem.id}`;
  const panelId = `problem-panel-${problem.id}`;
  return (
    <div className="border-b border-navy/10 first:border-t">
      <h3 className="m-0">
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className={cn(
            "flex min-h-[88px] w-full items-center gap-4 py-5 text-left transition-colors hover:bg-navy/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold sm:min-h-[104px] sm:gap-6 lg:min-h-[112px]",
          )}
        >
          <span className="w-10 shrink-0 font-poppins text-3xl font-extrabold text-gold sm:w-12 sm:text-4xl">
            {problem.number}
          </span>
          <span className="h-8 w-px shrink-0 bg-navy/15 sm:h-10" aria-hidden />
          <span className="flex-1 font-poppins text-base font-bold leading-snug text-primary sm:text-lg lg:text-xl">
            {problem.title}
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              "h-5 w-5 shrink-0 text-primary transition-transform duration-[250ms]",
              isOpen && "rotate-180 text-gold",
            )}
          />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className={cn("problem-panel", isOpen && "is-open")}>
        <div>
          <p className="max-w-md py-0 pb-6 pl-14 font-sans text-[15px] leading-relaxed text-primary/65 sm:pb-7 sm:pl-[3.75rem] sm:text-base">
            {problem.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Problema() {
  const [openProblem, setOpenProblem] = useState<string | null>(null);

  return (
    <section className="relative border-t border-navy/10">
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left column — unchanged messaging */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70">El problema</span>
            </div>

            <h2 className="mt-6 font-poppins uppercase text-3xl leading-[1.1] tracking-normal text-balance md:text-5xl">
              No basta con tener valor. Hay que saber convertirlo en <span className="text-gold-deep">oportunidades</span>.
            </h2>

            <p className="mt-6 max-w-xl text-primary/75 leading-relaxed md:text-lg">
              Muchas empresas tienen experiencia y una oferta sólida, pero su presencia digital no está generando confianza ni oportunidades comerciales.
            </p>

            <div className="mt-10 max-w-xl rounded-3xl bg-gradient-navy p-8 text-cream md:p-10">
              <p className="text-xl font-bold leading-snug md:text-2xl">
                El problema no es vender.
                <br />
                El problema es <span className="text-gradient-gold">no tener un sistema claro</span>.
              </p>
            </div>
          </div>

          {/* Right column — accordion rows */}
          <div>
            {PROBLEMS.map((p) => (
              <ProblemRow
                key={p.id}
                problem={p}
                isOpen={openProblem === p.id}
                onToggle={() => setOpenProblem((cur) => (cur === p.id ? null : p.id))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 0.5 CÓMO TRABAJAMOS                                                  */
/* ------------------------------------------------------------------ */

const WORK_PHASES = [
  {
    id: "diagnostico",
    number: "01",
    shortTitle: "Diagnóstico",
    title: "Diagnóstico estratégico",
    tagline: "Entendemos antes de construir.",
    description:
      "Analizamos el negocio, el mercado, el cliente ideal y la presencia digital para identificar qué está frenando el crecimiento.",
    groupOne: { title: "Qué revisamos", icon: Search, items: ["Posicionamiento", "Presencia digital", "Captación actual"] },
    groupTwo: { title: "Qué definimos", icon: Compass, items: ["Prioridades", "Objetivos", "Hoja de ruta"] },
  },
  {
    id: "posicionamiento",
    number: "02",
    shortTitle: "Posicionamiento",
    title: "Posicionamiento y base digital",
    tagline: "Ordenamos cómo debe percibirse tu empresa.",
    description:
      "Clarificamos el mensaje, la propuesta de valor y los activos digitales necesarios para transmitir una imagen sólida, profesional y diferenciada.",
    groupOne: { title: "Qué trabajamos", icon: Target, items: ["Posicionamiento", "Propuesta de valor", "Mensaje principal"] },
    groupTwo: { title: "Qué construimos", icon: Layers, items: ["Identidad y presencia", "Web o landing", "Canales principales"] },
  },
  {
    id: "captacion",
    number: "03",
    shortTitle: "Captación",
    title: "Captación y conversión",
    tagline: "Convertimos atención en oportunidades.",
    description:
      "Diseñamos el recorrido necesario para atraer, recoger, organizar y seguir contactos con intención comercial.",
    groupOne: { title: "Qué conectamos", icon: Waypoints, items: ["Contenido y campañas", "Formularios y landing", "Activos de captación"] },
    groupTwo: { title: "Qué organizamos", icon: ClipboardList, items: ["CRM", "Seguimiento comercial", "Recorrido de conversión"] },
  },
  {
    id: "optimizacion",
    number: "04",
    shortTitle: "Optimización",
    title: "Optimización y escalado",
    tagline: "Medimos, corregimos y reforzamos.",
    description:
      "Analizamos el funcionamiento del sistema para mejorar su eficiencia y potenciar aquello que realmente genera resultados.",
    groupOne: { title: "Qué medimos", icon: LineChart, items: ["Conversión", "Rendimiento", "Seguimiento"] },
    groupTwo: { title: "Qué mejoramos", icon: Settings2, items: ["Automatización", "Eficiencia", "Escalado"] },
  },
] as const;

type PhaseGroupData = { title: string; icon: typeof Search; items: readonly string[] };

function PhaseGroup({ group }: { group: PhaseGroupData }) {
  return (
    <div className="sm:border-l sm:border-cream/10 sm:pl-8">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
        <group.icon className="h-4 w-4" aria-hidden />
        {group.title}
      </div>
      <ul className="mt-3 space-y-2">
        {group.items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-cream/80">
            <span className="h-1 w-1 shrink-0 rounded-full bg-gold/60" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ComoTrabajamos() {
  const [activePhase, setActivePhase] = useState<(typeof WORK_PHASES)[number]["id"]>("diagnostico");
  const activeIndex = WORK_PHASES.findIndex((p) => p.id === activePhase);
  const active = WORK_PHASES[activeIndex];

  const ctaButton = (
    <Link
      to="/diagnostico"
      className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-navy transition hover:bg-gold-soft"
    >
      Solicitar diagnóstico estratégico
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );

  return (
    <section className="relative border-t border-navy/10">
      <div className="relative mx-auto max-w-[1280px] px-6 py-24 md:py-28">
        {/* Header */}
        <div className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70">Cómo trabajamos · 4 etapas</span>
        </div>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 className="font-raleway text-3xl leading-[1.15] font-extrabold tracking-tight text-primary md:text-5xl">
              De una presencia digital dispersa a un <span className="text-gold">sistema preparado para crecer</span>.
            </h2>
            <p className="mt-5 max-w-xl text-primary/75 leading-relaxed md:text-lg">
              Aplicamos lógica comercial y estrategia digital para transformar tu presencia en oportunidades comerciales reales y sostenibles.
            </p>
          </div>

          <div className="flex gap-4 lg:max-w-[240px] lg:pt-2">
            <span className="w-px shrink-0 bg-gold/50" aria-hidden />
            <p className="font-poppins text-sm leading-relaxed text-primary/60">
              No ejecutamos por ejecutar.
              <br />
              Cada etapa prepara la siguiente.
            </p>
          </div>
        </div>

        {/* Desktop/tablet: horizontal roadmap + single panel */}
        <div className="mt-16 hidden lg:block">
          <div className="relative">
            <div className="absolute inset-x-[12.5%] top-[22px] h-px bg-navy/15" aria-hidden />
            <div
              className="absolute top-[22px] left-[12.5%] h-px bg-gold transition-all duration-500 ease-out"
              style={{ width: `${(activeIndex / (WORK_PHASES.length - 1)) * 75}%` }}
              aria-hidden
            />
            <div role="tablist" aria-label="Fases del proceso" className="relative grid grid-cols-4">
              {WORK_PHASES.map((p) => {
                const isActive = p.id === activePhase;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    id={`phase-tab-${p.id}`}
                    aria-selected={isActive}
                    aria-controls={`phase-panel-${p.id}`}
                    onClick={() => setActivePhase(p.id)}
                    className="flex cursor-pointer flex-col items-center gap-3 rounded-lg py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full border-2 font-poppins text-sm font-bold transition-all duration-300",
                        isActive
                          ? "scale-110 border-gold bg-white text-gold shadow-[0_0_0_6px_rgba(212,175,55,0.15)]"
                          : "border-navy/15 bg-background text-gold",
                      )}
                    >
                      {p.number}
                    </span>
                    <span
                      className={cn(
                        "text-sm tracking-wide text-primary/60 transition-colors",
                        isActive && "font-bold text-primary",
                      )}
                    >
                      {p.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            key={active.id}
            id={`phase-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`phase-tab-${active.id}`}
            className="phase-panel-enter relative mt-10 overflow-hidden rounded-[2rem] border border-gold/25 bg-gradient-navy p-10 text-cream shadow-[0_40px_100px_-40px_rgba(2,21,87,0.5)] lg:p-12"
          >
            <div className="relative grid gap-10 sm:grid-cols-[auto_1fr]">
              <div className="font-raleway text-7xl font-extrabold text-gold/90">{active.number}</div>
              <div>
                <h3 className="font-raleway text-2xl font-bold sm:text-3xl">{active.title}</h3>
                <p className="mt-2 font-poppins text-base font-semibold text-gold sm:text-lg">{active.tagline}</p>
                <p className="mt-4 max-w-xl leading-relaxed text-cream/70">{active.description}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2">
                  <PhaseGroup group={active.groupOne} />
                  <PhaseGroup group={active.groupTwo} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 text-center">{ctaButton}</div>
        </div>

        {/* Mobile/tablet: accordion */}
        <div className="mt-12 lg:hidden">
          {WORK_PHASES.map((p) => {
            const isOpen = p.id === activePhase;
            const triggerId = `phase-mobile-trigger-${p.id}`;
            const panelId = `phase-mobile-panel-${p.id}`;
            return (
              <div key={p.id} className="border-b border-navy/10 first:border-t">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setActivePhase(p.id)}
                    className="flex min-h-[80px] w-full items-center gap-4 py-4 text-left transition-colors hover:bg-navy/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-gold"
                  >
                    <span className="w-9 shrink-0 font-poppins text-2xl font-extrabold text-gold">{p.number}</span>
                    <span className="h-7 w-px shrink-0 bg-navy/15" aria-hidden />
                    <span className="flex-1 font-poppins text-base font-bold text-primary">{p.shortTitle}</span>
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "h-5 w-5 shrink-0 text-primary transition-transform duration-[250ms]",
                        isOpen && "rotate-180 text-gold",
                      )}
                    />
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={triggerId} className={cn("problem-panel", isOpen && "is-open")}>
                  <div>
                    <div className="pb-6 pl-14">
                      <h4 className="font-raleway text-lg font-bold text-primary">{p.title}</h4>
                      <p className="mt-1 font-poppins text-sm font-semibold text-gold">{p.tagline}</p>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-primary/65">{p.description}</p>

                      <div className="mt-5 space-y-5">
                        {[p.groupOne, p.groupTwo].map((group) => (
                          <div key={group.title}>
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-primary/50">
                              <group.icon className="h-3.5 w-3.5" aria-hidden />
                              {group.title}
                            </div>
                            <ul className="mt-2 space-y-1.5">
                              {group.items.map((item) => (
                                <li key={item} className="flex items-center gap-2 text-sm text-primary/75">
                                  <span className="h-1 w-1 shrink-0 rounded-full bg-gold/60" aria-hidden />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-10 text-center">{ctaButton}</div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 0.7 OFERTA PRINCIPAL                                                 */
/* ------------------------------------------------------------------ */

const VERTICE_PHASES = [
  {
    id: "posicionamiento",
    number: "01",
    title: "Posicionamiento y presencia digital",
    tagline: "Definimos la base estratégica y visual sobre la que se construirá todo lo demás.",
    services: [
      "Posicionamiento de marca",
      "Propuesta de valor y mensaje",
      "Branding e identidad visual",
      "Web y landing pages",
      "Optimización de perfiles digitales",
    ],
    icon: Target,
  },
  {
    id: "autoridad",
    number: "02",
    title: "Autoridad y visibilidad",
    tagline: "Trabajamos tu presencia en los canales adecuados para transmitir valor, generar confianza y aumentar tu visibilidad.",
    services: [
      "Estrategia de contenidos",
      "Gestión de redes sociales",
      "Copywriting y SEO",
      "Contenido de autoridad",
      "Optimización de canales digitales",
    ],
    icon: ShieldCheck,
  },
  {
    id: "captacion",
    number: "03",
    title: "Captación y conversión",
    tagline: "Construimos el sistema necesario para transformar visibilidad e interés en contactos cualificados y oportunidades.",
    services: [
      "Social Ads y campañas",
      "Formularios y landing de captación",
      "CRM y automatizaciones",
      "Email marketing y seguimiento",
      "Optimización de conversión",
    ],
    icon: Waypoints,
  },
] as const;

const VERTICE_COUNT = VERTICE_PHASES.length;

function VerticeCardContent({ phase }: { phase: (typeof VERTICE_PHASES)[number] }) {
  return (
    <div className="flex h-full flex-col rounded-[26px] border border-gold/25 bg-white/75 p-8 shadow-[0_30px_70px_-30px_rgba(2,21,87,0.28)] backdrop-blur-sm md:p-10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-gold text-navy">
        <phase.icon className="h-5 w-5" aria-hidden />
      </div>
      <div className="mt-6 font-raleway text-5xl font-extrabold text-gold/85">{phase.number}</div>
      <h3 className="mt-3 font-raleway text-xl font-bold text-primary md:text-2xl">{phase.title}</h3>
      <span className="mt-3 block h-[3px] w-10 rounded-full bg-gold" aria-hidden />
      <p className="mt-4 text-sm leading-relaxed text-primary/70">{phase.tagline}</p>

      <div className="mt-6 border-t border-navy/10 pt-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/45">Servicios incluidos</p>
        <ul className="mt-4 space-y-2.5">
          {phase.services.map((s) => (
            <li key={s} className="flex items-start gap-2.5 text-sm text-primary/80">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Position of a card relative to the active one: 0 = center, 1 = right, 2 = left. */
function cardSlot(index: number, activeIndex: number) {
  return (index - activeIndex + VERTICE_COUNT) % VERTICE_COUNT;
}

function cardTransform(slot: number, reduced: boolean) {
  if (reduced) {
    if (slot === 0) return { transform: "translateX(0)", opacity: 1, filter: "blur(0)", zIndex: 3 };
    const side = slot === 1 ? 40 : -40;
    return { transform: `translateX(${side}%) scale(0.9)`, opacity: 0.4, filter: "blur(0)", zIndex: 1 };
  }
  if (slot === 0) {
    return { transform: "translateX(0) translateZ(0) scale(1) rotateY(0deg)", opacity: 1, filter: "blur(0)", zIndex: 3 };
  }
  if (slot === 1) {
    return {
      transform: "translateX(72%) translateZ(-100px) scale(0.86) rotateY(-7deg)",
      opacity: 0.4,
      filter: "blur(2px)",
      zIndex: 2,
    };
  }
  return {
    transform: "translateX(-72%) translateZ(-100px) scale(0.86) rotateY(7deg)",
    opacity: 0.4,
    filter: "blur(2px)",
    zIndex: 2,
  };
}

function VerticeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ startX: 0, dragging: false });

  const goTo = (index: number) => setActiveIndex(((index % VERTICE_COUNT) + VERTICE_COUNT) % VERTICE_COUNT);
  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  useEffect(() => {
    if (liveRegionRef.current) {
      const p = VERTICE_PHASES[activeIndex];
      liveRegionRef.current.textContent = `Mostrando fase ${p.number}: ${p.title}`;
    }
  }, [activeIndex]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragRef.current = { startX: e.clientX, dragging: true };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  };

  return (
    <div>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Sistema Vértice: fases del servicio"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="relative mx-auto max-w-[1180px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-gold"
      >
        <div aria-live="polite" ref={liveRegionRef} className="sr-only" />

        <button
          type="button"
          onClick={goPrev}
          aria-label="Fase anterior"
          className="absolute top-1/2 left-0 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-background text-primary shadow-[0_10px_30px_-10px_rgba(2,21,87,0.3)] transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:left-2 lg:-left-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Fase siguiente"
          className="absolute top-1/2 right-0 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-navy/10 bg-background text-primary shadow-[0_10px_30px_-10px_rgba(2,21,87,0.3)] transition hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:right-2 lg:-right-4"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        <div
          className="vertice-viewport relative mx-auto h-[500px] w-full max-w-[300px] touch-pan-y select-none sm:h-[520px] sm:max-w-[400px] lg:h-[540px] lg:max-w-[440px]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          {VERTICE_PHASES.map((phase, i) => {
            const slot = cardSlot(i, activeIndex);
            const isCenter = slot === 0;
            const style = cardTransform(slot, reduced);

            if (isCenter) {
              return (
                <div key={phase.id} className="vertice-card absolute inset-0" style={style}>
                  <VerticeCardContent phase={phase} />
                </div>
              );
            }

            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ir a ${phase.title}`}
                className="vertice-card absolute inset-0 cursor-pointer text-left transition-[filter] duration-300 hover:opacity-[0.6]"
                style={style}
              >
                <div aria-hidden className="h-full">
                  <VerticeCardContent phase={phase} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-9 flex items-center justify-center gap-3">
        {VERTICE_PHASES.map((phase, i) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir a ${phase.title}`}
            aria-current={i === activeIndex}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
              i === activeIndex ? "w-7 bg-gold" : "w-2.5 bg-navy/20 hover:bg-navy/35",
            )}
          />
        ))}
      </div>
    </div>
  );
}

function OfertaPrincipal() {
  return (
    <section id="fases" className="relative scroll-mt-24 overflow-hidden border-t border-navy/10">
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70">Sistema Vértice · Oferta principal</span>
          </div>

          <h2 className="mt-6 font-raleway text-3xl leading-[1.15] font-extrabold tracking-tight text-primary md:text-5xl">
            Tres capas conectadas para convertir tu presencia digital en <span className="text-gold">oportunidades</span>.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-primary/75 leading-relaxed md:text-lg">
            Posicionamiento, autoridad y captación trabajando dentro de un mismo sistema, no como servicios independientes.
          </p>
        </div>

        <div className="mt-16">
          <VerticeCarousel />
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/servicios"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-bold uppercase tracking-wide text-navy transition hover:bg-gold-soft"
          >
            Conocer el Sistema Vértice
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 0.9 ¿ES ESTO PARA TI?                                                */
/* ------------------------------------------------------------------ */

function AQuienVaDirigido() {
  const items = [
    "Tu empresa funciona bien, pero no crece al ritmo que debería.",
    "No transmite online el nivel real de calidad que tiene.",
    "Depende demasiado del boca a boca o de clientes de siempre.",
    "No genera contactos nuevos de forma constante cada mes.",
    "Quieres dejar de improvisar y trabajar con una estrategia real.",
  ];
  return (
    <section className="relative border-t border-navy/10">
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 md:sticky md:top-24 md:self-start">
            <div className="inline-flex items-center gap-3 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70">¿Es esto para ti?</span>
            </div>
            <h2 className="mt-6 font-poppins uppercase text-4xl leading-[1.05] tracking-normal md:text-6xl text-balance">
              <span className="block">Esto es</span>
              <span className="block">
                para ti <span className="text-gold">si</span>
              </span>
              <span className="block text-gold">tu empresa...</span>
            </h2>
            <p className="mt-8 text-primary/70 leading-relaxed">Tu empresa tiene valor real, pero algo está bloqueando su crecimiento. Si te identificas con alguno de estos puntos, podemos ayudarte:</p>
            <div className="mt-10 rounded-3xl bg-gradient-navy p-8 text-cream md:p-10 relative overflow-hidden">
              <div className="relative">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">El problema real</div>
                <p className="mt-4 text-2xl font-bold leading-snug md:text-3xl">
                  No es vender más.<br />Es <span className="text-gradient-gold">posicionarte mejor</span>.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <ul className="space-y-3">
              {items.map((it, i) => (
                <Reveal key={i} delay={i * 90}>
                  <li className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 overflow-hidden rounded-2xl bg-gradient-navy px-6 py-6 text-cream transition-all hover:-translate-y-0.5 hover:translate-x-2">
                    <span className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-gold/20 to-transparent transition-all duration-500 group-hover:w-full" />
                    <span className="relative font-mono text-4xl font-light text-gold/60 group-hover:text-gold">
                      0{i + 1}
                    </span>
                    <span className="relative text-cream/90 group-hover:text-cream md:text-lg">{it}</span>
                    <CheckCircle2 className="relative h-5 w-5 text-gold/80 transition-all group-hover:text-gold group-hover:scale-110" />
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={items.length * 90 + 100}>
              <Link
                to="/diagnostico"
                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold text-navy hover:bg-navy hover:text-cream transition-colors"
              >
                Quiero mi diagnóstico gratuito <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 0.97 DIFERENCIALES                                                   */
/* ------------------------------------------------------------------ */

const DIFERENCIALES_STRIP = [
  {
    icon: Compass,
    title: "Estrategia antes que ejecución",
    description: "Cada acción responde a un plan claro, no a impulsos ni modas pasajeras.",
  },
  {
    icon: Waypoints,
    title: "Captación y contenido conectados",
    description: "El contenido no es decorativo: alimenta directamente el sistema de captación.",
  },
  {
    icon: LineChart,
    title: "Seguimiento orientado a crecimiento",
    description: "Medimos, ajustamos y evolucionamos la estrategia con datos reales.",
  },
] as const;

function Diferenciales() {
  return (
    <section className="relative border-t border-navy/10">
      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70">Diferenciales</span>
          </div>

          <h2 className="mt-6 font-raleway text-3xl leading-[1.15] font-extrabold tracking-tight text-primary md:text-5xl">
            No hacemos marketing aislado. Construimos sistemas con <span className="text-gold">lógica comercial</span>.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-primary/75 leading-relaxed md:text-lg">
            Conectamos estrategia, contenido, captación y seguimiento dentro de un mismo sistema, para que cada pieza cumpla una función en el crecimiento de tu empresa.
          </p>
        </div>

        <div className="mx-auto mt-12 grid divide-y divide-navy/10 overflow-hidden rounded-3xl border border-navy/10 bg-white/60 shadow-[0_20px_60px_-40px_rgba(2,21,87,0.2)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mt-14">
          {DIFERENCIALES_STRIP.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <div className="flex h-full flex-col items-center gap-3 px-6 py-8 text-center md:px-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15">
                  <item.icon className="h-5 w-5 text-gold-deep" aria-hidden />
                </div>
                <h3 className="text-base font-bold text-primary">{item.title}</h3>
                <p className="text-sm leading-relaxed text-primary/60">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 0.99 PREGUNTAS FRECUENTES                                            */
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
    <section id="faq" className="relative scroll-mt-28 border-t border-navy/10">
      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28">
        <Accordion type="single" collapsible className="w-full border-t border-navy/10">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-navy/10">
              <AccordionTrigger className="gap-5 py-6 text-left hover:no-underline [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gold">
                <span className="flex items-start gap-5">
                  <span className="shrink-0 pt-0.5 font-mono text-base font-bold text-gold md:text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-bold text-primary md:text-lg">{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-[3.25rem] text-primary/65 leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 1. CTA DIAGNÓSTICO                                                   */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative border-t border-navy/10">
      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-navy p-10 text-center text-cream shadow-[0_40px_100px_-40px_rgba(2,21,87,0.35)] md:p-14">
            <div className="relative">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Diagnóstico estratégico gratuito
              </div>

              <h2 className="mt-6 font-raleway text-3xl leading-[1.15] font-extrabold tracking-tight text-cream md:text-4xl">
                Tu empresa ya tiene valor. Ahora necesita un sistema que lo convierta en <span className="text-gold">oportunidades</span>.
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-cream/70 leading-relaxed md:text-lg">
                Solicita tu diagnóstico gratuito y descubre qué le está frenando a tu empresa para captar clientes de forma constante.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/diagnostico"
                  className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-bold text-navy transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-10px_oklch(0.745_0.135_82/0.55)]"
                >
                  Pedir diagnóstico gratuito <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 0.5. MARQUEE — palabras clave en bucle, dos filas opuestas          */
/* ------------------------------------------------------------------ */

const MARQUEE_WORDS = ["ESTRATEGIA", "CONVERSIÓN", "ESCALADO", "VISIBILIDAD", "AUTORIDAD", "CAPTACIÓN"];

function MarqueeStrip() {
  return (
    <section aria-hidden className="relative overflow-hidden border-y border-cream/10 bg-gradient-navy py-5 md:py-6">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap md:gap-11">
        {[...Array(2)].map((_, dup) => (
          <div key={dup} className="flex items-center gap-8 md:gap-11">
            {MARQUEE_WORDS.map((w) => (
              <span
                key={w}
                className="flex items-center gap-8 font-raleway text-2xl font-extrabold tracking-tight text-cream/15 uppercase md:gap-11 md:text-4xl"
              >
                {w}
                <Plus className="h-4 w-4 shrink-0 text-gold/25 md:h-6 md:w-6" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="marquee-track-reverse mt-0.5 flex w-max items-center gap-8 whitespace-nowrap md:mt-1 md:gap-11">
        {[...Array(2)].map((_, dup) => (
          <div key={dup} className="flex items-center gap-8 md:gap-11">
            {MARQUEE_WORDS.map((w) => (
              <span
                key={w}
                className="flex items-center gap-8 font-raleway text-2xl font-extrabold tracking-tight text-cream uppercase md:gap-11 md:text-4xl"
              >
                {w}
                <Plus className="h-4 w-4 shrink-0 text-gold md:h-6 md:w-6" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 0.95 CASO DE ÉXITO                                                   */
/* ------------------------------------------------------------------ */

const FRULONSA_METRICS = [
  { numeric: 1.4, decimals: 1, prefix: "", suffix: " M", label: "Usuarios únicos alcanzados", description: "Alcance acumulado durante el periodo.", icon: Users },
  { numeric: 157, decimals: 0, prefix: "", suffix: " K", label: "Interacciones", description: "Comentarios, compartidos y reacciones.", icon: Heart },
  { numeric: 7301, decimals: 0, prefix: "+", suffix: "", label: "Nuevos seguidores", description: "Crecimiento de la comunidad.", icon: UserPlus },
] as const;

const FRULONSA_WORK = [
  {
    title: "Estrategia y planificación",
    description: "Definimos líneas de contenido, formatos y prioridades para comunicar mejor la experiencia real de la marca.",
    icon: Compass,
  },
  {
    title: "Producción orientada a alcance",
    description: "Creamos piezas visuales y formatos capaces de captar atención y ampliar la visibilidad de Frulonsa.",
    icon: Play,
  },
  {
    title: "Optimización continua",
    description: "Analizamos el rendimiento y reforzamos los formatos con mayor capacidad de generar interacción y crecimiento.",
    icon: LineChart,
  },
] as const;

function CasoDeExito() {
  return (
    <section className="relative border-t border-navy/10">
      <div className="relative mx-auto max-w-[1280px] px-6 py-24 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70">Caso de éxito · Frulonsa</span>
          </div>

          <h2 className="mt-6 font-raleway text-3xl leading-[1.15] font-extrabold tracking-tight text-primary md:text-5xl">
            Resultados que demuestran lo que pasa cuando <span className="text-gold">el sistema está bien construido</span>.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-primary/75 leading-relaxed md:text-lg">
            Durante 90 días trabajamos la estrategia, planificación y producción de contenido de Frulonsa para aumentar su visibilidad, fortalecer su comunidad y ampliar su presencia digital.
          </p>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-8">
          {/* Left column — metrics */}
          <div className="flex flex-col gap-6">
            <Reveal>
              <div className="relative overflow-hidden rounded-[28px] bg-gradient-navy p-8 text-cream md:p-10">
                <div className="relative flex items-start justify-between">
                  <Play className="h-7 w-7 text-gold" aria-hidden />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Resultado destacado</span>
                </div>
                <div className="relative mt-6 font-raleway text-6xl font-extrabold tracking-tight text-cream md:text-7xl">
                  <Counter to={5.6} decimals={1} suffix=" M" duration={1200} />
                </div>
                <p className="relative mt-2 text-sm font-bold uppercase tracking-[0.2em] text-cream/85">Reproducciones</p>
                <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-cream/65">
                  Contenido visualizado durante el periodo analizado. Una estrategia de contenido orientada a alcance e interacción.
                </p>
              </div>
            </Reveal>

            <div className="grid flex-1 grid-cols-3 gap-4">
              {FRULONSA_METRICS.map((m, i) => (
                <Reveal key={m.label} delay={100 + i * 80} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl border border-gold/25 bg-white/60 p-6 transition-colors duration-200 hover:bg-white/90 md:p-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cream md:h-12 md:w-12">
                      <m.icon className="h-5 w-5 text-gold md:h-6 md:w-6" aria-hidden />
                    </div>
                    <div className="mt-5 font-raleway text-3xl font-extrabold text-primary md:text-4xl">
                      <Counter to={m.numeric} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} duration={1100} />
                    </div>
                    <p className="mt-2 text-xs font-bold uppercase tracking-wide text-primary/70 md:text-sm">{m.label}</p>
                    <p className="mt-2 text-xs leading-relaxed text-primary/50 md:text-sm">{m.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right column — Frulonsa panel */}
          <Reveal delay={200}>
            <div className="flex h-full flex-col rounded-[28px] border border-gold/30 bg-white/70 p-8 md:p-9">
              <div className="flex h-12 items-center">
                <span className="font-raleway text-2xl font-extrabold tracking-tight text-primary">FRULONSA</span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-primary/70">
                Frulonsa es una empresa del sector hortofrutícola con experiencia comercial y presencia internacional. El objetivo fue reforzar su visibilidad digital y conectar su conocimiento del sector con una audiencia más amplia.
              </p>

              <div className="mt-6 border-t border-navy/10">
                {FRULONSA_WORK.map((w) => (
                  <div key={w.title} className="flex items-start gap-3.5 border-b border-navy/10 py-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15">
                      <w.icon className="h-4 w-4 text-gold-deep" aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-primary">{w.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-primary/60">{w.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-6 py-3.5 text-sm font-bold text-navy transition hover:bg-gold-soft"
                >
                  Ver el caso completo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <p className="mx-auto mt-12 max-w-3xl text-center text-primary/75 leading-relaxed md:text-lg">
            Los resultados reflejan una mayor presencia digital, <span className="text-gold-deep">más alcance, más interacción</span> y una comunidad en crecimiento alrededor de la marca.
          </p>
        </Reveal>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-primary/45">
          Datos obtenidos de las analíticas de los canales de Frulonsa durante un periodo de 90 días.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. CTA FINAL                                                        */
/* ------------------------------------------------------------------ */

function FinalCTA() {
  return (
    <section className="relative border-t border-navy/10">
      <div className="relative mx-auto max-w-5xl px-6 py-28 text-center md:py-36">
        <div className="relative mx-auto w-36 overflow-hidden aspect-[761/220] sm:w-44 md:w-56">
          <img src={logo} alt="" className="h-auto w-full" />
        </div>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-gold-deep">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Plazas limitadas este mes
        </div>
        <h2 className="mt-8 font-poppins uppercase text-3xl leading-[1.1] tracking-normal md:text-5xl lg:text-6xl text-balance">
          Si tu empresa tiene valor, también debería notarse en cómo te posicionas y en las <span className="text-gold-deep">oportunidades que generas</span>.
        </h2>
        <p className="mx-auto mt-10 max-w-2xl text-lg text-primary/75 md:text-xl">
          Solicita un diagnóstico estratégico y veremos qué necesita tu empresa para construir una presencia digital más clara, más sólida y mejor conectada con su crecimiento.
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link to="/diagnostico" className="group inline-flex items-center gap-3 rounded-full bg-gold px-9 py-5 text-sm font-bold text-navy hover:bg-navy hover:text-cream transition-colors">
            Solicitar diagnóstico estratégico <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.25em] text-primary/50">
          <span>Sin compromiso</span>
          <span className="text-gold-deep">·</span>
          <span>Respuesta en 24h</span>
          <span className="text-gold-deep">·</span>
          <span>Plan estratégico gratuito</span>
        </div>
      </div>
    </section>
  );
}
