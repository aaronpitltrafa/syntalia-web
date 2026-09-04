import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { legalData } from "@/lib/legal-data";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal — Syntalia Vértice" },
      { name: "description", content: "Aviso legal del sitio web de Syntalia Vértice." },
    ],
    links: [{ rel: "canonical", href: `${legalData.urlBase}/aviso-legal` }],
  }),
  component: AvisoLegal,
});

function AvisoLegal() {
  return (
    <LegalPage
      title="Aviso legal"
      updated={legalData.fechaActualizacion}
      sections={[
        {
          id: "identificacion",
          title: "1. Identificación del titular",
          content: (
            <>
              <p>
                En cumplimiento del deber de información recogido en el artículo 10 de la Ley
                34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio
                Electrónico (LSSI-CE), se informa de los siguientes datos del titular de este sitio
                web:
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>
                  <strong>Titular:</strong> {legalData.razonSocial}
                </li>
                <li>
                  <strong>Nombre comercial:</strong> {legalData.nombreComercial}
                </li>
                <li>
                  <strong>CIF:</strong> {legalData.cif}
                </li>
                <li>
                  <strong>Domicilio social:</strong> {legalData.domicilioSocial}.
                </li>
                <li>
                  <strong>Registro Mercantil:</strong> Inscrita en el {legalData.registroMercantil}.
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
                <li>
                  <strong>Teléfono:</strong>{" "}
                  <a
                    href={legalData.telefonoHref}
                    className="font-semibold text-primary hover:text-accent"
                  >
                    {legalData.telefono}
                  </a>
                </li>
                <li>
                  <strong>Sitio web:</strong> {legalData.urlBase}
                </li>
              </ul>
            </>
          ),
        },
        {
          id: "objeto",
          title: "2. Objeto y ámbito de la web",
          content: (
            <p>
              El presente sitio web tiene como finalidad informar sobre la actividad de{" "}
              {legalData.razonSocial}, que opera bajo el nombre comercial {legalData.marca}:{" "}
              {legalData.actividad}. El sitio también facilita a las personas usuarias formularios
              de contacto y de solicitud de diagnóstico para iniciar una relación comercial. El
              acceso al sitio web es gratuito y no requiere registro previo, salvo la
              cumplimentación de los formularios de contacto o diagnóstico.
            </p>
          ),
        },
        {
          id: "condiciones",
          title: "3. Condiciones de acceso y uso",
          content: (
            <>
              <p>
                El acceso y la navegación por este sitio web suponen la aceptación, sin reservas, de
                las condiciones establecidas en este Aviso Legal. La persona usuaria se compromete a
                utilizar el sitio web y sus contenidos conforme a la ley, la moral, el orden público
                y las presentes condiciones, absteniéndose de:
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>Utilizar el sitio con fines fraudulentos o ilícitos.</li>
                <li>
                  Introducir o difundir virus informáticos u otros sistemas susceptibles de dañar el
                  sitio web, los sistemas de {legalData.marca} o de terceros.
                </li>
                <li>
                  Intentar acceder a áreas restringidas de los sistemas informáticos de{" "}
                  {legalData.marca} o de terceros.
                </li>
                <li>Provocar daños a los sistemas físicos o lógicos del titular o de terceros.</li>
              </ul>
            </>
          ),
        },
        {
          id: "propiedad-intelectual",
          title: "4. Propiedad intelectual e industrial",
          content: (
            <p>
              Los contenidos de este sitio web —incluyendo, sin carácter limitativo, textos,
              fotografías, gráficos, imágenes, logotipos, iconos, tecnología, software, diseño
              gráfico y códigos fuente— son titularidad de {legalData.marca} o de terceros que han
              autorizado su uso, y están protegidos por la normativa de propiedad intelectual e
              industrial. Queda prohibida su reproducción, distribución, comunicación pública o
              transformación total o parcial, salvo autorización expresa y por escrito del titular o
              del uso legítimo que la ley permita.
            </p>
          ),
        },
        {
          id: "responsabilidad",
          title: "5. Responsabilidad por contenidos y disponibilidad",
          content: (
            <p>
              {legalData.marca} no garantiza la disponibilidad, continuidad ni infalibilidad del
              funcionamiento del sitio web y, en consecuencia, excluye —en la medida que permita el
              ordenamiento jurídico— cualquier responsabilidad por los daños y perjuicios que puedan
              derivarse de la falta de disponibilidad o continuidad del sitio web, de errores en los
              contenidos o de la presencia de virus u otros elementos lesivos en el sitio o en el
              servidor que lo suministra. {legalData.marca} se reserva el derecho a suspender
              temporalmente y sin previo aviso el acceso al sitio web por motivos de mantenimiento,
              seguridad o actualización de los contenidos.
            </p>
          ),
        },
        {
          id: "enlaces",
          title: "6. Enlaces externos",
          content: (
            <p>
              Este sitio web puede incluir enlaces a sitios de terceros (por ejemplo, redes
              sociales) para facilitar el acceso a información complementaria. {legalData.marca} no
              asume responsabilidad alguna por los contenidos, políticas de privacidad o prácticas
              de dichos sitios de terceros, cuyo acceso queda fuera de su control. La inclusión de
              estos enlaces no implica relación, recomendación ni supervisión por parte de{" "}
              {legalData.marca}.
            </p>
          ),
        },
        {
          id: "proteccion-datos",
          title: "7. Protección de datos",
          content: (
            <p>
              El tratamiento de los datos personales facilitados a través de los formularios de este
              sitio web se rige por lo establecido en nuestra{" "}
              <Link
                to="/privacidad"
                className="font-semibold text-primary underline hover:text-gold-light"
              >
                Política de Privacidad
              </Link>
              , que forma parte integrante de este Aviso Legal.
            </p>
          ),
        },
        {
          id: "legislacion",
          title: "8. Legislación aplicable y jurisdicción",
          content: (
            <p>
              Las presentes condiciones se rigen por la legislación española. Para la resolución de
              cualquier controversia derivada del acceso o uso de este sitio web, las partes se
              someterán a los juzgados y tribunales que correspondan conforme a la normativa de
              protección de personas consumidoras y usuarias aplicable; en su defecto, a los
              juzgados y tribunales del domicilio del titular.
            </p>
          ),
        },
        {
          id: "actualizacion",
          title: "9. Fecha de última actualización",
          content: (
            <p>
              Este Aviso Legal fue actualizado por última vez el {legalData.fechaActualizacion}.
            </p>
          ),
        },
      ]}
    />
  );
}
