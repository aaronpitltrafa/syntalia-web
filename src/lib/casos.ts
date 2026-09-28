import logoFrulonsa from "@/assets/logos-clientes/frulonsa.png";

/**
 * Casos de éxito, como datos. La home (bloque 04) y la página de cada
 * caso leen de aquí, para que no se desincronicen.
 *
 * Lo que aún no existe va en null o vacío, y cada sección solo se pinta
 * si tiene contenido: aquí no se escribe nada que no sea verdad.
 */

/** Cifra fija, sin contador. La unidad se pinta más pequeña, por eso va aparte. */
export type MetricaCaso = {
  cifra: string;
  unidad: string;
  label: string;
  /** La que se pinta más grande. */
  destacada: boolean;
};

/** Una línea de trabajo del caso. `detalle`, solo cuando haya texto real. */
export type LineaTrabajo = {
  nombre: string;
  detalle: string | null;
};

export type PiezaCaso =
  | { tipo: "imagen"; src: string; alt: string }
  | { tipo: "video"; src: string; poster?: string; titulo: string };

export type TestimonioCaso = {
  cita: string;
  nombre: string;
  cargo: string;
};

export type Caso = {
  slug: string;
  nombre: string;
  /** Sector en una línea; vacío no se pinta. */
  sector: string;
  periodo: string;
  /** PNG blanco sobre transparente (el de la marquesina). */
  logo: string;
  /** Párrafo de contexto, el mismo en la home y en la página del caso. */
  contexto: string;
  metricas: readonly MetricaCaso[];
  /** Lo que va después de "Qué mide esto:". */
  queMide: string;
  fuente: string;
  puntoDePartida: string | null;
  trabajo: readonly LineaTrabajo[];
  piezas: readonly PiezaCaso[];
  testimonio: TestimonioCaso | null;
};

export const CASO_FRULONSA: Caso = {
  slug: "frulonsa",
  nombre: "Frulonsa",
  sector: "",
  periodo: "90 días",
  logo: logoFrulonsa,
  contexto:
    "90 días trabajando la estrategia, la planificación y la producción de contenido de Frulonsa.",
  metricas: [
    { cifra: "5,6", unidad: "M", label: "Reproducciones", destacada: true },
    { cifra: "1,4", unidad: "M", label: "Usuarios únicos", destacada: false },
    { cifra: "157", unidad: "K", label: "Interacciones", destacada: false },
    { cifra: "+7.301", unidad: "", label: "Nuevos seguidores", destacada: false },
  ],
  queMide:
    "el alcance del contenido en sus canales durante los 90 días. Es la primera mitad del trabajo: que la marca deje de ser invisible para su mercado.",
  fuente: "Datos de las analíticas de los canales de Frulonsa durante 90 días.",
  puntoDePartida: null,
  trabajo: [
    { nombre: "Estrategia", detalle: null },
    { nombre: "Planificación", detalle: null },
    { nombre: "Producción de contenido", detalle: null },
  ],
  piezas: [],
  testimonio: null,
};
