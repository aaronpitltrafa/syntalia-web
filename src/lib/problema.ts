/**
 * Textos del bloque "El problema" de la home: el conmutador y las cinco
 * fichas de la escena, que es donde termina la sección. Cada etiqueta
 * tiene su versión "ahora" (piezas sueltas) y "sistema" (conectadas).
 */

export type ModoProblema = "ahora" | "sistema";

export const MODOS_PROBLEMA: readonly { id: ModoProblema; label: string }[] = [
  { id: "ahora", label: "Ahora" },
  { id: "sistema", label: "Con sistema" },
];

export type FichaProblemaId = "web" | "contenido" | "campanas" | "procesos" | "clientes";

export type FichaProblema = {
  id: FichaProblemaId;
  titulo: string;
  /** Etiqueta de estado en cada modo. */
  estado: Record<ModoProblema, string>;
  /**
   * Escena de escritorio. La base es la fila de "sistema": `columna` es su
   * sitio en la rejilla de cinco columnas iguales. `desorden` es el
   * transform de "ahora" desde esa columna: dx/dy en % del propio cuadrado
   * (escalan con la ficha), profundidad y giro.
   */
  columna: 1 | 2 | 3 | 4 | 5;
  desorden: { dx: string; dy: string; z: string; r: string };
};

export const FICHAS_PROBLEMA: readonly FichaProblema[] = [
  {
    id: "web",
    titulo: "Web",
    estado: { ahora: "Visitas que no piden nada", sistema: "Capta y cualifica" },
    columna: 1,
    desorden: { dx: "17%", dy: "-38%", z: "70px", r: "-7deg" },
  },
  {
    id: "contenido",
    titulo: "Contenido",
    estado: { ahora: "Publicar por publicar", sistema: "Alimenta la demanda" },
    columna: 2,
    desorden: { dx: "210%", dy: "29%", z: "18px", r: "6deg" },
  },
  {
    id: "campanas",
    titulo: "Campañas",
    estado: { ahora: "Gasto sin retorno claro", sistema: "Inversión medida" },
    columna: 3,
    desorden: { dx: "-95%", dy: "38%", z: "96px", r: "5deg" },
  },
  {
    id: "procesos",
    titulo: "Procesos",
    estado: { ahora: "Todo a mano", sistema: "Automatizado" },
    columna: 4,
    desorden: { dx: "95%", dy: "-26%", z: "10px", r: "-6deg" },
  },
  {
    id: "clientes",
    titulo: "Clientes",
    estado: { ahora: "Contactos que se enfrían", sistema: "Seguimiento real" },
    columna: 5,
    desorden: { dx: "-205%", dy: "-10%", z: "54px", r: "3deg" },
  },
];

/** Cada cuánto alterna solo el conmutador, hasta que el visitante lo toca. */
export const INTERVALO_PROBLEMA_MS = 4500;
