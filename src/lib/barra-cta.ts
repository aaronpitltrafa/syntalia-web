import { useRouterState } from "@tanstack/react-router";
import { useActiveSection } from "@/lib/home-sections";

/** Páginas que ya tienen formulario propio: allí la barra fija estorba y no se monta. */
export const SIN_BARRA_CTA = ["/diagnostico", "/contacto"];

/**
 * Si la barra fija de CTA está a la vista (solo existe por debajo de md).
 * En la home se esconde mientras se ve el hero, que ya tiene sus botones, y
 * en el cierre, que lleva su propio formulario. La usan la barra y el botón
 * flotante de WhatsApp, que sube para no taparla.
 */
export function useBarraCtaVisible() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = useActiveSection();
  if (SIN_BARRA_CTA.includes(pathname)) return false;
  return !(pathname === "/" && (active === null || active === "hero" || active === "contacto"));
}
