import { Fragment, type CSSProperties } from "react";

/**
 * Subrayado dorado de los titulares (.mark-v3 en styles.css): una raya por
 * debajo de cada palabra que se dibuja al cargar. El texto no cambia de
 * color, así que vale igual sobre la home oscura que sobre las páginas crema.
 *
 * Cada palabra lleva su propia raya (inline-block no se parte entre
 * líneas), así la frase puede cortarse donde haga falta. Las rayas se
 * encadenan: 1 s en total, repartido según el largo de cada palabra, de
 * modo que se sigue dibujando de izquierda a derecha.
 */
const INICIO = 0.35;
const TOTAL = 1;

export function Subrayado({ children }: { children: string }) {
  const palabras = children.trim().split(/\s+/);
  const letras = palabras.reduce((n, p) => n + p.length, 0);
  let t = INICIO;

  return (
    <>
      {palabras.map((p, i) => {
        const dur = (TOTAL * p.length) / letras;
        const style = {
          "--sub-delay": `${t.toFixed(3)}s`,
          "--sub-dur": `${dur.toFixed(3)}s`,
          // una sola palabra conserva la frenada; en cadena, ritmo constante
          "--sub-ease": palabras.length > 1 ? "linear" : "cubic-bezier(0.2, 0.8, 0.2, 1)",
        } as CSSProperties;
        t += dur;
        return (
          <Fragment key={i}>
            {i > 0 && " "}
            <span className="mark-v3" style={style}>
              {p}
            </span>
          </Fragment>
        );
      })}
    </>
  );
}
