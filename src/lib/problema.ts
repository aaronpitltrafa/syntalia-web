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
   * Escena de escritorio. En "ahora", centro, profundidad y giro de la
   * ficha desordenada; en "sistema", el centro de su columna en la fila,
   * en % del tablero: cinco columnas iguales del 20%.
   */
  desorden: { x: string; y: string; z: string; r: string };
  fila: string;
};

export const FICHAS_PROBLEMA: readonly FichaProblema[] = [
  {
    id: "web",
    titulo: "Web",
    estado: { ahora: "Visitas que no piden nada", sistema: "Capta y cualifica" },
    desorden: { x: "15%", y: "26%", z: "70px", r: "-7deg" },
    fila: "10%",
  },
  {
    id: "contenido",
    titulo: "Contenido",
    estado: { ahora: "Publicar por publicar", sistema: "Alimenta la demanda" },
    desorden: { x: "64%", y: "14%", z: "18px", r: "6deg" },
    fila: "30%",
  },
  {
    id: "campanas",
    titulo: "Campañas",
    estado: { ahora: "Gasto sin retorno claro", sistema: "Inversión medida" },
    desorden: { x: "33%", y: "74%", z: "96px", r: "5deg" },
    fila: "50%",
  },
  {
    id: "procesos",
    titulo: "Procesos",
    estado: { ahora: "Todo a mano", sistema: "Automatizado" },
    desorden: { x: "87%", y: "58%", z: "10px", r: "-6deg" },
    fila: "70%",
  },
  {
    id: "clientes",
    titulo: "Clientes",
    estado: { ahora: "Contactos que se enfrían", sistema: "Seguimiento real" },
    desorden: { x: "53%", y: "44%", z: "54px", r: "3deg" },
    fila: "90%",
  },
];

/** Cada cuánto alterna solo el conmutador, hasta que el visitante lo toca. */
export const INTERVALO_PROBLEMA_MS = 4500;
