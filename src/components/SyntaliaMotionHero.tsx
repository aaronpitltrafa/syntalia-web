import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroReunionBackground } from "@/components/HeroReunionBackground";

const ACCENT = "#d4af37";

export default function SyntaliaMotionHero() {
  return (
    <div className="bg-navy">
      <section className="relative isolate min-h-[100svh] w-full overflow-hidden rounded-b-[32px] text-white font-sans sm:rounded-b-[40px] lg:rounded-b-[48px]">
        <HeroReunionBackground />

      <div className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center gap-10 px-6 pb-10 pt-24 text-center sm:px-8 sm:pt-28 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
            <Sparkles className="h-5 w-5" style={{ color: ACCENT }} />
            Consultora estratégica de marketing digital
          </div>

          <h1 className="mx-auto max-w-4xl font-poppins text-4xl uppercase leading-[1.12] tracking-normal sm:text-6xl lg:text-7xl">
            Convertimos tu presencia digital en{" "}
            <span className="italic" style={{ color: ACCENT }}>
              oportunidades comerciales reales
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/78 sm:text-xl">
            Ayudamos a empresas y negocios que ya venden, a posicionarse mejor y generar
            contactos cualificados con una estrategia digital clara.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/diagnostico"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold uppercase tracking-[0.12em] text-[#021557] transition hover:scale-[1.02] sm:px-9 sm:py-5"
              style={{ backgroundColor: ACCENT }}
            >
              Solicitar diagnóstico gratuito
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/servicios"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md transition hover:bg-white/15 sm:px-9 sm:py-5"
            >
              Ver cómo trabajamos
            </Link>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
