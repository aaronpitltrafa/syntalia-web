import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Target, TrendingUp, ShieldCheck, Eye, Compass, BarChart3, Sparkles, Plus, X, Activity, Zap, LineChart, Users, Play, Heart, UserPlus, Instagram, Flame, Rocket, Palette, Search, Video, Megaphone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";
import { Counter, Reveal, Magnetic } from "@/components/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Syntalia Vértice — Marketing digital estratégico" },
      { name: "description", content: "Desarrollamos sistemas de marketing digital para empresas que quieren ganar visibilidad, captar clientes y crecer con una estrategia clara." },
      { property: "og:title", content: "Syntalia Vértice — Marketing digital estratégico" },
      { property: "og:description", content: "Sistemas de marketing digital para ganar visibilidad, captar clientes y crecer con estrategia." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/" },
      { name: "twitter:title", content: "Syntalia Vértice — Marketing digital estratégico" },
      { name: "twitter:description", content: "Sistemas de marketing digital para ganar visibilidad, captar clientes y crecer con estrategia." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <Hero />
      <Pains />
      <SystemSection />
      <Process />
      <ServicesGrid />
      <Results />
      <FinalCTA />
    </div>
  );
}

const ROTATING = ["oportunidades comerciales reales", "clientes que sí compran", "una marca que se recuerda", "un sistema que escala"];

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const spotRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [wordIdx, setWordIdx] = useState(0);

  // Cursor spotlight + 3D tilt on headline
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, oklch(0.86 0.14 82 / 0.28), transparent 55%)`;
      }
      if (headlineRef.current) {
        const rx = ((y / r.height) - 0.5) * -6;
        const ry = ((x / r.width) - 0.5) * 8;
        headlineRef.current.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // Rotating word
  useEffect(() => {
    const id = setInterval(() => setWordIdx((i) => (i + 1) % ROTATING.length), 2800);
    return () => clearInterval(id);
  }, []);

  const orbitals = [
    { icon: Palette, label: "Branding", angle: 0 },
    { icon: Search, label: "SEO", angle: 60 },
    { icon: Megaphone, label: "Ads", angle: 120 },
    { icon: Video, label: "Contenido", angle: 180 },
    { icon: Mail, label: "Email", angle: 240 },
    { icon: Rocket, label: "Captación", angle: 300 },
  ];

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-gradient-navy text-cream">
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div ref={spotRef} className="pointer-events-none absolute inset-0 transition-[background] duration-300" />
      <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-gold/15 blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -left-20 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />

      {/* Ghost VÉRTICE word */}
      <div className="pointer-events-none absolute -bottom-10 left-0 w-full select-none overflow-hidden">
        <div className="ghost-text whitespace-nowrap text-center text-[18vw] font-black leading-none tracking-tighter animate-[floatY_9s_ease-in-out_infinite]">
          VÉRTICE
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-32 md:pt-28 md:pb-40">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.4em] text-gold">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Agencia de crecimiento digital</span>
          <span className="text-cream/30">·</span>
          <span className="text-cream/60">Estrategia · Sistemas · Resultados</span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h1
              ref={headlineRef}
              className="text-5xl font-semibold leading-[0.98] md:text-7xl lg:text-[5.5rem] text-balance transition-transform duration-300 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              Convertimos tu presencia digital en{" "}
              <span className="relative inline-block align-baseline">
                <span key={wordIdx} className="text-gradient-gold italic inline-block animate-[wordSwap_0.7s_cubic-bezier(0.22,1,0.36,1)]">
                  {ROTATING[wordIdx]}
                </span>
                <span className="absolute -bottom-2 left-0 h-[3px] w-full bg-gradient-to-r from-gold via-gold-soft to-transparent" />
              </span>
              .
            </h1>

            <p className="mt-10 max-w-2xl text-lg text-cream/75 leading-relaxed md:text-xl">
              Desarrollamos sistemas de marketing digital para empresas que quieren ganar visibilidad, captar clientes y crecer con una estrategia clara, sea cual sea su sector.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/diagnostico" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-semibold text-navy transition-all hover:shadow-[0_20px_60px_-10px_oklch(0.745_0.135_82/0.6)] hover:-translate-y-0.5">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cream/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Solicitar diagnóstico estratégico</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/servicios" className="inline-flex items-center gap-3 rounded-full border border-cream/25 px-8 py-4 text-sm font-semibold text-cream hover:border-gold hover:text-gold transition-colors">
                Ver cómo trabajamos
              </Link>
            </div>
          </div>

          {/* Orbital services diagram */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative h-[380px] w-[380px] max-w-full">
              {/* rings */}
              <div className="absolute inset-0 rounded-full border border-cream/10 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-8 rounded-full border border-gold/20 animate-[spin_45s_linear_infinite_reverse]" />
              <div className="absolute inset-16 rounded-full border border-cream/5" />
              {/* center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-gold to-gold-soft text-navy shadow-[0_0_60px_oklch(0.745_0.135_82/0.5)]">
                  <div className="absolute inset-0 rounded-full bg-gold/40 animate-ping" />
                  <div className="relative text-center">
                    <div className="text-3xl font-bold leading-none">SV</div>
                    <div className="mt-1 text-[9px] uppercase tracking-widest">Vértice</div>
                  </div>
                </div>
              </div>
              {/* orbiting nodes */}
              <div className="absolute inset-0 animate-[spin_30s_linear_infinite]">
                {orbitals.map((o) => {
                  const rad = (o.angle * Math.PI) / 180;
                  const r = 165;
                  const x = Math.cos(rad) * r;
                  const y = Math.sin(rad) * r;
                  return (
                    <div
                      key={o.label}
                      className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                    >
                      <div className="animate-[spin_30s_linear_infinite_reverse]">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cream/15 bg-navy/70 text-gold backdrop-blur-sm shadow-lg transition-all hover:scale-110 hover:border-gold hover:text-cream">
                          <o.icon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-cream/10 md:grid-cols-4">
          {[
            { icon: Target, k: "01", label: "Contactos cualificados" },
            { icon: ShieldCheck, k: "02", label: "Percepción profesional" },
            { icon: TrendingUp, k: "03", label: "Oportunidades reales" },
            { icon: BarChart3, k: "04", label: "Crecimiento medible" },
          ].map((it) => (
            <div key={it.label} className="group relative bg-navy/40 backdrop-blur-sm p-6 transition-colors hover:bg-gold hover:text-navy">
              <div className="flex items-start justify-between">
                <it.icon className="h-6 w-6 text-gold group-hover:text-navy transition-colors" />
                <span className="font-mono text-[10px] text-cream/40 group-hover:text-navy/60">{it.k}</span>
              </div>
              <div className="mt-8 text-sm font-medium text-cream/90 group-hover:text-navy">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Marquee */}
      <div className="relative border-y border-cream/10 bg-navy/30 backdrop-blur-sm py-5 overflow-hidden">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center gap-12">
              {["VISIBILIDAD", "AUTORIDAD", "CAPTACIÓN", "ESTRATEGIA", "CONVERSIÓN", "ESCALADO", "POSICIONAMIENTO", "BRANDING"].map((w) => (
                <span key={w} className="flex items-center gap-12 text-2xl font-semibold tracking-[0.3em] text-cream/70">
                  {w}
                  <Plus className="h-4 w-4 text-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pains() {
  const items = [
    "No transmite online el nivel real que tiene",
    "Depende demasiado de referencias, contactos o clientes antiguos",
    "No genera oportunidades nuevas de forma constante",
    "Su web y redes no están alineadas con una estrategia comercial",
    "Cuando alguien te busca, no encuentra una marca sólida",
  ];
  return (
    <section className="relative border-b border-border/40 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5 md:sticky md:top-24 md:self-start">
            <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-foreground/70">Diagnóstico</span>
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.02] md:text-6xl text-balance">
              Si tu empresa funciona, <span className="text-gradient-gold italic">pero no crece</span> como debería.
            </h2>
            <p className="mt-8 text-foreground/70 leading-relaxed">Tu empresa tiene valor real, pero algo está bloqueando su crecimiento. Estos son los síntomas más habituales:</p>
            <div className="mt-10 rounded-3xl bg-gradient-navy p-8 text-cream md:p-10 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-2xl" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold">El problema real</div>
                <p className="mt-4 text-2xl font-semibold leading-snug md:text-3xl">
                  No es vender más.<br />Es <span className="text-gradient-gold italic">posicionarte mejor</span>.
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7">
            <ul className="space-y-3">
              {items.map((it, i) => (
                <Reveal key={i} delay={i * 90}>
                  <li
                    className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 overflow-hidden rounded-2xl border border-border bg-card px-6 py-6 transition-all hover:border-accent hover:bg-primary hover:text-cream hover:translate-x-2"
                  >
                    <span className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-gold/20 to-transparent transition-all duration-500 group-hover:w-full" />
                    <span className="relative font-mono text-4xl font-light text-accent/60 group-hover:text-gold">
                      0{i + 1}
                    </span>
                    <span className="relative text-foreground/90 group-hover:text-cream/95 md:text-lg">{it}</span>
                    <X className="relative h-5 w-5 text-destructive/70 transition-all group-hover:text-gold group-hover:rotate-90" />
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 noise-overlay opacity-40" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-12 md:py-32">
        <div className="md:col-span-6">
          <div className="gold-divider" />
          <h2 className="mt-6 text-4xl font-semibold leading-[1.02] md:text-6xl text-balance">
            No necesitas más publicaciones.<br />
            <span className="text-gradient-gold italic">Necesitas un sistema.</span>
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-destructive/80">
                <X className="h-4 w-4" /> La mayoría hace
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground/70">
                {["Publicaciones sueltas", "Campañas aisladas", "Diseños sin foco", "Anuncios sin método", "Contenido sin dirección"].map((i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="h-1 w-1 rounded-full bg-destructive/50" /> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-accent/40 bg-gradient-to-br from-gold/10 to-transparent p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent-foreground">
                <Sparkles className="h-4 w-4 text-gold" /> Nosotros diseñamos
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-foreground/90">
                {["Visibilidad real", "Autoridad de marca", "Captación constante", "Conversión medible", "Escalado controlado"].map((i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="md:col-span-6 relative">
          <div className="absolute inset-0 bg-gradient-gold rounded-[2rem] rotate-3 opacity-25 blur-2xl" />
          <div className="relative grid grid-cols-2 gap-4">
            {[
              { icon: Eye, t: "Visibilidad", n: "01", d: "Que te vean los que importan." },
              { icon: ShieldCheck, t: "Autoridad", n: "02", d: "Que confíen en ti." },
              { icon: Compass, t: "Estrategia", n: "03", d: "Que cada acción tenga sentido." },
              { icon: TrendingUp, t: "Crecimiento", n: "04", d: "Que crezca con control." },
            ].map((c, i) => (
              <div
                key={c.t}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-xl ${i % 2 ? "translate-y-10" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-gold transition-all group-hover:bg-gold group-hover:text-navy">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-xs text-accent/60">{c.n}</span>
                </div>
                <p className="mt-8 text-xl font-semibold text-primary">{c.t}</p>
                <p className="mt-2 text-sm text-foreground/65 leading-relaxed">{c.d}</p>
                <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-all group-hover:bg-gold/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Diagnóstico Estratégico", d: "Analizamos tu negocio, mercado, cliente ideal, presencia digital y puntos de fuga comercial.", icon: Target },
    { n: "02", t: "Posicionamiento y Autoridad", d: "Construimos una imagen clara, profesional y diferenciada para que tu empresa transmita confianza.", icon: ShieldCheck },
    { n: "03", t: "Sistema de Captación", d: "Creamos web, contenido, anuncios, SEO, redes y automatizaciones orientadas a captar oportunidades reales.", icon: Zap },
    { n: "04", t: "Optimización y Escalado", d: "Medimos, corregimos y potenciamos lo que funciona para crecer con control.", icon: LineChart },
  ];
  return (
    <section className="relative overflow-hidden">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gold/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <div className="gold-divider" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground/60">Método propio · 4 fases</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-6xl text-balance">
              Cómo convertimos tu empresa en un <span className="text-gradient-gold italic">activo rentable</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:text-right">
            <div className="inline-flex items-center gap-3 text-sm text-foreground/65">
              <span className="h-px w-8 bg-gold" />
              Un sistema, no acciones sueltas
            </div>
          </div>
        </div>
        <div className="mt-20 relative">
          {/* connector line desktop */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 140}>
                <div className="group relative">
                  {/* node */}
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-navy text-cream shadow-[0_20px_60px_-20px_oklch(0.235_0.137_269/0.5)] transition-all group-hover:scale-105 group-hover:rotate-3">
                      <span className="absolute inset-0 rounded-2xl border border-gold/40 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                      <span className="font-mono text-3xl font-light text-gold">{s.n}</span>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-card text-accent transition-transform group-hover:rotate-12">
                      <s.icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-primary">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{s.d}</p>
                  {i < steps.length - 1 && (
                    <ArrowRight className="absolute -right-6 top-9 hidden h-5 w-5 text-gold/60 lg:block animate-[floatY_2.4s_ease-in-out_infinite]" />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-4">
          <Link to="/diagnostico" className="group inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            Empezar ya <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <span className="text-xs text-foreground/50">Sin compromiso · Respuesta en 24h</span>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { slug: "branding-completo", t: "Branding Completo", d: "Identidad visual integral, narrativa y posicionamiento estratégico para construir una marca reconocible y diferencial." },
  { slug: "desarrollo-web", t: "Desarrollo Web y Optimización", d: "Sitios web modernos, rápidos y orientados a resultados. Diseñamos páginas funcionales que convierten visitas en oportunidades." },
  { slug: "seo", t: "SEO", d: "Optimizamos tu presencia en buscadores para aumentar tu visibilidad, atraer tráfico cualificado y generar nuevas oportunidades." },
  { slug: "grabacion-contenido", t: "Grabación de Contenido", d: "Edición profesional de vídeos y adaptación a formatos para redes sociales. Entrega optimizada para Instagram, TikTok y Reels." },
  { slug: "redes-sociales", t: "Gestión de Redes Sociales", d: "Estrategia clara, contenido de valor y estética coherente para conectar con tu audiencia y mejorar resultados." },
  { slug: "contenido", t: "Estrategias de Contenido", d: "Contenidos relevantes alineados con tus objetivos: blogs, textos corporativos, creatividades y materiales de valor." },
  { slug: "social-ads", t: "Social Ads", d: "Campañas publicitarias en redes enfocadas en conversiones, alcance y reconocimiento. Inversión eficiente y resultados medibles." },
  { slug: "email-marketing", t: "Email Marketing y Automatización", d: "Campañas y flujos automatizados para fortalecer la relación con tus clientes y aumentar la conversión." },
  { slug: "captacion", t: "Sistema de Captación", d: "Sistemas digitales que atraen, captan y convierten clientes potenciales de forma estratégica." },
];

function ServicesGrid() {
  return (
    <section className="relative border-y border-border/40 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <div className="gold-divider" />
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-foreground/60">{SERVICES.length} servicios · 1 sistema</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[1.02] md:text-6xl text-balance">
              Todo lo que necesitas para <span className="text-gradient-gold italic">impulsar tu negocio</span>
            </h2>
          </div>
          <Link to="/servicios" className="group inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-cream transition-colors">
            Ver todos los servicios <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </Link>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:auto-rows-[minmax(220px,auto)]">
          {SERVICES.map((s, i) => {
            // Bento layout: featured cards span more
            const span =
              i === 0 ? "lg:col-span-3" :
              i === 1 ? "lg:col-span-3" :
              i === 5 ? "lg:col-span-3" :
              i === 8 ? "lg:col-span-3" :
              "lg:col-span-2";
            return (
              <Magnetic key={s.slug} className={span} strength={8}>
                <Link
                  to={`/servicios/${s.slug}` as string}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[0_30px_80px_-30px_oklch(0.235_0.137_269/0.4)]"
                >
                  {/* Sweep gradient on hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {/* Arrow badge */}
                  <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <div className="font-mono text-xs text-accent/70">0{i + 1}</div>
                  <h3 className="mt-4 text-lg font-semibold text-primary pr-12 md:text-xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{s.d}</p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-accent opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                    Explorar servicio <ArrowRight className="h-3 w-3" />
                  </span>
                  {/* gradient corner */}
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition-all group-hover:bg-gold/25" />
                </Link>
              </Magnetic>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function Results() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy text-cream border-t border-cream/10">
      {/* Background fx */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full bg-gold/15 blur-[120px]" />
      <div className="absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-[100px]" />
      <div className="pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 select-none overflow-hidden">
        <div className="ghost-text whitespace-nowrap text-center text-[16vw] font-black leading-none tracking-tighter opacity-60">
          RESULTADOS
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Header */}
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-gold">
              <Flame className="h-3.5 w-3.5" /> Caso de éxito · 90 días
            </div>
            <h2 className="mt-6 text-4xl font-semibold leading-[0.98] md:text-6xl lg:text-7xl text-balance">
              Los números <span className="text-gradient-gold italic">hablan</span> por sí solos.
            </h2>
            <p className="mt-6 max-w-2xl text-cream/75 leading-relaxed md:text-lg">
              Transformamos la presencia digital de una empresa mediante una estrategia basada en contenido, posicionamiento y alcance orgánico. Estos son los resultados reales obtenidos en 90 días.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-cream/60">
              <span className="h-px w-10 bg-gold" />
              Crecimiento orgánico
            </div>
          </div>
        </div>

        {/* HERO METRIC + side metrics */}
        <div className="mt-16 grid gap-4 lg:grid-cols-12">
          {/* Big hero metric */}
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/15 via-cream/[0.02] to-transparent p-8 md:p-12 lg:col-span-7">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <div className="absolute top-6 right-6 inline-flex items-center gap-2 rounded-full bg-cream/10 px-3 py-1 text-[10px] uppercase tracking-widest text-cream/70">
              <Play className="h-3 w-3 text-gold" /> Visualizaciones
            </div>
            <div className="relative">
              <div className="flex items-end gap-3 font-semibold tracking-tighter text-cream">
                <Counter to={5.6} decimals={1} className="text-7xl md:text-9xl leading-none" />
                <span className="mb-3 text-3xl md:text-5xl text-gold">M</span>
              </div>
              <p className="mt-5 max-w-md text-cream/70">Reproducciones generadas en los últimos 90 días</p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-navy/40 px-4 py-2 text-sm">
                <TrendingUp className="h-4 w-4 text-gold" />
                <Counter to={287} prefix="+" suffix="%" className="font-semibold text-gold" />
                <span className="text-cream/60">vs. periodo anterior</span>
              </div>
            </div>
          </div>

          {/* Two stacked side metrics */}
          <div className="grid gap-4 lg:col-span-5">
            <div className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-cream/[0.03] backdrop-blur-sm p-8 transition-all hover:border-gold/40">
              <div className="flex items-start justify-between">
                <Users className="h-6 w-6 text-gold" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">Alcance</span>
              </div>
              <div className="mt-6 flex items-end gap-2 font-semibold tracking-tight text-cream">
                <Counter to={1.4} decimals={1} suffix="M" className="text-5xl md:text-6xl" />
              </div>
              <p className="mt-2 text-sm text-cream/65">Usuarios únicos alcanzados</p>
            </div>
            <div className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-cream/[0.03] backdrop-blur-sm p-8 transition-all hover:border-gold/40">
              <div className="flex items-start justify-between">
                <Heart className="h-6 w-6 text-gold" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">Interacciones</span>
              </div>
              <div className="mt-6 flex items-end gap-2 font-semibold tracking-tight text-cream">
                <Counter to={157} suffix="K" className="text-5xl md:text-6xl" />
              </div>
              <p className="mt-2 text-sm text-cream/65">Comentarios, compartidos y reacciones</p>
            </div>
          </div>
        </div>

        {/* Growth row */}
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="group relative overflow-hidden rounded-3xl border border-cream/10 bg-cream/[0.03] backdrop-blur-sm p-7 transition-all hover:-translate-y-1 hover:border-gold/40">
            <UserPlus className="h-5 w-5 text-gold" />
            <div className="mt-5 text-4xl font-semibold tracking-tight text-cream"><Counter to={7301} prefix="+" /></div>
            <p className="mt-1 text-xs uppercase tracking-widest text-cream/55">Nuevos seguidores</p>
          </div>
          {[
            { v: 287, l: "Crecimiento visualizaciones" },
            { v: 280, l: "Incremento interacción" },
            { v: 97, l: "Crecimiento de comunidad" },
          ].map((g) => (
            <div key={g.l} className="group relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/10 to-transparent p-7 transition-all hover:-translate-y-1 hover:border-gold/60">
              <TrendingUp className="h-5 w-5 text-gold" />
              <div className="mt-5 text-4xl font-semibold tracking-tight text-gold"><Counter to={g.v} prefix="+" suffix="%" /></div>
              <p className="mt-1 text-xs uppercase tracking-widest text-cream/55">{g.l}</p>
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl transition-all group-hover:bg-gold/25" />
            </div>
          ))}
        </div>

        {/* Instagram case block */}
        <div className="mt-20 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.3em] text-cream/70">
              <Instagram className="h-3.5 w-3.5 text-gold" /> Caso · Instagram
            </div>
            <h3 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl">
              Crecimiento de alcance y <span className="text-gradient-gold italic">descubrimiento de clientes nuevos</span>.
            </h3>
            <p className="mt-5 text-cream/70 leading-relaxed">
              El contenido no sólo impactó a la comunidad existente, también llegó a miles de potenciales clientes nuevos.
            </p>
          </div>
          <div className="md:col-span-7 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-6">
              <div className="text-[10px] uppercase tracking-widest text-cream/50">Reproducciones</div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-cream"><Counter to={285905} /></div>
            </div>
            <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-6">
              <div className="text-[10px] uppercase tracking-widest text-cream/50">Cuentas alcanzadas</div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-cream"><Counter to={101670} /></div>
            </div>
            <div className="rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent p-6">
              <div className="text-[10px] uppercase tracking-widest text-gold">Crecimiento</div>
              <div className="mt-3 text-4xl font-semibold tracking-tight text-gold"><Counter to={1373} prefix="+" suffix="%" /></div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-cream/50">vs. periodo anterior</div>
            </div>
            <div className="sm:col-span-3 relative overflow-hidden rounded-2xl border border-cream/10 bg-gradient-to-r from-navy/40 via-cream/[0.04] to-navy/40 p-7">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gold">Audiencia nueva</div>
                  <div className="mt-2 text-5xl font-semibold tracking-tight text-cream"><Counter to={64.4} decimals={1} suffix="%" /></div>
                  <p className="mt-2 max-w-md text-sm text-cream/65">de las visualizaciones provinieron de personas que <strong className="text-cream">no seguían</strong> la cuenta.</p>
                </div>
                {/* Progress visual */}
                <div className="md:w-64">
                  <div className="h-3 w-full overflow-hidden rounded-full bg-cream/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-gold to-cream transition-[width] duration-[1800ms] ease-out" style={{ width: "64.4%" }} />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] uppercase tracking-widest text-cream/50">
                    <span>Seguidores</span>
                    <span>No seguidores</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy + closing */}
        <div className="mt-20 grid gap-10 rounded-[2rem] border border-cream/10 bg-cream/[0.03] backdrop-blur-sm p-8 md:p-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="gold-divider" />
            <h3 className="mt-6 text-3xl font-semibold leading-tight md:text-4xl">
              No prometemos <span className="italic text-gradient-gold">viralidad</span>.
            </h3>
            <p className="mt-5 text-cream/75 leading-relaxed">
              Diseñamos estrategias para que las empresas ganen visibilidad, generen autoridad y atraigan nuevas oportunidades de negocio.
            </p>
            <Link to="/contacto" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-navy hover:bg-cream transition-colors">
              Cuéntanos tu proyecto <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Estrategia aplicada</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Reels de alto alcance",
                "Posicionamiento de marca",
                "Contenido estratégico",
                "Optimización de perfiles",
                "Crecimiento orgánico",
                "Conversión en oportunidades",
              ].map((s, i) => (
                <div key={s} className="group flex items-center gap-4 rounded-2xl border border-cream/10 bg-navy/30 px-5 py-4 transition-all hover:border-gold/50 hover:bg-navy/50">
                  <span className="font-mono text-xs text-gold/70">0{i + 1}</span>
                  <span className="text-sm text-cream/85">{s}</span>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-cream/30 transition-all group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final tagline */}
        <div className="mt-20 text-center">
          <p className="mx-auto max-w-4xl text-2xl font-semibold leading-snug md:text-4xl text-balance">
            Convertimos contenido en <span className="text-gradient-gold italic">visibilidad</span>. Visibilidad en <span className="text-gradient-gold italic">autoridad</span>. Y autoridad en <span className="text-gradient-gold italic">oportunidades de negocio</span>.
          </p>
        </div>
      </div>
    </section>
  );
}


function FinalCTA() {
  const words = ["genérico", "improvisado", "aburrido", "de plantilla"];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative overflow-hidden bg-gradient-navy text-cream">
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-gold/20 blur-3xl animate-[pulse_7s_ease-in-out_infinite]" />
      <div className="absolute -left-20 -bottom-20 h-[500px] w-[500px] rounded-full bg-accent/15 blur-3xl animate-[pulse_9s_ease-in-out_infinite]" />
      {/* subtle scanning line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-[floatY_6s_ease-in-out_infinite]" />
      <div className="relative mx-auto max-w-6xl px-6 py-28 text-center md:py-40">
        <img src={logo} alt="" className="mx-auto h-20 w-20 object-contain drop-shadow-[0_10px_40px_oklch(0.745_0.135_82/0.4)] animate-[floatY_5s_ease-in-out_infinite]" />
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/[0.04] px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" /> Plazas limitadas este mes
        </div>
        <h2 className="mt-8 text-5xl font-semibold leading-[0.98] md:text-7xl lg:text-8xl text-balance">
          No hacemos marketing{" "}
          <span className="relative inline-block">
            <span key={idx} className="italic text-gradient-gold inline-block animate-[wordSwap_0.7s_cubic-bezier(0.22,1,0.36,1)]">
              {words[idx]}
            </span>
          </span>
          .
        </h2>
        <p className="mx-auto mt-10 max-w-2xl text-lg text-cream/75 md:text-xl">
          Diseñamos sistemas digitales para empresas que quieren crecer con estrategia, estructura y resultados medibles.
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Link to="/diagnostico" className="group inline-flex items-center gap-3 rounded-full bg-gold px-9 py-5 text-sm font-semibold text-navy hover:bg-cream transition-colors">
            Solicitar diagnóstico estratégico <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/contacto" className="inline-flex items-center gap-3 rounded-full border border-cream/25 px-9 py-5 text-sm font-semibold text-cream hover:border-gold hover:text-gold transition-colors">
            Hablar con el equipo
          </Link>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.25em] text-cream/50">
          <span>Sin compromiso</span>
          <span className="text-gold">·</span>
          <span>Respuesta en 24h</span>
          <span className="text-gold">·</span>
          <span>Plan estratégico gratuito</span>
        </div>
      </div>
    </section>
  );
}
