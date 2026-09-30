import { useEffect, useSyncExternalStore } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useActiveSection } from "@/lib/home-sections";

/** Páginas que ya tienen formulario propio: allí la barra fija estorba y no se monta. */
export const SIN_BARRA_CTA = ["/diagnostico", "/contacto"];

/*
 * ¿Se ve el hero? Un único IntersectionObserver sobre #hero con threshold 0:
 * mientras asome aunque sea un píxel, cuenta como visible. No depende de la
 * altura de la pantalla ni de franjas (la barra del navegador del móvil
 * cambia el alto del viewport al deslizar y movía la franja del observador
 * de secciones). Lo comparten la barra y el botón de WhatsApp: se crea con
 * el primero que lo necesita y se quita con el último.
 */
let heroVisible = true;
const oyentes = new Set<() => void>();
let observador: IntersectionObserver | null = null;
let usuarios = 0;

function fijarHero(v: boolean) {
  if (v === heroVisible) return;
  heroVisible = v;
  oyentes.forEach((o) => o());
}

function suscribir(o: () => void) {
  oyentes.add(o);
  return () => oyentes.delete(o);
}

function useHeroVisible(enLaHome: boolean) {
  useEffect(() => {
    if (!enLaHome) return;
    usuarios++;
    if (!observador) {
      const hero = document.getElementById("hero");
      if (hero) {
        observador = new IntersectionObserver((e) => fijarHero(e[0].isIntersecting), {
          threshold: 0,
        });
        observador.observe(hero);
      }
    }
    return () => {
      usuarios--;
      if (usuarios === 0) {
        observador?.disconnect();
        observador = null;
        fijarHero(true);
      }
    };
  }, [enLaHome]);
  // En el servidor y hasta que el observador responde, el hero cuenta como
  // visible: la barra empieza escondida y no aparece para irse.
  return useSyncExternalStore(
    suscribir,
    () => heroVisible,
    () => true,
  );
}

/**
 * Si la barra fija de CTA está a la vista (solo existe por debajo de md).
 * En la home se esconde mientras se ve cualquier trozo del hero, que ya
 * tiene sus botones, y en el cierre, que lleva su propio formulario. La
 * usan la barra y el botón flotante de WhatsApp, que sube para no taparla.
 */
export function useBarraCtaVisible() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const enLaHome = pathname === "/";
  const hero = useHeroVisible(enLaHome);
  const active = useActiveSection();
  if (SIN_BARRA_CTA.includes(pathname)) return false;
  return !(enLaHome && (hero || active === "contacto"));
}
