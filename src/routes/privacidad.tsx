import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { legalData } from "@/lib/legal-data";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de privacidad — Syntalia Vértice" },
      { name: "description", content: "Política de privacidad de Syntalia Vértice." },
    ],
    links: [{ rel: "canonical", href: `${legalData.urlBase}/privacidad` }],
  }),
  component: Privacidad,
});

function Privacidad() {
  return (
    <LegalPage
      title="Política de privacidad"
      description="Información sobre el tratamiento de los datos personales realizado a través de este sitio web."
      updated={legalData.fechaActualizacion}
      whiteContent
      sections={[
        {
          id: "responsable",
          title: "1. Responsable del tratamiento",
          content: (
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong>Razón social:</strong> {legalData.razonSocial}
              </li>
              <li>
                <strong>Nombre comercial:</strong> {legalData.nombreComercial}
              </li>
              <li>
                <strong>CIF:</strong> {legalData.cif}
              </li>
              <li>
                <strong>Domicilio:</strong> {legalData.domicilioSocial}.
              </li>
              <li>
                <strong>Correo:</strong>{" "}
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
                <strong>Web:</strong> {legalData.urlBase}
              </li>
            </ul>
          ),
        },
        {
          id: "datos-tratados",
          title: "2. Datos que tratamos",
          content: (
            <>
              <p>
                A través de los formularios de contacto y de diagnóstico disponibles en este sitio
                web tratamos únicamente los datos que la persona usuaria facilita voluntariamente al
                completarlos:
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>Nombre y apellidos.</li>
                <li>Correo electrónico y teléfono.</li>
                <li>Cargo, empresa, sector y web (formulario de diagnóstico).</li>
                <li>
                  Información empresarial facilitada en el diagnóstico: facturación aproximada,
                  número de empleados y áreas en las que se solicita ayuda.
                </li>
                <li>Mensajes, consultas y necesidades comunicadas libremente en el formulario.</li>
                <li>
                  Datos técnicos estrictamente necesarios generados por la web para su
                  funcionamiento (el dato de sesión que recuerda la posición de scroll al navegar,
                  descrito en la{" "}
                  <Link
                    to="/cookies"
                    className="font-semibold text-primary underline hover:text-gold-light"
                  >
                    Política de Cookies
                  </Link>
                  ).
                </li>
              </ul>
              <p>
                No se tratan categorías especiales de datos (art. 9 RGPD) a través de estos
                formularios.
              </p>
            </>
          ),
        },
        {
          id: "finalidades",
          title: "3. Finalidades del tratamiento",
          content: (
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Responder a las consultas planteadas a través del formulario de contacto.</li>
              <li>Gestionar las solicitudes de diagnóstico estratégico gratuito recibidas.</li>
              <li>
                Preparar propuestas comerciales y, en su caso, prestar los servicios contratados.
              </li>
              <li>
                Cumplir las obligaciones fiscales, contables y legales asociadas a la relación.
              </li>
              <li>
                Enviar comunicaciones comerciales sobre nuestros servicios, únicamente cuando la
                persona usuaria haya marcado la casilla específica, independiente y no premarcada
                habilitada para ello.
              </li>
            </ul>
          ),
        },
        {
          id: "base-juridica",
          title: "4. Base jurídica de cada finalidad",
          content: (
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong>Responder consultas:</strong> aplicación de medidas precontractuales
                solicitadas por la persona interesada (art. 6.1.b RGPD) o, cuando la consulta no
                tenga naturaleza precontractual, interés legítimo en atender la comunicación
                recibida (art. 6.1.f RGPD).
              </li>
              <li>
                <strong>Gestionar solicitudes de diagnóstico:</strong> aplicación de medidas
                precontractuales solicitadas por la persona interesada (art. 6.1.b RGPD).
              </li>
              <li>
                <strong>Preparar propuestas y prestar servicios:</strong> ejecución de un contrato o
                medidas precontractuales (art. 6.1.b RGPD).
              </li>
              <li>
                <strong>Cumplir obligaciones fiscales, contables y legales:</strong> cumplimiento de
                una obligación legal (art. 6.1.c RGPD).
              </li>
              <li>
                <strong>Enviar comunicaciones comerciales:</strong> consentimiento expreso,
                independiente y revocable de la persona interesada (art. 6.1.a RGPD).
              </li>
            </ul>
          ),
        },
        {
          id: "conservacion",
          title: "5. Plazos de conservación",
          content: (
            <ul className="ml-5 list-disc space-y-1.5">
              <li>
                <strong>Consultas y diagnósticos que no terminan en contratación:</strong> se
                conservan mientras se gestiona la solicitud y, una vez atendida, durante el plazo de
                prescripción de las acciones que pudieran derivarse de ese contacto (con carácter
                general, hasta 5 años, conforme al plazo de prescripción de acciones personales del
                artículo 1964 del Código Civil), salvo que la persona interesada solicite antes su
                supresión.
              </li>
              <li>
                <strong>Datos de clientes y proyectos contratados:</strong> mientras dure la
                relación contractual y, finalizada esta, durante el plazo de prescripción de las
                obligaciones que puedan derivarse del contrato (con carácter general, hasta 5 años,
                art. 1964 del Código Civil), sin perjuicio de los plazos fiscales y contables
                aplicables a la documentación asociada.
              </li>
              <li>
                <strong>Documentación fiscal, contable y contractual:</strong> conforme a las
                obligaciones legales aplicables — 6 años desde el último asiento en los libros
                contables (art. 30 del Código de Comercio) y hasta 4 años a efectos de prescripción
                tributaria (art. 66 de la Ley General Tributaria), sin perjuicio de plazos
                superiores si una norma específica lo exige.
              </li>
              <li>
                <strong>Comunicaciones comerciales:</strong> mientras la persona interesada no
                retire su consentimiento. Tras la retirada, sus datos se suprimen de las listas de
                envío, conservándose únicamente la prueba del consentimiento y de su retirada
                durante el plazo de prescripción legal para acreditarlo ante una eventual
                reclamación (con carácter general, hasta 5 años, art. 1964 del Código Civil).
              </li>
            </ul>
          ),
        },
        {
          id: "destinatarios",
          title: "6. Destinatarios y encargados del tratamiento",
          content: (
            <>
              <p>
                Los datos no se ceden a terceros salvo obligación legal. Para prestar el servicio de
                este sitio web contamos con los siguientes encargados del tratamiento, que acceden a
                los datos únicamente para prestar su servicio y bajo las garantías exigidas por el
                RGPD:
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>
                  <strong>Resend</strong> (Plus Five Five, Inc.) — Servicio prestado: envío por
                  correo electrónico de las notificaciones generadas por los formularios de contacto
                  y diagnóstico. Ubicación: Estados Unidos. Contrato de encargado del tratamiento:
                  sí, mediante el Acuerdo de Tratamiento de Datos (DPA) que Resend pone a
                  disposición de las personas usuarias de su servicio.
                </li>
                <li>
                  <strong>Cloudflare</strong> — Servicio prestado: alojamiento del sitio web y
                  ejecución de las funciones de servidor que procesan los formularios antes de
                  enviarlos por correo. Ubicación: red global con centros de datos en Estados Unidos
                  y en Europa. Contrato de encargado del tratamiento: sí, mediante el Acuerdo de
                  Tratamiento de Datos (DPA) que Cloudflare pone a disposición de las personas
                  usuarias de sus servicios.
                </li>
              </ul>
              <p>
                No utilizamos ningún CRM ni herramienta adicional de gestión de leads: los datos de
                los formularios se envían directamente por correo electrónico a la cuenta indicada
                más arriba, sin quedar almacenados en ninguna base de datos propia.
              </p>
            </>
          ),
        },
        {
          id: "transferencias",
          title: "7. Transferencias internacionales",
          content: (
            <>
              <p>
                <strong>Resend</strong> procesa los datos principalmente en Estados Unidos. Esta
                transferencia se realiza acogiéndose a las cláusulas contractuales tipo (SCC)
                aprobadas por la Comisión Europea y al marco de privacidad de datos UE-EE. UU.
                (EU-U.S. Data Privacy Framework), a los que Resend está adherido.
              </p>
              <p>
                <strong>Cloudflare</strong> opera una red global con centros de datos en Europa y en
                Estados Unidos; en la medida en que el tratamiento de metadatos técnicos se realice
                en centros situados fuera del Espacio Económico Europeo, Cloudflare aplica
                igualmente cláusulas contractuales tipo (SCC) y está adherida al marco de privacidad
                de datos UE-EE. UU.
              </p>
            </>
          ),
        },
        {
          id: "derechos",
          title: "8. Derechos de las personas interesadas",
          content: (
            <>
              <p>
                Cualquier persona tiene derecho a obtener confirmación sobre si en {legalData.marca}{" "}
                estamos tratando datos personales que le conciernan y, en concreto, a ejercer los
                siguientes derechos:
              </p>
              <ul className="ml-5 list-disc space-y-1.5">
                <li>
                  <strong>Acceso:</strong> conocer qué datos tratamos.
                </li>
                <li>
                  <strong>Rectificación:</strong> corregir datos inexactos o incompletos.
                </li>
                <li>
                  <strong>Supresión:</strong> solicitar la eliminación de sus datos.
                </li>
                <li>
                  <strong>Oposición:</strong> oponerse al tratamiento de sus datos.
                </li>
                <li>
                  <strong>Limitación:</strong> solicitar la limitación de su tratamiento.
                </li>
                <li>
                  <strong>Portabilidad:</strong> recibir sus datos en un formato estructurado y de
                  uso común.
                </li>
                <li>
                  <strong>Retirada del consentimiento:</strong> cuando el tratamiento se base en el
                  consentimiento (por ejemplo, el envío de comunicaciones comerciales), puede
                  retirarlo en cualquier momento, sin que ello afecte a la licitud del tratamiento
                  basado en el consentimiento previo a su retirada.
                </li>
                <li>
                  <strong>Reclamación ante la AEPD:</strong> como se detalla en el apartado
                  siguiente.
                </li>
                <li>
                  <strong>Decisiones automatizadas:</strong> {legalData.razonSocial} no adopta
                  decisiones con efectos jurídicos basadas exclusivamente en tratamientos
                  automatizados ni elabora perfiles mediante los formularios de este sitio web.
                </li>
              </ul>
              <p>
                Estos derechos pueden ejercerse de forma gratuita escribiendo a{" "}
                <a
                  href={`mailto:${legalData.email}`}
                  className="font-semibold text-primary hover:text-accent"
                >
                  {legalData.email}
                </a>
                , indicando el derecho que se desea ejercer. Cuando existan dudas razonables sobre
                la identidad de la persona solicitante, podremos pedir la información necesaria para
                verificarla.
              </p>
            </>
          ),
        },
        {
          id: "reclamacion-aepd",
          title: "9. Derecho a reclamar ante la AEPD",
          content: (
            <p>
              Si considera que el tratamiento de sus datos personales no se ajusta a la normativa
              vigente, tiene derecho a presentar una reclamación ante la Agencia Española de
              Protección de Datos (AEPD), a través de su sede electrónica{" "}
              <a
                href="https://www.aepd.es"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary underline hover:text-gold-light"
              >
                www.aepd.es
              </a>
              , especialmente si no ha obtenido satisfacción en el ejercicio de sus derechos.
            </p>
          ),
        },
        {
          id: "seguridad",
          title: "10. Medidas de seguridad",
          content: (
            <p>
              {legalData.razonSocial} aplica las medidas técnicas y organizativas apropiadas para
              garantizar un nivel de seguridad adecuado al riesgo de los datos tratados, conforme al
              artículo 32 del RGPD, con el fin de evitar su alteración, pérdida, tratamiento o
              acceso no autorizado.
            </p>
          ),
        },
        {
          id: "menores",
          title: "11. Datos de menores de edad",
          content: (
            <p>
              Los servicios de esta web están dirigidos a personas mayores de edad y a
              representantes de empresas. No se solicitan intencionadamente datos de menores.
            </p>
          ),
        },
        {
          id: "modificaciones",
          title: "12. Modificaciones de la política",
          content: (
            <p>
              {legalData.razonSocial} podrá modificar esta Política de Privacidad para adaptarla a
              novedades legislativas, jurisprudenciales o a prácticas del sector. En caso de cambios
              sustanciales, se informará de ello a través de este mismo sitio web.
            </p>
          ),
        },
        {
          id: "actualizacion",
          title: "13. Fecha de actualización",
          content: (
            <p>
              Esta Política de Privacidad fue actualizada por última vez el{" "}
              {legalData.fechaActualizacion}.
            </p>
          ),
        },
      ]}
    />
  );
}
