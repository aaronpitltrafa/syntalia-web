import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { CasoCifras, CasoMarca, CasoPieza, CasoQueMide, CasoTestimonio } from "@/components/caso";
import { GoldCta } from "@/components/gold-cta";
import { CASO_FRULONSA as caso } from "@/lib/casos";
import { SITE_URL } from "@/lib/site";

/** Título y descripción salen de los datos del caso, no de frases nuevas. */
const TITULO = `Caso ${caso.nombre}: ${caso.periodo} de contenido — Syntalia Vértice`;
const DESCRIPCION = `${caso.contexto} Resultados: ${caso.metricas
  .map((m) => `${m.cifra}${m.unidad ? " " + m.unidad : ""} ${m.label.toLowerCase()}`)
  .join(", ")}.`;
const URL_CASO = `${SITE_URL}/casos/${caso.slug}`;

export const Route = createFileRoute("/casos/frulonsa")({
  head: () => ({
    meta: [
      { title: TITULO },
      { name: "description", content: DESCRIPCION },
      { property: "og:title", content: TITULO },
      { property: "og:description", content: DESCRIPCION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL_CASO },
      { name: "twitter:title", content: TITULO },
      { name: "twitter:description", content: DESCRIPCION },
    ],
    links: [{ rel: "canonical", href: URL_CASO }],
  }),
  component: CasoFrulonsaPage,
});

/**
 * Página del caso. Cada sección se pinta solo si tiene contenido en
 * lib/casos.ts: hoy salen la cabecera, la ficha, "Qué hicimos",
 * "Resultados" y el cierre. Estilos en styles.css (.caso-*).
 */
function CasoFrulonsaPage() {
  return (
    <>
      <section className="seccion-clara">
        <div className="contenedor caso-pagina">
          <Link to="/" className="caso-volver">
            <ArrowLeft aria-hidden strokeWidth={2.2} className="h-4 w-4" />
            Volver a la home
          </Link>

          {/* a) Cabecera */}
          <p className="etiqueta mt-8">Caso de éxito</p>
          <h1 className="mt-5 max-w-[calc(20*var(--ch-raleway))] text-h2 text-balance">
            {caso.nombre} · {caso.periodo}
          </h1>
          <p className="mt-6 max-w-[40em] text-lead text-navy/72">{caso.contexto}</p>

          {/* b) Ficha del cliente */}
          <div className="caso-tarjeta caso-ficha">
            <CasoMarca caso={caso} />
          </div>

          {/* c) Punto de partida */}
          {caso.puntoDePartida && (
            <section className="caso-seccion" aria-labelledby="caso-partida">
              <h2 id="caso-partida" className="caso-seccion-titulo">
                El punto de partida
              </h2>
              <p className="caso-seccion-texto">{caso.puntoDePartida}</p>
            </section>
          )}

          {/* d) Qué hicimos */}
          {caso.trabajo.length > 0 && (
            <section className="caso-seccion" aria-labelledby="caso-trabajo">
              <h2 id="caso-trabajo" className="caso-seccion-titulo">
                Qué hicimos
              </h2>
              <ul className="caso-trabajo">
                {caso.trabajo.map((t) => (
                  <li key={t.nombre}>
                    <h3>{t.nombre}</h3>
                    {t.detalle && <p>{t.detalle}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* e) Resultados */}
          {caso.metricas.length > 0 && (
            <section className="caso-seccion" aria-labelledby="caso-resultados">
              <h2 id="caso-resultados" className="caso-seccion-titulo">
                Resultados
              </h2>
              <div className="caso-tarjeta">
                <CasoCifras caso={caso} />
                <CasoQueMide caso={caso} />
                <footer className="caso-pie">
                  <p>{caso.fuente}</p>
                </footer>
              </div>
            </section>
          )}

          {/* f) Las piezas */}
          {caso.piezas.length > 0 && (
            <section className="caso-seccion" aria-labelledby="caso-piezas">
              <h2 id="caso-piezas" className="caso-seccion-titulo">
                Las piezas
              </h2>
              <div className="caso-galeria">
                {caso.piezas.map((p) => (
                  <CasoPieza key={p.src} pieza={p} />
                ))}
              </div>
            </section>
          )}

          {/* g) Testimonio */}
          {caso.testimonio && (
            <section className="caso-seccion" aria-label={`Testimonio de ${caso.nombre}`}>
              <div className="caso-tarjeta">
                <CasoTestimonio testimonio={caso.testimonio} />
              </div>
            </section>
          )}
        </div>
      </section>

      {/* h) Cierre: el mismo texto del panel de servicios de la home. */}
      <section className="seccion-azul seccion">
        <div className="contenedor">
          <h2 className="max-w-[calc(20*var(--ch-raleway))] text-h2 text-balance">
            Si no sabes qué pieza te falta, empieza por el diagnóstico
          </h2>
          <p className="mt-5 max-w-[40em] text-lead text-cream/72">
            Es la etapa 01 del sistema: miramos qué tienes montado, qué falta y en qué orden
            conviene construirlo.
          </p>
          <GoldCta to="/diagnostico" className="mt-8">
            Solicitar diagnóstico
          </GoldCta>
        </div>
      </section>
    </>
  );
}
