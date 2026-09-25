import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logoAlmaValdes from "@/assets/logos-clientes/alma-valdes.png";
import logoBruma from "@/assets/logos-clientes/bruma-tropical.png";
import logoCnc from "@/assets/logos-clientes/cnc.png";
import logoFrulonsa from "@/assets/logos-clientes/frulonsa.png";
import logoMn from "@/assets/logos-clientes/mn.png";
import logoRevivalia from "@/assets/logos-clientes/revivalia.png";
import logoTradyn from "@/assets/logos-clientes/tradyn-ai.png";
import { Reveal } from "@/components/motion";
import { FormularioCorto } from "@/components/formulario-corto";
import { SectionLink } from "@/components/section-link";
import { SectionRail } from "@/components/section-rail";
import { Subrayado } from "@/components/subrayado";
import { goldCtaClasses } from "@/lib/gold-cta-classes";
import { DISCIPLINAS } from "@/lib/equipo";
import { useHomeSectionObserver } from "@/lib/home-sections";
import { SYSTEM_STAGES } from "@/lib/sistema";
import {
  FICHAS_PROBLEMA,
  INTERVALO_PROBLEMA_MS,
  MODOS_PROBLEMA,
  type FichaProblemaId,
  type ModoProblema,
} from "@/lib/problema";
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
      <Servicios />

      {/* Caso de éxito antiguo, pendiente de rehacer */}
      <div className="bg-background text-foreground">
        <CasoDeExito />
      </div>

      <Equipo />
      <Empezar />
      <FAQ />
      <Cierre />
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

          {/* Tres líneas fijas desde 760px ("Construimos el / sistema digital
              que / hace crecer tu empresa"): cada .ln pasa a bloque. Por
              debajo son inline y el texto fluye solo. */}
          <h1 className="mx-auto mt-6 max-w-[22ch] text-hero text-cream [text-shadow:0_2px_26px_rgba(1,6,20,.55)]">
            <span className="inline min-[760px]:block">Construimos el </span>
            <span className="inline min-[760px]:block">
              <Subrayado>sistema digital</Subrayado> que{" "}
            </span>
            <span className="inline min-[760px]:block">hace crecer tu&nbsp;empresa</span>
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
    <section id="problema" className="seccion-problema seccion scroll-mt-6">
      <div className="contenedor">
        {/* Texto un punto más oscuro que --gold-ink: sobre el dorado al 14%
            el #7E640E se quedaba en 4,4:1; #6E580B da 5,3:1. */}
        <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/14 px-4 py-[9px] text-[11px] leading-none font-semibold tracking-[0.2em] text-[#6e580b] uppercase">
          <i aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
          01 · El problema
        </span>

        <div className="mt-6 grid gap-[18px] min-[960px]:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] min-[960px]:items-end min-[960px]:gap-14">
          <h2 className="max-w-[16ch] text-[clamp(30px,4.2vw,58px)] leading-[1.08] tracking-[-0.03em] text-balance">
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
/* 3b · SERVICIOS                                                       */
/* ------------------------------------------------------------------ */

const SERVICIOS_HOME = [
  {
    nombre: "Diseño y desarrollo web",
    texto: "Webs, landings y aplicaciones a medida, pensadas para captar.",
    to: "/servicios/desarrollo-web",
  },
  {
    nombre: "Branding y posicionamiento",
    texto: "Identidad, mensaje y propuesta de valor con criterio.",
    to: "/servicios/branding-completo",
  },
  {
    nombre: "Contenido y redes sociales",
    texto: "Estrategia, producción audiovisual y publicación constante.",
    to: "/servicios/contenido",
  },
  {
    nombre: "Publicidad y captación",
    texto: "Campañas, landings y seguimiento de cada contacto.",
    to: "/servicios/social-ads",
  },
  {
    nombre: "Automatización y sistemas",
    texto: "CRM, flujos y herramientas internas que quitan trabajo manual.",
    to: "/servicios/captacion",
  },
] as const;

/**
 * Índice de servicios sobre crema apagado: una fila enlazable por
 * servicio, sin tarjetas. El número en dorado oscuro (4,7:1) pasa a navy
 * al pasar el ratón, porque sobre el fondo del hover se quedaría en 4,3:1.
 */
function Servicios() {
  return (
    <section id="servicios" className="seccion-clara alterna seccion scroll-mt-6">
      <div className="contenedor">
        <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:items-start min-[900px]:gap-14">
          <div>
            <p className="etiqueta">
              <span className="etiqueta-num">03</span>Servicios
            </p>
            <h2 className="mt-5 max-w-[14ch] text-h2 text-balance">
              Las piezas que montamos dentro del sistema
            </h2>
          </div>
          <p className="max-w-[34em] text-lead text-navy/72">
            Se pueden contratar por separado, pero cobran sentido cuando forman parte del ecosistema
            completo.
          </p>
        </div>

        <ol className="mt-[clamp(36px,4vw,52px)] border-t border-navy/12">
          {SERVICIOS_HOME.map((s, i) => (
            <li key={s.to} className="border-b border-navy/12">
              <Link
                to={s.to}
                className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 px-1.5 py-[22px] transition-[background-color,padding] duration-200 hover:bg-navy/4 hover:pr-3 hover:pl-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-reduce:transition-none"
              >
                <span className="text-[11px] leading-none font-semibold tracking-[0.16em] text-gold-ink group-hover:text-navy [font-variant-numeric:lining-nums_tabular-nums]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[clamp(18px,1.7vw,22px)] leading-[1.25] font-semibold tracking-[-0.015em]">
                    {s.nombre}
                  </span>
                  <span className="mt-1 block text-[14.5px] leading-[1.5] text-navy/72">
                    {s.texto}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="grid h-[38px] w-[38px] shrink-0 place-content-center rounded-full border border-navy/18 transition-colors duration-200 group-hover:border-transparent group-hover:bg-gold motion-reduce:transition-none"
                >
                  <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.4} />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <Link
          to="/servicios"
          className="mt-8 inline-flex items-center gap-2 border-b-2 border-current pb-1 text-[15px] font-semibold text-navy transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
        >
          Ver todos los servicios
          <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · CASO DE ÉXITO (antiguo)                                          */
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
/* 4b · QUIÉNES SOMOS                                                   */
/* ------------------------------------------------------------------ */

/**
 * Las cuatro disciplinas (datos en lib/equipo.ts). Sin personas: ni
 * nombres, ni fotos, ni cifras. Todas las filas miden lo mismo
 * (auto-rows-fr), también en la rejilla de dos columnas.
 */
function Equipo() {
  return (
    <section id="equipo" className="seccion-clara seccion scroll-mt-6">
      <div className="contenedor">
        <div className="grid gap-[18px] min-[900px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] min-[900px]:items-start min-[900px]:gap-14">
          <div>
            <p className="etiqueta">
              <span className="etiqueta-num">05</span>Quiénes somos
            </p>
            <h2 className="mt-5 max-w-[15ch] text-h2 text-balance">
              Cuatro disciplinas bajo el mismo techo
            </h2>
          </div>
          <p className="max-w-[34em] text-lead text-navy/72">
            Estrategia, tecnología, contenido y audiovisual trabajan juntos en cada proyecto. No
            subcontratamos: quien diseña el sistema es quien lo ejecuta, y por eso las piezas
            encajan entre sí.
          </p>
        </div>

        <ul className="mt-[clamp(36px,4vw,52px)] grid auto-rows-fr gap-4 min-[760px]:grid-cols-2 min-[1040px]:grid-cols-4">
          {DISCIPLINAS.map((d) => (
            <li
              key={d.titulo}
              className="flex flex-col rounded-card border border-navy/12 bg-paper p-[26px] shadow-[0_26px_48px_-40px_rgb(2_21_87/0.5)]"
            >
              <span
                aria-hidden
                className="grid h-11 w-11 place-content-center rounded-[13px] bg-navy text-gold-light"
              >
                <d.icono className="h-5 w-5" strokeWidth={2} />
              </span>
              <h3 className="mt-5 text-h3 font-semibold">{d.titulo}</h3>
              <p className="mt-2.5 text-[15px] leading-[1.65] text-navy/72">{d.texto}</p>
            </li>
          ))}
        </ul>
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
    texto: "Rellenas el formulario en dos minutos. Sin compromiso ni letra pequeña.",
  },
  {
    titulo: "Analizamos tu situación",
    texto: "Revisamos tu posicionamiento, tu presencia digital y tu captación actual.",
  },
  {
    titulo: "Te entregamos el plan",
    texto: "Una hoja de ruta clara con prioridades y qué haríamos primero. Gratis.",
  },
] as const;

/**
 * Tres pasos sobre fondo oscuro. El último, el que entrega valor, va en
 * dorado con texto casi negro (8,5:1).
 */
function Empezar() {
  return (
    <section id="empezar" className="seccion scroll-mt-6">
      <div className="contenedor">
        <p className="etiqueta">
          <span className="etiqueta-num">06</span>Cómo empezamos
        </p>
        <h2 className="mt-5 max-w-[15ch] text-h2 text-balance">
          Tres pasos y sabrás qué le falta a tu empresa
        </h2>

        <ol className="mt-[clamp(36px,4vw,52px)] grid gap-[18px] min-[860px]:grid-cols-3">
          {PASOS.map((p, i) => {
            const ultimo = i === PASOS.length - 1;
            return (
              <li
                key={p.titulo}
                className={cn(
                  "rounded-card border p-[26px]",
                  ultimo
                    ? "border-transparent bg-gold text-on-gold"
                    : "border-cream/13 bg-[rgb(245_242_233/0.035)]",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid h-[42px] w-[42px] place-content-center rounded-btn font-display text-[15px] font-bold [font-variant-numeric:lining-nums]",
                    ultimo ? "bg-navy/14 text-navy" : "bg-gold/16 text-gold-light",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-[18px] text-h3 font-semibold text-balance">{p.titulo}</h3>
                <p
                  className={cn(
                    "mt-[9px] text-[14.5px] leading-[1.6]",
                    ultimo ? "text-on-gold/80" : "text-cream/72",
                  )}
                >
                  {p.texto}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6 · PREGUNTAS FRECUENTES                                             */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "Ya he trabajado con agencias y no funcionó",
    a: "Suele pasar cuando se ejecutan acciones sueltas sin una base detrás: campañas sin posicionamiento, contenido sin estrategia o una web que no está pensada para captar. Nosotros empezamos siempre por el diagnóstico, y si algo no tiene sentido para tu negocio, te lo decimos.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de qué necesite tu empresa, y eso se ve en el diagnóstico. Salimos de ahí con un alcance y una inversión concretos, no con una tarifa cerrada que no encaja con nadie.",
  },
  {
    q: "¿Cuánto tarda en verse resultados?",
    a: "Las primeras mejoras de posicionamiento y presencia se notan pronto. Los resultados comerciales sostenidos llegan cuando el sistema completo lleva un tiempo funcionando y optimizándose.",
  },
  {
    q: "¿Qué vais a hacer exactamente en mi empresa?",
    a: "Lo que salga del diagnóstico, dentro de las cuatro etapas: ordenar el posicionamiento, construir la base digital, montar la captación y optimizar. Cada fase se entrega con objetivos y responsables claros.",
  },
] as const;

/**
 * Acordeón nativo (<details>/<summary>): se abre con Intro o Espacio y el
 * lector de pantalla anuncia si está expandido. El + y el – son decorativos.
 */
function FAQ() {
  return (
    <section id="faq" className="seccion-clara alterna seccion scroll-mt-6">
      <div className="contenedor">
        <p className="etiqueta">
          <span className="etiqueta-num">07</span>Preguntas frecuentes
        </p>
        <h2 className="mt-5 max-w-[14ch] text-h2 text-balance">
          Lo que nos preguntan antes de empezar
        </h2>

        <div className="mt-[clamp(32px,3.6vw,46px)] border-t border-navy/12">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0} className="group border-b border-navy/12">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-[18px] py-[22px] font-display text-[clamp(17px,1.5vw,21px)] leading-[1.3] font-semibold tracking-[-0.015em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="w-5 shrink-0 text-center font-sans text-[24px] leading-none font-normal text-gold-ink"
                >
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
              </summary>
              <p className="max-w-[66ch] pb-6 text-[15.5px] leading-[1.7] text-navy/72">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7 · CIERRE CON FORMULARIO                                            */
/* ------------------------------------------------------------------ */

/** Tarjeta de cierre: degradado de azul de marca a ink, con el formulario corto. */
function Cierre() {
  return (
    <section id="contacto" className="seccion scroll-mt-6">
      <div className="contenedor">
        <div className="rounded-block border border-cream/13 bg-[linear-gradient(150deg,var(--navy)_0%,var(--ink)_60%)] p-[clamp(20px,4vw,58px)]">
          <div className="grid gap-[34px] min-[940px]:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] min-[940px]:items-center min-[940px]:gap-14">
            <div>
              <Pildora>Diagnóstico gratuito</Pildora>
              <h2 className="mt-[22px] max-w-[13ch] text-h2 text-balance">Cuéntanos tu proyecto</h2>
              <p className="mt-[18px] max-w-[38ch] text-lead text-cream/72">
                Analizamos tu situación y te entregamos un plan estratégico claro. Sin compromiso y
                con respuesta en menos de 24 horas.
              </p>
              <Garantias items={["Sin compromiso", "Respuesta en 24 h"]} className="mt-[26px]" />
            </div>

            <FormularioCorto />
          </div>
        </div>
      </div>
    </section>
  );
}
