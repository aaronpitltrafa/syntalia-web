import { Clapperboard, CodeXml, Compass, PenLine, type LucideIcon } from "lucide-react";

/**
 * Las cuatro disciplinas del bloque "Quiénes somos" de la home. Se editan
 * aquí sin tocar el componente. Sin nombres, fotos ni cifras: el bloque
 * habla de lo que hacemos, no de quién lo hace.
 */
export type Disciplina = {
  titulo: string;
  texto: string;
  /** Icono de trazo de lucide-react. */
  icono: LucideIcon;
};

export const DISCIPLINAS: readonly Disciplina[] = [
  {
    titulo: "Estrategia",
    texto: "Diagnóstico, posicionamiento y hoja de ruta antes de ejecutar nada.",
    icono: Compass,
  },
  {
    titulo: "Tecnología",
    texto: "Webs, aplicaciones, CRM y automatizaciones hechas a medida.",
    icono: CodeXml,
  },
  {
    titulo: "Contenido",
    texto: "Mensaje, copy y publicación constante en los canales que importan.",
    icono: PenLine,
  },
  {
    titulo: "Audiovisual",
    texto: "Producción y edición propia: rodamos, montamos y publicamos.",
    icono: Clapperboard,
  },
];
