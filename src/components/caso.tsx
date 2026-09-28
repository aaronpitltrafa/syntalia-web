import type { Caso, PiezaCaso, TestimonioCaso } from "@/lib/casos";
import { cn } from "@/lib/utils";

/**
 * Piezas de un caso de éxito compartidas por el bloque 04 de la home y la
 * página del caso. Estilos en styles.css (.caso-*).
 */

/**
 * Logo del cliente. El PNG es blanco sobre transparente (el de la
 * marquesina oscura): se usa como máscara y se pinta en navy, así que el
 * texto alternativo va en role="img" + aria-label, como haría alt.
 */
export function CasoLogo({ caso, id }: { caso: Caso; id?: string }) {
  return (
    <span
      id={id}
      role="img"
      aria-label={caso.nombre}
      className="caso-logo"
      style={{ WebkitMaskImage: `url(${caso.logo})`, maskImage: `url(${caso.logo})` }}
    />
  );
}

/** Cabecera de la tarjeta: logo, sector (si existe) y periodo. */
export function CasoMarca({ caso, id }: { caso: Caso; id?: string }) {
  return (
    <header className="caso-marca">
      <CasoLogo caso={caso} id={id} />
      {caso.sector && <p className="caso-sector">{caso.sector}</p>}
      <span className="caso-plazo">{caso.periodo}</span>
    </header>
  );
}

/** Las cifras (la destacada, más grande), "Qué mide esto" va aparte. */
export function CasoCifras({ caso }: { caso: Caso }) {
  return (
    <dl className="caso-cifras">
      {caso.metricas.map((m) => (
        <div key={m.label} className={cn("caso-cifra", m.destacada && "caso-cifra-destacada")}>
          <dt>{m.label}</dt>
          <dd>
            {m.cifra}
            {m.unidad && <span className="caso-unidad">{m.unidad}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CasoQueMide({ caso }: { caso: Caso }) {
  return (
    <div className="caso-mide">
      <p>
        <b>Qué mide esto:</b> {caso.queMide}
      </p>
    </div>
  );
}

export function CasoTestimonio({ testimonio }: { testimonio: TestimonioCaso }) {
  return (
    <figure className="caso-cita">
      <blockquote>
        <p>{testimonio.cita}</p>
      </blockquote>
      <figcaption>
        <b>{testimonio.nombre}</b>
        {testimonio.cargo}
      </figcaption>
    </figure>
  );
}

export function CasoPieza({ pieza }: { pieza: PiezaCaso }) {
  return pieza.tipo === "imagen" ? (
    <img className="caso-pieza" src={pieza.src} alt={pieza.alt} loading="lazy" />
  ) : (
    <video
      className="caso-pieza"
      src={pieza.src}
      poster={pieza.poster}
      title={pieza.titulo}
      controls
      playsInline
      preload="metadata"
    />
  );
}
