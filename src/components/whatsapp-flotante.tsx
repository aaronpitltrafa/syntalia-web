import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { useBarraCtaVisible } from "@/lib/barra-cta";
import { WHATSAPP_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * WhatsApp flotante, abajo a la derecha, en todas las páginas y tamaños.
 * Círculo crema con el logotipo en navy (15:1). En móvil, cuando la barra
 * fija de CTA está a la vista (69px de alto), se coloca 12px por encima de
 * ella; al esconderse la barra, baja con la misma transición.
 *
 * El foco lleva doble anillo (navy dentro, dorado fuera) para verse igual
 * sobre las páginas crema que sobre la home oscura.
 */
export function WhatsAppFlotante() {
  const barra = useBarraCtaVisible();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp (se abre en una pestaña nueva)"
      className={cn(
        "fixed right-[18px] z-[45] grid h-[54px] w-[54px] place-content-center rounded-full bg-cream text-navy",
        "shadow-[0_18px_36px_-16px_rgb(0_0_0/0.85)] transition-[translate,bottom] duration-300 hover:-translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        "focus-visible:shadow-[0_0_0_6px_var(--gold)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy",
        barra
          ? "bottom-[calc(81px+env(safe-area-inset-bottom,0px))] md:bottom-[calc(18px+env(safe-area-inset-bottom,0px))]"
          : "bottom-[calc(18px+env(safe-area-inset-bottom,0px))]",
      )}
    >
      <WhatsAppIcon className="h-[26px] w-[26px]" />
    </a>
  );
}
