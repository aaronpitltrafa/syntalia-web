/**
 * Textos del bloque "El problema" de la home: el conmutador, las cinco
 * fichas de la escena y la línea de estado que va debajo. Cada texto
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
   * ficha desordenada; en "sistema", su columna en la fila (izquierda del
   * centro, en % del tablero).
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
    fila: "12%",
  },
  {
    id: "contenido",
    titulo: "Contenido",
    estado: { ahora: "Publicar por publicar", sistema: "Alimenta la demanda" },
    desorden: { x: "64%", y: "14%", z: "18px", r: "6deg" },
    fila: "31%",
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
    fila: "69%",
  },
  {
    id: "clientes",
    titulo: "Clientes",
    estado: { ahora: "Contactos que se enfrían", sistema: "Seguimiento real" },
    desorden: { x: "53%", y: "44%", z: "54px", r: "3deg" },
    fila: "88%",
  },
];

export const ESTADO_PROBLEMA: Record<ModoProblema, { etiqueta: string; texto: string }> = {
  ahora: {
    etiqueta: "Piezas sueltas · sin conexión",
    texto:
      "Cinco piezas trabajando por su cuenta: el resultado depende de la suerte y del boca a boca.",
  },
  sistema: {
    etiqueta: "Sistema conectado · flujo continuo",
    texto:
      "Cada pieza alimenta a la siguiente: la web capta, el contenido sostiene y el seguimiento cierra.",
  },
};

/** Cada cuánto alterna solo el conmutador, hasta que el visitante lo toca. */
export const INTERVALO_PROBLEMA_MS = 4500;
