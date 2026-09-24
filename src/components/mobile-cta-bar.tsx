import { useRouterState } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { GoldCta } from "@/components/gold-cta";
import { useActiveSection } from "@/lib/home-sections";
import { cn } from "@/lib/utils";

const WHATSAPP = "https://wa.me/34672167758";

/**
 * Barra fija de conversión, solo por debajo de md. No se monta en
 * /diagnostico ni en /contacto: esas páginas ya tienen su formulario
 * y la barra taparía parte de él.
 *
 * En la home no sale mientras se ve el hero: el hero ya tiene su botón y
 * la barra se pondría encima de la banda de cifras. Aparece en cuanto
 * empieza el bloque siguiente. El hueco del final de página lo reserva
 * el footer (padding inferior en móvil).
 */
export function MobileCtaBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = useActiveSection();
  const oculta = pathname === "/" && (active === null || active === "hero");

  return (
    <div
      aria-hidden={oculta || undefined}
      inert={oculta}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-cream/13 bg-[rgb(6_16_50/0.85)] pb-[env(safe-area-inset-bottom)] backdrop-blur-[16px] transition-transform duration-300 motion-reduce:transition-none md:hidden",
        oculta ? "translate-y-full" : "translate-y-0",
      )}
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5">
        <GoldCta to="/diagnostico" className="h-12 flex-1 justify-between py-0">
          Solicitar diagnóstico
        </GoldCta>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="grid h-12 w-12 shrink-0 place-content-center rounded-full border border-cream/13 bg-cream/7 text-cream transition-colors hover:border-gold/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
