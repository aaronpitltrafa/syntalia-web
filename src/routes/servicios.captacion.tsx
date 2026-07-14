import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/service-page";
import { serviceHead } from "@/lib/service-seo";

export const Route = createFileRoute("/servicios/captacion")({
  head: () =>
    serviceHead({
      path: "/servicios/captacion",
      title: "Sistema de Captación de Clientes — Syntalia Vértice",
      description: "Sistemas digitales para atraer, captar y convertir clientes potenciales de forma constante y estratégica.",
      serviceType: "Sistema de captación de clientes",
    }),
  component: () => (
    <ServicePage
      eyebrow="Servicio"
      title="Sistema de Captación de Clientes"
      intro="Diseñamos sistemas de captación para empresas del sector agroalimentario que quieren atraer clientes potenciales y generar oportunidades de negocio de forma constante."
      whyTitle="¿Cómo generar clientes potenciales de forma constante?"
      whyContent={
        <>
          <p>Para generar clientes potenciales de forma constante, no basta con tener presencia en internet: es necesario contar con un sistema diseñado para atraer, captar y convertir.</p>
          <ul className="space-y-2 pl-1">
            <li>• Atraer tráfico cualificado a tu web</li>
            <li>• Convertir visitantes en contactos interesados</li>
            <li>• Organizar y gestionar los leads de forma eficiente</li>
            <li>• Facilitar el seguimiento comercial</li>
            <li>• Aumentar las probabilidades de conversión</li>
          </ul>
        </>
      }
      whatTitle="Qué incluye nuestro sistema de captación"
      whatItems={[
        "Diseño de landing pages optimizadas que comunican tu propuesta y convierten visitantes.",
        "Producción de contenidos estratégicos (vídeos, VSL) para explicar tu servicio.",
        "Implementación de formularios para recoger y cualificar contactos.",
        "Integración con CRM para gestionar leads dentro del proceso comercial.",
        "Automatización de respuestas y seguimiento para no perder oportunidades.",
        "Optimización continua para aumentar la calidad de los leads.",
      ]}
      whenTitle="¿Cuándo necesita tu empresa un sistema de captación?"
      whenItems={[
        "Tu empresa no genera suficientes contactos o clientes potenciales",
        "Tienes tráfico en tu web pero no se convierte en oportunidades",
        "Dependes de acciones puntuales y no de un sistema continuo",
        "Quieres organizar mejor tus leads y el proceso comercial",
        "Buscas generar oportunidades de negocio de forma más predecible",
      ]}
      ctaTitle="Empieza a generar oportunidades de forma constante"
      ctaText="Si quieres convertir tu presencia digital en un sistema capaz de atraer clientes potenciales y generar oportunidades, podemos ayudarte."
    />
  ),
});