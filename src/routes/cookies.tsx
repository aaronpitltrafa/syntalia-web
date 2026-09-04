import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { legalData } from "@/lib/legal-data";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de cookies — Syntalia Vértice" },
      { name: "description", content: "Política de cookies de Syntalia Vértice." },
    ],
    links: [{ rel: "canonical", href: `${legalData.urlBase}/cookies` }],
  }),
  component: Cookies,
});

const TABLE_HEAD =
  "border-b border-border px-2 pb-2 text-left text-xs font-bold uppercase tracking-widest text-gold-light";
const TABLE_CELL = "border-b border-border/60 px-2 py-3 align-top";

function Cookies() {
  return (
    <LegalPage
      title="Política de cookies"
      description="Información sobre las tecnologías de almacenamiento utilizadas en este sitio web."
      updated={legalData.fechaActualizacion}
      sections={[
        {
          id: "titular",
          title: "1. Titular del sitio web",
          content: (
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong>Razón social:</strong> {legalData.razonSocial} (nombre comercial{" "}
                {legalData.nombreComercial})
              </li>
              <li>
                <strong>CIF:</strong> {legalData.cif}
              </li>
              <li>
                <strong>Domicilio:</strong> {legalData.domicilioSocial}.
              </li>
              <li>
                <strong>Correo electrónico:</strong>{" "}
                <a
                  href={`mailto:${legalData.email}`}
                  className="font-semibold text-primary hover:text-accent"
                >
                  {legalData.email}
                </a>
              </li>
            </ul>
          ),
        },
        {
          id: "que-son",
          title: "2. Qué son las cookies",
          content: (
            <p>
              Las cookies y tecnologías similares (como el almacenamiento local del navegador) son
              pequeños archivos o registros que un sitio web puede guardar en el dispositivo de la
              persona usuaria para recordar información entre visitas o durante la navegación, con
              distintas finalidades: técnicas, de preferencias, analíticas o publicitarias.
            </p>
          ),
        },
        {
          id: "situacion-actual",
          title: "3. Situación en este sitio web",
          content: (
            <>
              <p>
                <strong>
                  {legalData.dominio} no utiliza cookies analíticas, de preferencias ni
                  publicitarias.
                </strong>{" "}
                No instalamos herramientas de medición de audiencia (como Google Analytics), píxeles
                publicitarios (como Meta/Facebook Pixel) ni ningún sistema de rastreo con fines de
                marketing.
              </p>
              <p>
                El único almacenamiento que utiliza este sitio es de carácter técnico y necesario
                para su funcionamiento, detallado en la siguiente tabla:
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gold-light">
                Tecnologías de almacenamiento utilizadas
              </p>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className={TABLE_HEAD}>Nombre</th>
                      <th className={TABLE_HEAD}>Proveedor</th>
                      <th className={TABLE_HEAD}>Tecnología</th>
                      <th className={TABLE_HEAD}>Finalidad</th>
                      <th className={TABLE_HEAD}>Duración</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground/75">
                    <tr>
                      <td className={`${TABLE_CELL} font-mono text-[13px]`}>
                        tsr-scroll-restoration-v1_3
                      </td>
                      <td className={TABLE_CELL}>Propio ({legalData.dominio})</td>
                      <td className={TABLE_CELL}>
                        sessionStorage del navegador (API Web Storage) — no es una cookie
                      </td>
                      <td className={TABLE_CELL}>
                        Recordar la posición de scroll al navegar entre páginas con el botón
                        atrás/adelante del navegador.
                      </td>
                      <td className={TABLE_CELL}>
                        Datos de sesión: permanecen mientras la pestaña del navegador esté abierta y
                        se eliminan automáticamente en cuanto se cierra esa pestaña.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-foreground/60">
                Este dato se guarda mediante <code>sessionStorage</code>, la API de almacenamiento
                de sesión del navegador, y no mediante una cookie ni mediante{" "}
                <code>localStorage</code>. Al tratarse de una tecnología estrictamente técnica y
                necesaria para el funcionamiento del sitio web, no requiere consentimiento previo,
                conforme al artículo 22.2 de la LSSI-CE.
              </p>
            </>
          ),
        },
        {
          id: "cookies-terceros",
          title: "4. Cookies de terceros",
          content: (
            <>
              <p>
                Este sitio web no incorpora cookies de terceros. Comprobado el código fuente del
                sitio, confirmamos que no se utiliza Google Analytics, Meta (Facebook) Pixel, TikTok
                Pixel, reCAPTCHA, mapas incrustados, vídeos incrustados de terceros ni ninguna otra
                herramienta publicitaria o analítica.
              </p>
              <p>
                Las tipografías web se cargan desde servidores externos de Google Fonts
                (fonts.googleapis.com y fonts.gstatic.com); no están alojadas localmente en este
                sitio. Esta carga de recursos estáticos no instala cookies en el navegador, pero sí
                genera una conexión técnica con los servidores de Google para descargar los archivos
                de fuente.
              </p>
              <p>
                Los enlaces a Instagram y TikTok disponibles en el pie de página son simples enlaces
                externos que abren esas plataformas en una nueva pestaña: no están embebidos en esta
                web y, por tanto, no instalan cookies mientras se navega por {legalData.dominio}.
              </p>
            </>
          ),
        },
        {
          id: "gestion",
          title: "5. Gestión, aceptación y configuración",
          content: (
            <>
              <p>
                Al utilizar exclusivamente una tecnología técnica y necesaria (sessionStorage), este
                sitio web no muestra un banner de consentimiento de cookies, ya que no sería
                necesario ni aportaría control real a la persona usuaria sobre datos que no se
                recogen. Por este mismo motivo, esta página no incluye botones de "Aceptar" o
                "Rechazar".
              </p>
              <p>
                Aun así, en cualquier momento puede borrar los datos de <code>sessionStorage</code>{" "}
                del navegador o configurarlo para bloquearlos desde los ajustes de privacidad de
                cada navegador (Chrome, Firefox, Safari, Edge, etc.). Tenga en cuenta que bloquear
                esta tecnología técnica puede hacer que la función de recordar la posición de scroll
                al navegar dentro del sitio deje de funcionar correctamente; el resto de la web
                seguirá funcionando con normalidad.
              </p>
              <p>
                Si en el futuro se incorporase alguna cookie analítica o publicitaria, esta política
                se actualizará y se mostrará el correspondiente banner de consentimiento con las
                opciones de aceptar, rechazar y configurar, antes de instalar dichas cookies.
              </p>
            </>
          ),
        },
        {
          id: "actualizacion",
          title: "6. Fecha de actualización",
          content: (
            <p>
              Esta Política de Cookies fue actualizada por última vez el{" "}
              {legalData.fechaActualizacion}.
            </p>
          ),
        },
      ]}
    />
  );
}
