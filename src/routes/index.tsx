import { Fragment, useEffect, useId, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import logoAlmaValdes from "@/assets/logos-clientes/alma-valdes.png";
import logoBruma from "@/assets/logos-clientes/bruma-tropical.png";
import logoCnc from "@/assets/logos-clientes/cnc.png";
import logoFrulonsa from "@/assets/logos-clientes/frulonsa.png";
import logoMn from "@/assets/logos-clientes/mn.png";
import logoRevivalia from "@/assets/logos-clientes/revivalia.png";
import logoTradyn from "@/assets/logos-clientes/tradyn-ai.png";
import { FormularioPasos, ID_PRIMER_CAMPO } from "@/components/formulario-pasos";
import { SectionLink } from "@/components/section-link";
import { SectionRail } from "@/components/section-rail";
import { Subrayado } from "@/components/subrayado";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CasoCifras, CasoMarca, CasoPieza, CasoQueMide, CasoTestimonio } from "@/components/caso";
import { goldCtaClasses } from "@/lib/gold-cta-classes";
import { numeroDeSeccion, useHomeSectionObserver } from "@/lib/home-sections";
import { CASO_FRULONSA } from "@/lib/casos";
import { FAQ_HOME } from "@/lib/faq";
import { legalData } from "@/lib/legal-data";
import { SYSTEM_STAGES, type EtapaSistema } from "@/lib/sistema";
import {
  FICHAS_PROBLEMA,
  INTERVALO_PROBLEMA_MS,
  MODOS_PROBLEMA,
  type FichaProblemaId,
  type ModoProblema,
} from "@/lib/problema";
import { ORG_ID, SITE_URL, WHATSAPP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  // ?envio=ok|error: vuelta del formulario del cierre cuando se envía sin
  // JavaScript (ver FormularioPasos y sendLead).
  validateSearch: (s: Record<string, unknown>): { envio?: "ok" | "error" } =>
    s.envio === "ok" || s.envio === "error" ? { envio: s.envio } : {},
  head: () => ({
    meta: [
      { title: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      {
        name: "description",
        content:
          "Solicita tu diagnóstico estratégico gratuito y descubre qué le está frenando a tu empresa para captar clientes de forma constante.",
      },
      { property: "og:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      {
        property: "og:description",
        content:
          "Consultoría de marketing digital estratégico. Solicita tu diagnóstico gratuito, sin compromiso.",
      },
      { property: "og:url", content: `${SITE_URL}/` },
      { name: "twitter:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      {
        name: "twitter:description",
        content:
          "Consultoría de marketing digital estratégico. Solicita tu diagnóstico gratuito, sin compromiso.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [
      {
        // Las preguntas del bloque FAQ, leídas de lib/faq.ts. Google ya no
        // saca resultados enriquecidos de FAQ para webs como esta: se pone
        // para que los asistentes de IA entiendan y citen las respuestas.
        // La organización se referencia por su @id (se declara en __root).
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          publisher: { "@id": ORG_ID },
          mainEntity: FAQ_HOME.map((f) => ({
            "@type": "Question",
            name: f.pregunta,
            acceptedAnswer: { "@type": "Answer", text: f.respuesta },
          })),
        }),
      },
    ],
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

      <CasoDeExito />

      <ComoTrabajamos />
      <Empezar />
      <FAQ />
      <Cierre />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1 · HERO                                                             */
/* ------------------------------------------------------------------ */

const GARANTIAS = ["Sin compromiso", "Respuesta en 24 h", "Plan estratégico gratuito"] as const;

/** Píldora con punto dorado, sobre fondo oscuro (hero y cierre). */
function Pildora({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[9px] rounded-full border border-cream/13 bg-cream/4 px-[17px] py-[9px] text-[11px] leading-none font-semibold tracking-[0.16em] text-cream/72 uppercase">
      <i
        aria-hidden
        className="h-[7px] w-[7px] shrink-0 rounded-full bg-gold shadow-[0_0_0_4px_rgb(221_174_69/0.16)]"
      />
      {children}
    </span>
  );
}

/** Garantías con punto dorado: crema al 62% sobre oscuro (6,6:1 sobre ink). */
function Garantias({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-7 gap-y-2.5 text-[13px] leading-[1.5] font-normal text-cream/62",
        className,
      )}
    >
      {items.map((g) => (
        <li key={g} className="flex items-center gap-2">
          <span aria-hidden className="h-[5px] w-[5px] shrink-0 rounded-full bg-gold" />
          {g}
        </li>
      ))}
    </ul>
  );
}

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

      {/* hero-contenido pone el halo oscuro detrás del texto (styles.css). */}
      <div className="hero-contenido">
        <div className="contenedor text-center">
          <Pildora>Consultora estratégica de marketing digital</Pildora>

          {/* Tres líneas fijas en todos los anchos ("Construimos el / sistema
              digital que / hace crecer tu empresa"): cada una es un bloque, y
              el tamaño (--text-hero) se ajusta para que la más larga quepa
              con las dos fuentes, así no cambia de líneas al llegar Raleway. */}
          <h1 className="mx-auto mt-6 max-w-[calc(22*var(--ch-raleway))] text-hero text-cream [text-shadow:0_2px_26px_rgba(1,6,20,.55)]">
            <span className="block">Construimos el</span>
            <span className="block">
              <Subrayado>sistema digital</Subrayado> que
            </span>
            <span className="block">hace crecer tu&nbsp;empresa</span>
          </h1>

          <p className="mx-auto mt-6 max-w-[58ch] text-lead text-cream/72 [text-shadow:0_1px_16px_rgba(1,6,20,.5)]">
            Analizamos qué necesita tu empresa y conectamos estrategia, marca, captación y
            automatización para hacerla crecer.
          </p>

          {/* Dos botones del mismo alto (52px). En móvil, apilados a todo el ancho. */}
          <div className="mt-[34px] flex flex-col gap-[13px] sm:flex-row sm:justify-center">
            <SectionLink id="contacto" className={goldCtaClasses("default", "h-[52px] py-0")}>
              Solicitar diagnóstico
              <ArrowRight
                aria-hidden
                strokeWidth={2.4}
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none"
              />
            </SectionLink>
            <SectionLink
              id="sistema"
              className="inline-flex h-[52px] items-center justify-center rounded-btn border border-cream/13 bg-cream/7 px-6 text-[15px] leading-none font-semibold whitespace-nowrap text-cream transition-colors duration-200 hover:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light motion-reduce:transition-none"
            >
              Ver cómo trabajamos
            </SectionLink>
          </div>

          <Garantias items={GARANTIAS} className="mt-[26px] justify-center" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 1b · LOGOS                                                           */
/* ------------------------------------------------------------------ */

/**
 * `natural` es el tamaño real del PNG: va en width/height del <img> para que
 * el navegador reserve el ancho antes de cargarlo. Sin eso, una copia sin
 * cargar mide 0, el track cambia de ancho a mitad de animación y el bucle
 * da un salto.
 */
const LOGOS = [
  { src: logoFrulonsa, alt: "Frulonsa", height: 34, natural: [541, 102] },
  { src: logoRevivalia, alt: "Revivalia", height: 46, natural: [307, 138] },
  { src: logoAlmaValdes, alt: "Alma Valdés", height: 40, natural: [254, 120] },
  { src: logoCnc, alt: "Método CNC", height: 34, natural: [336, 120] },
  { src: logoTradyn, alt: "Tradyn.ai", height: 46, natural: [254, 138] },
  { src: logoBruma, alt: "Bruma Tropical", height: 38, natural: [139, 132] },
  { src: logoMn, alt: "MN", height: 42, natural: [145, 126] },
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
                  width={l.natural[0]}
                  height={l.natural[1]}
                  style={{ height: l.height }}
                  className="block w-auto max-w-none"
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

/** Iconos de trazo de las fichas (24x24, trazo 1.7), en navy. */
const ICONOS_PROBLEMA: Record<FichaProblemaId, React.ReactNode> = {
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </>
  ),
  contenido: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" />
    </>
  ),
  campanas: <path d="M4 20V13M10 20V8M16 20v-5M22 20V4" />,
  procesos: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1" />
    </>
  ),
  clientes: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17.5" cy="9.5" r="2.4" />
      <path d="M15.5 20c0-2.6 1.6-4.5 4-4.5 1.6 0 2.5.8 2.5.8" />
    </>
  ),
};

