import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, Search, Target } from "lucide-react";
import { DiagnosticoForm, DiagnosticoWhatsApp } from "@/components/diagnostico-form";
import logo from "@/assets/logo.png";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { name: "description", content: "Evaluamos tu situación digital actual y te mostramos qué le está frenando a tu empresa para crecer. Sin compromiso." },
      { property: "og:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { property: "og:description", content: "Analizamos tu posicionamiento, presencia digital, captación y sistema comercial. Sin compromiso." },
      { property: "og:url", content: `${SITE_URL}/diagnostico` },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { name: "twitter:description", content: "Análisis estratégico gratuito de tu presencia digital." },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/diagnostico` }],
  }),
  // ?envio=ok|error: vuelta del formulario cuando se envía sin JavaScript
  // (ver DiagnosticoForm y sendLead).
  validateSearch: (s: Record<string, unknown>): { envio?: "ok" | "error" } =>
    s.envio === "ok" || s.envio === "error" ? { envio: s.envio } : {},
  component: Diagnostico,
});

const BENEFITS = [
  { icon: Search, label: "Análisis personalizado" },
  { icon: Target, label: "Oportunidades y problemas detectados" },
  { icon: ClipboardList, label: "Recomendaciones y prioridades claras" },
];

const PARA_QUIEN = [
  "Empresas con actividad real.",
  "Empresas que quieren crecer con más estructura.",
  "Empresas que buscan estrategia, claridad y resultados.",
];

const PASOS = [
  "Analizamos tu situación.",
  "Detectamos qué te frena.",
  "Preparamos el diagnóstico.",
  "Decides el siguiente paso.",
];

function Diagnostico() {
  const { envio } = Route.useSearch();
  return (
    <section className="relative bg-background">
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* Left — pitch */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="w-16 overflow-hidden aspect-[761/220]">
            <img src={logo} alt="" className="h-auto w-full" />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-navy/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" aria-hidden />
            {/* Por debajo de 414 px se reserva el alto de dos líneas: con la
                fuente de respaldo la etiqueta mide 316 px y parte en dos hasta
                413 px, y con Poppins (274 px) cabe en una desde 372, así que
                al llegar la fuente movía todo lo de debajo. */}
            <span className="label-mono max-[414px]:flex max-[414px]:min-h-[2.6em] max-[414px]:items-center">
              Diagnóstico estratégico gratuito
            </span>
          </div>

          <h1 className="mt-6 font-raleway text-[clamp(26px,7.6vw,30px)] leading-[1.15] font-bold tracking-tight text-foreground md:text-5xl">
            Descubre qué está frenando el crecimiento de tu empresa.
          </h1>

          <p className="mt-6 text-foreground/75 leading-relaxed md:text-lg">
            Analizaremos tu posicionamiento, tu presencia digital, tu captación de clientes y tu sistema comercial para identificar qué le falta a tu empresa para crecer de forma más sólida.
          </p>

          <ul className="mt-8 space-y-4">
            {BENEFITS.map((b) => (
              <li key={b.label} className="flex items-center gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <b.icon className="h-4 w-4 text-gold-text" aria-hidden />
                </span>
                <span className="text-sm font-medium text-foreground md:text-base">{b.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-foreground/15 bg-navy/5 p-6">
            <p className="label-mono">¿Para quién es?</p>
            <ul className="mt-4 space-y-3">
              {PARA_QUIEN.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-text" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <p className="label-mono">Cómo funciona</p>
            <ol className="mt-5 space-y-5">
              {PASOS.map((paso, i) => (
                <li key={paso} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-cream">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-sm font-medium text-foreground/80 md:text-base">{paso}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right — form + WhatsApp. Entre md y lg va a una columna: el
            formulario no pasa de 680 px para que los campos no se estiren. */}
        <div className="grid w-full max-w-[680px] gap-6 lg:max-w-none">
          <div id="formulario" className="ancla surface-card rounded-[2rem] p-6 sm:p-8 md:p-10">
            {/* En una línea mide 279 px con Raleway y 277 con la de respaldo
                (20 px): cabe desde 400 px de ventana. Por debajo va cortado a
                mano en dos, para tener las mismas líneas con las dos. */}
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Solicita tu diagnóstico <br className="min-[400px]:hidden" />
              gratuito
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/65">
              Cuéntanos brevemente qué necesitas y nuestro equipo contactará contigo.
            </p>
            <div className="mt-8">
              <DiagnosticoForm envioInicial={envio} />
            </div>
          </div>
          <DiagnosticoWhatsApp />
        </div>
      </div>
    </section>
  );
}
