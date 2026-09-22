import { MessageCircle } from "lucide-react";
import { GoldButton } from "@/components/gold-button";

const WHATSAPP = "https://wa.me/34672167758";

/**
 * Barra fija de conversión, solo por debajo de md. No se monta en
 * /diagnostico ni en /contacto: esas páginas ya tienen su formulario
 * y la barra taparía parte de él.
 */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5">
        <GoldButton to="/diagnostico" size="compact" className="flex-1 justify-between">
          Solicitar diagnóstico
        </GoldButton>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Escribir por WhatsApp"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