/**
 * "Ahora" y "Con sistema": alterna solo cada 4,5 s hasta que el visitante
 * pulsa un botón. Con movimiento reducido no alterna y se queda en
 * "sistema", que es el estado que cuenta la historia completa.
 */
function useModoProblema() {
  const [modo, setModo] = useState<ModoProblema>("ahora");
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setModo("sistema");
      return;
    }
    const id = window.setInterval(
      () => setModo((m) => (m === "ahora" ? "sistema" : "ahora")),
      INTERVALO_PROBLEMA_MS,
    );
    return () => window.clearInterval(id);
  }, [auto]);

  const elegir = (m: ModoProblema) => {
    setAuto(false);
    setModo(m);
  };

  return [modo, elegir] as const;
}

/**
 * Fondo beige y escena 3D (styles.css, .problema-*): desde 900px las
 * fichas flotan desordenadas sobre un tablero inclinado y en "sistema" se
 * alinean de frente en una fila de cuadrados; por debajo son una rejilla
 * de dos columnas. La sección termina en la escena. Textos de fichas y
 * conmutador en lib/problema.ts.
 */
function Problema() {
  const [modo, elegir] = useModoProblema();

  return (
    <section id="problema" className="seccion-problema seccion ancla">
      <div className="contenedor">
        {/* Texto un punto más oscuro que --gold-ink: sobre el dorado al 14%
            el #7E640E se quedaba en 4,4:1; #6E580B da 5,3:1. */}
        <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/14 px-4 py-[9px] text-[11px] leading-none font-semibold tracking-[0.2em] text-[#6e580b] uppercase">
          <i aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          {numeroDeSeccion("problema")} · El problema
        </span>

        <div className="mt-6 grid gap-[18px] min-[960px]:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] min-[960px]:items-end min-[960px]:gap-14">
          <h2 className="max-w-[calc(16*var(--ch-raleway))] text-[clamp(30px,4.2vw,58px)] leading-[1.08] tracking-[-0.03em] text-balance">
            Tu empresa no necesita hacer más. Necesita que todo{" "}
            <span className="text-gold-ink">trabaje conectado</span>
          </h2>
          <p className="max-w-[44ch] text-[clamp(15.5px,1.2vw,18px)] leading-[1.6] text-navy/72">
            La web por un lado, las redes por otro, campañas que captan pero no convierten y
            procesos manuales que se comen la semana. Cada pieza funciona a medias porque ninguna
            sostiene a la siguiente.
          </p>
        </div>

        <div
          role="group"
          aria-label="Comparar situación"
          className="mt-[clamp(28px,3.4vw,42px)] inline-flex gap-1 rounded-full border border-navy/10 bg-navy/6 p-[5px]"
        >
          {MODOS_PROBLEMA.map((m) => (
            <button
              key={m.id}
              type="button"
              aria-pressed={modo === m.id}
              onClick={() => elegir(m.id)}
              className="cursor-pointer rounded-full px-[22px] py-[11px] text-[14px] leading-[1.2] font-medium text-navy/72 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-gold-ink aria-pressed:bg-navy aria-pressed:font-semibold aria-pressed:text-cream aria-pressed:shadow-[0_10px_22px_-12px_rgb(2_21_87/0.8)] motion-reduce:transition-none"
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="problema-escena mt-[clamp(22px,3vw,34px)]" data-modo={modo}>
          <div className="problema-tablero">
            <div aria-hidden className="problema-suelo" />
            <div className="problema-fichas">
              {FICHAS_PROBLEMA.map((f) => (
                <article
                  key={f.id}
                  tabIndex={0}
                  className="problema-ficha"
                  style={
                    {
                      "--col": String(f.columna),
                      "--desorden-dx": f.desorden.dx,
                      "--desorden-dy": f.desorden.dy,
                      "--desorden-z": f.desorden.z,
                      "--desorden-r": f.desorden.r,
                    } as React.CSSProperties
                  }
                >
                  <span aria-hidden className="problema-icono">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {ICONOS_PROBLEMA[f.id]}
                    </svg>
                  </span>
                  <h3 className="mt-3 text-[16px] leading-[1.08] tracking-[-0.01em]">{f.titulo}</h3>
                  <p className="problema-chip">
                    <i aria-hidden />
                    {f.estado[modo]}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · EL SISTEMA, EN CARRUSEL                                          */
/* ------------------------------------------------------------------ */

/** El rombo de cada línea de las listas de las tarjetas, enlace o no: un
 *  solo elemento, así cambia a la vez en todas. Decorativo. */
function RomboServicio() {
  return <i aria-hidden className="carrusel-rombo" />;
}

/** Lo que enseña la tarjeta: cada `include`, con su página si `services` la tiene. */
function listaDeEtapa(e: EtapaSistema) {
  return e.includes.map((label) => ({
    label,
    to: e.services?.find((s) => s.label === label)?.to,
  }));
}

/*
 * Solo en desarrollo: cada elemento de `includes` tiene que estar también en
 * `services` con el mismo nombre; si no, la home no puede saber si tiene
 * página y lo pintaría sin enlace. En producción este bloque no existe
 * (Vite lo quita al compilar) y la página se pinta igual.
 */
if (import.meta.env.DEV) {
  for (const e of SYSTEM_STAGES) {
    for (const label of e.includes) {
      if (!e.services?.some((s) => s.label === label)) {
        console.warn(
          `[sistema] "${label}" está en includes de la etapa ${e.number} pero no en sus services de lib/sistema.ts: en la home saldrá sin enlace.`,
        );
      }
    }
  }
}

/**
 * Las cuatro etapas en un carrusel de scroll-snap nativo (sin librería).
 * El JavaScript solo averigua qué tarjeta está centrada, mueve las
 * flechas y las barras, y centra la tarjeta que recibe el foco.
 *
 * Sin JavaScript (o antes de que React tome el control) la pista se
 * desliza igual y las cuatro tarjetas se ven de frente y nítidas: el giro,
 * la distancia y el desenfoque de las laterales solo se aplican con
 * data-vivo. Todo es transform, opacity y filter: no se mueve nada de
 * sitio. Estilos en styles.css (.carrusel-*).
 */
function Sistema() {
  const pista = useRef<HTMLDivElement>(null);
  const [activa, setActiva] = useState(0);
  const [vivo, setVivo] = useState(false);
  const total = SYSTEM_STAGES.length;

  const tarjetas = () => [
    ...(pista.current?.querySelectorAll<HTMLElement>(".carrusel-tarjeta") ?? []),
  ];
  const centrada = () => {
    const p = pista.current;
    if (!p) return 0;
    const centro = p.scrollLeft + p.clientWidth / 2;
    let mejor = 0;
    let dist = Infinity;
    tarjetas().forEach((t, i) => {
      const d = Math.abs(t.offsetLeft + t.offsetWidth / 2 - centro);
      if (d < dist) {
        dist = d;
        mejor = i;
      }
    });
    return mejor;
  };
  const irA = (i: number) => {
    const p = pista.current;
    const t = tarjetas()[Math.max(0, Math.min(total - 1, i))];
    if (!p || !t) return;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    p.scrollTo({
      left: t.offsetLeft - (p.clientWidth - t.offsetWidth) / 2,
      behavior: suave ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    const p = pista.current;
    if (!p) return;
    setVivo(true);
    let raf = 0;
    const pintar = () => setActiva(centrada());
    const alMover = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pintar);
    };
    p.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    pintar();
    return () => {
      cancelAnimationFrame(raf);
      p.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="sistema" className="seccion-azul seccion ancla carrusel-seccion">
      <div className="contenedor">
        <div className="carrusel-cabeza">
          <p className="carrusel-pildora">
            <i aria-hidden />
            {numeroDeSeccion("sistema")} · Sistema Vértice
          </p>
          <h2>
            Cuatro etapas conectadas para convertir tu presencia digital en <em>oportunidades</em>
          </h2>
          <p>
            Cada etapa se apoya en la anterior. No lanzamos campañas hasta que la base está
            construida, porque es lo que hace que el gasto se convierta en retorno.
          </p>
        </div>

        <div className="carrusel" data-vivo={vivo || undefined}>
          <button
            type="button"
            className="carrusel-flecha carrusel-flecha-izq"
            aria-label="Etapa anterior"
            // aria-disabled y no disabled: un botón con el foco que pasa a
            // disabled lo pierde y el foco se va al body.
            aria-disabled={activa === 0 || undefined}
            onClick={() => activa > 0 && irA(centrada() - 1)}
          >
            <ArrowLeft aria-hidden strokeWidth={2.2} className="h-[18px] w-[18px]" />
          </button>
          <button
            type="button"
            className="carrusel-flecha carrusel-flecha-der"
            aria-label="Etapa siguiente"
            aria-disabled={activa === total - 1 || undefined}
            onClick={() => activa < total - 1 && irA(centrada() + 1)}
          >
            <ArrowRight aria-hidden strokeWidth={2.2} className="h-[18px] w-[18px]" />
          </button>

          <div
            ref={pista}
            className="carrusel-pista"
            tabIndex={0}
            role="group"
            aria-label="Las cuatro etapas del Sistema Vértice"
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
              if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                irA(centrada() + (e.key === "ArrowRight" ? 1 : -1));
              }
            }}
          >
            {SYSTEM_STAGES.map((etapa, i) => (
              <article
                key={etapa.number}
                className="carrusel-tarjeta"
                aria-label={`Etapa ${etapa.number}: ${etapa.title}`}
                data-activa={i === activa || undefined}
                data-despues={i > activa || undefined}
                onFocus={() => irA(i)}
              >
                {/* Rótulo y número en la misma fila; el título empieza en
                    la siguiente, así el número no puede pisarlo. */}
                <div className="carrusel-arriba">
                  <span className="carrusel-paso">
                    <s aria-hidden />
                    Etapa {etapa.number}
                  </span>
                  <span aria-hidden className="carrusel-marca">
                    {etapa.number}
                  </span>
                </div>
                <h3>{etapa.title}</h3>
                <div className="carrusel-lista">
                  <p className="carrusel-rotulo">{etapa.rotulo}</p>
                  <ul>
                    {listaDeEtapa(etapa).map((s) => (
                      <li key={s.label}>
                        {s.to ? (
                          <Link to={s.to}>
                            <RomboServicio />
                            <span className="carrusel-texto">{s.label}</span>
                            <ArrowRight aria-hidden strokeWidth={2.6} className="h-3.5 w-3.5" />
                          </Link>
                        ) : (
                          <span className="carrusel-plano">
                            <RomboServicio />
                            {s.label}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="carrusel-puntos">
            {SYSTEM_STAGES.map((etapa, i) => (
              <button
                key={etapa.number}
                type="button"
                aria-label={`Etapa ${etapa.number}: ${etapa.title}`}
                aria-current={i === activa ? "true" : undefined}
                onClick={() => irA(i)}
              />
            ))}
          </div>
        </div>

        <div className="carrusel-pie">
          <div>
            <p>
              <b>Empezamos siempre por la etapa 01.</b> El orden no es una preferencia: es lo que
              evita pagar dos veces por lo mismo. Si no sabes qué pieza te falta, el diagnóstico lo
              dice.
            </p>
            <ul className="carrusel-promesas">
              {GARANTIAS.map((g) => (
                <li key={g}>
                  <i aria-hidden />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="carrusel-acciones">
            <Link to="/servicios" className="enlace-dibujado">
              <span>Ver los nueve servicios</span>
              <ArrowRight aria-hidden strokeWidth={2.2} className="h-4 w-4" />
            </Link>
            {/* Lleva al formulario del cierre, como el botón del bloque de
                cómo empezamos. Contorno de foco en el dorado único. */}
            <SectionLink
              id="contacto"
              onClick={(e) => e.detail === 0 && enfocarFormularioAlLlegar()}
              className={goldCtaClasses(
                "default",
                "rounded-none px-7 py-[17px] focus-visible:outline-gold",
              )}
            >
              Solicitar diagnóstico
              <ArrowRight
                aria-hidden
                strokeWidth={2.4}
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              />
            </SectionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Entrada de un bloque (el camino de "Cómo empezamos"). En el HTML del servidor no hay clase y se ve todo dibujado
 * (sin JS no queda nada oculto). Al montar pasa a "espera" (el estado de
 * salida, sin transición) y a "on" al entrar `umbral` en pantalla, una sola
 * vez. Con movimiento reducido va directo a "on", sin observar.
 */
function useEntrada<T extends HTMLElement>(umbral: number) {
  const ref = useRef<T>(null);
  const [fase, setFase] = useState<"" | "espera" | "on">("");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFase("on");
      return;
    }
    setFase("espera");
    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setFase("on");
          io.disconnect();
        }
      },
      { threshold: umbral },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [umbral]);

  return { ref, fase };
}

/* ------------------------------------------------------------------ */
/* 4 · CASO DE ÉXITO                                                    */
/* ------------------------------------------------------------------ */

/**
 * Una tarjeta con el lenguaje del resto de la home (recta, filete dorado):
 * la marca, las cifras, qué miden, la fuente y el enlace al caso. Los
 * datos salen de lib/casos.ts, los mismos que usa /casos/frulonsa; el
 * testimonio y la primera pieza solo se pintan cuando existen.
 */
function CasoDeExito() {
  const caso = CASO_FRULONSA;
  const pieza = caso.piezas[0] ?? null;

  return (
    <section id="caso" className="seccion-clara seccion ancla">
      <div className="contenedor">
        <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:items-end min-[900px]:gap-14">
          <div>
            <p className="etiqueta">
              <span className="etiqueta-num">{numeroDeSeccion("caso")}</span>Caso de éxito
            </p>
            <h2 className="mt-5 max-w-[calc(18*var(--ch-raleway))] text-h2 text-balance">
              Esto es lo que pasa cuando el contenido deja de ser <Subrayado>improvisado</Subrayado>
            </h2>
          </div>
          <p className="max-w-[34em] text-lead text-navy/72">{caso.contexto}</p>
        </div>

        <article className="caso-tarjeta" aria-labelledby="caso-marca">
          <CasoMarca caso={caso} id="caso-marca" />
          <CasoCifras caso={caso} />
          <CasoQueMide caso={caso} />

          {(caso.testimonio || pieza) && (
            <div className="caso-testimonio">
              {caso.testimonio && <CasoTestimonio testimonio={caso.testimonio} />}
              {pieza && <CasoPieza pieza={pieza} />}
            </div>
          )}

          <footer className="caso-pie">
            <p>{caso.fuente}</p>
            <Link to="/casos/frulonsa" className="enlace-dibujado">
              <span>Ver el caso completo</span>
              <ArrowRight aria-hidden strokeWidth={2.4} className="h-4 w-4" />
            </Link>
          </footer>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4b · CÓMO TRABAJAMOS                                                 */
/* ------------------------------------------------------------------ */

/**
 * Las cuatro reglas de trabajo. Son compromisos públicos: si alguna deja
 * de cumplirse siempre, se quita o se matiza aquí.
 */
const REGLAS = [
  {
    titulo: "No subcontratamos",
    texto: "Estrategia, desarrollo, contenido y audiovisual, en el mismo equipo.",
  },
  {
    titulo: "Programamos lo que haga falta",
    texto:
      "Webs, apps, CRM, automatizaciones e IA a medida. No herramientas de terceros pegadas entre sí.",
  },
  {
    titulo: "El audiovisual es nuestro",
    texto: "Guion, rodaje, montaje y publicación con equipo propio.",
  },
  {
    titulo: "Mínimo de tres a seis meses",
    texto: "Es lo que tarda un sistema en sostenerse solo. Campañas sueltas, no.",
  },
] as const;

/**
 * Cómo se trabaja, en cuatro reglas. Solo tipografía (ni tarjetas ni
 * iconos) porque el resto de la home ya las tiene. Sin personas: ni
 * nombres, ni fotos, ni cifras. El id sigue siendo "equipo" para no
 * romper anclas.
 */
function ComoTrabajamos() {
  return (
    <section id="equipo" className="seccion-clara seccion ancla">
      <div className="contenedor">
        <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:items-end min-[900px]:gap-14">
          <div>
            <p className="etiqueta">
              <span className="etiqueta-num">{numeroDeSeccion("equipo")}</span>Cómo trabajamos
            </p>
            <h2 className="mt-5 max-w-[calc(16*var(--ch-raleway))] text-h2 text-balance">
              Lo que proponemos lo <Subrayado>construimos</Subrayado> nosotros
            </h2>
          </div>
          <p className="max-w-[34em] text-lead text-navy/72">
            No somos una agencia de marketing: somos una consultora con equipo de desarrollo y
            producción propios.
          </p>
        </div>

        <ul className="reglas">
          {REGLAS.map((r) => (
            <li key={r.titulo} className="regla">
              <h3>{r.titulo}</h3>
              <p>{r.texto}</p>
            </li>
          ))}
        </ul>

        <div className="reglas-pie">
          <Link to="/quienes-somos" className="enlace-dibujado">
            <span>Conocer Syntalia Vértice</span>
            <ArrowRight aria-hidden strokeWidth={2.4} className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 · CÓMO EMPEZAMOS                                                   */
/* ------------------------------------------------------------------ */

const PASOS = [
  {
    titulo: "Cuéntanos tu proyecto",
    texto: "Rellenas el formulario. Sin compromiso ni letra pequeña.",
    tiempo: "2 minutos",
  },
  {
    titulo: "Analizamos tu situación",
    texto: "Tu posicionamiento, tu presencia digital y tu captación actual.",
    tiempo: "24 horas",
  },
  {
    titulo: "Te entregamos el plan",
    texto: "Una hoja de ruta con prioridades y qué haríamos primero. Gratis.",
    tiempo: "3-5 días",
  },
] as const;

const PROMESAS = ["Sin compromiso", "Respuesta en 24 h", "Plan estratégico gratuito"] as const;

/** Tramo entre dos paradas: raya dorada y flecha (girada en vertical en móvil). */
function Tramo() {
  return (
    <li aria-hidden className="camino-tramo">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 6l6 6-6 6" />
      </svg>
    </li>
  );
}

/**
 * Cómo empezar, como un camino: tres paradas blancas sobre el azul, unidas
 * por tramos dorados, que acaba en el botón de diagnóstico. El botón es lo
 * único dorado macizo de la sección. La entrada (filetes y tramos que se
 * dibujan en orden) está en .camino-* de styles.css.
 */
function Empezar() {
  const { ref, fase } = useEntrada<HTMLOListElement>(0.25);

  return (
    <section id="empezar" className="seccion-azul seccion ancla">
      <div className="contenedor">
        <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:items-end min-[900px]:gap-14">
          <div>
            <p className="etiqueta">
              <span className="etiqueta-num">{numeroDeSeccion("empezar")}</span>Cómo empezamos
            </p>
            <h2 className="mt-5 max-w-[calc(15*var(--ch-raleway))] text-h2 text-balance">
              Tres pasos y sabrás qué le falta a tu empresa
            </h2>
          </div>
          <p className="max-w-[26em] text-lead text-cream/74">
            Sin reuniones de una hora para contarte lo que ya sabes. El primer paso son dos minutos.
          </p>
        </div>

        <ol ref={ref} className={cn("camino", fase)}>
          {PASOS.map((p, i) => (
            <Fragment key={p.titulo}>
              {i > 0 && <Tramo />}
              <li className="camino-parada">
                <span aria-hidden className="camino-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
                <span className="camino-tiempo">{p.tiempo}</span>
              </li>
            </Fragment>
          ))}
        </ol>

        <div className="camino-destino">
          <div>
            <h3>El paso 01 se hace desde aquí</h3>
            <ul className="camino-promesas">
              {PROMESAS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          {/* Lleva al formulario del cierre, en esta misma página. Con
              teclado (clic sin puntero, detail 0), al terminar el
              desplazamiento el foco pasa al campo del paso en que esté. */}
          <SectionLink
            id="contacto"
            onClick={(e) => e.detail === 0 && enfocarFormularioAlLlegar()}
            className={goldCtaClasses("default", "rounded-none px-[30px] py-[18px]")}
          >
            Solicitar diagnóstico
            <ArrowRight
              aria-hidden
              strokeWidth={2.4}
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-[3px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            />
          </SectionLink>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · PREGUNTAS FRECUENTES                                             */
/* ------------------------------------------------------------------ */

/**
 * Acordeón de preguntas (textos en lib/faq.ts). Cada pregunta es un
 * <button> real dentro de un h3, que ocupa la fila entera: aria-expanded
 * dice si está abierta y aria-controls apunta a su respuesta, que es una
 * región con nombre (aria-labelledby, la propia pregunta). Cerrada, la
 * respuesta queda con visibility: hidden, así el lector de pantalla no la
 * lee. La primera empieza abierta; se abren y cierran por separado.
 */
function FAQ() {
  const id = useId();
  const [abiertas, setAbiertas] = useState<readonly boolean[]>(() =>
    FAQ_HOME.map((_, i) => i === 0),
  );
  const alternar = (i: number) => setAbiertas((a) => a.map((v, j) => (j === i ? !v : v)));

  return (
    <section id="faq" className="seccion-clara alterna seccion ancla">
      <div className="contenedor">
        <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:items-end min-[900px]:gap-14">
          <div>
            <p className="etiqueta">
              <span className="etiqueta-num">{numeroDeSeccion("faq")}</span>Preguntas frecuentes
            </p>
            <h2 className="mt-5 max-w-[calc(14*var(--ch-raleway))] text-h2 text-balance">
              Lo que nos preguntan antes de empezar
            </h2>
          </div>
          <p className="max-w-[26em] text-lead text-navy/72">
            Si tienes una duda que no está aquí, es mejor preguntarla antes de la llamada que
            después de firmar.
          </p>
        </div>

        <div className="faq">
          {FAQ_HOME.map((f, i) => {
            const abierta = abiertas[i];
            const idPregunta = `${id}-pregunta-${i}`;
            const idRespuesta = `${id}-respuesta-${i}`;
            return (
              <div key={f.pregunta} className="faq-item" data-abierta={abierta || undefined}>
                <h3>
                  <button
                    type="button"
                    id={idPregunta}
                    className="faq-pregunta"
                    aria-expanded={abierta}
                    aria-controls={idRespuesta}
                    onClick={() => alternar(i)}
                  >
                    <span className="faq-texto">{f.pregunta}</span>
                    <span aria-hidden className="faq-signo" />
                  </button>
                </h3>
                <div
                  id={idRespuesta}
                  role="region"
                  aria-labelledby={idPregunta}
                  className="faq-respuesta"
                >
                  <div>
                    <p>{f.respuesta}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="faq-pie">
          <p>¿Tu duda no está aquí?</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="enlace-dibujado"
          >
            <span>Pregúntanos por WhatsApp</span>
            <ArrowRight aria-hidden strokeWidth={2.4} className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7 · CIERRE CON FORMULARIO                                            */
/* ------------------------------------------------------------------ */

/**
 * Tras el desplazamiento hasta el cierre, enfoca el campo del paso activo
 * (sin volver a desplazar). Espera al final del scroll suave, con un tope
 * por si el navegador no avisa.
 */
function enfocarFormularioAlLlegar() {
  let hecho = false;
  const enfocar = () => {
    if (hecho) return;
    hecho = true;
    const campo =
      document.querySelector<HTMLElement>(
        ".cierre-paso[data-activo] input, .cierre-paso[data-activo] textarea",
      ) ?? document.getElementById(ID_PRIMER_CAMPO);
    campo?.focus({ preventScroll: true });
  };
  window.addEventListener("scrollend", enfocar, { once: true });
  window.setTimeout(enfocar, 1200);
}

/**
 * El cierre: formulario de cuatro pasos sin caja, sobre el azul, con la
 * barra de progreso a sangre arriba y el aviso legal y WhatsApp al pie.
 */
function Cierre() {
  const { envio } = Route.useSearch();

  return (
    <section id="contacto" className="seccion-azul seccion cierre ancla">
      <div className="contenedor">
        <FormularioPasos
          source="Home · Cuéntanos tu proyecto"
          volverA="/#contacto"
          envioInicial={envio}
          pildora={<Pildora>Diagnóstico gratuito</Pildora>}
        />

        <div className="cierre-pie">
          <p className="cierre-legal">
            Responsable: {legalData.razonSocial} Tratamos tus datos para atender tu solicitud. Más
            información y ejercicio de derechos en la{" "}
            <Link to="/privacidad">Política de Privacidad</Link>.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="cierre-wa">
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            <span>O escríbenos por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
