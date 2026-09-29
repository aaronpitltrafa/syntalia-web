import { useEffect, useSyncExternalStore } from "react";

/**
 * Las secciones de la home, en orden. Es la lista que recorren el raíl
 * lateral y el observador; el menú del header solo enlaza por ancla a las
 * que están aquí. Al rehacer un bloque, se añade su id y ya aparece en todo.
 */
export const HOME_SECTIONS = [
  { id: "hero", label: "Inicio" },
  { id: "problema", label: "Problema" },
  { id: "sistema", label: "Sistema" },
  { id: "caso", label: "Resultados" },
  { id: "equipo", label: "Cómo trabajamos" },
  { id: "empezar", label: "Empezar" },
  { id: "faq", label: "FAQ" },
  { id: "contacto", label: "Contacto" },
] as const;

export type HomeSectionId = (typeof HOME_SECTIONS)[number]["id"];

/** El hero y el cierre no llevan número de bloque. */
const SIN_NUMERO: readonly HomeSectionId[] = ["hero", "contacto"];

/**
 * Número de bloque de la home ("01", "02"…), por su orden en HOME_SECTIONS.
 * Es la única fuente de los números: al quitar, añadir o mover un bloque,
 * los demás se renumeran solos.
 */
export function numeroDeSeccion(id: HomeSectionId): string {
  const numerados = HOME_SECTIONS.filter((s) => !SIN_NUMERO.includes(s.id));
  const i = numerados.findIndex((s) => s.id === id);
  return String(i + 1).padStart(2, "0");
}

const IDS: readonly string[] = HOME_SECTIONS.map((s) => s.id);

function isHomeSection(id: string): id is HomeSectionId {
  return IDS.includes(id);
}

/* Sección activa: un único valor compartido que escribe el observador de
   la home y leen el header y el raíl. Fuera de la home es null. */
let active: HomeSectionId | null = null;
const listeners = new Set<() => void>();

function setActive(id: HomeSectionId | null) {
  if (id === active) return;
  active = id;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useActiveSection() {
  return useSyncExternalStore(
    subscribe,
    () => active,
    () => null,
  );
}

/**
 * El único IntersectionObserver de la home. Una sección pasa a activa
 * cuando cruza la franja del 45-50% de la pantalla. Se monta una vez, en
 * la ruta "/".
 */
export function useHomeSectionObserver() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && isHomeSection(e.target.id)) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of IDS) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => {
      obs.disconnect();
      setActive(null);
    };
  }, []);
}
