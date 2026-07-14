import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/email-marketing")({
  head: () =>
    serviceHead({
      path: "/servicios/email-marketing",
      title: "Email Marketing y Automatización — Syntalia Vértice",
      description: "Campañas y flujos automatizados de bienvenida, recuperación, fidelización y mensajes personalizados para tu base de clientes.",
      serviceType: "Email marketing y automatización",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="Email Marketing y Automatización"
      intro="Desarrollamos estrategias de email marketing y automatización para mantener una comunicación directa con tu audiencia, fidelizar clientes y generar nuevas oportunidades de negocio."
      whyTitle="¿Por qué el email marketing sigue siendo uno de los canales más rentables?"
      whyContent={
        <>
          <p>El email marketing sigue siendo una de las herramientas con mayor retorno de inversión dentro del marketing digital.</p>
          <p>Permite comunicarte directamente con tu audiencia sin depender de algoritmos o cambios en plataformas externas. Cada envío es una oportunidad para mantener el contacto, compartir novedades y generar oportunidades comerciales.</p>
          <p>Cuando se trabaja de forma estratégica, se convierte en un canal estable, escalable y muy eficaz.</p>
        </>
      }
      whatTitle="Qué incluye nuestra estrategia de Email Marketing"
      whatItems={[
        "Estrategias de email adaptadas a tus objetivos y al comportamiento de tu audiencia.",
        "Creación de emails con contenido relevante que refuerza la relación con tus clientes.",
        "Diseño y gestión de newsletters, promociones, lanzamientos y comunicaciones comerciales.",
        "Implementación de sistemas de automatización para comunicación constante.",
        "Segmentación de audiencias para mensajes más relevantes y personalizados.",
        "Análisis y optimización continua: aperturas, clics y conversiones.",
      ]}
      whenTitle="¿Cuándo puede ayudarte el email marketing?"
      whenItems={[
        "Quieres mantener una comunicación directa con tus clientes",
        "Necesitas informar sobre novedades, productos o servicios",
        "Buscas mejorar la fidelización de tu audiencia",
        "Quieres generar nuevas oportunidades comerciales",
        "Necesitas automatizar parte de tu comunicación digital",
      ]}
      ctaTitle="Empieza a aprovechar el potencial del email marketing"
      ctaText="Si quieres utilizar el email marketing para fortalecer la relación con tus clientes y generar oportunidades, podemos ayudarte a desarrollar una estrategia adaptada."
    />
  ),
});