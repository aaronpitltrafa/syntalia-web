import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/contact-form";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Solicita tu diagnóstico gratuito — Syntalia Vértice" },
      { name: "description", content: "Evaluamos tu situación digital actual y te mostramos un plan estratégico adaptado a tu empresa." },
      { property: "og:title", content: "Diagnóstico gratuito — Syntalia Vértice" },
      { property: "og:description", content: "Analizamos tu presencia digital y te entregamos un plan estratégico personalizado. Sin compromiso." },
      { property: "og:url", content: "https://syntalia.verticeagency.es/diagnostico" },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Diagnóstico gratuito — Syntalia Vértice" },
      { name: "twitter:description", content: "Análisis estratégico gratuito de tu presencia digital." },
    ],
    links: [{ rel: "canonical", href: "https://syntalia.verticeagency.es/diagnostico" }],
  }),
  component: Diagnostico,
});

function Diagnostico() {
  return (
    <section className="relative overflow-hidden bg-gradient-navy text-cream min-h-screen">
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] [background-size:32px_32px]" />
      <div className="absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-gold">Diagnóstico</p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] md:text-6xl text-balance">
            Solicita tu <span className="italic text-gradient-gold">diagnóstico gratuito</span>
          </h1>
          <p className="mt-8 text-lg text-cream/75 leading-relaxed">
            ¿Quieres saber cómo mejorar tu presencia digital y convertirla en oportunidades comerciales reales?
          </p>
          <p className="mt-4 text-cream/70 leading-relaxed">
            Evaluamos tu situación actual, detectamos áreas de mejora y te mostramos un plan estratégico adaptado a tu empresa.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              "Análisis de tu presencia digital actual",
              "Detección de oportunidades de crecimiento",
              "Plan estratégico personalizado",
              "Sin compromiso, totalmente gratuito",
            ].map((i) => (
              <li key={i} className="flex items-center gap-3 text-cream/85">
                <CheckCircle2 className="h-5 w-5 text-gold" /> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-cream p-8 text-foreground md:p-10">
          <h2 className="text-2xl font-semibold text-primary">Cuéntanos sobre tu proyecto</h2>
          <p className="mt-2 text-foreground/70 text-sm">Te contactaremos lo antes posible.</p>
          <div className="mt-8">
            <ContactForm compact />
          </div>
        </div>
      </div>
    </section>
  );
}