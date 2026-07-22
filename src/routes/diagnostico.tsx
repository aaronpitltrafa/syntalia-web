import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, Search, Target } from "lucide-react";
import { DiagnosticoForm } from "@/components/diagnostico-form";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { name: "description", content: "Evaluamos tu situación digital actual y te mostramos qué le está frenando a tu empresa para crecer. Sin compromiso." },
      { property: "og:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { property: "og:description", content: "Analizamos tu posicionamiento, presencia digital, captación y sistema comercial. Sin compromiso." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/diagnostico" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Diagnóstico estratégico gratuito — Syntalia Vértice" },
      { name: "twitter:description", content: "Análisis estratégico gratuito de tu presencia digital." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/diagnostico" }],
  }),
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
  return (
    <section className="relative bg-background">
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-start lg:gap-16">
        {/* Left — pitch */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="w-16 overflow-hidden aspect-[761/220]">
            <img src={logo} alt="" className="h-auto w-full" />
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary/70">Diagnóstico estratégico gratuito</span>
          </div>

          <h1 className="mt-6 font-raleway text-3xl leading-[1.15] font-extrabold tracking-tight text-primary md:text-5xl">
            Descubre qué está frenando el crecimiento de tu empresa.
          </h1>

          <p className="mt-6 text-primary/75 leading-relaxed md:text-lg">
            Analizaremos tu posicionamiento, tu presencia digital, tu captación de clientes y tu sistema comercial para identificar qué le falta a tu empresa para crecer de forma más sólida.
          </p>

          <ul className="mt-8 space-y-4">
            {BENEFITS.map((b) => (
              <li key={b.label} className="flex items-center gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15">
                  <b.icon className="h-4 w-4 text-gold-deep" aria-hidden />
                </span>
                <span className="text-sm font-medium text-primary md:text-base">{b.label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-navy/15 bg-navy/5 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">¿Para quién es?</p>
            <ul className="mt-4 space-y-3">
              {PARA_QUIEN.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-primary/75">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">Cómo funciona</p>
            <ol className="mt-5 space-y-5">
              {PASOS.map((paso, i) => (
                <li key={paso} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-cream">
                    {i + 1}
                  </span>
                  <p className="pt-1.5 text-sm font-medium text-primary/80 md:text-base">{paso}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right — form */}
        <div className="rounded-[2rem] border border-navy/10 bg-white p-7 shadow-[0_40px_100px_-40px_rgba(2,21,87,0.3)] md:p-10">
          <h2 className="text-xl font-bold text-primary md:text-2xl">Solicita tu diagnóstico gratuito</h2>
          <p className="mt-2 text-sm text-primary/60">Cuéntanos sobre tu empresa y te contactamos en menos de 24h.</p>
          <div className="mt-8">
            <DiagnosticoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
