import { useEffect, useSyncExternalStore } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useActiveSection } from "@/lib/home-sections";

/** Páginas que ya tienen formulario propio: allí la barra fija estorba y no se monta. */
export const SIN_BARRA_CTA = ["/diagnostico", "/contacto"];

/*
 * ¿Se ha pasado ya el arranque de la home? Dos condiciones a la vez:
 *   1. el bloque 01 (#problema) ha salido entero por arriba de la pantalla;
 *   2. y se ha bajado más de una pantalla completa (scrollY > innerHeight).
 * Es un umbral de scroll puro, sin observadores: se recalcula al hacer scroll
 * y al cambiar el tamaño de la ventana (una vez por fotograma como mucho).
 * Lo comparten la barra y el botón de WhatsApp: los oyentes se ponen con el
 * primero que lo necesita y se quitan con el último.
 */
let pasado = false;
const oyentes = new Set<() => void>();
let usuarios = 0;
let pendiente = 0;

function fijar(v: boolean) {
  if (v === pasado) return;
  pasado = v;
  oyentes.forEach((o) => o());
}

function medir() {
  pendiente = 0;
  const problema = document.getElementById("problema");
  const fuera = problema ? problema.getBoundingClientRect().bottom <= 0 : true;
  fijar(fuera && window.scrollY > window.innerHeight);
}

function alMover() {
  if (!pendiente) pendiente = requestAnimationFrame(medir);
}

function suscribir(o: () => void) {
  oyentes.add(o);
  return () => oyentes.delete(o);
}

function usePasadoElArranque(enLaHome: boolean) {
  useEffect(() => {
    if (!enLaHome) return;
    usuarios++;
    if (usuarios === 1) {
      window.addEventListener("scroll", alMover, { passive: true });
      window.addEventListener("resize", alMover, { passive: true });
      medir();
    }
    return () => {
      usuarios--;
      if (usuarios === 0) {
        window.removeEventListener("scroll", alMover);
        window.removeEventListener("resize", alMover);
        if (pendiente) cancelAnimationFrame(pendiente);
        pendiente = 0;
        fijar(false);
      }
    };
  }, [enLaHome]);
  // En el servidor y hasta la primera medida cuenta como no pasado: la barra
  // empieza escondida y no aparece para irse.
  return useSyncExternalStore(
    suscribir,
    () => pasado,
    () => false,
  );
}

/**
 * Si la barra fija de CTA está a la vista (solo existe por debajo de md).
 * En la home aparece cuando el bloque 01 ha salido por arriba y se ha bajado
 * más de una pantalla, y se esconde en el cierre, que lleva su propio
 * formulario. La usan la barra y el botón flotante de WhatsApp, que sube
 * para no taparla.
 */
export function useBarraCtaVisible() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const enLaHome = pathname === "/";
  const pasadoElArranque = usePasadoElArranque(enLaHome);
  const active = useActiveSection();
  if (SIN_BARRA_CTA.includes(pathname)) return false;
  return enLaHome ? pasadoElArranque && active !== "contacto" : true;
}
