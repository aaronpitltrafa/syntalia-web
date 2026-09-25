import { GoldCta } from "@/components/gold-cta";
import { useBarraCtaVisible } from "@/lib/barra-cta";
import { cn } from "@/lib/utils";

/**
 * Barra fija de conversión, solo por debajo de md. No se monta en
 * /diagnostico ni en /contacto (ver lib/barra-cta.ts), y en la home se
 * esconde sobre el hero y el cierre. WhatsApp ya no va aquí: lo lleva el
 * botón flotante, que se coloca justo encima de esta barra.
 */
export function MobileCtaBar() {
  const oculta = !useBarraCtaVisible();

  return (
    <div
      aria-hidden={oculta || undefined}
      inert={oculta}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-cream/13 bg-[rgb(6_16_50/0.85)] pb-[env(safe-area-inset-bottom)] backdrop-blur-[16px] transition-transform duration-300 motion-reduce:transition-none md:hidden",
        oculta ? "translate-y-full" : "translate-y-0",
      )}
    >
      <div className="px-4 py-2.5">
        <GoldCta to="/diagnostico" className="h-12 w-full justify-between py-0">
          Solicitar diagnóstico
        </GoldCta>
      </div>
    </div>
  );
}
